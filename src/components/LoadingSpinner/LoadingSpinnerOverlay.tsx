import React from 'react';
import { LoadingSpinnerOverlayProps } from './types';
import { OverlayContainer } from './styles';
import LoadingSpinner from './LoadingSpinner';

const LoadingSpinnerOverlay: React.FC<LoadingSpinnerOverlayProps> = ({
  show,
  spinnerProps = {},
  opacity = 0.5,
  zIndex = 9999,
  closeOnClick = false,
  onClose,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClick && onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && closeOnClick && onClose) {
      onClose();
    }
  };

  return (
    <OverlayContainer
      $show={show}
      $opacity={opacity}
      $zIndex={zIndex}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role={closeOnClick ? 'button' : undefined}
      tabIndex={closeOnClick ? 0 : -1}
      aria-label={closeOnClick ? '오버레이를 클릭하여 닫기' : undefined}
      data-testid="loading-spinner-overlay"
    >
      <LoadingSpinner
        {...spinnerProps}
        overlay={false} // 오버레이 중첩 방지
      />
    </OverlayContainer>
  );
};

export default LoadingSpinnerOverlay;