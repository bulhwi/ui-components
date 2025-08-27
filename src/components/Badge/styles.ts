import styled, { css } from 'styled-components';
import { BadgeVariant, BadgeColor, BadgeSize, BadgePosition, BadgeStyleProps } from './types';

// Size styles
const getSizeStyles = (size: BadgeSize, hasContent: boolean, dot: boolean) => {
  if (dot) {
    const dotSizes = {
      small: css`
        width: 6px;
        height: 6px;
        min-width: 6px;
      `,
      medium: css`
        width: 8px;
        height: 8px;
        min-width: 8px;
      `,
      large: css`
        width: 10px;
        height: 10px;
        min-width: 10px;
      `,
    };
    return dotSizes[size];
  }

  if (!hasContent) {
    const emptyBadgeSizes = {
      small: css`
        width: 6px;
        height: 6px;
        min-width: 6px;
      `,
      medium: css`
        width: 8px;
        height: 8px;
        min-width: 8px;
      `,
      large: css`
        width: 10px;
        height: 10px;
        min-width: 10px;
      `,
    };
    return emptyBadgeSizes[size];
  }

  const sizes = {
    small: css`
      height: 16px;
      min-width: 16px;
      padding: 0 4px;
      font-size: 10px;
      line-height: 1;
    `,
    medium: css`
      height: 20px;
      min-width: 20px;
      padding: 0 6px;
      font-size: 11px;
      line-height: 1;
    `,
    large: css`
      height: 24px;
      min-width: 24px;
      padding: 0 8px;
      font-size: 12px;
      line-height: 1;
    `,
  };

  return sizes[size];
};

// Color and variant styles
const getColorStyles = (color: BadgeColor, variant: BadgeVariant) => {
  const colorMap = {
    primary: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.primary};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.primary}20;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
      `,
    },
    secondary: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid ${({ theme }) => theme.colors.secondary};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.secondary}20;
        color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid ${({ theme }) => theme.colors.secondary};
      `,
    },
    success: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.success};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.success};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.success};
        border: 1px solid ${({ theme }) => theme.colors.success};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.success}20;
        color: ${({ theme }) => theme.colors.success};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.success};
        border: 1px solid ${({ theme }) => theme.colors.success};
      `,
    },
    warning: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.warning};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.warning};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.warning};
        border: 1px solid ${({ theme }) => theme.colors.warning};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.warning}20;
        color: ${({ theme }) => theme.colors.warning};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.warning};
        border: 1px solid ${({ theme }) => theme.colors.warning};
      `,
    },
    error: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.error};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.error};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.error};
        border: 1px solid ${({ theme }) => theme.colors.error};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.error}20;
        color: ${({ theme }) => theme.colors.error};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.error};
        border: 1px solid ${({ theme }) => theme.colors.error};
      `,
    },
    info: {
      filled: css`
        background-color: ${({ theme }) => theme.colors.info};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.info};
      `,
      outlined: css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.info};
        border: 1px solid ${({ theme }) => theme.colors.info};
      `,
      soft: css`
        background-color: ${({ theme }) => theme.colors.info}20;
        color: ${({ theme }) => theme.colors.info};
        border: 1px solid transparent;
      `,
      dot: css`
        background-color: ${({ theme }) => theme.colors.info};
        border: 1px solid ${({ theme }) => theme.colors.info};
      `,
    },
  };

  return colorMap[color][variant];
};

// Position styles for overlay badges
const getPositionStyles = (position?: BadgePosition) => {
  if (!position) return '';

  const positions = {
    'top-right': css`
      position: absolute;
      top: -8px;
      right: -8px;
      transform: scale(1);
      transform-origin: 100% 0%;
    `,
    'top-left': css`
      position: absolute;
      top: -8px;
      left: -8px;
      transform: scale(1);
      transform-origin: 0% 0%;
    `,
    'bottom-right': css`
      position: absolute;
      bottom: -8px;
      right: -8px;
      transform: scale(1);
      transform-origin: 100% 100%;
    `,
    'bottom-left': css`
      position: absolute;
      bottom: -8px;
      left: -8px;
      transform: scale(1);
      transform-origin: 0% 100%;
    `,
  };

  return positions[position];
};

export const StyledBadge = styled.span<BadgeStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  font-family: ${({ theme }) => theme.fonts.primary};
  white-space: nowrap;
  vertical-align: middle;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  
  /* Size styles */
  ${({ $size, $hasContent, $dot }) => getSizeStyles($size, $hasContent, $dot)}
  
  /* Color and variant styles */
  ${({ $color, $variant }) => getColorStyles($color, $variant)}
  
  /* Position styles */
  ${({ $position }) => getPositionStyles($position)}
  
  /* Visibility */
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  visibility: ${({ $visible }) => $visible ? 'visible' : 'hidden'};
  transform: ${({ $visible }) => $visible ? 'scale(1)' : 'scale(0)'};
  
  /* Hover effects for clickable badges */
  ${({ onClick }) => onClick && css`
    cursor: pointer;
    
    &:hover {
      transform: ${({ $visible }) => $visible ? 'scale(1.05)' : 'scale(0)'};
    }
    
    &:active {
      transform: ${({ $visible }) => $visible ? 'scale(0.95)' : 'scale(0)'};
    }
  `}
  
  /* Focus styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const BadgeContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  margin-left: 4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  color: inherit;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    transform: scale(0.9);
  }
  
  &:focus-visible {
    outline: 1px solid currentColor;
    outline-offset: 1px;
  }
  
  svg {
    width: 10px;
    height: 10px;
  }
`;

// Close icon component는 별도 파일로 분리됨 (icons.tsx)

// Badge wrapper for positioning context
export const BadgeWrapper = styled.div<{ $inline?: boolean }>`
  position: relative;
  display: ${({ $inline }) => $inline ? 'inline-block' : 'block'};
  line-height: 0;
`;