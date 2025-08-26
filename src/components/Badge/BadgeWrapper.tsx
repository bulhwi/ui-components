import React, { forwardRef, ReactNode } from 'react';
import { BadgeWrapper as StyledBadgeWrapper } from './styles';
import { Badge } from './Badge';
import { BadgeProps } from './types';

interface BadgeWrapperProps {
  /** Child element to wrap with badge */
  children: ReactNode;
  
  /** Badge props */
  badge?: BadgeProps;
  
  /** Whether to display inline */
  inline?: boolean;
  
  /** Custom CSS class name */
  className?: string;
}

/**
 * BadgeWrapper component for easily positioning badges relative to other elements.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <BadgeWrapper 
 *   badge={{ count: 5, position: 'top-right', color: 'error' }}
 * >
 *   <Button>Messages</Button>
 * </BadgeWrapper>
 * 
 * // With dot indicator
 * <BadgeWrapper 
 *   badge={{ dot: true, position: 'top-right', color: 'success' }}
 * >
 *   <Avatar src="/user.jpg" />
 * </BadgeWrapper>
 * ```
 */
export const BadgeWrapper = forwardRef<HTMLDivElement, BadgeWrapperProps>(({
  children,
  badge,
  inline = false,
  className,
  ...props
}, ref) => {
  return (
    <StyledBadgeWrapper
      ref={ref}
      className={className}
      $inline={inline}
      {...props}
    >
      {children}
      {badge && <Badge {...badge} />}
    </StyledBadgeWrapper>
  );
});

BadgeWrapper.displayName = 'BadgeWrapper';