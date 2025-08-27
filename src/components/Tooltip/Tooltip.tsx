import React, { forwardRef, useEffect, useState, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps } from './types';
import { useTooltip } from './useTooltip';
import { calculateTooltipPosition, getTooltipDimensions, clampToViewport } from './positioning';
import {
  TooltipPortal,
  TooltipContainer,
  TooltipArrow,
  TooltipWrapper,
  TooltipContent,
  TooltipMeasurement,
} from './styles';

/**
 * Tooltip component for displaying additional information on hover, click, or focus.
 * 
 * Features:
 * - Multiple positioning options with auto-adjustment
 * - Various trigger methods (hover, click, focus, manual)
 * - Theme support (light/dark)
 * - Configurable delays and animations
 * - Portal rendering for proper z-index management
 * - Full accessibility support
 * - Boundary detection and smart positioning
 * 
 * @example
 * ```tsx
 * // Basic hover tooltip
 * <Tooltip content="This is a helpful tooltip">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * 
 * // Click tooltip with custom position
 * <Tooltip 
 *   content="Click tooltip content"
 *   trigger="click"
 *   position="top"
 *   theme="dark"
 * >
 *   <Button>Click me</Button>
 * </Tooltip>
 * 
 * // Manual control
 * <Tooltip
 *   content="Manually controlled"
 *   trigger="manual"
 *   visible={isVisible}
 *   onVisibilityChange={setIsVisible}
 * >
 *   <Button>Controlled</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  theme = 'dark',
  visible,
  delayIn = 0,
  delayOut = 0,
  showArrow = true,
  maxWidth,
  disabled = false,
  zIndex = 9999,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  offset = 8,
  className,
  onVisibilityChange,
  tooltipProps,
  wrapperProps,
  ...rest
}, ref) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [actualPosition, setActualPosition] = useState(position);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const tooltip = useTooltip({
    trigger,
    delayIn,
    delayOut,
    visible,
    disabled,
    closeOnOutsideClick,
    closeOnEscape,
    onVisibilityChange,
  });

  // Create portal root
  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'tooltip-portal-root';
    document.body.appendChild(root);
    setPortalRoot(root);

    return () => {
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
    };
  }, []);

  // Update tooltip position when visible or position changes
  useEffect(() => {
    if (!tooltip.isVisible || !tooltip.targetRef.current || !tooltip.tooltipRef.current) {
      return;
    }

    const updatePosition = () => {
      const targetElement = tooltip.targetRef.current;
      const tooltipElement = tooltip.tooltipRef.current;
      
      if (!targetElement || !tooltipElement) return;

      // Get tooltip dimensions
      const dimensions = getTooltipDimensions(tooltipElement);
      
      // Calculate position
      const result = calculateTooltipPosition(
        targetElement,
        dimensions,
        position,
        offset,
        showArrow
      );

      // Clamp to viewport if needed
      const clampedPosition = clampToViewport(result.position, dimensions);

      setTooltipPosition(clampedPosition);
      setActualPosition(result.actualPosition);
      
      if (result.arrowPosition && showArrow) {
        setArrowPosition(result.arrowPosition);
      }
    };

    // Initial positioning
    updatePosition();

    // Update on scroll/resize
    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [tooltip.isVisible, position, offset, showArrow]);

  // Render target element with tooltip props
  const renderTarget = () => {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ...tooltip.targetProps,
        // Merge existing props
        ref: (node: HTMLElement) => {
          // Handle both ref types
          if (tooltip.targetRef) {
            tooltip.targetRef.current = node;
          }
          
          // Handle original ref
          const originalRef = (children as any).ref;
          if (typeof originalRef === 'function') {
            originalRef(node);
          } else if (originalRef) {
            originalRef.current = node;
          }
        },
        // Merge event handlers
        onMouseEnter: (e: React.MouseEvent) => {
          tooltip.targetProps.onMouseEnter?.();
          (children.props as any).onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent) => {
          tooltip.targetProps.onMouseLeave?.();
          (children.props as any).onMouseLeave?.(e);
        },
        onClick: (e: React.MouseEvent) => {
          tooltip.targetProps.onClick?.();
          (children.props as any).onClick?.(e);
        },
        onFocus: (e: React.FocusEvent) => {
          tooltip.targetProps.onFocus?.();
          (children.props as any).onFocus?.(e);
        },
        onBlur: (e: React.FocusEvent) => {
          tooltip.targetProps.onBlur?.();
          (children.props as any).onBlur?.(e);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          tooltip.targetProps.onKeyDown?.(e);
          (children.props as any).onKeyDown?.(e);
        },
        'aria-describedby': tooltip.targetProps['aria-describedby'],
      });
    }

    // Fallback wrapper for non-React elements
    return (
      <TooltipWrapper {...tooltip.targetProps} {...wrapperProps}>
        {children}
      </TooltipWrapper>
    );
  };

  // Render tooltip content
  const renderTooltip = () => {
    if (!tooltip.isVisible || !portalRoot || disabled) {
      return null;
    }

    return createPortal(
      <TooltipPortal style={{ zIndex }}>
        <TooltipContainer
          ref={(node) => {
            tooltip.tooltipRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={className}
          $position={actualPosition}
          $theme={theme}
          $maxWidth={maxWidth}
          $visible={tooltip.isVisible}
          $showArrow={showArrow}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            ...tooltipProps?.style,
          }}
          {...tooltip.tooltipProps}
          {...tooltipProps}
          {...rest}
        >
          <TooltipContent>
            {content}
          </TooltipContent>
          
          {showArrow && (
            <TooltipArrow
              $position={actualPosition}
              $theme={theme}
              style={{
                left: arrowPosition.x,
                top: arrowPosition.y,
              }}
            />
          )}
        </TooltipContainer>
      </TooltipPortal>,
      portalRoot
    );
  };

  return (
    <>
      {renderTarget()}
      {renderTooltip()}
    </>
  );
});

Tooltip.displayName = 'Tooltip';