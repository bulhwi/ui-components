import React, { forwardRef } from 'react';
import { TypographyProps } from './types';
import { StyledTypography } from './styles';

// Default element mapping for semantic HTML
const getDefaultElement = (variant: string): keyof JSX.IntrinsicElements => {
  const elementMap: Record<string, keyof JSX.IntrinsicElements> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
    code: 'pre',
    inlineCode: 'code',
  };

  return elementMap[variant] || 'p';
};

/**
 * Typography component for consistent text display throughout the application.
 * 
 * Features:
 * - Multiple typography variants (h1-h6, body, caption, etc.)
 * - Color options (primary, secondary, disabled, semantic colors)
 * - Text alignment and decoration
 * - Truncation with ellipsis
 * - Multi-line truncation
 * - Responsive font sizing
 * - Code text support
 * 
 * @example
 * ```tsx
 * // Basic heading
 * <Typography variant="h1">Main Title</Typography>
 * 
 * // Colored text with alignment
 * <Typography variant="body1" color="secondary" align="center">
 *   Secondary text content
 * </Typography>
 * 
 * // Truncated text
 * <Typography variant="body2" truncate maxLines={2}>
 *   Long text that will be truncated after 2 lines
 * </Typography>
 * 
 * // Code text
 * <Typography variant="inlineCode">const example = true;</Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  children,
  variant = 'body1',
  color,
  align,
  weight,
  truncate = false,
  maxLines,
  underline = false,
  strikeThrough = false,
  italic = false,
  className,
  as,
  ...props
}, ref) => {
  // Use provided 'as' prop or default semantic element
  const Component = StyledTypography.withComponent(as || getDefaultElement(variant));

  return (
    <Component
      ref={ref}
      className={className}
      $variant={variant}
      $color={color}
      $align={align}
      $weight={weight}
      $truncate={truncate}
      $maxLines={maxLines}
      $underline={underline}
      $strikeThrough={strikeThrough}
      $italic={italic}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';