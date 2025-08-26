import React, { useState, useCallback, useMemo } from 'react';
import { TableProps, TableColumn, TableSorter, TablePagination } from './types';
import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledScrollContainer,
  StyledLoadingOverlay,
  StyledEmptyState,
} from './styles';
import { TableHeaderRow } from './TableHeaderRow';
import { TableBodyRow } from './TableBodyRow';
import { TablePagination as Pagination } from './TablePagination';

function getRowKey<T>(record: T, rowKey: string | ((record: T) => string), index: number): string {
  if (typeof rowKey === 'function') {
    return rowKey(record);
  }
  return (record as any)[rowKey] || `table-row-${index}`;
}

export function Table<T = any>({
  columns,
  dataSource = [],
  rowKey = 'id',
  loading = false,
  pagination = false,
  rowSelection,
  scroll,
  size = 'default',
  bordered = false,
  showHeader = true,
  title,
  footer,
  expandable,
  rowClassName,
  onRow,
  onChange,
  className,
  style,
  locale,
  empty,
  sticky = false,
}: TableProps<T>) {
  // 내부 상태
  const [sortedInfo, setSortedInfo] = useState<TableSorter<T> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    pagination && typeof pagination === 'object' ? pagination.pageSize || 10 : 10
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(
    rowSelection?.selectedRowKeys || []
  );

  // 정렬된 데이터
  const sortedData = useMemo(() => {
    if (!sortedInfo || !sortedInfo.column || !sortedInfo.order) {
      return dataSource;
    }

    const { column, order } = sortedInfo;
    const dataIndex = column.dataIndex as string;

    return [...dataSource].sort((a, b) => {
      const aValue = (a as any)[dataIndex];
      const bValue = (b as any)[dataIndex];

      if (aValue === bValue) return 0;

      let result = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue;
      } else {
        result = String(aValue).localeCompare(String(bValue));
      }

      return order === 'descend' ? -result : result;
    });
  }, [dataSource, sortedInfo]);

  // 페이지네이션된 데이터
  const paginatedData = useMemo(() => {
    if (!pagination) {
      return sortedData;
    }

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, pageSize, pagination]);

  // 정렬 핸들러
  const handleSort = useCallback((column: TableColumn<T>) => {
    if (!column.sortable) return;

    const currentOrder = sortedInfo?.column === column ? sortedInfo.order : null;
    let newOrder: 'ascend' | 'descend' | null;

    if (currentOrder === null) {
      newOrder = 'ascend';
    } else if (currentOrder === 'ascend') {
      newOrder = 'descend';
    } else {
      newOrder = null;
    }

    const newSortedInfo: TableSorter<T> = newOrder 
      ? {
          column,
          field: column.dataIndex,
          order: newOrder,
          columnKey: column.key,
        }
      : {
          column: undefined,
          field: undefined,
          order: null,
          columnKey: undefined,
        };

    setSortedInfo(newSortedInfo);

    if (onChange) {
      const paginationInfo: TablePagination = {
        current: currentPage,
        pageSize,
        total: sortedData.length,
      };
      
      onChange(paginationInfo, {}, newSortedInfo, {
        currentDataSource: paginatedData,
        action: 'sort',
      });
    }
  }, [sortedInfo, currentPage, pageSize, sortedData, paginatedData, onChange]);

  // 페이지네이션 핸들러
  const handlePageChange = useCallback((page: number, size?: number) => {
    const newPageSize = size || pageSize;
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }

    if (onChange) {
      const paginationInfo: TablePagination = {
        current: page,
        pageSize: newPageSize,
        total: sortedData.length,
      };
      
      onChange(paginationInfo, {}, sortedInfo || {}, {
        currentDataSource: paginatedData,
        action: 'paginate',
      });
    }
  }, [pageSize, sortedData, paginatedData, sortedInfo, onChange]);

  // 행 선택 핸들러
  const handleSelectChange = useCallback((rowKeys: React.Key[], selectedRows: T[]) => {
    setSelectedRowKeys(rowKeys);
    if (rowSelection?.onChange) {
      rowSelection.onChange(rowKeys, selectedRows);
    }
  }, [rowSelection]);

  // 전체 선택 핸들러
  const handleSelectAllChange = useCallback((selected: boolean) => {
    const newKeys = selected 
      ? paginatedData.map((record, index) => getRowKey(record, rowKey, index))
      : [];
    const newSelectedRows = selected ? paginatedData : [];
    handleSelectChange(newKeys, newSelectedRows);
  }, [paginatedData, rowKey, handleSelectChange]);

  // 빈 상태 렌더링
  const renderEmpty = () => {
    if (empty) {
      return empty;
    }

    const emptyText = locale?.emptyText || '데이터가 없습니다';
    
    return (
      <StyledEmptyState>
        <div className="empty-icon">📭</div>
        <div className="empty-text">{emptyText}</div>
      </StyledEmptyState>
    );
  };

  // 로딩 상태 렌더링
  const renderLoading = () => (
    <StyledLoadingOverlay>
      <div>로딩 중...</div>
    </StyledLoadingOverlay>
  );

  // 테이블 내용 렌더링
  const renderTable = () => {
    const hasData = paginatedData.length > 0;

    return (
      <StyledTable size={size} bordered={bordered}>
        {showHeader && (
          <StyledTableHead>
            <TableHeaderRow
              columns={columns}
              sortedInfo={sortedInfo}
              onSort={handleSort}
              rowSelection={rowSelection}
              expandable={expandable}
              dataSource={paginatedData}
              selectedRowKeys={selectedRowKeys}
              onSelectAllChange={handleSelectAllChange}
            />
          </StyledTableHead>
        )}
        <StyledTableBody>
          {hasData ? (
            paginatedData.map((record, index) => {
              const key = getRowKey(record, rowKey, index);
              const isSelected = selectedRowKeys.includes(key);
              
              return (
                <TableBodyRow
                  key={key}
                  record={record}
                  index={index}
                  columns={columns}
                  rowKey={key}
                  selected={isSelected}
                  rowSelection={rowSelection}
                  expandable={expandable}
                  onSelectChange={(selected) => {
                    const newKeys = selected
                      ? [...selectedRowKeys, key]
                      : selectedRowKeys.filter(k => k !== key);
                    const newSelectedRows = selected
                      ? [...paginatedData.filter(r => selectedRowKeys.includes(getRowKey(r, rowKey, 0))), record]
                      : paginatedData.filter(r => newKeys.includes(getRowKey(r, rowKey, 0)));
                    handleSelectChange(newKeys, newSelectedRows);
                  }}
                  className={typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName}
                  {...(onRow ? onRow(record, index) : {})}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0)}>
                {renderEmpty()}
              </td>
            </tr>
          )}
        </StyledTableBody>
      </StyledTable>
    );
  };

  // 페이지네이션 정보
  const paginationProps = useMemo(() => {
    if (!pagination) return null;

    const defaultPagination: TablePagination = {
      current: currentPage,
      pageSize,
      total: sortedData.length,
      showSizeChanger: true,
      showQuickJumper: false,
      onChange: handlePageChange,
    };

    if (typeof pagination === 'object') {
      return { ...defaultPagination, ...pagination };
    }

    return defaultPagination;
  }, [pagination, currentPage, pageSize, sortedData.length, handlePageChange]);

  return (
    <StyledTableContainer
      className={className}
      style={style}
      size={size}
      bordered={bordered}
      loading={loading}
    >
      {title && (
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          {title(dataSource)}
        </div>
      )}
      
      <StyledScrollContainer
        maxHeight={scroll?.y}
        maxWidth={scroll?.x === true ? undefined : scroll?.x}
      >
        {renderTable()}
        {loading && renderLoading()}
      </StyledScrollContainer>

      {paginationProps && !paginationProps.hideOnSinglePage && (
        <Pagination {...paginationProps} />
      )}

      {footer && (
        <div style={{ padding: '16px', borderTop: '1px solid #f0f0f0' }}>
          {footer(dataSource)}
        </div>
      )}
    </StyledTableContainer>
  );
}