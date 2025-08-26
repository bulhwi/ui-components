import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ToastComponentProps } from './types';
import { useToastTimer } from './ToastContext';
import {
  ToastWrapper,
  ToastIcon,
  ToastContent,
  ToastMessage,
  ToastActions,
  ToastActionButton,
  ToastCloseButton,
  ToastProgress,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CloseIcon,
} from './styles';

// 타입별 기본 아이콘
const getDefaultIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <SuccessIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
      return <InfoIcon />;
    default:
      return <InfoIcon />;
  }
};

// 개별 Toast 컴포넌트
export const Toast: React.FC<ToastComponentProps> = ({
  toast,
  onRemove,
  onPause,
  animationDelay = 0,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  
  // 타이머 관리
  useToastTimer(
    toast,
    (id) => {
      setIsExiting(true);
      // 애니메이션 완료 후 제거
      setTimeout(() => onRemove(id), 300);
    },
    (id, time) => {
      // Context에서 남은 시간 업데이트는 이미 처리되므로 여기서는 빈 함수
    }
  );

  // 마우스 이벤트 핸들러
  const handleMouseEnter = useCallback(() => {
    if (toast.pauseOnHover) {
      onPause(toast.id, true);
    }
  }, [toast.id, toast.pauseOnHover, onPause]);

  const handleMouseLeave = useCallback(() => {
    if (toast.pauseOnHover) {
      onPause(toast.id, false);
    }
  }, [toast.id, toast.pauseOnHover, onPause]);

  // 닫기 핸들러
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [toast.id, onRemove]);

  // 액션 핸들러
  const handleAction = useCallback((actionCallback: () => void) => {
    actionCallback();
    handleClose();
  }, [handleClose]);

  // 프로그레스 계산
  const progressPercent = toast.duration > 0 
    ? Math.max(0, Math.min(100, (toast.remainingTime / toast.duration) * 100))
    : 0;

  return (
    <ToastWrapper
      $type={toast.type}
      $position={toast.position}
      $animation={toast.animation}
      $isExiting={isExiting}
      $animationDelay={animationDelay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={toast.role}
      aria-live={toast.role === 'alert' ? 'assertive' : 'polite'}
      aria-atomic="true"
      data-testid={`toast-${toast.id}`}
    >
      {/* 아이콘 */}
      {toast.showIcon && (
        <ToastIcon $type={toast.type}>
          {toast.icon || getDefaultIcon(toast.type)}
        </ToastIcon>
      )}

      {/* 콘텐츠 */}
      <ToastContent>
        <ToastMessage>{toast.message}</ToastMessage>
        
        {/* 액션 버튼들 */}
        {toast.actions && toast.actions.length > 0 && (
          <ToastActions>
            {toast.actions.map((action, index) => (
              <ToastActionButton
                key={index}
                $variant={action.variant || 'secondary'}
                onClick={() => handleAction(action.onClick)}
                data-testid={`toast-action-${index}`}
              >
                {action.label}
              </ToastActionButton>
            ))}
          </ToastActions>
        )}
      </ToastContent>

      {/* 닫기 버튼 */}
      {toast.closable && (
        <ToastCloseButton
          onClick={handleClose}
          aria-label="토스트 닫기"
          data-testid="toast-close"
        >
          <CloseIcon />
        </ToastCloseButton>
      )}

      {/* 프로그레스 바 */}
      {toast.showProgress && toast.duration > 0 && !toast.paused && (
        <ToastProgress
          $progress={progressPercent}
          $type={toast.type}
          data-testid="toast-progress"
        />
      )}
    </ToastWrapper>
  );
};

export default Toast;