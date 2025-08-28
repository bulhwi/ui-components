import styled, { css } from 'styled-components';

// 테이블 크기별 스타일
const sizeStyles = {
  small: css`
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    
    th, td {
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    }
  `,
  middle: css`
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    
    th, td {
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    }
  `,
  default: css`
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    
    th, td {
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
    }
  `,
};

// 메인 테이블 컨테이너
interface StyledTableProps {
  size?: 'default' | 'middle' | 'small';
  bordered?: boolean;
  loading?: boolean;
}

export const StyledTableContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'bordered', 'loading'].includes(prop),
})<StyledTableProps>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  border: ${({ bordered, theme }) => 
    bordered ? `1px solid ${theme.colors.border}` : 'none'};
  
  ${({ loading }) => loading && css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${({ theme }) => `${theme.colors.background}cc`};
      z-index: 10;
    }
  `}
`;

export const StyledTable = styled.table.withConfig({
  shouldForwardProp: (prop) => !['size', 'bordered'].includes(prop),
})<StyledTableProps>`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  
  ${({ size = 'default' }) => sizeStyles[size]}
`;

// 테이블 헤더
export const StyledTableHead = styled.thead`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

// 테이블 바디
export const StyledTableBody = styled.tbody`
  background: ${({ theme }) => theme.colors.background};
`;

// 테이블 헤더 행
export const StyledTableHeaderRow = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

// 테이블 헤더 셀
interface StyledTableHeaderCellProps {
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  fixed?: 'left' | 'right';
}

export const StyledTableHeaderCell = styled.th.withConfig({
  shouldForwardProp: (prop) => !['sortable', 'align', 'width', 'fixed'].includes(prop),
})<StyledTableHeaderCellProps>`
  text-align: ${({ align = 'left' }) => align};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${({ width }) => width && css`
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}
  
  ${({ fixed }) => fixed && css`
    position: sticky;
    z-index: 1;
    ${fixed === 'left' ? 'left: 0;' : 'right: 0;'}
    background: ${({ theme }) => theme.colors.surface};
  `}
  
  ${({ sortable }) => sortable && css`
    cursor: pointer;
    user-select: none;
    
    &:hover {
      background: ${({ theme }) => theme.colors.border};
    }
    
    &:active {
      background: ${({ theme }) => theme.colors.primary}20;
    }
  `}
`;

// 정렬 아이콘 컨테이너
interface SortIconProps {
  order?: 'ascend' | 'descend' | null;
}

export const StyledSortIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['order'].includes(prop),
})<SortIconProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-left: ${({ theme }) => theme.spacing.xs};
  font-size: 10px;
  line-height: 1;
  
  &::before {
    content: '▲';
    color: ${({ order, theme }) => 
      order === 'ascend' ? theme.colors.primary : theme.colors.text.disabled};
    margin-bottom: 2px;
  }
  
  &::after {
    content: '▼';
    color: ${({ order, theme }) => 
      order === 'descend' ? theme.colors.primary : theme.colors.text.disabled};
  }
`;

// 테이블 바디 행
interface StyledTableRowProps {
  selected?: boolean;
  expanded?: boolean;
  clickable?: boolean;
}

export const StyledTableRow = styled.tr.withConfig({
  shouldForwardProp: (prop) => !['selected', 'expanded', 'clickable'].includes(prop),
})<StyledTableRowProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;
  
  ${({ selected, theme }) => selected && css`
    background: ${theme.colors.primary}10;
  `}
  
  ${({ clickable }) => clickable && css`
    cursor: pointer;
  `}
  
  &:hover {
    background: ${({ theme, selected }) => 
      selected ? `${theme.colors.primary}20` : theme.colors.surface};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

// 테이블 바디 셀
interface StyledTableCellProps {
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
}

export const StyledTableCell = styled.td.withConfig({
  shouldForwardProp: (prop) => !['align', 'ellipsis', 'fixed'].includes(prop),
})<StyledTableCellProps>`
  text-align: ${({ align = 'left' }) => align};
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  word-wrap: break-word;
  word-break: break-word;
  
  ${({ ellipsis }) => ellipsis && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
  `}
  
  ${({ fixed }) => fixed && css`
    position: sticky;
    z-index: 1;
    ${fixed === 'left' ? 'left: 0;' : 'right: 0;'}
    background: ${({ theme }) => theme.colors.background};
  `}
`;

// 체크박스 셀
export const StyledCheckboxCell = styled(StyledTableCell)`
  width: 48px;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`} !important;
`;

// 확장 버튼 셀
export const StyledExpandCell = styled(StyledTableCell)`
  width: 48px;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`} !important;
`;

// 확장된 행
export const StyledExpandedRow = styled.tr`
  background: ${({ theme }) => theme.colors.surface};
  
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.lg} !important;
  }
`;

// 로딩 오버레이
export const StyledLoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => `${theme.colors.background}cc`};
  backdrop-filter: blur(2px);
  z-index: 10;
`;

// 빈 상태
export const StyledEmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    opacity: 0.5;
  }
  
  .empty-text {
    font-size: ${({ theme }) => theme.fonts.sizes.md};
  }
`;

// 페이지네이션 컨테이너
export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

// 페이지네이션 버튼
interface PaginationButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const StyledPaginationButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active', 'disabled'].includes(prop),
})<PaginationButtonProps>`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.background};
  color: ${({ active, theme }) => 
    active ? theme.colors.background : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  min-width: 32px;
  height: 32px;
  
  &:hover:not(:disabled) {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

// 페이지 크기 선택
export const StyledPageSizeSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

// 반응형 카드 스타일 (모바일)
export const StyledMobileCard = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const StyledMobileCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledMobileCardLabel = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const StyledMobileCardValue = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  text-align: right;
  flex-grow: 1;
  word-break: break-word;
`;

// 스크롤 컨테이너
interface ScrollContainerProps {
  maxHeight?: number | string;
  maxWidth?: number | string;
}

export const StyledScrollContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['maxHeight', 'maxWidth'].includes(prop),
})<ScrollContainerProps>`
  overflow: auto;
  
  ${({ maxHeight }) => maxHeight && css`
    max-height: ${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight};
  `}
  
  ${({ maxWidth }) => maxWidth && css`
    max-width: ${typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth};
  `}
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    
    &:hover {
      background: ${({ theme }) => theme.colors.text.disabled};
    }
  }
`;