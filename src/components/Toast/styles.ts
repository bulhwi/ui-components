import styled, { keyframes, css } from 'styled-components';
import { ToastPosition, ToastType, ToastAnimation } from './types';

// 애니메이션 키프레임
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const bounce = keyframes`
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

// 위치별 애니메이션 선택
const getEnterAnimation = (position: ToastPosition, animation: ToastAnimation) => {
  if (animation === 'fade') return fadeIn;
  if (animation === 'bounce') return bounce;
  
  // slide 애니메이션
  if (position.includes('right')) return slideInRight;
  if (position.includes('left')) return slideInLeft;
  if (position.includes('top')) return slideInTop;
  if (position.includes('bottom')) return slideInBottom;
  
  return slideInRight; // 기본값
};

const getExitAnimation = (position: ToastPosition, animation: ToastAnimation) => {
  if (animation === 'fade' || animation === 'bounce') return fadeOut;
  
  // slide 애니메이션
  if (position.includes('right')) return slideOutRight;
  if (position.includes('left')) return slideOutLeft;
  
  return slideOutRight; // 기본값
};

// 토스트 컨테이너 위치별 스타일
const getContainerPosition = (position: ToastPosition) => {
  const styles = {
    'top-right': css`
      top: 16px;
      right: 16px;
      align-items: flex-end;
    `,
    'top-left': css`
      top: 16px;
      left: 16px;
      align-items: flex-start;
    `,
    'top-center': css`
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    `,
    'bottom-right': css`
      bottom: 16px;
      right: 16px;
      align-items: flex-end;
    `,
    'bottom-left': css`
      bottom: 16px;
      left: 16px;
      align-items: flex-start;
    `,
    'bottom-center': css`
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      align-items: center;
    `,
  };
  
  return styles[position];
};

// 타입별 색상 스타일
const getTypeStyles = (type: ToastType) => css`
  ${({ theme }) => {
    switch (type) {
      case 'success':
        return css`
          background-color: ${theme.colors.success};
          border-color: ${theme.colors.success};
          color: white;
        `;
      case 'error':
        return css`
          background-color: ${theme.colors.error};
          border-color: ${theme.colors.error};
          color: white;
        `;
      case 'warning':
        return css`
          background-color: ${theme.colors.warning};
          border-color: ${theme.colors.warning};
          color: white;
        `;
      case 'info':
        return css`
          background-color: ${theme.colors.info};
          border-color: ${theme.colors.info};
          color: white;
        `;
      default:
        return css`
          background-color: ${theme.colors.surface};
          border-color: ${theme.colors.border};
          color: ${theme.colors.text.primary};
        `;
    }
  }}
`;

// 토스트 컨테이너
export const ToastContainer = styled.div<{ $position: ToastPosition }>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  pointer-events: none;
  max-width: 420px;
  width: auto;
  
  ${({ $position }) => getContainerPosition($position)}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: calc(100vw - 32px);
    left: 16px !important;
    right: 16px !important;
    transform: none !important;
  }
`;

// 개별 토스트
export const ToastWrapper = styled.div<{
  $type: ToastType;
  $position: ToastPosition;
  $animation: ToastAnimation;
  $isExiting?: boolean;
  $animationDelay?: number;
}>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  backdrop-filter: blur(8px);
  pointer-events: auto;
  max-width: 100%;
  min-width: 300px;
  position: relative;
  overflow: hidden;
  
  ${({ $type }) => getTypeStyles($type)}
  
  animation: ${({ $position, $animation, $isExiting }) =>
    $isExiting 
      ? css`${getExitAnimation($position, $animation)} 0.3s ease-in forwards`
      : css`${getEnterAnimation($position, $animation)} 0.4s ease-out forwards`
  };
  
  animation-delay: ${({ $animationDelay }) => $animationDelay || 0}ms;
  
  will-change: transform, opacity;
  
  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease-out;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: auto;
    width: 100%;
  }
`;

// 토스트 아이콘
export const ToastIcon = styled.div<{ $type: ToastType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// 토스트 콘텐츠
export const ToastContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0; // flex 아이템이 축소될 수 있도록
`;

// 토스트 메시지
export const ToastMessage = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  word-break: break-word;
`;

// 토스트 액션들
export const ToastActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// 토스트 액션 버튼
export const ToastActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $variant }) => $variant === 'primary' ? css`
    background-color: rgba(255, 255, 255, 0.2);
    color: inherit;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  ` : css`
    background-color: transparent;
    color: inherit;
    opacity: 0.8;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      opacity: 1;
    }
  `}
  
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// 토스트 닫기 버튼
export const ToastCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  background: none;
  border: none;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  padding: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

// 프로그레스 바
export const ToastProgress = styled.div<{ $progress: number; $type: ToastType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  width: ${({ $progress }) => $progress}%;
  transition: width 0.1s linear;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

// 토스트 아이콘 컴포넌트들
export const SuccessIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export const ErrorIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

export const WarningIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);