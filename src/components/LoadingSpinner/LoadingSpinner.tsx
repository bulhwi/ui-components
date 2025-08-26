import React from 'react';
import { LoadingSpinnerProps } from './types';
import {
  SpinnerContainer,
  SpinnerText,
  OverlayContainer,
  CircularSpinnerStyle,
  DotsSpinnerContainer,
  DotStyle,
  BarsSpinnerContainer,
  BarStyle,
  PulseSpinnerStyle,
} from './styles';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'circular',
  size = 'medium',
  color = 'primary',
  text,
  textPosition = 'bottom',
  overlay = false,
  overlayOpacity = 0.5,
  inline = false,
  className,
  style,
  'aria-label': ariaLabel,
  'data-testid': testId,
}) => {
  // 스피너 변형별 렌더링
  const renderSpinner = () => {
    switch (variant) {
      case 'circular':
        return (
          <CircularSpinnerStyle
            $size={size}
            $color={color}
            role="status"
            aria-label={ariaLabel || '로딩 중'}
          />
        );

      case 'dots':
        return (
          <DotsSpinnerContainer
            $size={size}
            $color={color}
            role="status"
            aria-label={ariaLabel || '로딩 중'}
          >
            {[0, 1, 2].map((index) => (
              <DotStyle
                key={index}
                $size={size}
                $delay={index * 0.16}
              />
            ))}
          </DotsSpinnerContainer>
        );

      case 'bars':
        return (
          <BarsSpinnerContainer
            $size={size}
            $color={color}
            role="status"
            aria-label={ariaLabel || '로딩 중'}
          >
            {[0, 1, 2, 3, 4].map((index) => (
              <BarStyle
                key={index}
                $size={size}
                $delay={index * 0.1}
              />
            ))}
          </BarsSpinnerContainer>
        );

      case 'pulse':
        return (
          <PulseSpinnerStyle
            $size={size}
            $color={color}
            role="status"
            aria-label={ariaLabel || '로딩 중'}
          />
        );

      default:
        return (
          <CircularSpinnerStyle
            $size={size}
            $color={color}
            role="status"
            aria-label={ariaLabel || '로딩 중'}
          />
        );
    }
  };

  const spinnerContent = (
    <SpinnerContainer
      $inline={inline}
      $textPosition={textPosition}
      className={className}
      style={style}
      data-testid={testId}
    >
      {renderSpinner()}
      {text && (
        <SpinnerText $size={size} $color={color}>
          {text}
        </SpinnerText>
      )}
    </SpinnerContainer>
  );

  // 오버레이 모드인 경우
  if (overlay) {
    return (
      <OverlayContainer
        $show={true}
        $opacity={overlayOpacity}
        $zIndex={9999}
        data-testid={`${testId}-overlay`}
      >
        {spinnerContent}
      </OverlayContainer>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;