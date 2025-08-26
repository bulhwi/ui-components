import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Toast, ToastContextValue, ToastProviderProps, ToastOptions, ToastType } from './types';

// 기본 옵션
const DEFAULT_OPTIONS: Required<ToastOptions> = {
  type: 'info',
  duration: 4000,
  closable: true,
  pauseOnHover: true,
  position: 'top-right',
  animation: 'slide',
  actions: [],
  showIcon: true,
  icon: null,
  id: '',
  showProgress: true,
  role: 'alert',
};

// Toast 액션 타입
type ToastAction =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: { id: string } }
  | { type: 'CLEAR_TOASTS' }
  | { type: 'PAUSE_TOAST'; payload: { id: string; paused: boolean } }
  | { type: 'UPDATE_REMAINING_TIME'; payload: { id: string; remainingTime: number } };

// Toast 리듀서
function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload];
    
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.payload.id);
    
    case 'CLEAR_TOASTS':
      return [];
    
    case 'PAUSE_TOAST':
      return state.map(toast =>
        toast.id === action.payload.id
          ? { ...toast, paused: action.payload.paused }
          : toast
      );
    
    case 'UPDATE_REMAINING_TIME':
      return state.map(toast =>
        toast.id === action.payload.id
          ? { ...toast, remainingTime: action.payload.remainingTime }
          : toast
      );
    
    default:
      return state;
  }
}

// Context 생성
const ToastContext = createContext<ToastContextValue | null>(null);

// 고유 ID 생성기
let toastCounter = 0;
const generateId = (): string => {
  toastCounter += 1;
  return `toast-${toastCounter}-${Date.now()}`;
};

// Toast Provider 컴포넌트
export function ToastProvider({ children, defaultOptions = {}, maxToasts = 10 }: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);
  
  const mergedDefaultOptions = { ...DEFAULT_OPTIONS, ...defaultOptions };

  // 토스트 추가
  const addToast = useCallback((message: string, options: ToastOptions = {}): string => {
    const id = options.id || generateId();
    const toastOptions = { ...mergedDefaultOptions, ...options, id };
    
    const newToast: Toast = {
      message,
      createdAt: Date.now(),
      paused: false,
      remainingTime: toastOptions.duration,
      ...toastOptions,
    };

    dispatch({ type: 'ADD_TOAST', payload: newToast });

    // 최대 토스트 개수 제한
    if (toasts.length >= maxToasts) {
      const oldestToast = toasts[0];
      if (oldestToast) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_TOAST', payload: { id: oldestToast.id } });
        }, 0);
      }
    }

    return id;
  }, [mergedDefaultOptions, toasts.length, maxToasts]);

  // 토스트 제거
  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: { id } });
  }, []);

  // 모든 토스트 제거
  const clearToasts = useCallback(() => {
    dispatch({ type: 'CLEAR_TOASTS' });
  }, []);

  // 토스트 일시정지/재개
  const pauseToast = useCallback((id: string, paused: boolean) => {
    dispatch({ type: 'PAUSE_TOAST', payload: { id, paused } });
  }, []);

  // Context 값
  const contextValue: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    pauseToast,
    defaultOptions: mergedDefaultOptions,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

// Toast Context Hook
export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  
  return context;
}

// Timer Hook - 토스트 자동 제거를 위한 타이머 관리
export function useToastTimer(
  toast: Toast,
  onRemove: (id: string) => void,
  onUpdateTime: (id: string, time: number) => void
) {
  const { id, duration, paused, remainingTime } = toast;

  useEffect(() => {
    if (duration <= 0 || paused) {
      return;
    }

    let startTime = Date.now();
    let timeLeft = remainingTime;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newTimeLeft = Math.max(0, timeLeft - elapsed);
      
      onUpdateTime(id, newTimeLeft);
      
      if (newTimeLeft <= 0) {
        onRemove(id);
        return;
      }
      
      startTime = Date.now();
      timeLeft = newTimeLeft;
    }, 100);

    return () => clearInterval(timer);
  }, [id, duration, paused, remainingTime, onRemove, onUpdateTime]);
}

export { ToastContext };