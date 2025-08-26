import styled, { css } from 'styled-components';
import { InputVariant, InputSize } from './types';

interface StyledInputContainerProps {
  fullWidth?: boolean;
  disabled?: boolean;
}

interface StyledInputWrapperProps {
  variant: InputVariant;
  size: InputSize;
  error?: boolean;
  disabled?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}

interface StyledInputProps {
  variant: InputVariant;
  size: InputSize;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
}

const sizeStyles = {
  small: css`
    height: 32px;
    font-size: ${({ theme }) => theme.fonts.sizes.sm};
    padding: 0 ${({ theme }) => theme.spacing.sm};
  `,
  medium: css`
    height: 40px;
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    padding: 0 ${({ theme }) => theme.spacing.md};
  `,
  large: css`
    height: 48px;
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    padding: 0 ${({ theme }) => theme.spacing.lg};
  `,
};

const variantStyles = {
  default: css`
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    }
  `,
  filled: css`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid transparent;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
    }
  `,
  outlined: css`
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.border};
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
};

export const StyledInputContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['fullWidth', 'disabled'].includes(prop),
})<StyledInputContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const StyledInputWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'error', 'disabled', 'hasLeftIcon', 'hasRightIcon'].includes(prop),
})<StyledInputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease-in-out;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}
  
  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.colors.error} !important;
      
      &:focus-within {
        box-shadow: 0 0 0 2px ${theme.colors.error}20 !important;
      }
    `}
`;

export const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'hasLeftIcon', 'hasRightIcon'].includes(prop),
})<StyledInputProps>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: inherit;
  
  ${({ hasLeftIcon, theme }) =>
    hasLeftIcon &&
    css`
      padding-left: ${theme.spacing.xl};
    `}
  
  ${({ hasRightIcon, theme }) =>
    hasRightIcon &&
    css`
      padding-right: ${theme.spacing.xl};
    `}
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledIconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['position', 'clickable'].includes(prop),
})<{ position: 'left' | 'right'; clickable?: boolean }>`
  position: absolute;
  ${({ position }) => position}: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  transition: color 0.2s ease-in-out;
  
  ${({ clickable, theme }) =>
    clickable &&
    css`
      &:hover {
        color: ${theme.colors.text.primary};
      }
    `}
`;

export const StyledHelperText = styled.div.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<{ error?: boolean }>`
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  color: ${({ error, theme }) => 
    error ? theme.colors.error : theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  line-height: 1.4;
`;

export const StyledRequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: 2px;
`;