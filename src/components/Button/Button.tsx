import React from 'react';
import { ButtonProps } from './types';
import { StyledButton, IconWrapper, LoadingSpinner } from './styles';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <LoadingSpinner />}
      {!loading && icon && (
        <IconWrapper position={iconPosition}>{icon}</IconWrapper>
      )}
      {children}
    </StyledButton>
  );
};

Button.displayName = 'Button';