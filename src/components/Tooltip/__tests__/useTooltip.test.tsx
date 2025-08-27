import { renderHook, act } from '@testing-library/react';
import { useTooltip } from '../useTooltip';

describe('useTooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    expect(result.current.isVisible).toBe(false);
    expect(result.current.targetRef.current).toBe(null);
    expect(result.current.tooltipRef.current).toBe(null);
    expect(typeof result.current.show).toBe('function');
    expect(typeof result.current.hide).toBe('function');
    expect(typeof result.current.toggle).toBe('function');
  });

  it('shows tooltip immediately when delayIn is 0', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(true);
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
  });

  it('hides tooltip immediately when delayOut is 0', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    // Show first
    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(true);

    // Then hide
    act(() => {
      result.current.hide();
    });

    expect(result.current.isVisible).toBe(false);
    expect(onVisibilityChange).toHaveBeenCalledWith(false);
  });

  it('respects delayIn', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 500,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    act(() => {
      result.current.show();
    });

    // Should not be visible yet
    expect(result.current.isVisible).toBe(false);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isVisible).toBe(true);
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
  });

  it('respects delayOut', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 500,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    // Show tooltip first
    act(() => {
      result.current.show();
    });
    expect(result.current.isVisible).toBe(true);

    // Try to hide
    act(() => {
      result.current.hide();
    });

    // Should still be visible
    expect(result.current.isVisible).toBe(true);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.isVisible).toBe(false);
    expect(onVisibilityChange).toHaveBeenCalledWith(false);
  });

  it('does not show when disabled', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: true,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    act(() => {
      result.current.show();
    });

    expect(result.current.isVisible).toBe(false);
    expect(onVisibilityChange).not.toHaveBeenCalled();
  });

  it('toggles visibility correctly', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'click',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    // Initially hidden
    expect(result.current.isVisible).toBe(false);

    // First toggle - show
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isVisible).toBe(true);

    // Second toggle - hide
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isVisible).toBe(false);
  });

  it('cancels pending timeout when show is called multiple times', () => {
    const onVisibilityChange = jest.fn();
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 500,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
        onVisibilityChange,
      })
    );

    // First show call
    act(() => {
      result.current.show();
    });

    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Second show call should reset timer
    act(() => {
      result.current.show();
    });

    // Advance original time - should not show yet
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current.isVisible).toBe(false);

    // Advance remaining time - should show now
    act(() => {
      jest.advanceTimersByTime(250);
    });
    expect(result.current.isVisible).toBe(true);
  });

  it('returns correct target props for hover trigger', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    const props = result.current.targetProps;
    expect(props).toHaveProperty('onMouseEnter');
    expect(props).toHaveProperty('onMouseLeave');
    expect(props).toHaveProperty('onKeyDown');
    expect(props).toHaveProperty('ref');
  });

  it('returns correct target props for click trigger', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'click',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    const props = result.current.targetProps;
    expect(props).toHaveProperty('onClick');
    expect(props).toHaveProperty('onKeyDown');
    expect(props).toHaveProperty('ref');
  });

  it('returns correct target props for focus trigger', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'focus',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    const props = result.current.targetProps;
    expect(props).toHaveProperty('onFocus');
    expect(props).toHaveProperty('onBlur');
    expect(props).toHaveProperty('onKeyDown');
    expect(props).toHaveProperty('ref');
  });

  it('returns minimal props for manual trigger', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'manual',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    const props = result.current.targetProps;
    expect(props).toHaveProperty('onKeyDown');
    expect(props).toHaveProperty('ref');
    expect(props).not.toHaveProperty('onMouseEnter');
    expect(props).not.toHaveProperty('onClick');
    expect(props).not.toHaveProperty('onFocus');
  });

  it('returns correct tooltip props', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    const props = result.current.tooltipProps;
    expect(props).toHaveProperty('ref');
    expect(props).toHaveProperty('id');
    expect(props).toHaveProperty('role', 'tooltip');
  });

  it('syncs with controlled visibility for manual trigger', () => {
    const { result, rerender } = renderHook(
      ({ visible }) =>
        useTooltip({
          trigger: 'manual',
          delayIn: 0,
          delayOut: 0,
          visible,
          disabled: false,
          closeOnOutsideClick: true,
          closeOnEscape: true,
        }),
      { initialProps: { visible: false } }
    );

    expect(result.current.isVisible).toBe(false);

    rerender({ visible: true });
    expect(result.current.isVisible).toBe(true);

    rerender({ visible: false });
    expect(result.current.isVisible).toBe(false);
  });

  it('sets aria-describedby when tooltip is visible', () => {
    const { result } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 0,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    // Initially no aria-describedby
    expect(result.current.targetProps['aria-describedby']).toBeUndefined();

    // Show tooltip
    act(() => {
      result.current.show();
    });

    // Should have aria-describedby
    expect(result.current.targetProps['aria-describedby']).toBeDefined();
    expect(result.current.targetProps['aria-describedby']).toBe(result.current.tooltipProps.id);
  });

  it('cleans up timeout on unmount', () => {
    const { result, unmount } = renderHook(() =>
      useTooltip({
        trigger: 'hover',
        delayIn: 500,
        delayOut: 0,
        disabled: false,
        closeOnOutsideClick: true,
        closeOnEscape: true,
      })
    );

    // Start showing
    act(() => {
      result.current.show();
    });

    // Unmount before timeout completes
    unmount();

    // This should not throw any errors
    act(() => {
      jest.advanceTimersByTime(500);
    });
  });
});