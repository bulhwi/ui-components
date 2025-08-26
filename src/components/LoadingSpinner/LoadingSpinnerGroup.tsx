import React from 'react';
import { LoadingSpinnerGroupProps } from './types';
import { SpinnerGroupContainer } from './styles';

const LoadingSpinnerGroup: React.FC<LoadingSpinnerGroupProps> = ({
  children,
  direction = 'horizontal',
  spacing = 'medium',
  align = 'center',
  className,
}) => {
  return (
    <SpinnerGroupContainer
      $direction={direction}
      $spacing={spacing}
      $align={align}
      className={className}
      data-testid="loading-spinner-group"
    >
      {children}
    </SpinnerGroupContainer>
  );
};

export default LoadingSpinnerGroup;