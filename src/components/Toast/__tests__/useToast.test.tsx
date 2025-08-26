import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../styles/theme';
import { ToastProvider, useToast } from '../index';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={lightTheme}>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
);

describe('useToast Hook', () => {
  describe('Basic Toast Methods', () => {
    it('success 토스트를 생성해야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.success('Success message');
        expect(typeof id).toBe('string');
        expect(id).toBeTruthy();
      });
    });

    it('error 토스트를 생성해야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.error('Error message');
        expect(typeof id).toBe('string');
        expect(id).toBeTruthy();
      });
    });

    it('warning 토스트를 생성해야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.warning('Warning message');
        expect(typeof id).toBe('string');
        expect(id).toBeTruthy();
      });
    });

    it('info 토스트를 생성해야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.info('Info message');
        expect(typeof id).toBe('string');
        expect(id).toBeTruthy();
      });
    });

    it('커스텀 옵션으로 토스트를 생성해야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.toast('Custom message', {
          type: 'success',
          duration: 5000,
          position: 'top-left',
        });
        expect(typeof id).toBe('string');
        expect(id).toBeTruthy();
      });
    });
  });

  describe('Promise Toast', () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('성공하는 Promise를 처리해야 함', async () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      const successPromise = Promise.resolve('Success data');

      await act(async () => {
        const promise = result.current.promise(successPromise, {
          loading: 'Loading...',
          success: 'Success!',
          error: 'Failed!',
        });

        await expect(promise).resolves.toBe('Success data');
      });
    });

    it('실패하는 Promise를 처리해야 함', async () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      const errorPromise = Promise.reject(new Error('Test error'));

      await act(async () => {
        const promise = result.current.promise(errorPromise, {
          loading: 'Loading...',
          success: 'Success!',
          error: 'Failed!',
        });

        await expect(promise).rejects.toThrow('Test error');
      });
    });

    it('함수형 메시지를 처리해야 함', async () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      const successPromise = Promise.resolve({ message: 'Data loaded' });

      await act(async () => {
        await result.current.promise(successPromise, {
          loading: 'Loading...',
          success: (data) => `Success: ${data.message}`,
          error: (err) => `Error: ${err.message}`,
        });
      });
    });
  });

  describe('Toast Management', () => {
    it('특정 토스트를 제거할 수 있어야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        const id = result.current.success('Test message');
        result.current.dismiss(id);
      });
    });

    it('모든 토스트를 제거할 수 있어야 함', () => {
      const { result } = renderHook(() => useToast(), { wrapper });

      act(() => {
        result.current.success('Message 1');
        result.current.error('Message 2');
        result.current.dismissAll();
      });
    });
  });

  describe('Hook Stability', () => {
    it('메서드들이 안정적인 참조를 유지해야 함', () => {
      const { result, rerender } = renderHook(() => useToast(), { wrapper });

      const firstSuccess = result.current.success;
      const firstError = result.current.error;
      const firstDismiss = result.current.dismiss;

      rerender();

      expect(result.current.success).toBe(firstSuccess);
      expect(result.current.error).toBe(firstError);
      expect(result.current.dismiss).toBe(firstDismiss);
    });
  });
});