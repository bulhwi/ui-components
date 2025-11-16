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
  it('자식 요소를 올바르게 렌더링한다', () => {
    renderWithTheme(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('기본 props를 올바르게 적용한다', () => {
    renderWithTheme(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
  });

  it('다양한 variant를 렌더링한다', () => {
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

  it('다양한 색상을 적용한다', () => {
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

  it('다양한 크기를 적용한다', () => {
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

  it('count prop을 올바르게 처리한다', () => {
    renderWithTheme(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('maxCount를 올바르게 처리한다', () => {
    renderWithTheme(<Badge count={150} maxCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('기본적으로 0 카운트를 숨긴다', () => {
    renderWithTheme(<Badge count={0} data-testid="zero-badge" />);
    const badge = screen.getByTestId('zero-badge');
    expect(badge).toHaveStyle('opacity: 0');
  });

  it('showZero가 true일 때 0 카운트를 표시한다', () => {
    renderWithTheme(<Badge count={0} showZero data-testid="zero-badge" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('dot 배지를 올바르게 렌더링한다', () => {
    renderWithTheme(<Badge dot data-testid="dot-badge" />);
    const badge = screen.getByTestId('dot-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toBeEmptyDOMElement();
  });

  it('visibility prop을 처리한다', () => {
    renderWithTheme(<Badge visible={false} data-testid="invisible-badge">Hidden</Badge>);
    const badge = screen.getByTestId('invisible-badge');
    expect(badge).toHaveStyle('opacity: 0');
  });

  it('닫기 버튼이 있는 closable 배지를 렌더링한다', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Badge closable onClose={handleClose}>Closable</Badge>
    );
    
    expect(screen.getByText('Closable')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove badge' })).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose를 호출한다', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <Badge closable onClose={handleClose}>Closable</Badge>
    );
    
    const closeButton = screen.getByRole('button', { name: 'Remove badge' });
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('닫기 버튼 클릭 시 이벤트 전파를 방지한다', () => {
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

  it('onClick prop을 처리한다', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Badge onClick={handleClick}>Clickable</Badge>
    );
    
    const badge = screen.getByText('Clickable');
    fireEvent.click(badge);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('onClick prop에 따라 올바른 role을 적용한다', () => {
    const { rerender } = renderWithTheme(<Badge>Status Badge</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Badge onClick={() => {}}>Clickable Badge</Badge>
      </ThemeProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('아이콘과 함께 렌더링한다', () => {
    renderWithTheme(
      <Badge icon={<span data-testid="icon">🎉</span>}>With Icon</Badge>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('커스텀 className을 적용한다', () => {
    renderWithTheme(
      <Badge className="custom-badge" data-testid="custom-badge">Custom</Badge>
    );
    
    const badge = screen.getByTestId('custom-badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('ref를 올바르게 전달한다', () => {
    const ref = React.createRef<HTMLSpanElement>();

    renderWithTheme(
      <Badge ref={ref}>Ref Badge</Badge>
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe('Ref Badge');
  });

  it('올바른 display name을 가진다', () => {
    expect(Badge.displayName).toBe('Badge');
  });

  it('클릭 가능한 배지의 키보드 이벤트를 처리한다', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Badge onClick={handleClick}>Clickable</Badge>
    );
    
    const badge = screen.getByRole('button');
    expect(badge).toHaveAttribute('tabIndex', '0');
  });

  it('클릭 불가능한 배지는 tabIndex를 가지지 않는다', () => {
    renderWithTheme(<Badge>Non-clickable</Badge>);
    
    const badge = screen.getByRole('status');
    expect(badge).not.toHaveAttribute('tabIndex');
  });

  it('위치 스타일을 적용한다', () => {
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

  it('count 엣지 케이스를 처리한다', () => {
    // Negative count
    renderWithTheme(<Badge count={-5} data-testid="negative" />);
    expect(screen.getByText('-5')).toBeInTheDocument();
    
    // Very large count
    renderWithTheme(<Badge count={99999} maxCount={999} data-testid="large" />);
    expect(screen.getByText('999+')).toBeInTheDocument();
  });

  it('빈 자식 요소를 우아하게 처리한다', () => {
    renderWithTheme(<Badge data-testid="empty-badge" />);
    const badge = screen.getByTestId('empty-badge');
    expect(badge).toBeInTheDocument();
  });

  describe('접근성', () => {
    it('보이지 않을 때 aria-hidden을 가진다', () => {
      renderWithTheme(<Badge visible={false} data-testid="hidden">Hidden</Badge>);
      const badge = screen.getByTestId('hidden');
      expect(badge).toHaveAttribute('aria-hidden', 'true');
    });

    it('보일 때 aria-hidden을 가지지 않는다', () => {
      renderWithTheme(<Badge visible={true} data-testid="visible">Visible</Badge>);
      const badge = screen.getByTestId('visible');
      expect(badge).toHaveAttribute('aria-hidden', 'false');
    });

    it('닫기 버튼이 적절한 접근성 레이블을 가진다', () => {
      renderWithTheme(<Badge closable onClose={() => {}}>Closable</Badge>);
      const closeButton = screen.getByRole('button', { name: 'Remove badge' });
      expect(closeButton).toHaveAttribute('aria-label', 'Remove badge');
    });
  });
});

describe('BadgeWrapper', () => {
  it('자식 요소와 배지를 올바르게 렌더링한다', () => {
    renderWithTheme(
      <BadgeWrapper badge={{ count: 5 }}>
        <button>Test Button</button>
      </BadgeWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('badge prop이 제공되지 않으면 배지 없이 렌더링한다', () => {
    renderWithTheme(
      <BadgeWrapper>
        <button>Test Button</button>
      </BadgeWrapper>
    );
    
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('inline prop을 올바르게 적용한다', () => {
    renderWithTheme(
      <BadgeWrapper inline data-testid="inline-wrapper">
        <span>Content</span>
      </BadgeWrapper>
    );
    
    const wrapper = screen.getByTestId('inline-wrapper');
    expect(wrapper).toBeInTheDocument();
  });

  it('ref를 올바르게 전달한다', () => {
    const ref = React.createRef<HTMLDivElement>();

    renderWithTheme(
      <BadgeWrapper ref={ref}>
        <span>Content</span>
      </BadgeWrapper>
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('올바른 display name을 가진다', () => {
    expect(BadgeWrapper.displayName).toBe('BadgeWrapper');
  });

  it('badge props를 올바르게 전달한다', () => {
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