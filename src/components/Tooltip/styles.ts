import styled, { css, keyframes } from 'styled-components';
import { TooltipStyleProps, TooltipArrowProps, TooltipPosition } from './types';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

// Get theme styles
const getThemeStyles = (theme: 'light' | 'dark') => {
  const themes = {
    light: css`
      background-color: #ffffff;
      color: #374151;
      border: 1px solid #e5e7eb;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    `,
    dark: css`
      background-color: #1f2937;
      color: #f9fafb;
      border: 1px solid #374151;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    `,
  };
  
  return themes[theme];
};

// Portal wrapper for tooltip
export const TooltipPortal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
`;

// Main tooltip container
export const TooltipContainer = styled.div<TooltipStyleProps>`
  position: absolute;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
  word-wrap: break-word;
  pointer-events: auto;
  z-index: 9999;
  
  /* Theme styles */
  ${({ $theme }) => getThemeStyles($theme)}
  
  /* Max width */
  ${({ $maxWidth }) => $maxWidth && css`
    max-width: ${$maxWidth}px;
  `}
  
  /* Default max width */
  ${({ $maxWidth }) => !$maxWidth && css`
    max-width: 320px;
  `}
  
  /* Visibility and animation */
  ${({ $visible }) => $visible ? css`
    animation: ${fadeIn} 0.15s ease-out forwards;
  ` : css`
    animation: ${fadeOut} 0.15s ease-in forwards;
  `}
  
  /* Prevent text selection */
  user-select: none;
  
  /* Ensure readable text */
  white-space: normal;
`;

// Arrow component
export const TooltipArrow = styled.div<TooltipArrowProps>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  
  ${({ $position, $theme }) => getArrowStyles($position, $theme)}
`;

// Arrow styles based on position and theme
const getArrowStyles = (position: TooltipPosition, theme: 'light' | 'dark') => {
  const arrowSize = 6;
  const borderColor = theme === 'light' ? '#e5e7eb' : '#374151';
  const backgroundColor = theme === 'light' ? '#ffffff' : '#1f2937';
  
  // Base arrow styles for each position
  const baseStyles = {
    top: css`
      border-left: ${arrowSize}px solid transparent;
      border-right: ${arrowSize}px solid transparent;
      border-top: ${arrowSize}px solid ${backgroundColor};
      border-bottom: none;
      
      &::before {
        content: '';
        position: absolute;
        left: -${arrowSize}px;
        top: -${arrowSize + 1}px;
        border-left: ${arrowSize}px solid transparent;
        border-right: ${arrowSize}px solid transparent;
        border-top: ${arrowSize}px solid ${borderColor};
        border-bottom: none;
      }
    `,
    bottom: css`
      border-left: ${arrowSize}px solid transparent;
      border-right: ${arrowSize}px solid transparent;
      border-bottom: ${arrowSize}px solid ${backgroundColor};
      border-top: none;
      
      &::before {
        content: '';
        position: absolute;
        left: -${arrowSize}px;
        bottom: -${arrowSize + 1}px;
        border-left: ${arrowSize}px solid transparent;
        border-right: ${arrowSize}px solid transparent;
        border-bottom: ${arrowSize}px solid ${borderColor};
        border-top: none;
      }
    `,
    left: css`
      border-top: ${arrowSize}px solid transparent;
      border-bottom: ${arrowSize}px solid transparent;
      border-left: ${arrowSize}px solid ${backgroundColor};
      border-right: none;
      
      &::before {
        content: '';
        position: absolute;
        top: -${arrowSize}px;
        left: -${arrowSize + 1}px;
        border-top: ${arrowSize}px solid transparent;
        border-bottom: ${arrowSize}px solid transparent;
        border-left: ${arrowSize}px solid ${borderColor};
        border-right: none;
      }
    `,
    right: css`
      border-top: ${arrowSize}px solid transparent;
      border-bottom: ${arrowSize}px solid transparent;
      border-right: ${arrowSize}px solid ${backgroundColor};
      border-left: none;
      
      &::before {
        content: '';
        position: absolute;
        top: -${arrowSize}px;
        right: -${arrowSize + 1}px;
        border-top: ${arrowSize}px solid transparent;
        border-bottom: ${arrowSize}px solid transparent;
        border-right: ${arrowSize}px solid ${backgroundColor};
        border-left: none;
      }
    `,
  };

  // Determine the arrow direction based on position
  const getArrowDirection = (pos: TooltipPosition) => {
    if (pos.startsWith('top')) return 'bottom';
    if (pos.startsWith('bottom')) return 'top';
    if (pos.startsWith('left')) return 'right';
    if (pos.startsWith('right')) return 'left';
    return 'bottom';
  };

  const direction = getArrowDirection(position);
  return baseStyles[direction as keyof typeof baseStyles];
};

// Target wrapper
export const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

// Content wrapper for complex content
export const TooltipContent = styled.div`
  /* Ensure proper text flow */
  text-align: left;
  
  /* Handle various content types */
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Handle lists */
  ul, ol {
    margin: 0;
    padding-left: 16px;
  }
  
  /* Handle code */
  code {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 0.875em;
  }
  
  /* Handle links */
  a {
    color: inherit;
    text-decoration: underline;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

// Helper for measuring tooltip dimensions
export const TooltipMeasurement = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
  top: -9999px;
  left: -9999px;
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
  max-width: 320px;
  word-wrap: break-word;
  white-space: normal;
`;