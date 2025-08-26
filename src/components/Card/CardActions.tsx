import React from 'react';
import { CardActionProps } from './types';
import { StyledCardActions } from './styles';

export const CardActions: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({
  children,
  className,
  style,
}) => {
  return (
    <StyledCardActions 
      className={`card-actions ${className || ''}`}
      style={style}
    >
      {children}
    </StyledCardActions>
  );
};

export const CardAction: React.FC<CardActionProps> = ({
  children,
  onClick,
  href,
  target,
  disabled = false,
  className,
  style,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const commonProps = {
    className: `card-action ${className || ''}`,
    style: {
      ...style,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    onClick: handleClick,
  };

  // 링크인 경우
  if (href && !disabled) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  // 버튼인 경우
  return (
    <button
      {...commonProps}
      type="button"
      disabled={disabled}
      style={{
        ...commonProps.style,
        background: 'none',
        border: 'none',
        padding: 0,
        font: 'inherit',
      }}
    >
      {children}
    </button>
  );
};