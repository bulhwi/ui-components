import React from 'react';
import { createPortal } from 'react-dom';
import { ToastContainerProps } from './types';
import { ToastContainer as StyledContainer } from './styles';
import Toast from './Toast';

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position,
  onRemove,
  onPause,
}) => {
  if (toasts.length === 0) {
    return null;
  }

  const positionedToasts = toasts.filter(toast => toast.position === position);
  
  if (positionedToasts.length === 0) {
    return null;
  }

  return createPortal(
    <StyledContainer $position={position}>
      {positionedToasts.map((toast, index) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
          onPause={onPause}
          animationDelay={index * 100}
        />
      ))}
    </StyledContainer>,
    document.body
  );
};

export default ToastContainer;