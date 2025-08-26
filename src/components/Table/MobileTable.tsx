import React from 'react';
import { TableColumn } from './types';
import {
  StyledMobileCard,
  StyledMobileCardRow,
  StyledMobileCardLabel,
  StyledMobileCardValue,
} from './styles';

interface MobileTableProps<T = any> {
  dataSource: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  empty?: React.ReactNode;
  onRowClick?: (record: T, index: number) => void;
}

export function MobileTable<T>({
  dataSource,
  columns,
  loading = false,
  empty,
  onRowClick,
}: MobileTableProps<T>) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '32px' }}>
        로딩 중...
      </div>
    );
  }

  if (dataSource.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px' }}>
        {empty || '데이터가 없습니다'}
      </div>
    );
  }

  const renderCardValue = (column: TableColumn<T>, record: T, index: number) => {
    const value = (record as any)[column.dataIndex];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return value;
  };

  return (
    <div>
      {dataSource.map((record, index) => (
        <StyledMobileCard
          key={index}
          onClick={onRowClick ? () => onRowClick(record, index) : undefined}
          style={{
            cursor: onRowClick ? 'pointer' : 'default',
          }}
        >
          {columns
            .filter(column => !column.key.startsWith('__')) // 내부 컬럼 제외
            .map((column) => (
              <StyledMobileCardRow key={column.key}>
                <StyledMobileCardLabel>
                  {column.title}:
                </StyledMobileCardLabel>
                <StyledMobileCardValue>
                  {renderCardValue(column, record, index)}
                </StyledMobileCardValue>
              </StyledMobileCardRow>
            ))}
        </StyledMobileCard>
      ))}
    </div>
  );
}