import React from 'react';
import { CardSkeletonProps } from './types';
import { StyledCardSkeleton } from './styles';

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  avatar = false,
  title = true,
  paragraph = true,
  image = false,
  actions = false,
  loading = true,
  className,
  style,
}) => {
  if (!loading) {
    return null;
  }

  const paragraphRows = typeof paragraph === 'object' ? paragraph.rows || 3 : 3;

  return (
    <StyledCardSkeleton className={`card-skeleton ${className || ''}`} style={style}>
      {/* 이미지 스켈레톤 */}
      {image && <div className="skeleton-image" />}
      
      {/* 헤더 스켈레톤 */}
      {(avatar || title) && (
        <div className="card-header">
          {avatar && <div className="skeleton-avatar" />}
          <div className="card-header-content">
            {title && <div className="skeleton-title short" />}
          </div>
        </div>
      )}
      
      {/* 콘텐츠 스켈레톤 */}
      {paragraph && (
        <div className="card-content">
          {Array.from({ length: paragraphRows }, (_, index) => (
            <div 
              key={index} 
              className={`skeleton-paragraph ${index === paragraphRows - 1 ? 'last' : ''}`} 
            />
          ))}
        </div>
      )}
      
      {/* 액션 스켈레톤 */}
      {actions && (
        <div className="card-footer">
          <div className="skeleton-actions">
            <div className="skeleton-button" />
            <div className="skeleton-button" />
          </div>
        </div>
      )}
    </StyledCardSkeleton>
  );
};