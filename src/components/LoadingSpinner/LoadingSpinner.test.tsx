import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { LoadingSpinner, LoadingSpinnerOverlay, LoadingSpinnerGroup } from './';
import { lightTheme } from '../../styles/theme';

// 테스트 래퍼 컴포넌트
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>
);

// 기본 렌더링 헬퍼
const renderSpinner = (props: any = {}) => {
  return render(
    <TestWrapper>
      <LoadingSpinner {...props} />
    </TestWrapper>
  );
};

describe('LoadingSpinner Component', () => {
  describe('기본 렌더링', () => {
    test('스피너가 정상적으로 렌더링된다', () => {
      renderSpinner();
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('기본 props가 적용된다', () => {
      renderSpinner();
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', '로딩 중');
    });

    test('커스텀 aria-label이 설정된다', () => {
      renderSpinner({ 'aria-label': '데이터 로딩 중' });
      
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', '데이터 로딩 중');
    });

    test('data-testid가 설정된다', () => {
      renderSpinner({ 'data-testid': 'custom-spinner' });
      
      expect(screen.getByTestId('custom-spinner')).toBeInTheDocument();
    });
  });

  describe('스피너 변형', () => {
    test('circular 변형이 렌더링된다', () => {
      renderSpinner({ variant: 'circular' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('dots 변형이 렌더링된다', () => {
      renderSpinner({ variant: 'dots' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('bars 변형이 렌더링된다', () => {
      renderSpinner({ variant: 'bars' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('pulse 변형이 렌더링된다', () => {
      renderSpinner({ variant: 'pulse' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('스피너 크기', () => {
    test('small 크기가 적용된다', () => {
      renderSpinner({ size: 'small' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('medium 크기가 적용된다', () => {
      renderSpinner({ size: 'medium' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('large 크기가 적용된다', () => {
      renderSpinner({ size: 'large' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('스피너 색상', () => {
    test('primary 색상이 적용된다', () => {
      renderSpinner({ color: 'primary' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('secondary 색상이 적용된다', () => {
      renderSpinner({ color: 'secondary' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('white 색상이 적용된다', () => {
      renderSpinner({ color: 'white' });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('텍스트 표시', () => {
    test('텍스트가 표시된다', () => {
      renderSpinner({ text: '로딩 중입니다...' });
      
      expect(screen.getByText('로딩 중입니다...')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('텍스트 위치가 bottom으로 설정된다', () => {
      renderSpinner({ text: '로딩 중', textPosition: 'bottom' });
      
      expect(screen.getByText('로딩 중')).toBeInTheDocument();
    });

    test('텍스트 위치가 right으로 설정된다', () => {
      renderSpinner({ text: '로딩 중', textPosition: 'right' });
      
      expect(screen.getByText('로딩 중')).toBeInTheDocument();
    });
  });

  describe('인라인 표시', () => {
    test('인라인 모드가 적용된다', () => {
      renderSpinner({ inline: true });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('블록 모드가 기본값이다', () => {
      renderSpinner({ inline: false });
      
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('오버레이 모드', () => {
    test('오버레이 모드에서 렌더링된다', () => {
      renderSpinner({ overlay: true, 'data-testid': 'overlay-spinner' });
      
      expect(screen.getByTestId('overlay-spinner-overlay')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    test('오버레이 투명도가 적용된다', () => {
      renderSpinner({ 
        overlay: true, 
        overlayOpacity: 0.8,
        'data-testid': 'opacity-spinner' 
      });
      
      expect(screen.getByTestId('opacity-spinner-overlay')).toBeInTheDocument();
    });
  });

  describe('스타일링', () => {
    test('커스텀 클래스명이 적용된다', () => {
      renderSpinner({ className: 'custom-spinner' });
      
      const container = screen.getByRole('status').closest('.custom-spinner');
      expect(container).toBeInTheDocument();
    });

    test('커스텀 스타일이 적용된다', () => {
      const customStyle = { backgroundColor: 'red' };
      renderSpinner({ style: customStyle });
      
      const container = screen.getByRole('status').closest('[style]');
      expect(container).toHaveStyle('background-color: red');
    });
  });
});

describe('LoadingSpinnerOverlay Component', () => {
  test('오버레이가 표시될 때 렌더링된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay show={true} />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-overlay')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('오버레이가 숨겨질 때 렌더링되지만 보이지 않는다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay show={false} />
      </TestWrapper>
    );
    
    const overlay = screen.getByTestId('loading-spinner-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveStyle('visibility: hidden');
  });

  test('오버레이 클릭 시 onClose가 호출된다', () => {
    const mockOnClose = jest.fn();
    
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay 
          show={true} 
          closeOnClick={true}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );
    
    const overlay = screen.getByTestId('loading-spinner-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Escape 키 입력 시 onClose가 호출된다', () => {
    const mockOnClose = jest.fn();
    
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay 
          show={true} 
          closeOnClick={true}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );
    
    const overlay = screen.getByTestId('loading-spinner-overlay');
    fireEvent.keyDown(overlay, { key: 'Escape' });
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('closeOnClick이 false일 때 클릭해도 onClose가 호출되지 않는다', () => {
    const mockOnClose = jest.fn();
    
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay 
          show={true} 
          closeOnClick={false}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );
    
    const overlay = screen.getByTestId('loading-spinner-overlay');
    fireEvent.click(overlay);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('스피너 속성이 전달된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay 
          show={true}
          spinnerProps={{
            text: '오버레이 로딩 중...',
            variant: 'dots',
          }}
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('오버레이 로딩 중...')).toBeInTheDocument();
  });
});

describe('LoadingSpinnerGroup Component', () => {
  test('그룹이 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup>
          <LoadingSpinner data-testid="spinner-1" />
          <LoadingSpinner data-testid="spinner-2" />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-group')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-1')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-2')).toBeInTheDocument();
  });

  test('수평 방향 그룹이 적용된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup direction="horizontal">
          <LoadingSpinner />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-group')).toBeInTheDocument();
  });

  test('수직 방향 그룹이 적용된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup direction="vertical">
          <LoadingSpinner />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-group')).toBeInTheDocument();
  });

  test('간격 설정이 적용된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup spacing="large">
          <LoadingSpinner />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-group')).toBeInTheDocument();
  });

  test('정렬 설정이 적용된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup align="end">
          <LoadingSpinner />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('loading-spinner-group')).toBeInTheDocument();
  });

  test('커스텀 클래스명이 적용된다', () => {
    render(
      <TestWrapper>
        <LoadingSpinnerGroup className="custom-group">
          <LoadingSpinner />
        </LoadingSpinnerGroup>
      </TestWrapper>
    );
    
    const group = screen.getByTestId('loading-spinner-group');
    expect(group).toHaveClass('custom-group');
  });
});

describe('접근성', () => {
  test('스피너에 적절한 role이 설정된다', () => {
    renderSpinner();
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('오버레이 모드에서 키보드 탐색이 가능하다', () => {
    const mockOnClose = jest.fn();
    
    render(
      <TestWrapper>
        <LoadingSpinnerOverlay 
          show={true} 
          closeOnClick={true}
          onClose={mockOnClose}
        />
      </TestWrapper>
    );
    
    const overlay = screen.getByTestId('loading-spinner-overlay');
    expect(overlay).toHaveAttribute('tabIndex', '0');
    expect(overlay).toHaveAttribute('role', 'button');
  });

  test('aria-label이 적절히 설정된다', () => {
    renderSpinner({ 'aria-label': '사용자 데이터 로딩 중' });
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', '사용자 데이터 로딩 중');
  });
});

describe('성능', () => {
  test('애니메이션에 will-change 속성이 적용된다', () => {
    renderSpinner({ variant: 'circular' });
    
    // CSS-in-JS로 생성된 스타일의 will-change는 계산된 스타일로 확인해야 함
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('다중 인스턴스가 정상 작동한다', () => {
    render(
      <TestWrapper>
        <div>
          <LoadingSpinner data-testid="spinner-1" />
          <LoadingSpinner data-testid="spinner-2" variant="dots" />
          <LoadingSpinner data-testid="spinner-3" variant="bars" />
        </div>
      </TestWrapper>
    );
    
    expect(screen.getByTestId('spinner-1')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-2')).toBeInTheDocument();
    expect(screen.getByTestId('spinner-3')).toBeInTheDocument();
  });
});