import React, { useState } from 'react';
import { TableColumn, TableRowSelection } from './types';
import {
  StyledTableRow,
  StyledTableCell,
  StyledCheckboxCell,
  StyledExpandCell,
  StyledExpandedRow,
} from './styles';

interface TableBodyRowProps<T = any> {
  record: T;
  index: number;
  columns: TableColumn<T>[];
  rowKey: string;
  selected?: boolean;
  rowSelection?: TableRowSelection<T>;
  expandable?: any;
  onSelectChange?: (selected: boolean) => void;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onContextMenu?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
}

export function TableBodyRow<T>({
  record,
  index,
  columns,
  rowKey,
  selected = false,
  rowSelection,
  expandable,
  onSelectChange,
  className,
  onClick,
  onDoubleClick,
  onContextMenu,
  onMouseEnter,
  onMouseLeave,
}: TableBodyRowProps<T>) {
  const [expanded, setExpanded] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (onSelectChange) {
      onSelectChange(checked);
    }
    
    if (rowSelection?.onSelect) {
      rowSelection.onSelect(record, checked, [], e.nativeEvent);
    }
  };

  const handleExpandChange = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    
    if (expandable?.onExpand) {
      expandable.onExpand(newExpanded, record);
    }
  };

  const renderCell = (column: TableColumn<T>, value: any) => {
    if (column.render) {
      return column.render(value, record, index);
    }
    return value;
  };

  const renderSelectionCell = () => {
    if (!rowSelection) return null;

    const checkboxProps = rowSelection.getCheckboxProps 
      ? rowSelection.getCheckboxProps(record)
      : {};

    return (
      <StyledCheckboxCell>
        <input
          type={rowSelection.type || 'checkbox'}
          name={checkboxProps.name}
          disabled={checkboxProps.disabled}
          checked={selected}
          onChange={handleSelectChange}
          aria-label={`행 ${index + 1} 선택`}
        />
      </StyledCheckboxCell>
    );
  };

  const renderExpandCell = () => {
    if (!expandable) return null;

    return (
      <StyledExpandCell>
        <button
          onClick={handleExpandChange}
          aria-label={expanded ? '접기' : '펼치기'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          ▶
        </button>
      </StyledExpandCell>
    );
  };

  const renderExpandedContent = () => {
    if (!expandable || !expanded || !expandable.expandedRowRender) {
      return null;
    }

    const colSpan = columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0);

    return (
      <StyledExpandedRow>
        <td colSpan={colSpan}>
          {expandable.expandedRowRender(record, index)}
        </td>
      </StyledExpandedRow>
    );
  };

  return (
    <>
      <StyledTableRow
        selected={selected}
        expanded={expanded}
        clickable={!!onClick}
        className={className}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {renderSelectionCell()}
        {renderExpandCell()}
        {columns.map((column) => {
          const value = (record as any)[column.dataIndex];
          
          return (
            <StyledTableCell
              key={column.key}
              align={column.align}
              ellipsis={column.ellipsis}
              fixed={column.fixed}
            >
              {renderCell(column, value)}
            </StyledTableCell>
          );
        })}
      </StyledTableRow>
      {renderExpandedContent()}
    </>
  );
}