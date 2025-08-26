import React from 'react';
import { CardGridProps } from './types';
import { StyledCardGrid } from './styles';

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  columns = 3,
  gap = 'medium',
  align = 'stretch',
  justify = 'start',
  className,
  style,
}) => {
  // 반응형 columns 처리
  const getResponsiveColumns = () => {
    if (typeof columns === 'number') {
      return columns;
    }
    
    // 객체 형태의 반응형 columns인 경우, 기본값으로 md 또는 3을 사용
    return columns.md || columns.lg || 3;
  };

  const responsiveStyle = React.useMemo(() => {
    if (typeof columns !== 'object') {
      return style;
    }

    // CSS 변수를 사용하여 반응형 그리드 구현
    const mediaQueries = {
      '--grid-xs': `repeat(${columns.xs || 1}, 1fr)`,
      '--grid-sm': `repeat(${columns.sm || columns.xs || 2}, 1fr)`,
      '--grid-md': `repeat(${columns.md || columns.sm || 3}, 1fr)`,
      '--grid-lg': `repeat(${columns.lg || columns.md || 4}, 1fr)`,
      '--grid-xl': `repeat(${columns.xl || columns.lg || 5}, 1fr)`,
    };

    return {
      ...style,
      ...mediaQueries,
      gridTemplateColumns: 'var(--grid-md)', // 기본값
      '@media (max-width: 480px)': {
        gridTemplateColumns: 'var(--grid-xs)',
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'var(--grid-sm)',
      },
      '@media (max-width: 1024px)': {
        gridTemplateColumns: 'var(--grid-md)',
      },
      '@media (max-width: 1280px)': {
        gridTemplateColumns: 'var(--grid-lg)',
      },
      '@media (min-width: 1281px)': {
        gridTemplateColumns: 'var(--grid-xl)',
      },
    } as React.CSSProperties;
  }, [columns, style]);

  return (
    <StyledCardGrid
      columns={getResponsiveColumns()}
      gap={gap}
      align={align}
      justify={justify}
      className={`card-grid ${className || ''}`}
      style={responsiveStyle}
    >
      {children}
    </StyledCardGrid>
  );
};