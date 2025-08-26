import React from 'react';
import { CardProps } from './types';
import {
  StyledCard,
  StyledCardImageContainer,
  StyledCardImage,
  StyledCardHeader,
  StyledCardHeaderContent,
  StyledCardTitle,
  StyledCardSubtitle,
  StyledCardAvatar,
  StyledCardHeaderAction,
  StyledCardContent,
  StyledCardFooter,
} from './styles';
import { CardSkeleton } from './CardSkeleton';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'filled',
  size = 'medium',
  direction = 'vertical',
  image,
  header,
  footer,
  hoverable = false,
  clickable = false,
  selected = false,
  loading = false,
  disabled = false,
  bordered = false,
  padding,
  className,
  style,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  tabIndex,
  role,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  id,
}) => {
  // 로딩 상태일 때 스켈레톤 표시
  if (loading) {
    return (
      <StyledCard
        variant={variant}
        size={size}
        direction={direction}
        className={className}
        style={style}
      >
        <CardSkeleton 
          avatar={!!header?.avatar}
          title={!!header?.title}
          paragraph={{ rows: 3 }}
          image={!!image}
          actions={!!footer}
        />
      </StyledCard>
    );
  }

  // 이벤트 핸들러들
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    
    // Enter 또는 Space 키로 클릭 이벤트 트리거
    if ((event.key === 'Enter' || event.key === ' ') && clickable && onClick) {
      event.preventDefault();
      onClick(event as any);
    }
  };

  // 이미지 렌더링
  const renderImage = () => {
    if (!image) return null;

    return (
      <StyledCardImageContainer
        aspectRatio={image.aspectRatio}
        position={image.position}
        className="card-image-container"
      >
        <StyledCardImage
          src={image.src}
          alt={image.alt}
          objectFit={image.objectFit}
          loading={image.loading}
          onLoad={image.onLoad}
          onError={image.onError}
          className="card-image"
        />
      </StyledCardImageContainer>
    );
  };

  // 헤더 렌더링
  const renderHeader = () => {
    if (!header) return null;

    return (
      <StyledCardHeader className="card-header">
        {header.avatar && (
          <StyledCardAvatar className="card-avatar">
            {typeof header.avatar === 'string' ? (
              <img src={header.avatar} alt="" />
            ) : (
              header.avatar
            )}
          </StyledCardAvatar>
        )}
        
        <StyledCardHeaderContent className="card-header-content">
          {header.title && (
            <StyledCardTitle className="card-title">
              {header.title}
            </StyledCardTitle>
          )}
          {header.subtitle && (
            <StyledCardSubtitle className="card-subtitle">
              {header.subtitle}
            </StyledCardSubtitle>
          )}
        </StyledCardHeaderContent>
        
        {header.action && (
          <StyledCardHeaderAction className="card-header-action">
            {header.action}
          </StyledCardHeaderAction>
        )}
      </StyledCardHeader>
    );
  };

  // 푸터 렌더링
  const renderFooter = () => {
    if (!footer) return null;

    return (
      <StyledCardFooter 
        align={footer.align}
        className={`card-footer ${footer.className || ''}`}
        style={footer.style}
      >
        {footer.children}
      </StyledCardFooter>
    );
  };

  // 메인 콘텐츠 렌더링
  const renderContent = () => {
    // children이 string이거나 단순한 경우 자동으로 StyledCardContent로 감싸기
    if (typeof children === 'string' || React.isValidElement(children)) {
      // 이미 Card의 하위 컴포넌트들(CardContent 등)인지 확인
      const isCardComponent = React.isValidElement(children) && 
        typeof children.type === 'function' &&
        ['CardContent', 'CardHeader', 'CardFooter', 'CardActions'].includes(children.type.name || '');
      
      if (isCardComponent) {
        return children;
      }
      
      return (
        <StyledCardContent className="card-content">
          {children}
        </StyledCardContent>
      );
    }

    // 복잡한 children의 경우 그대로 렌더링
    return children;
  };

  return (
    <StyledCard
      variant={variant}
      size={size}
      direction={direction}
      hoverable={hoverable}
      clickable={clickable}
      selected={selected}
      disabled={disabled}
      bordered={bordered}
      padding={padding}
      className={`card ${className || ''}`}
      style={style}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? tabIndex || 0 : tabIndex}
      role={role || (clickable ? 'button' : 'article')}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      id={id}
    >
      {renderImage()}
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
    </StyledCard>
  );
};