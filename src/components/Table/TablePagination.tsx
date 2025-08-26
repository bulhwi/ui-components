import React from 'react';
import { PaginationProps } from './types';
import {
  StyledPaginationContainer,
  StyledPaginationButton,
  StyledPageSizeSelect,
} from './styles';

export function TablePagination({
  current = 1,
  pageSize = 10,
  total = 0,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
  onChange,
  onShowSizeChange,
  pageSizeOptions = ['10', '20', '50', '100'],
  size = 'default',
  simple = false,
  hideOnSinglePage = false,
  className,
  style,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  // 한 페이지만 있고 hideOnSinglePage가 true인 경우 숨김
  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current && onChange) {
      onChange(page, pageSize);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value, 10);
    if (onShowSizeChange) {
      onShowSizeChange(current, newPageSize);
    }
    if (onChange) {
      onChange(1, newPageSize); // 페이지 크기 변경 시 첫 페이지로
    }
  };

  const renderPageNumbers = () => {
    const pages: React.ReactNode[] = [];
    const maxVisiblePages = 7;
    
    if (simple) {
      return (
        <span style={{ margin: '0 8px', fontSize: '14px' }}>
          {current} / {totalPages}
        </span>
      );
    }

    if (totalPages <= maxVisiblePages) {
      // 모든 페이지 번호 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <StyledPaginationButton
            key={i}
            active={i === current}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </StyledPaginationButton>
        );
      }
    } else {
      // 축약된 페이지 번호 표시
      const startPage = Math.max(1, current - 2);
      const endPage = Math.min(totalPages, current + 2);

      if (startPage > 1) {
        pages.push(
          <StyledPaginationButton
            key={1}
            active={1 === current}
            onClick={() => handlePageChange(1)}
          >
            1
          </StyledPaginationButton>
        );
        
        if (startPage > 2) {
          pages.push(
            <span key="start-ellipsis" style={{ margin: '0 8px' }}>
              ...
            </span>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <StyledPaginationButton
            key={i}
            active={i === current}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </StyledPaginationButton>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <span key="end-ellipsis" style={{ margin: '0 8px' }}>
              ...
            </span>
          );
        }
        
        pages.push(
          <StyledPaginationButton
            key={totalPages}
            active={totalPages === current}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </StyledPaginationButton>
        );
      }
    }

    return pages;
  };

  const renderTotal = () => {
    if (showTotal) {
      return showTotal(total, [startItem, endItem]);
    }
    
    return (
      <span style={{ fontSize: '14px', color: '#666' }}>
        총 {total}개 중 {startItem}-{endItem}개
      </span>
    );
  };

  return (
    <StyledPaginationContainer className={className} style={style}>
      {/* 총 개수 표시 */}
      {renderTotal()}

      {/* 페이지 크기 선택 */}
      {showSizeChanger && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>페이지당</span>
          <StyledPageSizeSelect value={pageSize} onChange={handlePageSizeChange}>
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </StyledPageSizeSelect>
          <span style={{ fontSize: '14px' }}>개</span>
        </div>
      )}

      {/* 페이지네이션 버튼들 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* 이전 페이지 */}
        <StyledPaginationButton
          disabled={current <= 1}
          onClick={() => handlePageChange(current - 1)}
          aria-label="이전 페이지"
        >
          ‹
        </StyledPaginationButton>

        {/* 페이지 번호들 */}
        {renderPageNumbers()}

        {/* 다음 페이지 */}
        <StyledPaginationButton
          disabled={current >= totalPages}
          onClick={() => handlePageChange(current + 1)}
          aria-label="다음 페이지"
        >
          ›
        </StyledPaginationButton>
      </div>

      {/* 빠른 점프 */}
      {showQuickJumper && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>이동:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            style={{
              width: '60px',
              padding: '4px 8px',
              border: '1px solid #d9d9d9',
              borderRadius: '6px',
              fontSize: '14px',
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const page = parseInt((e.target as HTMLInputElement).value, 10);
                if (page >= 1 && page <= totalPages) {
                  handlePageChange(page);
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
          />
        </div>
      )}
    </StyledPaginationContainer>
  );
}