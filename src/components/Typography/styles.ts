import styled, { css } from 'styled-components';
import { TypographyVariant, TypographyColor, TypographyAlign, TypographyWeight, TypographyStyleProps } from './types';

// Typography variant styles
const getVariantStyles = (variant: TypographyVariant) => {
  const variants = {
    h1: css`
      font-size: 2.25rem; // 36px
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
      line-height: ${({ theme }) => theme.fonts.lineHeights.tight};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.875rem; // 30px
      }
    `,
    h2: css`
      font-size: 1.875rem; // 30px
      font-weight: ${({ theme }) => theme.fonts.weights.bold};
      line-height: ${({ theme }) => theme.fonts.lineHeights.tight};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: 1.5rem; // 24px
      }
    `,
    h3: css`
      font-size: ${({ theme }) => theme.fonts.sizes.xxl}; // 24px
      font-weight: ${({ theme }) => theme.fonts.weights.semibold};
      line-height: ${({ theme }) => theme.fonts.lineHeights.tight};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fonts.sizes.xl}; // 20px
      }
    `,
    h4: css`
      font-size: ${({ theme }) => theme.fonts.sizes.xl}; // 20px
      font-weight: ${({ theme }) => theme.fonts.weights.semibold};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      
      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fonts.sizes.lg}; // 18px
      }
    `,
    h5: css`
      font-size: ${({ theme }) => theme.fonts.sizes.lg}; // 18px
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
    `,
    h6: css`
      font-size: ${({ theme }) => theme.fonts.sizes.md}; // 16px
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
    `,
    subtitle1: css`
      font-size: ${({ theme }) => theme.fonts.sizes.md}; // 16px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      letter-spacing: 0.00938em;
    `,
    subtitle2: css`
      font-size: ${({ theme }) => theme.fonts.sizes.sm}; // 14px
      font-weight: ${({ theme }) => theme.fonts.weights.medium};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      letter-spacing: 0.00714em;
    `,
    body1: css`
      font-size: ${({ theme }) => theme.fonts.sizes.md}; // 16px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      letter-spacing: 0.00938em;
    `,
    body2: css`
      font-size: ${({ theme }) => theme.fonts.sizes.sm}; // 14px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      letter-spacing: 0.01071em;
    `,
    caption: css`
      font-size: ${({ theme }) => theme.fonts.sizes.xs}; // 12px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
      letter-spacing: 0.03333em;
    `,
    overline: css`
      font-size: ${({ theme }) => theme.fonts.sizes.xs}; // 12px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: 2.66;
      letter-spacing: 0.08333em;
      text-transform: uppercase;
    `,
    code: css`
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: ${({ theme }) => theme.fonts.sizes.sm}; // 14px
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      line-height: ${({ theme }) => theme.fonts.lineHeights.relaxed};
      background-color: ${({ theme }) => theme.colors.surface};
      padding: ${({ theme }) => theme.spacing.sm};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      border: 1px solid ${({ theme }) => theme.colors.border};
      display: block;
      overflow-x: auto;
      white-space: pre-wrap;
    `,
    inlineCode: css`
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 0.9em;
      font-weight: ${({ theme }) => theme.fonts.weights.normal};
      background-color: ${({ theme }) => theme.colors.surface};
      padding: 0.125rem 0.25rem;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      border: 1px solid ${({ theme }) => theme.colors.border};
    `,
  };

  return variants[variant] || variants.body1;
};

// Color styles
const getColorStyles = (color?: TypographyColor) => {
  if (!color) return css`color: ${({ theme }) => theme.colors.text.primary};`;

  const colorMap = {
    primary: css`color: ${({ theme }) => theme.colors.text.primary};`,
    secondary: css`color: ${({ theme }) => theme.colors.text.secondary};`,
    disabled: css`color: ${({ theme }) => theme.colors.text.disabled};`,
    success: css`color: ${({ theme }) => theme.colors.success};`,
    warning: css`color: ${({ theme }) => theme.colors.warning};`,
    error: css`color: ${({ theme }) => theme.colors.error};`,
    info: css`color: ${({ theme }) => theme.colors.info};`,
  };

  return colorMap[color] || colorMap.primary;
};

// Text alignment styles
const getAlignStyles = (align?: TypographyAlign) => {
  if (!align) return '';
  return css`text-align: ${align};`;
};

// Font weight styles
const getWeightStyles = (weight?: TypographyWeight) => {
  if (!weight) return '';

  const weightMap = {
    normal: css`font-weight: ${({ theme }) => theme.fonts.weights.normal};`,
    medium: css`font-weight: ${({ theme }) => theme.fonts.weights.medium};`,
    semibold: css`font-weight: ${({ theme }) => theme.fonts.weights.semibold};`,
    bold: css`font-weight: ${({ theme }) => theme.fonts.weights.bold};`,
  };

  return weightMap[weight];
};

// Truncation styles
const getTruncationStyles = (truncate?: boolean, maxLines?: number) => {
  if (maxLines && maxLines > 1) {
    return css`
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    `;
  }

  if (truncate) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
  }

  return '';
};

// Text decoration styles
const getDecorationStyles = (underline?: boolean, strikeThrough?: boolean) => {
  let decorations = [];
  
  if (underline) decorations.push('underline');
  if (strikeThrough) decorations.push('line-through');
  
  if (decorations.length > 0) {
    return css`text-decoration: ${decorations.join(' ')};`;
  }
  
  return '';
};

export const StyledTypography = styled.div<TypographyStyleProps>`
  margin: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  
  /* Variant styles */
  ${({ $variant }) => getVariantStyles($variant)}
  
  /* Color styles */
  ${({ $color }) => getColorStyles($color)}
  
  /* Alignment styles */
  ${({ $align }) => getAlignStyles($align)}
  
  /* Weight styles */
  ${({ $weight }) => getWeightStyles($weight)}
  
  /* Truncation styles */
  ${({ $truncate, $maxLines }) => getTruncationStyles($truncate, $maxLines)}
  
  /* Decoration styles */
  ${({ $underline, $strikeThrough }) => getDecorationStyles($underline, $strikeThrough)}
  
  /* Italic styles */
  ${({ $italic }) => $italic && css`font-style: italic;`}
  
  /* Responsive font sizes for better readability */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $variant }) => {
      if (['body1', 'body2', 'subtitle1', 'subtitle2'].includes($variant)) {
        return css`
          font-size: ${({ theme }) => theme.fonts.sizes.sm};
        `;
      }
      return '';
    }}
  }
`;