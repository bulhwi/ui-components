export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center';
export type ToastAnimation = 'slide' | 'fade' | 'bounce';

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface ToastOptions {
  /** 토스트 타입 */
  type?: ToastType;
  /** 자동 해제 시간 (밀리초) */
  duration?: number;
  /** 수동 닫기 버튼 표시 */
  closable?: boolean;
  /** 마우스 호버 시 타이머 일시정지 */
  pauseOnHover?: boolean;
  /** 토스트 위치 */
  position?: ToastPosition;
  /** 애니메이션 타입 */
  animation?: ToastAnimation;
  /** 액션 버튼들 */
  actions?: ToastAction[];
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 고유 식별자 */
  id?: string;
  /** 프로그레스 바 표시 */
  showProgress?: boolean;
  /** 접근성 역할 */
  role?: 'alert' | 'status';
}

export interface Toast extends Required<ToastOptions> {
  /** 토스트 메시지 */
  message: string;
  /** 생성 시간 */
  createdAt: number;
  /** 일시정지 상태 */
  paused: boolean;
  /** 남은 시간 */
  remainingTime: number;
}

export interface ToastContextValue {
  /** 현재 토스트 목록 */
  toasts: Toast[];
  /** 토스트 추가 */
  addToast: (message: string, options?: ToastOptions) => string;
  /** 토스트 제거 */
  removeToast: (id: string) => void;
  /** 모든 토스트 제거 */
  clearToasts: () => void;
  /** 토스트 일시정지/재개 */
  pauseToast: (id: string, paused: boolean) => void;
  /** 전역 설정 */
  defaultOptions: Required<ToastOptions>;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** 기본 토스트 옵션 */
  defaultOptions?: Partial<ToastOptions>;
  /** 최대 토스트 개수 */
  maxToasts?: number;
}

export interface ToastComponentProps {
  /** 토스트 데이터 */
  toast: Toast;
  /** 제거 콜백 */
  onRemove: (id: string) => void;
  /** 일시정지 콜백 */
  onPause: (id: string, paused: boolean) => void;
  /** 애니메이션 지연 시간 */
  animationDelay?: number;
}

export interface ToastContainerProps {
  /** 토스트 목록 */
  toasts: Toast[];
  /** 토스트 위치 */
  position: ToastPosition;
  /** 제거 콜백 */
  onRemove: (id: string) => void;
  /** 일시정지 콜백 */
  onPause: (id: string, paused: boolean) => void;
}

// Hook 반환 타입
export interface UseToastReturn {
  /** 성공 토스트 표시 */
  success: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  /** 에러 토스트 표시 */
  error: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  /** 경고 토스트 표시 */
  warning: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  /** 정보 토스트 표시 */
  info: (message: string, options?: Omit<ToastOptions, 'type'>) => string;
  /** 커스텀 토스트 표시 */
  toast: (message: string, options?: ToastOptions) => string;
  /** 토스트 제거 */
  dismiss: (id: string) => void;
  /** 모든 토스트 제거 */
  dismissAll: () => void;
  /** 프로미스 기반 토스트 */
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => Promise<T>;
}