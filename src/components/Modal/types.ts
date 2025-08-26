import React from 'react';

export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalAnimation = 'fade' | 'slideUp' | 'slideDown' | 'scale';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  animation?: ModalAnimation;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  preventScroll?: boolean;
  className?: string;
  overlayClassName?: string;
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  centered?: boolean;
  fullHeight?: boolean;
  zIndex?: number;
  onOpen?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
}