import styled, { css, keyframes } from 'styled-components';
import { CarouselStyleProps, CarouselAnimation, CarouselDirection } from './types';

// Slide animation keyframes
const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideInDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideInUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Main carousel container
export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Slides wrapper
export const CarouselWrapper = styled.div<CarouselStyleProps>`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: ${({ $direction }) => $direction === 'vertical' ? 'column' : 'row'};
  transition: ${({ $isTransitioning, $speed }) => 
    $isTransitioning ? `transform ${$speed}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none'};
  
  ${({ $direction, $currentSlide, $slidesToShow, $gap, $infinite, $totalSlides }) => {
    if ($direction === 'vertical') {
      const slideHeight = `calc((100% - ${($slidesToShow - 1) * $gap}px) / ${$slidesToShow})`;
      const totalHeight = `calc(${$totalSlides} * (${slideHeight} + ${$gap}px) - ${$gap}px)`;
      const translateY = $infinite 
        ? `calc(-${$currentSlide + 1} * (${slideHeight} + ${$gap}px))`
        : `calc(-${$currentSlide} * (${slideHeight} + ${$gap}px))`;
      
      return css`
        height: ${$infinite ? `calc(${totalHeight} + 2 * (${slideHeight} + ${$gap}px))` : totalHeight};
        transform: translateY(${translateY});
      `;
    } else {
      const slideWidth = `calc((100% - ${($slidesToShow - 1) * $gap}px) / ${$slidesToShow})`;
      const totalWidth = `calc(${$totalSlides} * (${slideWidth} + ${$gap}px) - ${$gap}px)`;
      const translateX = $infinite 
        ? `calc(-${$currentSlide + 1} * (${slideWidth} + ${$gap}px))`
        : `calc(-${$currentSlide} * (${slideWidth} + ${$gap}px))`;
      
      return css`
        width: ${$infinite ? `calc(${totalWidth} + 2 * (${slideWidth} + ${$gap}px))` : totalWidth};
        transform: translateX(${translateX});
      `;
    }
  }}
`;

// Individual slide
export const CarouselSlide = styled.div<{
  $slidesToShow: number;
  $gap: number;
  $direction: CarouselDirection;
  $animation: CarouselAnimation;
  $isActive: boolean;
}>`
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $direction, $slidesToShow, $gap }) => {
    if ($direction === 'vertical') {
      return css`
        height: calc((100% - ${($slidesToShow - 1) * $gap}px) / ${$slidesToShow});
        width: 100%;
        margin-bottom: ${$gap}px;
        
        &:last-child {
          margin-bottom: 0;
        }
      `;
    } else {
      return css`
        width: calc((100% - ${($slidesToShow - 1) * $gap}px) / ${$slidesToShow});
        height: 100%;
        margin-right: ${$gap}px;
        
        &:last-child {
          margin-right: 0;
        }
      `;
    }
  }}
  
  ${({ $animation, $isActive }) => {
    if ($animation === 'fade') {
      return css`
        opacity: ${$isActive ? 1 : 0};
        transition: opacity 0.5s ease-in-out;
      `;
    }
    return '';
  }}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

// Navigation arrows
export const CarouselArrow = styled.button<{
  $direction: 'prev' | 'next';
  $position?: 'inside' | 'outside';
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  ${({ $direction, $position = 'inside' }) => {
    if ($direction === 'prev') {
      return css`
        left: ${$position === 'inside' ? '16px' : '-60px'};
      `;
    } else {
      return css`
        right: ${$position === 'inside' ? '16px' : '-60px'};
      `;
    }
  }}
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
    }
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

// Dots indicator
export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const CarouselDot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${({ $isActive, theme }) => {
    if ($isActive) {
      return css`
        background: ${theme.colors.primary};
        transform: scale(1.2);
      `;
    } else {
      return css`
        background: ${theme.colors.border};
        
        &:hover {
          background: ${theme.colors.text.secondary};
          transform: scale(1.1);
        }
      `;
    }
  }}
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Counter
export const CarouselCounter = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  z-index: 10;
`;

// Loading placeholder
export const CarouselSkeleton = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Carousel content wrapper for custom content
export const CarouselContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  
  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
    font-size: ${({ theme }) => theme.fonts.sizes.lg};
    font-weight: ${({ theme }) => theme.fonts.weights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.fonts.sizes.md};
    color: ${({ theme }) => theme.colors.text.secondary};
    line-height: ${({ theme }) => theme.fonts.lineHeights.normal};
  }
`;