import { ReactNode, MouseEvent } from 'react';

export type BadgeVariant = 'filled' | 'outlined' | 'soft' | 'dot';

export type BadgeColor = 
  | 'primary' | 'secondary' 
  | 'success' | 'warning' | 'error' | 'info';

export type BadgeSize = 'small' | 'medium' | 'large';

export type BadgePosition = 
  | 'top-right' | 'top-left' 
  | 'bottom-right' | 'bottom-left';

export interface BadgeProps {
  /** Badge content - can be text, number, or icon */
  children?: ReactNode;
  
  /** Badge variant style */
  variant?: BadgeVariant;
  
  /** Badge color theme */
  color?: BadgeColor;
  
  /** Badge size */
  size?: BadgeSize;
  
  /** Position relative to parent (when used as overlay) */
  position?: BadgePosition;
  
  /** Whether badge should be visible */
  visible?: boolean;
  
  /** Numeric count to display */
  count?: number;
  
  /** Maximum count before showing plus (e.g., 99+) */
  maxCount?: number;
  
  /** Show zero count */
  showZero?: boolean;
  
  /** Whether badge can be dismissed/removed */
  closable?: boolean;
  
  /** Icon to display in badge */
  icon?: ReactNode;
  
  /** Whether to show as dot only (no content) */
  dot?: boolean;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Click handler */
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  
  /** Close/dismiss handler */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

export interface BadgeStyleProps {
  $variant: BadgeVariant;
  $color: BadgeColor;
  $size: BadgeSize;
  $position?: BadgePosition;
  $visible: boolean;
  $closable: boolean;
  $dot: boolean;
  $hasContent: boolean;
}