import React from 'react';
import { ToastProvider as BaseToastProvider, useToastContext } from './ToastContext';
import { ToastProviderProps, ToastPosition } from './types';
import ToastContainer from './ToastContainer';

const TOAST_POSITIONS: ToastPosition[] = [
  'top-right',
  'top-left', 
  'top-center',
  'bottom-right',
  'bottom-left',
  'bottom-center',
];

const ToastContainers: React.FC = () => {
  const { toasts, removeToast, pauseToast } = useToastContext();

  return (
    <>
      {TOAST_POSITIONS.map(position => (
        <ToastContainer
          key={position}
          toasts={toasts}
          position={position}
          onRemove={removeToast}
          onPause={pauseToast}
        />
      ))}
    </>
  );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  defaultOptions, 
  maxToasts 
}) => {
  return (
    <BaseToastProvider 
      defaultOptions={defaultOptions} 
      maxToasts={maxToasts}
    >
      {children}
      <ToastContainers />
    </BaseToastProvider>
  );
};

export default ToastProvider;