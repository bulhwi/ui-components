import React, { forwardRef, useMemo, useCallback } from 'react';
import { PaginationProps } from './types';
import { usePagination } from './usePagination';
import {
  PaginationContainer,
  PaginationNav,
  SimplePagination,
  SimplePaginationInfo,
  ResponsivePaginationWrapper,
} from './styles';
import {
  PaginationButtonComponent,
  PageSizeSelectorComponent,
  PageJumperComponent,
  PaginationInfoComponent,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from './components';

/**
 * Pagination component for navigating through large datasets.
 * 
 * Features:
 * - Flexible navigation with page numbers, previous/next buttons
 * - First/last page shortcuts
 * - Page size selection
 * - Quick page jumper
 * - Multiple display variants (default, simple, compact)
 * - Responsive design
 * - Full accessibility support
 * - Keyboard navigation
 * 
 * @example
 * ```tsx
 * // Basic pagination
 * <Pagination
 *   current={currentPage}
 *   total={1000}
 *   pageSize={20}
 *   onChange={(page, pageSize) => {
 *     console.log('Page changed:', page, pageSize);
 *   }}
 * />
 * 
 * // With page size selector
 * <Pagination
 *   current={currentPage}
 *   total={1000}
 *   pageSize={20}
 *   showSizeChanger
 *   pageSizeOptions={[10, 20, 50, 100]}
 *   onChange={(page, pageSize) => {
 *     setCurrentPage(page);
 *     setPageSize(pageSize);
 *   }}
 * />
 * 
 * // Simple variant with custom info
 * <Pagination
 *   current={currentPage}
 *   total={1000}
 *   pageSize={20}
 *   variant="simple"
 *   showTotal={(total, range) => 
 *     `${range[0]}-${range[1]} of ${total} items`
 *   }
 *   onChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  current,
  total,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = false,
  showTotal = false,
  showQuickJumper = false,
  variant = 'default',
  size = 'md',
  disabled = false,
  simple = false,
  hideOnSinglePage = false,
  showFirstLast = false,
  prevText,
  nextText,
  firstText,
  lastText,
  showSizeChangerLabels = true,
  siblingCount = 1,
  boundaryCount = 1,
  className,
  style,
  onChange,
  onShowSizeChange,
  itemRender,
  ...rest
}, ref) => {
  // Use pagination hook for logic
  const pagination = usePagination({
    total,
    initialPage: current,
    initialPageSize: pageSize,
    siblingCount,
    boundaryCount,
    onChange: (page, newPageSize) => {
      onChange(page, newPageSize);
      if (newPageSize !== pageSize) {
        onShowSizeChange?.(page, newPageSize);
      }
    },
  });

  const totalPages = pagination.totalPages;
  const currentPage = pagination.currentPage;
  
  // Hide pagination if only one page and hideOnSinglePage is true
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  // Get visible pages
  const visiblePages = pagination.getVisiblePages();
  const rangeInfo = pagination.getRangeInfo();

  // Handle page size change
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    pagination.changePageSize(newPageSize);
  }, [pagination]);

  // Handle page jump
  const handlePageJump = useCallback((page: number) => {
    pagination.goToPage(page);
  }, [pagination]);

  // Render page button
  const renderPageButton = (
    pageNum: number | 'ellipsis',
    index: number
  ) => {
    if (pageNum === 'ellipsis') {
      return (
        <PaginationButtonComponent
          key={`ellipsis-${index}`}
          type="ellipsis"
          size={size}
          disabled
        >
          <MoreHorizontalIcon />
        </PaginationButtonComponent>
      );
    }

    const isActive = pageNum === currentPage;
    const handleClick = () => pagination.goToPage(pageNum);

    const element = (
      <PaginationButtonComponent
        key={pageNum}
        active={isActive}
        disabled={disabled}
        size={size}
        type="page"
        onClick={handleClick}
        aria-label={`Go to page ${pageNum}`}
        data-testid={`pagination-page-${pageNum}`}
      >
        {pageNum}
      </PaginationButtonComponent>
    );

    return itemRender ? itemRender(pageNum, 'page', element) : element;
  };

  // Render navigation buttons
  const renderNavButton = (
    type: 'first' | 'prev' | 'next' | 'last',
    handler: () => void,
    isDisabled: boolean,
    text?: React.ReactNode
  ) => {
    const icons = {
      first: <ChevronsLeftIcon />,
      prev: <ChevronLeftIcon />,
      next: <ChevronRightIcon />,
      last: <ChevronsRightIcon />,
    };

    const labels = {
      first: 'Go to first page',
      prev: 'Go to previous page',
      next: 'Go to next page',
      last: 'Go to last page',
    };

    const element = (
      <PaginationButtonComponent
        type={type}
        disabled={disabled || isDisabled}
        size={size}
        onClick={handler}
        aria-label={labels[type]}
        data-testid={`pagination-${type}`}
      >
        {text || icons[type]}
      </PaginationButtonComponent>
    );

    return itemRender ? itemRender(currentPage, type === 'prev' ? 'prev' : 'next', element) : element;
  };

  // Simple variant rendering
  if (variant === 'simple' || simple) {
    return (
      <ResponsivePaginationWrapper>
        <SimplePagination
          ref={ref}
          className={className}
          style={style}
          $size={size}
          $disabled={disabled}
          {...rest}
        >
          {renderNavButton('prev', pagination.goToPrevious, !pagination.hasPrevious, prevText)}
          
          <SimplePaginationInfo>
            {typeof showTotal === 'function' ? 
              showTotal(total, [rangeInfo.start, rangeInfo.end]) :
              `${currentPage} / ${totalPages}`
            }
          </SimplePaginationInfo>
          
          {renderNavButton('next', pagination.goToNext, !pagination.hasNext, nextText)}
        </SimplePagination>
      </ResponsivePaginationWrapper>
    );
  }

  // Default and compact variants
  return (
    <ResponsivePaginationWrapper>
      <PaginationContainer
        ref={ref}
        className={className}
        style={style}
        $size={size}
        $variant={variant}
        $disabled={disabled}
        {...rest}
      >
        {/* Page Size Selector */}
        {showSizeChanger && (
          <PageSizeSelectorComponent
            value={pageSize}
            options={pageSizeOptions}
            onChange={handlePageSizeChange}
            size={size}
            disabled={disabled}
            label={showSizeChangerLabels ? 'Show' : ''}
          />
        )}

        {/* Total Info */}
        {showTotal && (
          <PaginationInfoComponent
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            render={typeof showTotal === 'function' ? 
              (info) => showTotal(total, [info.start, info.end]) :
              undefined
            }
          />
        )}

        {/* Navigation */}
        <PaginationNav $variant={variant}>
          {/* First Page Button */}
          {showFirstLast && (
            renderNavButton('first', pagination.goToFirst, !pagination.hasPrevious, firstText)
          )}

          {/* Previous Button */}
          {renderNavButton('prev', pagination.goToPrevious, !pagination.hasPrevious, prevText)}

          {/* Page Numbers */}
          {visiblePages.map(renderPageButton)}

          {/* Next Button */}
          {renderNavButton('next', pagination.goToNext, !pagination.hasNext, nextText)}

          {/* Last Page Button */}
          {showFirstLast && (
            renderNavButton('last', pagination.goToLast, !pagination.hasNext, lastText)
          )}
        </PaginationNav>

        {/* Quick Jumper */}
        {showQuickJumper && (
          <PageJumperComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onJump={handlePageJump}
            size={size}
            disabled={disabled}
          />
        )}
      </PaginationContainer>
    </ResponsivePaginationWrapper>
  );
});

Pagination.displayName = 'Pagination';