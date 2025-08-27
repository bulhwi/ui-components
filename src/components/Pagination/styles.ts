import styled, { css } from 'styled-components';
import { PaginationSize, PaginationVariant } from './types';

interface PaginationStyleProps {
  $size?: PaginationSize;
  $variant?: PaginationVariant;
  $disabled?: boolean;
}

interface PaginationButtonStyleProps extends PaginationStyleProps {
  $active?: boolean;
  $isEllipsis?: boolean;
  $buttonType?: 'page' | 'prev' | 'next' | 'first' | 'last' | 'ellipsis';
}

interface PaginationInfoStyleProps {
  $size?: PaginationSize;
  $position?: 'top' | 'bottom' | 'left' | 'right';
}

// Size variants
const sizeStyles = {
  sm: css`
    font-size: 12px;
    
    button {
      min-width: 24px;
      height: 24px;
      padding: 0 4px;
      font-size: 12px;
    }
    
    select, input {
      height: 24px;
      font-size: 12px;
      padding: 0 4px;
    }
  `,
  md: css`
    font-size: 14px;
    
    button {
      min-width: 32px;
      height: 32px;
      padding: 0 8px;
      font-size: 14px;
    }
    
    select, input {
      height: 32px;
      font-size: 14px;
      padding: 0 8px;
    }
  `,
  lg: css`
    font-size: 16px;
    
    button {
      min-width: 40px;
      height: 40px;
      padding: 0 12px;
      font-size: 16px;
    }
    
    select, input {
      height: 40px;
      font-size: 16px;
      padding: 0 12px;
    }
  `,
};

// Variant styles
const variantStyles = {
  default: css`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  `,
  simple: css`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
  `,
  compact: css`
    display: flex;
    align-items: center;
    gap: 4px;
  `,
};

// Main pagination container
export const PaginationContainer = styled.div<PaginationStyleProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  user-select: none;
  
  ${({ $size = 'md' }) => sizeStyles[$size]}
  ${({ $variant = 'default' }) => variantStyles[$variant]}
  
  ${({ $disabled }) => $disabled && css`
    opacity: 0.5;
    pointer-events: none;
  `}
`;

// Page navigation container (buttons only)
export const PaginationNav = styled.nav<PaginationStyleProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${({ $variant }) => $variant === 'simple' && css`
    gap: 8px;
  `}
`;

// Individual pagination button
export const PaginationButton = styled.button<PaginationButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
  
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textLight};
    background: ${({ theme }) => theme.colors.backgroundDisabled};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }
  
  ${({ $active, theme }) => $active && css`
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.textInverse};
    font-weight: 600;
    
    &:hover:not(:disabled) {
      background: ${theme.colors.primaryDark};
      border-color: ${theme.colors.primaryDark};
      color: ${theme.colors.textInverse};
    }
  `}
  
  ${({ $isEllipsis }) => $isEllipsis && css`
    cursor: default;
    border: none;
    background: transparent;
    
    &:hover {
      border: none;
      background: transparent;
      color: inherit;
    }
  `}
  
  ${({ $buttonType }) => ($buttonType === 'prev' || $buttonType === 'next') && css`
    padding: 0 12px;
  `}
  
  ${({ $buttonType }) => ($buttonType === 'first' || $buttonType === 'last') && css`
    padding: 0 12px;
  `}
`;

// Pagination info display
export const PaginationInfo = styled.div<PaginationInfoStyleProps>`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 400;
  white-space: nowrap;
  
  ${({ $position }) => $position === 'top' && css`
    margin-bottom: 8px;
  `}
  
  ${({ $position }) => $position === 'bottom' && css`
    margin-top: 8px;
  `}
  
  ${({ $position }) => $position === 'left' && css`
    margin-right: 16px;
  `}
  
  ${({ $position }) => $position === 'right' && css`
    margin-left: 16px;
  `}
`;

// Page size selector container
export const PageSizeSelector = styled.div<PaginationStyleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textLight};
  
  label {
    font-weight: 500;
    white-space: nowrap;
  }
`;

// Page size select element
export const PageSizeSelect = styled.select<PaginationStyleProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textLight};
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }
`;

// Page jump container
export const PageJumper = styled.div<PaginationStyleProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textLight};
  
  label {
    font-weight: 500;
    white-space: nowrap;
  }
`;

// Page jump input
export const PageJumpInput = styled.input<PaginationStyleProps>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  width: 60px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textLight};
    background: ${({ theme }) => theme.colors.backgroundDisabled};
  }
  
  /* Hide number input spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

// Simple pagination container for prev/next only
export const SimplePagination = styled.div<PaginationStyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  
  ${({ $size = 'md' }) => sizeStyles[$size]}
`;

// Simple pagination info in the middle
export const SimplePaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  text-align: center;
  flex: 1;
`;

// Responsive wrapper
export const ResponsivePaginationWrapper = styled.div`
  width: 100%;
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    ${PaginationContainer} {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }
    
    ${PaginationNav} {
      justify-content: center;
    }
    
    ${PageSizeSelector}, ${PageJumper} {
      justify-content: center;
    }
    
    ${PaginationInfo} {
      text-align: center;
    }
  }
  
  /* Small mobile */
  @media (max-width: 480px) {
    ${PaginationButton} {
      min-width: 28px;
      height: 28px;
      font-size: 12px;
      padding: 0 4px;
    }
    
    ${PaginationNav} {
      gap: 2px;
    }
  }
`;

// Loading state overlay
export const PaginationLoading = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(1px);
    z-index: 1;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;