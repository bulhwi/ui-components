import { ReactNode } from 'react';

/**
 * Available pagination sizes
 */
export type PaginationSize = 'sm' | 'md' | 'lg';

/**
 * Pagination display variants
 */
export type PaginationVariant = 'default' | 'simple' | 'compact';

/**
 * Position of pagination info text
 */
export type PaginationInfoPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for individual pagination button
 */
export interface PaginationButtonProps {
  /** Button content */
  children?: ReactNode;
  /** Whether button is active/current */
  active?: boolean;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button size */
  size?: PaginationSize;
  /** Button type */
  type?: 'page' | 'prev' | 'next' | 'first' | 'last' | 'ellipsis';
  /** Accessibility label */
  'aria-label'?: string;
  /** Test identifier */
  'data-testid'?: string;
}

/**
 * Props for page size selector
 */
export interface PageSizeSelectorProps {
  /** Current page size */
  value: number;
  /** Available page size options */
  options: number[];
  /** Change handler */
  onChange: (pageSize: number) => void;
  /** Component size */
  size?: PaginationSize;
  /** Whether disabled */
  disabled?: boolean;
  /** Custom label */
  label?: string;
}

/**
 * Props for page jump input
 */
export interface PageJumpProps {
  /** Current page */
  currentPage: number;
  /** Total pages */
  totalPages: number;
  /** Jump handler */
  onJump: (page: number) => void;
  /** Component size */
  size?: PaginationSize;
  /** Whether disabled */
  disabled?: boolean;
  /** Custom label */
  label?: string;
}

/**
 * Props for pagination info display
 */
export interface PaginationInfoProps {
  /** Current page (1-based) */
  currentPage: number;
  /** Items per page */
  pageSize: number;
  /** Total number of items */
  total: number;
  /** Info position */
  position?: PaginationInfoPosition;
  /** Custom info renderer */
  render?: (info: {
    start: number;
    end: number;
    total: number;
    currentPage: number;
    totalPages: number;
  }) => ReactNode;
}

/**
 * Main Pagination component props
 */
export interface PaginationProps {
  /** Current page (1-based) */
  current: number;
  /** Total number of items */
  total: number;
  /** Items per page */
  pageSize?: number;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Show page size selector */
  showSizeChanger?: boolean;
  /** Show total items info */
  showTotal?: boolean | ((total: number, range: [number, number]) => ReactNode);
  /** Show quick jumper */
  showQuickJumper?: boolean;
  /** Pagination variant */
  variant?: PaginationVariant;
  /** Component size */
  size?: PaginationSize;
  /** Whether disabled */
  disabled?: boolean;
  /** Show less page items */
  simple?: boolean;
  /** Hide on single page */
  hideOnSinglePage?: boolean;
  /** Show first/last buttons */
  showFirstLast?: boolean;
  /** Custom previous text */
  prevText?: ReactNode;
  /** Custom next text */
  nextText?: ReactNode;
  /** Custom first text */
  firstText?: ReactNode;
  /** Custom last text */
  lastText?: ReactNode;
  /** Maximum pages to show */
  showSizeChangerLabels?: boolean;
  /** Number of pages to show around current */
  siblingCount?: number;
  /** Number of pages to show at boundary */
  boundaryCount?: number;
  /** Custom CSS class */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Page change handler */
  onChange: (page: number, pageSize: number) => void;
  /** Page size change handler */
  onShowSizeChange?: (current: number, pageSize: number) => void;
  /** Custom item render function */
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: ReactNode
  ) => ReactNode;
}

/**
 * Pagination state hook return type
 */
export interface UsePaginationReturn {
  /** Current page */
  currentPage: number;
  /** Current page size */
  pageSize: number;
  /** Total pages */
  totalPages: number;
  /** Whether has previous page */
  hasPrevious: boolean;
  /** Whether has next page */
  hasNext: boolean;
  /** Go to previous page */
  goToPrevious: () => void;
  /** Go to next page */
  goToNext: () => void;
  /** Go to first page */
  goToFirst: () => void;
  /** Go to last page */
  goToLast: () => void;
  /** Go to specific page */
  goToPage: (page: number) => void;
  /** Change page size */
  changePageSize: (size: number) => void;
  /** Get visible page numbers */
  getVisiblePages: () => (number | 'ellipsis')[];
  /** Get current range info */
  getRangeInfo: () => {
    start: number;
    end: number;
    total: number;
  };
}

/**
 * Options for usePagination hook
 */
export interface UsePaginationOptions {
  /** Total items */
  total: number;
  /** Initial page */
  initialPage?: number;
  /** Initial page size */
  initialPageSize?: number;
  /** Number of siblings around current page */
  siblingCount?: number;
  /** Number of boundary pages */
  boundaryCount?: number;
  /** Change handlers */
  onChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number, page: number) => void;
}

/**
 * Pagination theme configuration
 */
export interface PaginationTheme {
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    background: string;
    backgroundHover: string;
    backgroundActive: string;
    backgroundDisabled: string;
    border: string;
    borderHover: string;
    borderActive: string;
    text: string;
    textActive: string;
    textDisabled: string;
  };
  spacing: {
    padding: {
      sm: string;
      md: string;
      lg: string;
    };
    margin: string;
    gap: string;
  };
  borderRadius: string;
  fontSize: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    default: string;
  };
}