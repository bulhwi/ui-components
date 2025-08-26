import React, { forwardRef } from 'react';
import { InputProps } from './types';
import {
  StyledInputContainer,
  StyledLabel,
  StyledInputWrapper,
  StyledInput,
  StyledIconWrapper,
  StyledHelperText,
  StyledRequiredMark,
} from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  type = 'text',
  label,
  placeholder,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  fullWidth = false,
  required = false,
  leftIcon,
  rightIcon,
  onIconClick,
  id,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const displayHelperText = error && errorMessage ? errorMessage : helperText;

  const handleIconClick = (position: 'left' | 'right') => {
    if (onIconClick && !disabled) {
      onIconClick(position);
    }
  };

  return (
    <StyledInputContainer fullWidth={fullWidth} disabled={disabled}>
      {label && (
        <StyledLabel htmlFor={inputId}>
          {label}
          {required && <StyledRequiredMark>*</StyledRequiredMark>}
        </StyledLabel>
      )}
      
      <StyledInputWrapper
        variant={variant}
        size={size}
        error={error}
        disabled={disabled}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
      >
        {leftIcon && (
          <StyledIconWrapper
            position="left"
            clickable={Boolean(onIconClick)}
            onClick={() => handleIconClick('left')}
          >
            {leftIcon}
          </StyledIconWrapper>
        )}
        
        <StyledInput
          ref={ref}
          id={inputId}
          type={type}
          variant={variant}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          {...rest}
        />
        
        {rightIcon && (
          <StyledIconWrapper
            position="right"
            clickable={Boolean(onIconClick)}
            onClick={() => handleIconClick('right')}
          >
            {rightIcon}
          </StyledIconWrapper>
        )}
      </StyledInputWrapper>
      
      {displayHelperText && (
        <StyledHelperText error={error}>
          {displayHelperText}
        </StyledHelperText>
      )}
    </StyledInputContainer>
  );
});

Input.displayName = 'Input';