import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from './types';
import {
  StyledOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledCloseButton,
  StyledModalBody,
  StyledModalFooter,
} from './styles';

// 닫기 아이콘 컴포넌트
const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  animation = 'scale',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  preventScroll = true,
  className,
  overlayClassName,
  style,
  overlayStyle,
  children,
  footer,
  header,
  centered = true,
  fullHeight = false,
  zIndex = 1000,
  onOpen,
  onAfterOpen,
  onAfterClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portal 컨테이너 생성 및 정리
  useEffect(() => {
    let container = document.getElementById('modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-root';
      document.body.appendChild(container);
    }
    setPortalContainer(container);

    return () => {
      // 컴포넌트 언마운트 시 컨테이너가 비어있으면 제거
      if (container && container.children.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // 모달 열기/닫기 상태 관리
  useEffect(() => {
    if (isOpen && !isVisible && !isClosing) {
      // 현재 포커스된 요소 저장
      previousActiveElement.current = document.activeElement as HTMLElement;
      setIsVisible(true);
      onOpen?.();
      
      // 애니메이션 완료 후 콜백 호출
      openTimeoutRef.current = setTimeout(() => {
        onAfterOpen?.();
      }, 250);
    } else if (!isOpen && isVisible && !isClosing) {
      setIsClosing(true);
      
      closeTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        
        // 이전 포커스 복원
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
          previousActiveElement.current = null;
        }
        
        onAfterClose?.();
        onClose();
      }, 250);
    }
  }, [isOpen, isVisible, isClosing, onOpen, onAfterOpen, onClose, onAfterClose]);

  // 모달이 열릴 때의 포커스 처리
  useEffect(() => {
    if (isVisible && !isClosing) {
      // 모달에 포커스 설정
      const focusModal = () => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstFocusable = focusableElements[0] as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            modalRef.current.focus();
          }
        }
      };

      // 애니메이션 완료 후 포커스 설정
      const timer = setTimeout(focusModal, 250);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isClosing]);

  // 스크롤 방지
  useEffect(() => {
    if (isVisible && preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isVisible, preventScroll]);

  // ESC 키 처리
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscapeKey && isVisible && !isClosing) {
        event.preventDefault();
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isVisible, isClosing, closeOnEscapeKey]);

  // 포커스 트랩 구현
  useEffect(() => {
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    if (isVisible && !isClosing) {
      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isVisible, isClosing]);

  const handleClose = useCallback(() => {
    if (isClosing || !isVisible) return;
    // 외부에서 onClose 호출하여 상태 변경
    onClose();
  }, [isClosing, isVisible, onClose]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current);
      }
    };
  }, []);

  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      handleClose();
    }
  }, [closeOnOverlayClick, handleClose]);

  const handleCloseButtonClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  // 모달이 보이지 않으면 렌더링하지 않음
  if (!isVisible || !portalContainer) {
    return null;
  }

  const modalContent = (
    <StyledOverlay
      className={overlayClassName}
      style={overlayStyle}
      onClick={handleOverlayClick}
      isClosing={isClosing}
      zIndex={zIndex}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <StyledModal
        ref={modalRef}
        className={className}
        style={style}
        size={size}
        animation={animation}
        isClosing={isClosing}
        centered={centered}
        fullHeight={fullHeight}
        tabIndex={-1}
      >
        {(title || showCloseButton || header) && (
          <StyledModalHeader>
            <div style={{ flex: 1 }}>
              {header || (title && (
                <StyledModalTitle id="modal-title">
                  {title}
                </StyledModalTitle>
              ))}
            </div>
            {showCloseButton && (
              <StyledCloseButton
                onClick={handleCloseButtonClick}
                aria-label="모달 닫기"
                type="button"
              >
                <CloseIcon />
              </StyledCloseButton>
            )}
          </StyledModalHeader>
        )}

        <StyledModalBody>
          {children}
        </StyledModalBody>

        {footer && (
          <StyledModalFooter>
            {footer}
          </StyledModalFooter>
        )}
      </StyledModal>
    </StyledOverlay>
  );

  return createPortal(modalContent, portalContainer);
};