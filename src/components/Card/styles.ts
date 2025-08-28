import styled, { css } from 'styled-components';
import { CardVariant, CardSize, CardDirection, CardImagePosition } from './types';

// Card 변형별 스타일
const variantStyles = {
  filled: css`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: none;
  `,
  outlined: css`
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: none;
  `,
  elevated: css`
    background: ${({ theme }) => theme.colors.background};
    border: none;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,
};

// Card 크기별 스타일
const sizeStyles = {
  small: css`
    border-radius: ${({ theme }) => theme.borderRadius.md};
    
    .card-header {
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm} 0`};
    }
    
    .card-content {
      padding: ${({ theme }) => theme.spacing.sm};
    }
    
    .card-footer {
      padding: ${({ theme }) => `0 ${theme.spacing.sm} ${theme.spacing.sm}`};
    }
  `,
  medium: css`
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    
    .card-header {
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md} 0`};
    }
    
    .card-content {
      padding: ${({ theme }) => theme.spacing.md};
    }
    
    .card-footer {
      padding: ${({ theme }) => `0 ${theme.spacing.md} ${theme.spacing.md}`};
    }
  `,
  large: css`
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    
    .card-header {
      padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg} 0`};
    }
    
    .card-content {
      padding: ${({ theme }) => theme.spacing.lg};
    }
    
    .card-footer {
      padding: ${({ theme }) => `0 ${theme.spacing.lg} ${theme.spacing.lg}`};
    }
  `,
};

// 패딩 스타일
const paddingStyles = {
  none: css`
    .card-content {
      padding: 0;
    }
  `,
  small: css`
    .card-content {
      padding: ${({ theme }) => theme.spacing.sm};
    }
  `,
  medium: css`
    .card-content {
      padding: ${({ theme }) => theme.spacing.md};
    }
  `,
  large: css`
    .card-content {
      padding: ${({ theme }) => theme.spacing.lg};
    }
  `,
};

// 메인 Card 컨테이너
interface StyledCardProps {
  variant?: CardVariant;
  size?: CardSize;
  direction?: CardDirection;
  hoverable?: boolean;
  clickable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const StyledCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'direction', 'hoverable', 'clickable', 'selected', 'disabled', 'bordered', 'padding'].includes(prop),
})<StyledCardProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ direction = 'vertical' }) => direction === 'horizontal' ? 'row' : 'column'};
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: ${({ clickable, disabled }) => {
    if (disabled) return 'not-allowed';
    if (clickable) return 'pointer';
    return 'default';
  }};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  
  ${({ variant = 'filled' }) => variantStyles[variant]}
  ${({ size = 'medium' }) => sizeStyles[size]}
  ${({ padding }) => padding && paddingStyles[padding]}
  
  ${({ bordered, theme }) => bordered && css`
    border: 2px solid ${theme.colors.border};
  `}
  
  ${({ selected, theme }) => selected && css`
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  `}
  
  ${({ hoverable, disabled }) => hoverable && !disabled && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
  `}
  
  ${({ clickable, disabled }) => clickable && !disabled && css`
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Card 이미지
interface StyledCardImageProps {
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  position?: CardImagePosition;
}

export const StyledCardImageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['aspectRatio', 'position'].includes(prop),
})<Pick<StyledCardImageProps, 'aspectRatio' | 'position'>>`
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  
  ${({ aspectRatio }) => aspectRatio && css`
    aspect-ratio: ${aspectRatio};
  `}
  
  ${({ position = 'top' }) => {
    switch (position) {
      case 'left':
        return css`
          order: -1;
          width: 40%;
        `;
      case 'right':
        return css`
          order: 1;
          width: 40%;
        `;
      case 'bottom':
        return css`
          order: 1;
        `;
      default: // top
        return css`
          order: -1;
        `;
    }
  }}
`;

export const StyledCardImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !['objectFit'].includes(prop),
})<Pick<StyledCardImageProps, 'objectFit'>>`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit = 'cover' }) => objectFit};
  display: block;
  transition: transform 0.2s ease;
  
  .card:hover & {
    transform: scale(1.02);
  }
`;

// Card 헤더
export const StyledCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

export const StyledCardHeaderContent = styled.div`
  flex: 1;
  min-width: 0; // flexbox 내에서 text-overflow 작동을 위함
`;

export const StyledCardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.fonts.lineHeights.tight};
  
  /* 긴 제목 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const StyledCardSubtitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
  
  /* 긴 부제목 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const StyledCardAvatar = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledCardHeaderAction = styled.div`
  flex-shrink: 0;
`;

// Card 내용
export const StyledCardContent = styled.div`
  flex: 1;
  
  p {
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* 다른 요소들의 기본 간격 */
  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

// Card 푸터
interface StyledCardFooterProps {
  align?: 'left' | 'center' | 'right' | 'space-between';
}

export const StyledCardFooter = styled.div.withConfig({
  shouldForwardProp: (prop) => !['align'].includes(prop),
})<StyledCardFooterProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
  
  ${({ align = 'left' }) => {
    switch (align) {
      case 'center':
        return css`justify-content: center;`;
      case 'right':
        return css`justify-content: flex-end;`;
      case 'space-between':
        return css`justify-content: space-between;`;
      default:
        return css`justify-content: flex-start;`;
    }
  }}
`;

// Card 액션
export const StyledCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

// Card 메타 (아바타 + 제목 + 설명 조합)
export const StyledCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledCardMetaContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledCardMetaTitle = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledCardMetaDescription = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Card 그리드
interface StyledCardGridProps {
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
}

const gapSizes = {
  small: '12px',
  medium: '16px', 
  large: '24px',
};

export const StyledCardGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['columns', 'gap', 'align', 'justify'].includes(prop),
})<StyledCardGridProps>`
  display: grid;
  grid-template-columns: ${({ columns = 3 }) => `repeat(${columns}, 1fr)`};
  gap: ${({ gap = 'medium' }) => 
    typeof gap === 'number' ? `${gap}px` : gapSizes[gap]
  };
  align-items: ${({ align = 'stretch' }) => align === 'start' ? 'flex-start' : 
    align === 'end' ? 'flex-end' : align};
  justify-content: ${({ justify = 'start' }) => 
    justify === 'start' ? 'flex-start' : 
    justify === 'end' ? 'flex-end' : justify};
  
  /* 반응형 그리드 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: ${({ columns = 3 }) => 
      columns > 2 ? 'repeat(2, 1fr)' : `repeat(${columns}, 1fr)`};
  }
`;

// Card 로딩 스켈레톤
export const StyledCardSkeleton = styled.div`
  .skeleton-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  .skeleton-title {
    height: 20px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    
    &.short {
      width: 60%;
    }
    
    &.medium {
      width: 80%;
    }
    
    &.long {
      width: 100%;
    }
  }
  
  .skeleton-paragraph {
    height: 16px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    
    &:last-child {
      width: 70%;
    }
  }
  
  .skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  .skeleton-actions {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    
    .skeleton-button {
      width: 80px;
      height: 32px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: ${({ theme }) => theme.borderRadius.md};
    }
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Card 그룹
interface StyledCardGroupProps {
  spacing?: 'none' | 'small' | 'medium' | 'large';
  direction?: 'horizontal' | 'vertical';
  wrap?: boolean;
}

const spacingSizes = {
  none: '0',
  small: '8px',
  medium: '16px',
  large: '24px',
};

export const StyledCardGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => !['spacing', 'direction', 'wrap'].includes(prop),
})<StyledCardGroupProps>`
  display: flex;
  flex-direction: ${({ direction = 'horizontal' }) => 
    direction === 'vertical' ? 'column' : 'row'};
  gap: ${({ spacing = 'medium' }) => spacingSizes[spacing]};
  flex-wrap: ${({ wrap = true }) => wrap ? 'wrap' : 'nowrap'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;