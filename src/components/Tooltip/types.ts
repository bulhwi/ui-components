import { ReactNode } from 'react';

export type TooltipPosition = 
  | 'top' | 'bottom' | 'left' | 'right'
  | 'top-start' | 'top-end'
  | 'bottom-start' | 'bottom-end'
  | 'left-start' | 'left-end'
  | 'right-start' | 'right-end'
  | 'auto';

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'manual';

export type TooltipTheme = 'light' | 'dark';

export interface TooltipPosition2D {
  x: number;
  y: number;
}

export interface TooltipDimensions {
  width: number;
  height: number;
}

export interface TooltipBoundary {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  
  /** Target element to attach tooltip to */
  children: ReactNode;
  
  /** Position of tooltip relative to target */
  position?: TooltipPosition;
  
  /** How tooltip is triggered */
  trigger?: TooltipTrigger;
  
  /** Visual theme */
  theme?: TooltipTheme;
  
  /** Whether tooltip is visible (for manual trigger) */
  visible?: boolean;
  
  /** Delay before showing (ms) */
  delayIn?: number;
  
  /** Delay before hiding (ms) */
  delayOut?: number;
  
  /** Whether to show arrow */
  showArrow?: boolean;
  
  /** Maximum width of tooltip */
  maxWidth?: number;
  
  /** Whether tooltip should be disabled */
  disabled?: boolean;
  
  /** Z-index value */
  zIndex?: number;
  
  /** Whether to close on outside click (for click trigger) */
  closeOnOutsideClick?: boolean;
  
  /** Whether to close on Escape key */
  closeOnEscape?: boolean;
  
  /** Custom offset from target element */
  offset?: number;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Callback when tooltip visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  
  /** Additional HTML attributes for tooltip container */
  tooltipProps?: React.HTMLAttributes<HTMLDivElement>;
  
  /** Additional HTML attributes for target wrapper */
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

export interface TooltipStyleProps {
  $position: TooltipPosition;
  $theme: TooltipTheme;
  $maxWidth?: number;
  $visible: boolean;
  $showArrow: boolean;
}

export interface TooltipArrowProps {
  $position: TooltipPosition;
  $theme: TooltipTheme;
}

export interface UseTooltipOptions {
  trigger: TooltipTrigger;
  delayIn: number;
  delayOut: number;
  visible?: boolean;
  disabled: boolean;
  closeOnOutsideClick: boolean;
  closeOnEscape: boolean;
  onVisibilityChange?: (visible: boolean) => void;
}

export interface UseTooltipReturn {
  isVisible: boolean;
  targetRef: React.RefObject<HTMLElement>;
  tooltipRef: React.RefObject<HTMLDivElement>;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  targetProps: {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    'aria-describedby'?: string;
  };
  tooltipProps: {
    id: string;
    role: string;
  };
}