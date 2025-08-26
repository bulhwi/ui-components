import React from 'react';
import { LayoutProps } from './types';
import { StyledLayout, StyledLayoutMain } from './styles';

export const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  footer,
  className,
  style,
}) => {
  return (
    <StyledLayout className={className} style={style}>
      {header}
      <StyledLayoutMain>
        {children}
      </StyledLayoutMain>
      {footer}
    </StyledLayout>
  );
};