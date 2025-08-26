import React from 'react';
import { TableColumn, TableSorter, TableRowSelection } from './types';
import {
  StyledTableHeaderRow,
  StyledTableHeaderCell,
  StyledSortIcon,
  StyledCheckboxCell,
  StyledExpandCell,
} from './styles';

interface TableHeaderRowProps<T = any> {
  columns: TableColumn<T>[];
  sortedInfo: TableSorter<T> | null;
  onSort: (column: TableColumn<T>) => void;
  rowSelection?: TableRowSelection<T>;
  expandable?: any;
  dataSource?: T[];
  selectedRowKeys?: React.Key[];
  onSelectAllChange?: (selected: boolean) => void;
}

export function TableHeaderRow<T>({
  columns,
  sortedInfo,
  onSort,
  rowSelection,
  expandable,
  dataSource = [],
  selectedRowKeys = [],
  onSelectAllChange,
}: TableHeaderRowProps<T>) {
  const handleHeaderClick = (column: TableColumn<T>) => {
    if (column.sortable) {
      onSort(column);
    }
  };

  const renderSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const order = sortedInfo?.column === column ? sortedInfo.order : null;
    return <StyledSortIcon order={order} />;
  };

  const renderSelectionHeader = () => {
    if (!rowSelection) return null;

    if (rowSelection.type === 'radio') {
      return <StyledCheckboxCell as="th" />;
    }

    const allSelected = dataSource.length > 0 && selectedRowKeys.length === dataSource.length;
    const indeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length;

    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      if (onSelectAllChange) {
        onSelectAllChange(checked);
      }
      if (rowSelection.onSelectAll) {
        const selectedRows = checked ? dataSource : [];
        rowSelection.onSelectAll(checked, selectedRows, dataSource);
      }
    };

    return (
      <StyledCheckboxCell as="th">
        <input
          type="checkbox"
          checked={allSelected}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate;
          }}
          onChange={handleSelectAllChange}
          aria-label="모든 행 선택"
        />
      </StyledCheckboxCell>
    );
  };

  const renderExpandHeader = () => {
    if (!expandable) return null;

    return (
      <StyledExpandCell as="th">
        {/* 확장 헤더는 보통 비어있음 */}
      </StyledExpandCell>
    );
  };

  return (
    <StyledTableHeaderRow>
      {renderSelectionHeader()}
      {renderExpandHeader()}
      {columns.map((column) => (
        <StyledTableHeaderCell
          key={column.key}
          sortable={column.sortable}
          align={column.align}
          width={column.width}
          fixed={column.fixed}
          onClick={() => handleHeaderClick(column)}
          style={{ cursor: column.sortable ? 'pointer' : 'default' }}
          aria-sort={
            column.sortable
              ? sortedInfo?.column === column
                ? sortedInfo.order === 'ascend' 
                  ? 'ascending' 
                  : 'descending'
                : 'none'
              : undefined
          }
        >
          <span>{column.title}</span>
          {renderSortIcon(column)}
        </StyledTableHeaderCell>
      ))}
    </StyledTableHeaderRow>
  );
}