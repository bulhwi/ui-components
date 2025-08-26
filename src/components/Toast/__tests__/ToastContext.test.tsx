import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { ToastProvider as BaseToastProvider, useToastContext } from '../ToastContext';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={lightTheme}>
    <BaseToastProvider maxToasts={3}>{children}</BaseToastProvider>
  </ThemeProvider>
);

describe('ToastContext', () => {
  describe('Context Provider', () => {
    it('컨텍스트 값을 제공해야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      expect(result.current.toasts).toEqual([]);
      expect(typeof result.current.addToast).toBe('function');
      expect(typeof result.current.removeToast).toBe('function');
      expect(typeof result.current.clearToasts).toBe('function');
      expect(typeof result.current.pauseToast).toBe('function');
      expect(result.current.defaultOptions).toBeTruthy();
    });

    it('Provider 없이 사용하면 에러를 던져야 함', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => {
        renderHook(() => useToastContext());
      }).toThrow('useToastContext must be used within a ToastProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Toast Management', () => {
    it('토스트를 추가할 수 있어야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        const id = result.current.addToast('Test message', { type: 'success' });
        expect(typeof id).toBe('string');
        expect(result.current.toasts).toHaveLength(1);
        expect(result.current.toasts[0].message).toBe('Test message');
        expect(result.current.toasts[0].type).toBe('success');
      });
    });

    it('토스트를 제거할 수 있어야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        const id = result.current.addToast('Test message');
        expect(result.current.toasts).toHaveLength(1);
        
        result.current.removeToast(id);
        expect(result.current.toasts).toHaveLength(0);
      });
    });

    it('모든 토스트를 제거할 수 있어야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        result.current.addToast('Message 1');
        result.current.addToast('Message 2');
        result.current.addToast('Message 3');
        expect(result.current.toasts).toHaveLength(3);
        
        result.current.clearToasts();
        expect(result.current.toasts).toHaveLength(0);
      });
    });

    it('토스트를 일시정지/재개할 수 있어야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        const id = result.current.addToast('Test message');
        const toast = result.current.toasts[0];
        expect(toast.paused).toBe(false);
        
        result.current.pauseToast(id, true);
        const pausedToast = result.current.toasts[0];
        expect(pausedToast.paused).toBe(true);
        
        result.current.pauseToast(id, false);
        const resumedToast = result.current.toasts[0];
        expect(resumedToast.paused).toBe(false);
      });
    });
  });

  describe('Default Options', () => {
    it('기본 옵션을 적용해야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        result.current.addToast('Test message');
        const toast = result.current.toasts[0];
        
        expect(toast.type).toBe('info');
        expect(toast.duration).toBe(4000);
        expect(toast.closable).toBe(true);
        expect(toast.pauseOnHover).toBe(true);
        expect(toast.position).toBe('top-right');
        expect(toast.animation).toBe('slide');
        expect(toast.showIcon).toBe(true);
        expect(toast.showProgress).toBe(true);
      });
    });

    it('커스텀 옵션이 기본 옵션을 덮어써야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        result.current.addToast('Test message', {
          type: 'error',
          duration: 5000,
          position: 'bottom-left',
          closable: false,
        });
        
        const toast = result.current.toasts[0];
        expect(toast.type).toBe('error');
        expect(toast.duration).toBe(5000);
        expect(toast.position).toBe('bottom-left');
        expect(toast.closable).toBe(false);
      });
    });
  });

  describe('Max Toasts Limit', () => {
    it('최대 토스트 개수를 제한해야 함', (done) => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        // maxToasts = 3으로 설정됨
        result.current.addToast('Toast 1');
        result.current.addToast('Toast 2');
        result.current.addToast('Toast 3');
        expect(result.current.toasts).toHaveLength(3);
        
        result.current.addToast('Toast 4');
        
        // 비동기적으로 오래된 토스트가 제거되는지 확인
        setTimeout(() => {
          expect(result.current.toasts).toHaveLength(3);
          expect(result.current.toasts.find(t => t.message === 'Toast 1')).toBeUndefined();
          expect(result.current.toasts.find(t => t.message === 'Toast 4')).toBeTruthy();
          done();
        }, 10);
      });
    });
  });

  describe('Toast ID Generation', () => {
    it('고유한 ID를 생성해야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        const id1 = result.current.addToast('Message 1');
        const id2 = result.current.addToast('Message 2');
        
        expect(id1).not.toBe(id2);
        expect(result.current.toasts[0].id).toBe(id1);
        expect(result.current.toasts[1].id).toBe(id2);
      });
    });

    it('커스텀 ID를 사용할 수 있어야 함', () => {
      const { result } = renderHook(() => useToastContext(), { wrapper });

      act(() => {
        const customId = 'custom-toast-id';
        const id = result.current.addToast('Custom message', { id: customId });
        
        expect(id).toBe(customId);
        expect(result.current.toasts[0].id).toBe(customId);
      });
    });
  });
});