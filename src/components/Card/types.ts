import React from 'react';

// Card 변형 타입
export type CardVariant = 'filled' | 'outlined' | 'elevated';

// Card 크기 타입
export type CardSize = 'small' | 'medium' | 'large';

// Card 방향 타입
export type CardDirection = 'vertical' | 'horizontal';

// Card 이미지 위치
export type CardImagePosition = 'top' | 'left' | 'right' | 'bottom';

// Card 이미지 Props
export interface CardImageProps {
  src: string;
  alt: string;
  position?: CardImagePosition;
  aspectRatio?: string; // "16/9", "4/3", "1/1" 등
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Card 액션 Props
export interface CardActionProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Card 헤더 Props
export interface CardHeaderProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Card 내용 Props
export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Card 푸터 Props  
export interface CardFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'space-between';
  className?: string;
  style?: React.CSSProperties;
}

// 메인 Card Props
export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  direction?: CardDirection;
  image?: CardImageProps;
  header?: CardHeaderProps;
  footer?: CardFooterProps;
  hoverable?: boolean;
  clickable?: boolean;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  tabIndex?: number;
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}

// Card Grid Props
export interface CardGridProps {
  children: React.ReactNode;
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'small' | 'medium' | 'large' | number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  className?: string;
  style?: React.CSSProperties;
}

// Card Meta Props (추가 메타데이터용)
export interface CardMetaProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Card 스켈레톤 로더 Props
export interface CardSkeletonProps {
  avatar?: boolean;
  title?: boolean;
  paragraph?: boolean | { rows?: number };
  image?: boolean;
  actions?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Card 그룹 Props
export interface CardGroupProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  spacing?: 'none' | 'small' | 'medium' | 'large';
  direction?: 'horizontal' | 'vertical';
  wrap?: boolean;
  className?: string;
  style?: React.CSSProperties;
}