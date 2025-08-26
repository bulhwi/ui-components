import React from 'react';
import { CardMetaProps } from './types';
import {
  StyledCardMeta,
  StyledCardAvatar,
  StyledCardMetaContent,
  StyledCardMetaTitle,
  StyledCardMetaDescription,
} from './styles';

export const CardMeta: React.FC<CardMetaProps> = ({
  title,
  description,
  avatar,
  className,
  style,
}) => {
  return (
    <StyledCardMeta 
      className={`card-meta ${className || ''}`}
      style={style}
    >
      {avatar && (
        <StyledCardAvatar className="card-meta-avatar">
          {typeof avatar === 'string' ? (
            <img src={avatar} alt="" />
          ) : (
            avatar
          )}
        </StyledCardAvatar>
      )}
      
      {(title || description) && (
        <StyledCardMetaContent className="card-meta-content">
          {title && (
            <StyledCardMetaTitle className="card-meta-title">
              {title}
            </StyledCardMetaTitle>
          )}
          {description && (
            <StyledCardMetaDescription className="card-meta-description">
              {description}
            </StyledCardMetaDescription>
          )}
        </StyledCardMetaContent>
      )}
    </StyledCardMeta>
  );
};