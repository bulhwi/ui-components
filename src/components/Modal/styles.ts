import styled, { css, keyframes } from 'styled-components';
import { ModalSize, ModalAnimation } from './types';

// 애니메이션 키프레임
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUpIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUpOut = keyframes`
  from { 
    opacity: 1;
    transform: translateY(0);
  }
  to { 
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const slideDownIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDownOut = keyframes`
  from { 
    opacity: 1;
    transform: translateY(0);
  }
  to { 
    opacity: 0;
    transform: translateY(20px);
  }
`;

const scaleIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  from { 
    opacity: 1;
    transform: scale(1);
  }
  to { 
    opacity: 0;
    transform: scale(0.95);
  }
`;

// 크기별 스타일
const sizeStyles = {
  small: css`
    max-width: 400px;
    max-height: 300px;
  `,
  medium: css`
    max-width: 600px;
    max-height: 500px;
  `,
  large: css`
    max-width: 800px;
    max-height: 600px;
  `,
  fullscreen: css`
    max-width: 100vw;
    max-height: 100vh;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  `,
};

// 애니메이션별 스타일 함수
const getAnimationStyles = (animation: ModalAnimation, isClosing?: boolean) => {
  switch (animation) {
    case 'fade':
      return css`
        animation: ${isClosing ? fadeOut : fadeIn} 0.2s ease-out;
      `;
    case 'slideUp':
      return css`
        animation: ${isClosing ? slideUpOut : slideUpIn} 0.3s ease-out;
      `;
    case 'slideDown':
      return css`
        animation: ${isClosing ? slideDownOut : slideDownIn} 0.3s ease-out;
      `;
    case 'scale':
      return css`
        animation: ${isClosing ? scaleOut : scaleIn} 0.2s ease-out;
      `;
    default:
      return css``;
  }
};

interface StyledOverlayProps {
  isClosing?: boolean;
  zIndex?: number;
}

interface StyledModalProps {
  size: ModalSize;
  animation: ModalAnimation;
  isClosing?: boolean;
  centered?: boolean;
  fullHeight?: boolean;
}

export const StyledOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isClosing', 'zIndex'].includes(prop),
})<StyledOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex || 1000};
  padding: ${({ theme }) => theme.spacing.md};
  
  animation: ${({ isClosing }) => (isClosing ? fadeOut : fadeIn)} 0.2s ease-out;
  
  /* 스크롤 방지를 위한 오버플로우 처리 */
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const StyledModal = styled.div.withConfig({
  shouldForwardProp: (prop) => 
    !['size', 'animation', 'isClosing', 'centered', 'fullHeight'].includes(prop),
})<StyledModalProps>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme, size }) => (size === 'fullscreen' ? '0' : theme.borderRadius.lg)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ centered }) => (centered ? 'auto' : '0')};
  
  ${({ size }) => sizeStyles[size]}
  ${({ animation, isClosing }) => getAnimationStyles(animation, isClosing)}
  
  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: 0;
    max-height: calc(100vh - 32px);
    max-width: calc(100vw - 32px);
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const StyledModalTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
`;

export const StyledCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StyledModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const StyledModalFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
  justify-content: flex-end;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;