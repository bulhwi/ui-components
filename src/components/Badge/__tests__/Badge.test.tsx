import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Badge } from '../Badge';
import { BadgeWrapper } from '../BadgeWrapper';
import { lightTheme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Badge', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    renderWithTheme(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const variants = ['filled', 'outlined', 'soft', 'dot'] as const;
    
    variants.forEach((variant) => {
      const { unmount } = renderWithTheme(
        <Badge variant={variant} data-testid={`badge-${variant}`}>
          {variant !== 'dot' ? variant : undefined}
        </Badge>
      );
      
      const badge = screen.getByTestId(`badge-${variant}`);
      expect(badge).toBeInTheDocument();
      
      unmount();
    });
  });

  it('applies different colors', () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;
    
    colors.forEach((color) => {
      const { unmount } = renderWithTheme(
        <Badge color={color} data-testid={`badge-${color}`}>
          {color}
        </Badge>
      );
      
      const badge = screen.getByTestId(`badge-${color}`);
      expect(badge).toBeInTheDocument();
      
      unmount();
    });
  });

  it('applies different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach((size) => {
      const { unmount } = renderWithTheme(
        <Badge size={size} data-testid={`badge-${size}`}>
          {size}
        </Badge>
      );
      
      const badge = screen.getByTestId(`badge-${size}`);
      expect(badge).toBeInTheDocument();
      
      unmount();
    });
  });

  it('handles count prop correctly', () => {
    renderWithTheme(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles maxCount correctly', () => {
    renderWithTheme(<Badge count={150} maxCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides zero count by default', () => {
    renderWithTheme(<Badge count={0} data-testid="zero-badge" />);
    const badge = screen.getByTestId('zero-badge');
    expect(badge).toHaveStyle('opacity: 0');
  });

  it('shows zero count when showZero is true', () => {
    renderWithTheme(<Badge count={0} showZero data-testid="zero-badge" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders dot badge correctly', () => {
    renderWithTheme(<Badge dot data-testid="dot-badge" />);
    const badge = screen.getByTestId('dot-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toBeEmptyDOMElement();
  });

  it('handles visibility prop', () => {
    renderWithTheme(<Badge visible={false} data-testid="invisible-badge">Hidden</Badge>);
    const badge = screen.getByTestId('invisible-badge');
    expect(badge).toHaveStyle('opacity: 0');
  });

  it('renders closable badge with close button', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Badge closable onClose={handleClose}>Closable</Badge>
    );
    
    expect(screen.getByText('Closable')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove badge' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Badge closable onClose={handleClose}>Closable</Badge>
    );
    
    const closeButton = screen.getByRole('button', { name: 'Remove badge' });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('prevents event propagation on close button click', () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    
    renderWithTheme(
      <Badge closable onClick={handleClick} onClose={handleClose}>Closable</Badge>
    );
    
    const closeButton = screen.getByRole('button', { name: 'Remove badge' });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('handles onClick prop', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Badge onClick={handleClick}>Clickable</Badge>
    );
    
    const badge = screen.getByText('Clickable');
    fireEvent.click(badge);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct role based on onClick prop', () => {
    const { rerender } = renderWithTheme(<Badge>Status Badge</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Badge onClick={() => {}}>Clickable Badge</Badge>
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    renderWithTheme(
      <Badge icon={<span data-testid="icon">🎉</span>}>With Icon</Badge>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(
      <Badge className="custom-badge" data-testid="custom-badge">Custom</Badge>
    );
    
    const badge = screen.getByTestId('custom-badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    
    renderWithTheme(
      <Badge ref={ref}>Ref Badge</Badge>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe('Ref Badge');
  });

  it('has correct display name', () => {
    expect(Badge.displayName).toBe('Badge');
  });

  it('handles keyboard events for clickable badges', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Badge onClick={handleClick}>Clickable</Badge>
    );
    
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('tabIndex', '0');
  });

  it('does not have tabIndex for non-clickable badges', () => {
    renderWithTheme(<Badge>Non-clickable</Badge>);
    
    const badge = screen.getByRole('status');
    expect(badge).not.toHaveAttribute('tabIndex');
  });

  it('applies position styles', () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;
    
    positions.forEach((position) => {
      const { unmount } = renderWithTheme(
        <Badge position={position} data-testid={`badge-${position}`}>
          Positioned
        </Badge>
      );
      
      const badge = screen.getByTestId(`badge-${position}`);
      expect(badge).toBeInTheDocument();
      
      unmount();
    });
  });

  it('handles count edge cases', () => {
    // Negative count
    renderWithTheme(<Badge count={-5} data-testid="negative" />);
    expect(screen.getByText('-5')).toBeInTheDocument();
    
    // Very large count
    renderWithTheme(<Badge count={99999} maxCount={999} data-testid="large" />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  it('handles empty children gracefully', () => {
    renderWithTheme(<Badge data-testid="empty-badge" />);
    const badge = screen.getByTestId('empty-badge');
    expect(badge).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    it('has aria-hidden when not visible', () => {
      renderWithTheme(<Badge visible={false} data-testid="hidden">Hidden</Badge>);
      const badge = screen.getByTestId('hidden');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
    });

    it('does not have aria-hidden when visible', () => {
      renderWithTheme(<Badge visible={true} data-testid="visible">Visible</Badge>);
      const badge = screen.getByTestId('visible');
      expect(badge).toHaveAttribute('aria-hidden', 'false');
    });

    it('close button has proper accessibility label', () => {
      renderWithTheme(<Badge closable onClose={() => {}}>Closable</Badge>);
      const closeButton = screen.getByRole('button', { name: 'Remove badge' });
      expect(closeButton).toHaveAttribute('aria-label', 'Remove badge');
    });
  });
});

describe('BadgeWrapper', () => {
  it('renders children and badge correctly', () => {
    renderWithTheme(
      <BadgeWrapper badge={{ count: 5 }}>
        <button>Test Button</button>
      </BadgeWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders without badge when badge prop is not provided', () => {
    renderWithTheme(
      <BadgeWrapper>
        <button>Test Button</button>
      </BadgeWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('applies inline prop correctly', () => {
    renderWithTheme(
      <BadgeWrapper inline data-testid="inline-wrapper">
        <span>Content</span>
      </BadgeWrapper>
    );
    
    const wrapper = screen.getByTestId('inline-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    
    renderWithTheme(
      <BadgeWrapper ref={ref}>
        <span>Content</span>
      </BadgeWrapper>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('has correct display name', () => {
    expect(BadgeWrapper.displayName).toBe('BadgeWrapper');
  });

  it('passes badge props correctly', () => {
    renderWithTheme(
      <BadgeWrapper 
        badge={{ 
          count: 10, 
          color: 'success', 
          position: 'top-right',
          maxCount: 5
        }}
      >
        <button>Button</button>
      </BadgeWrapper>
    );
    
    expect(screen.getByText('5+')).toBeInTheDocument();
  });
});