import React from 'react';
import { CardContentProps } from './types';
import { StyledCardContent } from './styles';

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledCardContent 
      className={`card-content ${className || ''}`}
      style={style}
    >
      {children}
    </StyledCardContent>
  );
};