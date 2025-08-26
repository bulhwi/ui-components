import { useCallback } from 'react';
import { useToastContext } from './ToastContext';
import { ToastOptions, UseToastReturn } from './types';

export function useToast(): UseToastReturn {
  const { addToast, removeToast, clearToasts } = useToastContext();

  const success = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'success' });
  }, [addToast]);

  const error = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'error' });
  }, [addToast]);

  const warning = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'warning' });
  }, [addToast]);

  const info = useCallback((message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'info' });
  }, [addToast]);

  const toast = useCallback((message: string, options?: ToastOptions) => {
    return addToast(message, options);
  }, [addToast]);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, [removeToast]);

  const dismissAll = useCallback(() => {
    clearToasts();
  }, [clearToasts]);

  const promise = useCallback(async <T>(
    promiseValue: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ): Promise<T> => {
    const loadingId = addToast(options.loading, { 
      type: 'info', 
      duration: 0,
      showProgress: false 
    });

    try {
      const data = await promiseValue;
      removeToast(loadingId);
      
      const successMessage = typeof options.success === 'function' 
        ? options.success(data) 
        : options.success;
      
      addToast(successMessage, { type: 'success' });
      return data;
    } catch (err) {
      removeToast(loadingId);
      
      const errorMessage = typeof options.error === 'function' 
        ? options.error(err) 
        : options.error;
      
      addToast(errorMessage, { type: 'error' });
      throw err;
    }
  }, [addToast, removeToast]);

  return {
    success,
    error,
    warning,
    info,
    toast,
    dismiss,
    dismissAll,
    promise,
  };
}

export default useToast;