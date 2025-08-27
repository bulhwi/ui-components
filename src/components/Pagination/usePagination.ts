import { useState, useCallback, useMemo } from 'react';
import { UsePaginationOptions, UsePaginationReturn } from './types';

/**
 * Generate array of page numbers with ellipsis
 */
function generatePages(
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
  boundaryCount: number = 1
): (number | 'ellipsis')[] {
  // Total pages to show: current + siblings on both sides + boundaries on both sides + 2 ellipsis
  const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

  if (totalNumbers >= totalPages) {
    // Show all pages if total is small
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

  const shouldShowLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = siblingCount * 2 + boundaryCount + 2;
    return [
      ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
      'ellipsis',
      ...Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + i + 1),
    ];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = boundaryCount + 1 + 2 * siblingCount;
    return [
      ...Array.from({ length: boundaryCount }, (_, i) => i + 1),
      'ellipsis',
      ...Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1),
    ];
  }

  return [
    ...Array.from({ length: boundaryCount }, (_, i) => i + 1),
    'ellipsis',
    ...Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i),
    'ellipsis',
    ...Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + i + 1),
  ];
}

/**
 * Custom hook for pagination logic and state management
 * 
 * @param options - Pagination configuration options
 * @returns Pagination state and methods
 * 
 * @example
 * ```tsx
 * const pagination = usePagination({
 *   total: 1000,
 *   initialPage: 1,
 *   initialPageSize: 20,
 *   siblingCount: 1,
 *   boundaryCount: 1,
 *   onChange: (page, pageSize) => console.log('Page changed:', page, pageSize),
 * });
 * 
 * // Use pagination state
 * console.log(pagination.currentPage); // 1
 * console.log(pagination.totalPages); // 50
 * console.log(pagination.getVisiblePages()); // [1, 2, 3, 'ellipsis', 50]
 * 
 * // Navigate
 * pagination.goToNext(); // Go to page 2
 * pagination.goToPage(5); // Go to page 5
 * pagination.changePageSize(50); // Change page size and recalculate
 * ```
 */
export function usePagination({
  total,
  initialPage = 1,
  initialPageSize = 10,
  siblingCount = 1,
  boundaryCount = 1,
  onChange,
  onPageSizeChange,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(Math.max(1, initialPage));
  const [pageSize, setPageSize] = useState(Math.max(1, initialPageSize));

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(Math.max(0, total) / pageSize);
  }, [total, pageSize]);

  // Ensure current page is within valid range
  const validCurrentPage = useMemo(() => {
    return Math.min(currentPage, Math.max(1, totalPages));
  }, [currentPage, totalPages]);

  // Navigation state
  const hasPrevious = validCurrentPage > 1;
  const hasNext = validCurrentPage < totalPages;

  // Navigation methods
  const goToPrevious = useCallback(() => {
    if (!hasPrevious) return;
    const newPage = validCurrentPage - 1;
    setCurrentPage(newPage);
    onChange?.(newPage, pageSize);
  }, [hasPrevious, validCurrentPage, pageSize, onChange]);

  const goToNext = useCallback(() => {
    if (!hasNext) return;
    const newPage = validCurrentPage + 1;
    setCurrentPage(newPage);
    onChange?.(newPage, pageSize);
  }, [hasNext, validCurrentPage, pageSize, onChange]);

  const goToFirst = useCallback(() => {
    if (validCurrentPage === 1) return;
    setCurrentPage(1);
    onChange?.(1, pageSize);
  }, [validCurrentPage, pageSize, onChange]);

  const goToLast = useCallback(() => {
    if (validCurrentPage === totalPages || totalPages === 0) return;
    setCurrentPage(totalPages);
    onChange?.(totalPages, pageSize);
  }, [validCurrentPage, totalPages, pageSize, onChange]);

  const goToPage = useCallback((page: number) => {
    const clampedPage = Math.max(1, Math.min(page, totalPages));
    if (clampedPage === validCurrentPage) return;
    setCurrentPage(clampedPage);
    onChange?.(clampedPage, pageSize);
  }, [totalPages, validCurrentPage, pageSize, onChange]);

  const changePageSize = useCallback((newPageSize: number) => {
    const validPageSize = Math.max(1, newPageSize);
    const newTotalPages = Math.ceil(total / validPageSize);
    const newCurrentPage = Math.min(validCurrentPage, Math.max(1, newTotalPages));
    
    setPageSize(validPageSize);
    setCurrentPage(newCurrentPage);
    
    onPageSizeChange?.(validPageSize, newCurrentPage);
    onChange?.(newCurrentPage, validPageSize);
  }, [total, validCurrentPage, onPageSizeChange, onChange]);

  // Get visible page numbers with ellipsis
  const getVisiblePages = useCallback(() => {
    return generatePages(validCurrentPage, totalPages, siblingCount, boundaryCount);
  }, [validCurrentPage, totalPages, siblingCount, boundaryCount]);

  // Get current range info
  const getRangeInfo = useCallback(() => {
    const start = total === 0 ? 0 : (validCurrentPage - 1) * pageSize + 1;
    const end = Math.min(validCurrentPage * pageSize, total);
    
    return {
      start,
      end,
      total,
    };
  }, [validCurrentPage, pageSize, total]);

  return {
    currentPage: validCurrentPage,
    pageSize,
    totalPages,
    hasPrevious,
    hasNext,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
    goToPage,
    changePageSize,
    getVisiblePages,
    getRangeInfo,
  };
}

/**
 * Utility function to calculate pagination info
 */
export function calculatePaginationInfo(
  currentPage: number,
  pageSize: number,
  total: number
) {
  const totalPages = Math.ceil(Math.max(0, total) / Math.max(1, pageSize));
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);
  
  return {
    totalPages,
    start,
    end,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}

/**
 * Utility function to generate page size options
 */
export function generatePageSizeOptions(
  baseOptions: number[] = [10, 20, 50, 100]
): number[] {
  return baseOptions.sort((a, b) => a - b);
}