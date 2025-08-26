import styled, { keyframes, css } from 'styled-components';
import { LoadingSpinnerVariant, LoadingSpinnerSize, LoadingSpinnerColor } from './types';

// 애니메이션 키프레임
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
`;

const bars = keyframes`
  0%, 40%, 100% { transform: scaleY(0.4); }
  20% { transform: scaleY(1.0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
`;

// 크기별 스타일
const sizeStyles = {
  small: css`
    width: 16px;
    height: 16px;
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
  `,
  medium: css`
    width: 24px;
    height: 24px;
    font-size: ${({ theme }) => theme.fonts.sizes.md};
  `,
  large: css`
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
  `,
};

// 색상별 스타일
const getColorStyles = (color: LoadingSpinnerColor) => css`
  ${({ theme }) => {
    switch (color) {
      case 'primary':
        return css`color: ${theme.colors.primary};`;
      case 'secondary':
        return css`color: ${theme.colors.secondary};`;
      case 'white':
        return css`color: #ffffff;`;
      default:
        return css`color: ${theme.colors.primary};`;
    }
  }}
`;

// 원형 스피너 스타일
const CircularSpinnerStyle = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $color: LoadingSpinnerColor; 
}>`
  ${({ $size }) => sizeStyles[$size]}
  ${({ $color }) => getColorStyles($color)}
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
  will-change: transform;
`;

// 점 스피너 컨테이너
const DotsSpinnerContainer = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $color: LoadingSpinnerColor; 
}>`
  ${({ $color }) => getColorStyles($color)}
  display: flex;
  align-items: center;
  gap: ${({ $size }) => 
    $size === 'small' ? '2px' : 
    $size === 'medium' ? '3px' : '4px'};
`;

// 개별 점 스타일
const DotStyle = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $delay: number; 
}>`
  ${({ $size }) => {
    const size = $size === 'small' ? '4px' : $size === 'medium' ? '6px' : '8px';
    return css`
      width: ${size};
      height: ${size};
    `;
  }}
  background-color: currentColor;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform, opacity;
`;

// 바 스피너 컨테이너
const BarsSpinnerContainer = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $color: LoadingSpinnerColor; 
}>`
  ${({ $color }) => getColorStyles($color)}
  display: flex;
  align-items: center;
  gap: ${({ $size }) => 
    $size === 'small' ? '1px' : 
    $size === 'medium' ? '2px' : '3px'};
`;

// 개별 바 스타일
const BarStyle = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $delay: number; 
}>`
  ${({ $size }) => {
    const width = $size === 'small' ? '2px' : $size === 'medium' ? '3px' : '4px';
    const height = $size === 'small' ? '12px' : $size === 'medium' ? '18px' : '24px';
    return css`
      width: ${width};
      height: ${height};
    `;
  }}
  background-color: currentColor;
  animation: ${bars} 1.2s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
  will-change: transform;
`;

// 펄스 스피너 스타일
const PulseSpinnerStyle = styled.div<{ 
  $size: LoadingSpinnerSize; 
  $color: LoadingSpinnerColor; 
}>`
  ${({ $size }) => sizeStyles[$size]}
  ${({ $color }) => getColorStyles($color)}
  background-color: currentColor;
  border-radius: 50%;
  animation: ${pulse} 1.5s infinite ease-in-out;
  will-change: transform, opacity;
`;

// 메인 스피너 컨테이너
export const SpinnerContainer = styled.div<{
  $inline?: boolean;
  $textPosition?: 'bottom' | 'right';
}>`
  display: ${({ $inline }) => $inline ? 'inline-flex' : 'flex'};
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $textPosition }) => 
    $textPosition === 'right' ? 'row' : 'column'};
  gap: ${({ theme, $textPosition }) => 
    $textPosition === 'right' ? theme.spacing.sm : theme.spacing.xs};
  
  ${({ $inline }) => !$inline && css`
    min-height: 40px;
  `}
`;

// 스피너 텍스트
export const SpinnerText = styled.span<{
  $size: LoadingSpinnerSize;
  $color: LoadingSpinnerColor;
}>`
  ${({ $size, theme }) => css`
    font-size: ${theme.fonts.sizes[$size === 'small' ? 'sm' : $size === 'medium' ? 'md' : 'lg']};
    line-height: ${theme.fonts.lineHeights.normal};
  `}
  ${({ $color }) => getColorStyles($color)}
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

// 오버레이 컨테이너
export const OverlayContainer = styled.div<{
  $show: boolean;
  $opacity: number;
  $zIndex: number;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, ${({ $opacity }) => $opacity});
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ $zIndex }) => $zIndex};
  opacity: ${({ $show }) => $show ? 1 : 0};
  visibility: ${({ $show }) => $show ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
  will-change: opacity;
`;

// 그룹 컨테이너
export const SpinnerGroupContainer = styled.div<{
  $direction: 'horizontal' | 'vertical';
  $spacing: 'small' | 'medium' | 'large';
  $align: 'start' | 'center' | 'end';
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === 'horizontal' ? 'row' : 'column'};
  align-items: ${({ $align, $direction }) => {
    if ($direction === 'horizontal') {
      return $align === 'start' ? 'flex-start' : $align === 'end' ? 'flex-end' : 'center';
    }
    return 'stretch';
  }};
  justify-content: ${({ $align, $direction }) => {
    if ($direction === 'vertical') {
      return $align === 'start' ? 'flex-start' : $align === 'end' ? 'flex-end' : 'center';
    }
    return 'flex-start';
  }};
  gap: ${({ theme, $spacing }) => 
    $spacing === 'small' ? theme.spacing.xs : 
    $spacing === 'medium' ? theme.spacing.sm : theme.spacing.md};
`;

// 스피너 변형별 컴포넌트 export
export {
  CircularSpinnerStyle,
  DotsSpinnerContainer,
  DotStyle,
  BarsSpinnerContainer,
  BarStyle,
  PulseSpinnerStyle,
};