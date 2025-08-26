import React from 'react';

// 테이블 열 정의
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: keyof T;
  width?: number | string;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  ellipsis?: boolean;
}

// 테이블 행 선택
export interface TableRowSelection<T = any> {
  type?: 'checkbox' | 'radio';
  selectedRowKeys?: React.Key[];
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
  columnWidth?: number | string;
  fixed?: boolean;
}

// 페이지네이션 설정
export interface TablePagination {
  current?: number;
  pageSize?: number;
  total?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  pageSizeOptions?: string[];
  size?: 'default' | 'small';
  simple?: boolean;
  hideOnSinglePage?: boolean;
}

// 정렬 정보
export interface TableSorter<T = any> {
  column?: TableColumn<T>;
  field?: keyof T;
  order?: 'ascend' | 'descend' | null;
  columnKey?: string;
}

// 테이블 Props
export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  dataSource?: T[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  pagination?: TablePagination | false;
  rowSelection?: TableRowSelection<T>;
  scroll?: {
    x?: number | string | true;
    y?: number | string;
    scrollToFirstRowOnChange?: boolean;
  };
  size?: 'default' | 'middle' | 'small';
  bordered?: boolean;
  showHeader?: boolean;
  title?: (data: T[]) => React.ReactNode;
  footer?: (data: T[]) => React.ReactNode;
  expandable?: {
    expandedRowRender?: (record: T, index: number) => React.ReactNode;
    expandRowByClick?: boolean;
    expandedRowKeys?: React.Key[];
    onExpand?: (expanded: boolean, record: T) => void;
    onExpandedRowsChange?: (expandedKeys: React.Key[]) => void;
  };
  rowClassName?: string | ((record: T, index: number) => string);
  onRow?: (record: T, index?: number) => {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    [key: string]: any;
  };
  onChange?: (
    pagination: TablePagination,
    filters: Record<string, any>,
    sorter: TableSorter<T> | TableSorter<T>[],
    extra: { currentDataSource: T[]; action: 'paginate' | 'sort' | 'filter' }
  ) => void;
  className?: string;
  style?: React.CSSProperties;
  locale?: {
    emptyText?: React.ReactNode;
    filterTitle?: string;
    filterConfirm?: React.ReactNode;
    filterReset?: React.ReactNode;
    selectAll?: React.ReactNode;
    selectInvert?: React.ReactNode;
    selectionAll?: React.ReactNode;
    sortTitle?: string;
    expand?: string;
    collapse?: string;
    triggerDesc?: string;
    triggerAsc?: string;
    cancelSort?: string;
  };
  empty?: React.ReactNode;
  sticky?: boolean | { offsetHeader?: number; offsetScroll?: number; getContainer?: () => HTMLElement };
}

// 내부 상태 타입들
export interface TableState<T = any> {
  sortedInfo: TableSorter<T> | null;
  filteredInfo: Record<string, any> | null;
  pagination: TablePagination;
  selectedRowKeys: React.Key[];
  selectedRows: T[];
  expandedRowKeys: React.Key[];
}

// 테이블 헤더 셀 Props
export interface TableHeaderCellProps<T = any> {
  column: TableColumn<T>;
  sortedInfo: TableSorter<T> | null;
  onSort: (column: TableColumn<T>) => void;
}

// 테이블 바디 셀 Props
export interface TableBodyCellProps<T = any> {
  column: TableColumn<T>;
  record: T;
  index: number;
  value: any;
}

// 테이블 행 Props
export interface TableRowProps<T = any> {
  record: T;
  index: number;
  columns: TableColumn<T>[];
  rowKey: string;
  selected?: boolean;
  expanded?: boolean;
  rowSelection?: TableRowSelection<T>;
  onSelectChange?: (selected: boolean) => void;
  onExpand?: (expanded: boolean) => void;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

// 페이지네이션 컴포넌트 Props
export interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  onChange?: (page: number, pageSize?: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  pageSizeOptions?: string[];
  size?: 'default' | 'small';
  simple?: boolean;
  hideOnSinglePage?: boolean;
  className?: string;
  style?: React.CSSProperties;
}