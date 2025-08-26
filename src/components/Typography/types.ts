import { ReactNode } from 'react';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline'
  | 'code' | 'inlineCode';

export type TypographyColor = 
  | 'primary' | 'secondary' | 'disabled' 
  | 'success' | 'warning' | 'error' | 'info';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps {
  /** Content to display */
  children: ReactNode;
  
  /** Typography variant that defines size and styling */
  variant?: TypographyVariant;
  
  /** Text color */
  color?: TypographyColor;
  
  /** Text alignment */
  align?: TypographyAlign;
  
  /** Font weight */
  weight?: TypographyWeight;
  
  /** Whether to enable text truncation with ellipsis */
  truncate?: boolean;
  
  /** Maximum number of lines before truncation */
  maxLines?: number;
  
  /** Whether to underline text */
  underline?: boolean;
  
  /** Whether to strike through text */
  strikeThrough?: boolean;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Custom HTML element tag */
  as?: keyof JSX.IntrinsicElements;
  
  /** Whether text should be italic */
  italic?: boolean;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

export interface TypographyStyleProps {
  $variant: TypographyVariant;
  $color?: TypographyColor;
  $align?: TypographyAlign;
  $weight?: TypographyWeight;
  $truncate?: boolean;
  $maxLines?: number;
  $underline?: boolean;
  $strikeThrough?: boolean;
  $italic?: boolean;
}