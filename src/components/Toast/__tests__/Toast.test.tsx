import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { ToastProvider, useToast } from '../index';

// Mock 컴포넌트
const TestComponent: React.FC = () => {
  const toast = useToast();

  return (
    <div>
      <button onClick={() => toast.success('Success message')}>Success</button>
      <button onClick={() => toast.error('Error message')}>Error</button>
      <button onClick={() => toast.warning('Warning message')}>Warning</button>
      <button onClick={() => toast.info('Info message')}>Info</button>
      <button onClick={() => toast.dismissAll()}>Dismiss All</button>
      <button 
        onClick={() => toast.success('Action toast', {
          actions: [
            { label: 'Action 1', onClick: () => console.log('Action 1') },
            { label: 'Action 2', onClick: () => console.log('Action 2') }
          ]
        })}
      >
        With Actions
      </button>
      <button 
        onClick={() => toast.info('Permanent toast', { duration: 0 })}
      >
        Permanent
      </button>
    </div>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      <ToastProvider>
        {ui}
      </ToastProvider>
    </ThemeProvider>
  );
};

// Timer 모킹
jest.useFakeTimers();

describe('Toast Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  describe('Basic Toast Display', () => {
    it('success 토스트를 표시해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      expect(screen.getByTestId(/toast-/)).toHaveAttribute('aria-live', 'assertive');
    });

    it('error 토스트를 표시해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Error'));
      
      await waitFor(() => {
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });
    });

    it('warning 토스트를 표시해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Warning'));
      
      await waitFor(() => {
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });
    });

    it('info 토스트를 표시해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Info'));
      
      await waitFor(() => {
        expect(screen.getByText('Info message')).toBeInTheDocument();
      });
    });
  });

  describe('Toast Auto Dismiss', () => {
    it('기본 시간 후 자동으로 사라져야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      });
    });

    it('duration이 0이면 자동으로 사라지지 않아야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Permanent'));
      
      await waitFor(() => {
        expect(screen.getByText('Permanent toast')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(screen.getByText('Permanent toast')).toBeInTheDocument();
    });
  });

  describe('Toast Actions', () => {
    it('액션 버튼들을 렌더링해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('With Actions'));
      
      await waitFor(() => {
        expect(screen.getByText('Action toast')).toBeInTheDocument();
        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('Action 2')).toBeInTheDocument();
      });
    });

    it('액션 버튼 클릭 시 토스트가 닫혀야 함', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('With Actions'));
      
      await waitFor(() => {
        expect(screen.getByText('Action toast')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Action 1'));

      await waitFor(() => {
        expect(screen.queryByText('Action toast')).not.toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Toast Close Button', () => {
    it('닫기 버튼을 클릭하면 토스트가 사라져야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('toast-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toast Progress Bar', () => {
    it('프로그레스 바를 표시해야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        expect(screen.getByTestId('toast-progress')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Toasts', () => {
    it('여러 토스트를 동시에 표시할 수 있어야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      fireEvent.click(screen.getByText('Error'));
      fireEvent.click(screen.getByText('Info'));
      
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
        expect(screen.getByText('Info message')).toBeInTheDocument();
      });
    });

    it('모든 토스트를 한번에 닫을 수 있어야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      fireEvent.click(screen.getByText('Error'));
      
      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByText('Error message')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Dismiss All'));

      await waitFor(() => {
        expect(screen.queryByText('Success message')).not.toBeInTheDocument();
        expect(screen.queryByText('Error message')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('올바른 ARIA 속성을 가져야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        const toast = screen.getByTestId(/toast-/);
        expect(toast).toHaveAttribute('role', 'alert');
        expect(toast).toHaveAttribute('aria-live', 'assertive');
        expect(toast).toHaveAttribute('aria-atomic', 'true');
      });
    });

    it('닫기 버튼에 적절한 레이블이 있어야 함', async () => {
      renderWithProviders(<TestComponent />);
      
      fireEvent.click(screen.getByText('Success'));
      
      await waitFor(() => {
        const closeButton = screen.getByLabelText('토스트 닫기');
        expect(closeButton).toBeInTheDocument();
      });
    });
  });
});