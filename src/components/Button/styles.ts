import styled, { css } from 'styled-components';
import { ButtonProps } from './types';

const getVariantStyles = (variant: ButtonProps['variant']) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.primary};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryHover};
          border-color: ${({ theme }) => theme.colors.primaryHover};
        }

        &:active:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.primaryActive};
          border-color: ${({ theme }) => theme.colors.primaryActive};
        }
      `;

    case 'secondary':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid ${({ theme }) => theme.colors.border};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.surface};
          color: ${({ theme }) => theme.colors.secondaryHover};
        }

        &:active:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.border};
          color: ${({ theme }) => theme.colors.secondaryActive};
        }
      `;

    case 'tertiary':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.secondary};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.surface};
          color: ${({ theme }) => theme.colors.secondaryHover};
        }

        &:active:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.border};
          color: ${({ theme }) => theme.colors.secondaryActive};
        }
      `;

    case 'danger':
      return css`
        background-color: ${({ theme }) => theme.colors.error};
        color: white;
        border: 1px solid ${({ theme }) => theme.colors.error};

        &:hover:not(:disabled) {
          background-color: ${({ theme }) => theme.colors.error};
          opacity: 0.9;
        }

        &:active:not(:disabled) {
          opacity: 0.8;
        }
      `;

    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        height: 2rem;
        padding: 0 ${({ theme }) => theme.spacing.sm};
        font-size: ${({ theme }) => theme.fonts.sizes.sm};
      `;

    case 'medium':
      return css`
        height: 2.5rem;
        padding: 0 ${({ theme }) => theme.spacing.md};
        font-size: ${({ theme }) => theme.fonts.sizes.md};
      `;

    case 'large':
      return css`
        height: 3rem;
        padding: 0 ${({ theme }) => theme.spacing.lg};
        font-size: ${({ theme }) => theme.fonts.sizes.lg};
      `;

    default:
      return css``;
  }
};

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth', 'loading'].includes(prop),
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  outline: none;

  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      opacity: 0.7;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  order: ${({ position }) => (position === 'left' ? -1 : 1)};
`;

export const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;