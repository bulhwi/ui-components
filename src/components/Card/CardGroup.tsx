import React from 'react';
import { CardGroupProps } from './types';
import { StyledCardGroup } from './styles';

export const CardGroup: React.FC<CardGroupProps> = ({
  children,
  variant,
  size,
  spacing = 'medium',
  direction = 'horizontal',
  wrap = true,
  className,
  style,
}) => {
  // children에 공통 props 전달 (variant, size가 있는 경우)
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type && 
        (child.type as any).name === 'Card') {
      const childProps = {
        ...(variant && !child.props.variant && { variant }),
        ...(size && !child.props.size && { size }),
      };
      
      return Object.keys(childProps).length > 0 
        ? React.cloneElement(child, childProps)
        : child;
    }
    return child;
  });

  return (
    <StyledCardGroup
      spacing={spacing}
      direction={direction}
      wrap={wrap}
      className={`card-group ${className || ''}`}
      style={style}
    >
      {enhancedChildren}
    </StyledCardGroup>
  );
};