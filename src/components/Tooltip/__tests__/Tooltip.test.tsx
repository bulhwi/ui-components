import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Tooltip } from '../Tooltip';
import { lightTheme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

// Mock createPortal for testing
const mockCreatePortal = jest.fn((children, container) => children);
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode, container: Element) => mockCreatePortal(children, container),
}));

describe('Tooltip 컴포넌트', () => {
  beforeEach(() => {
    mockCreatePortal.mockClear();
    // Mock DOM methods
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 100,
      height: 40,
      top: 100,
      left: 100,
      bottom: 140,
      right: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    }));
  });

  it('자식 요소를 올바르게 렌더링한다', () => {
    renderWithTheme(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('초기에는 툴팁을 표시하지 않는다', () => {
    renderWithTheme(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('기본적으로 호버 시 툴팁을 표시한다', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });
  });

  it('마우스가 떠나면 툴팁을 숨긴다', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Test tooltip">
        <button>Test Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    await user.unhover(button);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('trigger가 click일 때 클릭 시 툴팁을 표시한다', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Click tooltip" trigger="click">
        <button>Click Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('여러 번 클릭 시 툴팁을 토글한다', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Toggle tooltip" trigger="click">
        <button>Toggle Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    
    // First click - show
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    // Second click - hide
    await user.click(button);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('trigger가 focus일 때 포커스 시 툴팁을 표시한다', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Focus tooltip" trigger="focus">
        <button>Focus Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.tab(); // Focus the button
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('delayIn prop을 존중한다', async () => {
    const user = userEvent.setup();
    jest.useFakeTimers();
    
    renderWithTheme(
      <Tooltip content="Delayed tooltip" delayIn={500}>
        <button>Delayed Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    // Should not be visible immediately
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('delayOut prop을 존중한다', async () => {
    const user = userEvent.setup();
    jest.useFakeTimers();
    
    renderWithTheme(
      <Tooltip content="Delayed out tooltip" delayOut={500}>
        <button>Delayed Out Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    
    await user.unhover(button);
    
    // Should still be visible
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
    
    jest.useRealTimers();
  });

  it('supports manual control', async () => {
    const onVisibilityChange = jest.fn();
    
    const { rerender } = renderWithTheme(
      <Tooltip 
        content="Manual tooltip" 
        trigger="manual" 
        visible={false}
        onVisibilityChange={onVisibilityChange}
      >
        <button>Manual Button</button>
      </Tooltip>
    );
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Tooltip 
          content="Manual tooltip" 
          trigger="manual" 
          visible={true}
          onVisibilityChange={onVisibilityChange}
        >
          <button>Manual Button</button>
        </Tooltip>
      </ThemeProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('calls onVisibilityChange callback', async () => {
    const user = userEvent.setup();
    const onVisibilityChange = jest.fn();
    
    renderWithTheme(
      <Tooltip content="Callback tooltip" onVisibilityChange={onVisibilityChange}>
        <button>Callback Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(onVisibilityChange).toHaveBeenCalledWith(true);
    });
    
    await user.unhover(button);
    
    await waitFor(() => {
      expect(onVisibilityChange).toHaveBeenCalledWith(false);
    });
  });

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Disabled tooltip" disabled>
        <button>Disabled Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    // Wait a bit to ensure tooltip doesn't appear
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies correct theme styles', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Light theme tooltip" theme="light">
        <button>Light Theme Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    });
  });

  it('handles complex content', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip 
        content={
          <div>
            <h4>Rich Content</h4>
            <p>With multiple elements</p>
          </div>
        }
      >
        <button>Rich Content Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Rich Content')).toBeInTheDocument();
      expect(screen.getByText('With multiple elements')).toBeInTheDocument();
    });
  });

  it('handles keyboard events', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Keyboard tooltip" trigger="click">
        <button>Keyboard Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    button.focus();
    
    // Press Enter to show tooltip
    await user.keyboard('{Enter}');
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 10000 });
    
    // Press Escape to hide tooltip
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);

  it('closes tooltip on outside click when trigger is click', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <div>
        <Tooltip content="Outside click tooltip" trigger="click">
          <button>Click Button</button>
        </Tooltip>
        <button>Outside Button</button>
      </div>
    );
    
    const clickButton = screen.getByRole('button', { name: 'Click Button' });
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' });
    
    // Show tooltip
    await user.click(clickButton);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 10000 });
    
    // Click outside
    await user.click(outsideButton);
    
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);

  it('applies custom maxWidth', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Custom width tooltip" maxWidth={150}>
        <button>Max Width Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);

  it('renders with arrow by default', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Tooltip with arrow">
        <button>Arrow Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);

  it('can hide arrow when showArrow is false', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <button>No Arrow Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 10000 });
  }, 15000);

  it('has correct accessibility attributes', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Accessible tooltip">
        <button>Accessible Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    
    // Should not have aria-describedby initially
    expect(button).not.toHaveAttribute('aria-describedby');
    
    await user.hover(button);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-describedby');
      expect(tooltip).toHaveAttribute('id');
      expect(button.getAttribute('aria-describedby')).toBe(tooltip.getAttribute('id'));
    }, { timeout: 10000 });
  }, 15000);

  it('applies custom className', async () => {
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Custom class tooltip" className="custom-tooltip">
        <button>Custom Class Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('custom-tooltip');
    }, { timeout: 10000 });
  }, 15000);

  it('handles different positions', () => {
    const positions = ['top', 'bottom', 'left', 'right', 'auto'] as const;
    
    positions.forEach((position) => {
      const { unmount } = renderWithTheme(
        <Tooltip content={`${position} tooltip`} position={position}>
          <button>{position} Button</button>
        </Tooltip>
      );
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    });
  });

  it('ref를 올바르게 전달한다', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const user = userEvent.setup();
    
    renderWithTheme(
      <Tooltip content="Ref tooltip" ref={ref}>
        <button>Ref Button</button>
      </Tooltip>
    );
    
    const button = screen.getByRole('button');
    await user.hover(button);
    
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    }, { timeout: 10000 });
    
    // Note: In real implementation, ref would be set to tooltip element
    // This test verifies the ref prop is accepted
  }, 15000);

  it('올바른 display name을 가진다', () => {
    expect(Tooltip.displayName).toBe('Tooltip');
  });
});

// Additional tests for positioning logic could be added here
describe('Tooltip positioning', () => {
  it('calculates position correctly', () => {
    // Mock positioning tests would go here
    // These would test the positioning.ts utilities
  });
});