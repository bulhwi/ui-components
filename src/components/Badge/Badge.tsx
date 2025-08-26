import React, { forwardRef } from 'react';
import { BadgeProps } from './types';
import { StyledBadge, BadgeContent, CloseButton, CloseIcon } from './styles';

/**
 * Badge component for displaying status indicators, counts, and labels.
 * 
 * Features:
 * - Multiple variants (filled, outlined, soft, dot)
 * - Color themes (primary, secondary, success, warning, error, info)
 * - Size options (small, medium, large)
 * - Position support for overlay badges
 * - Count display with max value
 * - Closable badges
 * - Icon support
 * - Dot-only display
 * 
 * @example
 * ```tsx
 * // Basic badge
 * <Badge color="primary">New</Badge>
 * 
 * // Count badge
 * <Badge count={5} maxCount={99} />
 * 
 * // Closable badge
 * <Badge closable onClose={handleClose}>Removable</Badge>
 * 
 * // Dot badge
 * <Badge dot color="success" />
 * 
 * // Positioned overlay badge
 * <div style={{ position: 'relative' }}>
 *   <Button>Messages</Button>
 *   <Badge count={3} position="top-right" />
 * </div>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  children,
  variant = 'filled',
  color = 'primary',
  size = 'medium',
  position,
  visible = true,
  count,
  maxCount = 99,
  showZero = false,
  closable = false,
  icon,
  dot = false,
  className,
  onClick,
  onClose,
  ...props
}, ref) => {
  // Determine what content to display
  const getDisplayContent = () => {
    // If dot is true, show no content
    if (dot) {
      return null;
    }

    // If count is provided, use count logic
    if (typeof count === 'number') {
      if (count === 0 && !showZero) {
        return null;
      }
      
      if (count > maxCount) {
        return `${maxCount}+`;
      }
      
      return count.toString();
    }

    // Otherwise use provided children
    return children;
  };

  const displayContent = getDisplayContent();
  const hasContent = displayContent !== null && displayContent !== undefined;

  // Determine visibility
  const shouldShow = visible && (
    dot || 
    hasContent || 
    (typeof count === 'number' && (count > 0 || showZero))
  );

  // Handle close click
  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose?.(event);
  };

  return (
    <StyledBadge
      ref={ref}
      className={className}
      $variant={variant}
      $color={color}
      $size={size}
      $position={position}
      $visible={shouldShow}
      $closable={closable}
      $dot={dot}
      $hasContent={hasContent}
      onClick={onClick}
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
      aria-hidden={!shouldShow}
      {...props}
    >
      {!dot && hasContent && (
        <BadgeContent>
          {icon && <span>{icon}</span>}
          <span>{displayContent}</span>
          {closable && (
            <CloseButton
              type="button"
              onClick={handleCloseClick}
              aria-label="Remove badge"
            >
              <CloseIcon />
            </CloseButton>
          )}
        </BadgeContent>
      )}
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';