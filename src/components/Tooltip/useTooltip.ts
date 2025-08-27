import { useRef, useState, useEffect, useCallback, useId } from 'react';
import { UseTooltipOptions, UseTooltipReturn } from './types';

export function useTooltip(options: UseTooltipOptions): UseTooltipReturn {
  const {
    trigger,
    delayIn,
    delayOut,
    visible,
    disabled,
    closeOnOutsideClick,
    closeOnEscape,
    onVisibilityChange,
  } = options;

  const [isVisible, setIsVisible] = useState(visible ?? false);
  const targetRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const tooltipId = useId();

  // Show tooltip
  const show = useCallback(() => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delayIn > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        onVisibilityChange?.(true);
      }, delayIn);
    } else {
      setIsVisible(true);
      onVisibilityChange?.(true);
    }
  }, [disabled, delayIn, onVisibilityChange]);

  // Hide tooltip
  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (delayOut > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        onVisibilityChange?.(false);
      }, delayOut);
    } else {
      setIsVisible(false);
      onVisibilityChange?.(false);
    }
  }, [delayOut, onVisibilityChange]);

  // Toggle tooltip
  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  // Handle outside click
  useEffect(() => {
    if (!isVisible || !closeOnOutsideClick || trigger !== 'click') {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isTargetClick = targetRef.current?.contains(target);
      const isTooltipClick = tooltipRef.current?.contains(target);

      if (!isTargetClick && !isTooltipClick) {
        hide();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isVisible, closeOnOutsideClick, trigger, hide]);

  // Handle escape key
  useEffect(() => {
    if (!isVisible || !closeOnEscape) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isVisible, closeOnEscape, hide]);

  // Sync with controlled visibility
  useEffect(() => {
    if (trigger === 'manual' && visible !== undefined) {
      setIsVisible(visible);
    }
  }, [visible, trigger]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Prepare target props based on trigger
  const getTargetProps = () => {
    const baseProps = {
      ref: targetRef,
      'aria-describedby': isVisible ? tooltipId : undefined,
    };

    if (disabled || trigger === 'manual') {
      return baseProps;
    }

    switch (trigger) {
      case 'hover':
        return {
          ...baseProps,
          onMouseEnter: show,
          onMouseLeave: hide,
        };

      case 'focus':
        return {
          ...baseProps,
          onFocus: show,
          onBlur: hide,
        };

      case 'click':
        return {
          ...baseProps,
          onClick: toggle,
        };

      default:
        return baseProps;
    }
  };

  // Handle keyboard events
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (trigger === 'click' || trigger === 'focus') {
          event.preventDefault();
          toggle();
        }
        break;
      case 'Escape':
        if (isVisible) {
          event.preventDefault();
          hide();
        }
        break;
    }
  }, [disabled, trigger, isVisible, toggle, hide]);

  return {
    isVisible,
    targetRef,
    tooltipRef,
    show,
    hide,
    toggle,
    targetProps: {
      ...getTargetProps(),
      onKeyDown: handleKeyDown,
    },
    tooltipProps: {
      ref: tooltipRef,
      id: tooltipId,
      role: 'tooltip',
    },
  };
}