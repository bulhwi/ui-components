import React, { useRef, useCallback, useEffect, useState } from 'react';
import { CarouselProps } from './types';
import { useCarousel } from './useCarousel';
import {
  CarouselContainer,
  CarouselWrapper,
  CarouselSlide,
  CarouselArrow,
  CarouselDots,
  CarouselDot,
  CarouselCounter,
  CarouselContent,
} from './styles';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from './icons';

/**
 * Carousel component for displaying multiple items with navigation and controls.
 * 
 * Features:
 * - Multiple slides with smooth transitions
 * - Navigation arrows and dot indicators
 * - Autoplay with pause on hover
 * - Touch/swipe gestures support
 * - Infinite loop capability
 * - Responsive design with breakpoints
 * - Keyboard navigation
 * - Accessibility compliant
 * 
 * @example
 * ```tsx
 * // Basic carousel
 * <Carousel
 *   items={[
 *     { id: '1', content: <img src="image1.jpg" alt="Image 1" /> },
 *     { id: '2', content: <img src="image2.jpg" alt="Image 2" /> },
 *   ]}
 * />
 * 
 * // Autoplay carousel with multiple slides
 * <Carousel
 *   items={items}
 *   slidesToShow={3}
 *   autoplay
 *   autoplaySpeed={4000}
 *   infinite
 * />
 * 
 * // Responsive carousel
 * <Carousel
 *   items={items}
 *   slidesToShow={3}
 *   responsive={[
 *     { breakpoint: 768, slidesToShow: 2 },
 *     { breakpoint: 480, slidesToShow: 1 },
 *   ]}
 * />
 * ```
 */
export const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesToShow = 1,
  slidesToScroll = 1,
  animation = 'slide',
  direction = 'horizontal',
  infinite = false,
  autoplay = false,
  autoplaySpeed = 3000,
  pauseOnHover = true,
  arrows = true,
  dots = true,
  counter = false,
  swipe = true,
  swipeThreshold = 50,
  gap = 16,
  responsive = [],
  speed = 300,
  initialSlide = 0,
  className,
  style,
  onSlideChange,
  onBeforeSlideChange,
  onInit,
  prevArrow,
  nextArrow,
  customDot,
  keyboard = true,
  focusOnSelect = false,
  'aria-label': ariaLabel = 'Carousel',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  
  // Responsive settings
  const [currentSettings, setCurrentSettings] = useState({
    slidesToShow,
    slidesToScroll,
    gap,
  });
  
  const carousel = useCarousel({
    items,
    slidesToShow: currentSettings.slidesToShow,
    slidesToScroll: currentSettings.slidesToScroll,
    infinite,
    autoplay,
    autoplaySpeed,
    pauseOnHover,
    initialSlide,
    onSlideChange,
    onBeforeSlideChange,
    responsive,
  });
  
  // Update responsive settings
  useEffect(() => {
    const updateSettings = () => {
      if (!responsive.length) return;
      
      const width = window.innerWidth;
      let newSettings = { slidesToShow, slidesToScroll, gap };
      
      const sortedBreakpoints = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
      
      for (const bp of sortedBreakpoints) {
        if (width <= bp.breakpoint) {
          newSettings = {
            slidesToShow: bp.slidesToShow,
            slidesToScroll: bp.slidesToScroll || bp.slidesToShow,
            gap: bp.gap || gap,
          };
          break;
        }
      }
      
      setCurrentSettings(newSettings);
    };
    
    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, [slidesToShow, slidesToScroll, gap, responsive]);
  
  // Initialize callback
  useEffect(() => {
    if (onInit) {
      onInit(carousel);
    }
  }, [onInit, carousel]);
  
  // Keyboard navigation
  useEffect(() => {
    if (!keyboard) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target !== containerRef.current) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (direction === 'horizontal') carousel.prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (direction === 'horizontal') carousel.nextSlide();
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (direction === 'vertical') carousel.prevSlide();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (direction === 'vertical') carousel.nextSlide();
          break;
        case 'Home':
          event.preventDefault();
          carousel.goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          carousel.goToSlide(items.length - 1);
          break;
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyboard, direction, carousel, items.length]);
  
  // Touch/mouse events for swipe
  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (!swipe) return;
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setCurrentPos({ x: clientX, y: clientY });
  }, [swipe]);
  
  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    setCurrentPos({ x: clientX, y: clientY });
  }, [isDragging]);
  
  const handleEnd = useCallback(() => {
    if (!isDragging || !swipe) return;
    
    const deltaX = currentPos.x - startPos.x;
    const deltaY = currentPos.y - startPos.y;
    const threshold = swipeThreshold;
    
    if (direction === 'horizontal' && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        carousel.prevSlide();
      } else {
        carousel.nextSlide();
      }
    } else if (direction === 'vertical' && Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        carousel.prevSlide();
      } else {
        carousel.nextSlide();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, swipe, currentPos, startPos, swipeThreshold, direction, carousel]);
  
  // Mouse events
  const handleMouseDown = (event: React.MouseEvent) => {
    handleStart(event.clientX, event.clientY);
  };
  
  const handleMouseMove = (event: React.MouseEvent) => {
    handleMove(event.clientX, event.clientY);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  // Touch events
  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  
  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  
  const handleTouchEnd = () => {
    handleEnd();
  };
  
  // Render slides with clones for infinite loop
  const renderSlides = () => {
    let slidesToRender = [...items];
    
    if (infinite && items.length > currentSettings.slidesToShow) {
      // Add clones at the beginning and end
      const firstClones = items.slice(-currentSettings.slidesToShow);
      const lastClones = items.slice(0, currentSettings.slidesToShow);
      slidesToRender = [...firstClones, ...items, ...lastClones];
    }
    
    return slidesToRender.map((item, index) => {
      const isActive = !infinite 
        ? Math.floor(index / currentSettings.slidesToShow) === carousel.currentSlide
        : index >= carousel.currentSlide + 1 && 
          index < carousel.currentSlide + 1 + currentSettings.slidesToShow;
      
      return (
        <CarouselSlide
          key={`${item.id || index}-${index}`}
          $slidesToShow={currentSettings.slidesToShow}
          $gap={currentSettings.gap}
          $direction={direction}
          $animation={animation}
          $isActive={isActive}
          onClick={focusOnSelect ? () => {
            const realIndex = infinite ? index - currentSettings.slidesToShow : index;
            if (realIndex >= 0 && realIndex < items.length) {
              carousel.goToSlide(Math.floor(realIndex / currentSettings.slidesToShow));
            }
          } : undefined}
        >
          {item.content}
        </CarouselSlide>
      );
    });
  };
  
  // Render dots
  const renderDots = () => {
    if (!dots) return null;
    
    const totalDots = Math.ceil(items.length / currentSettings.slidesToShow);
    
    return (
      <CarouselDots>
        {Array.from({ length: totalDots }, (_, index) => {
          const isActive = index === carousel.currentSlide;
          
          if (customDot) {
            return (
              <div key={index} onClick={() => carousel.goToSlide(index)}>
                {customDot(index, isActive)}
              </div>
            );
          }
          
          return (
            <CarouselDot
              key={index}
              $isActive={isActive}
              onClick={() => carousel.goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </CarouselDots>
    );
  };
  
  return (
    <CarouselContainer
      ref={containerRef}
      className={className}
      style={style}
      tabIndex={keyboard ? 0 : -1}
      role="region"
      aria-label={ariaLabel}
      aria-live="polite"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CarouselWrapper
        $slidesToShow={currentSettings.slidesToShow}
        $gap={currentSettings.gap}
        $animation={animation}
        $direction={direction}
        $infinite={infinite}
        $currentSlide={carousel.currentSlide + (infinite ? 1 : 0)}
        $totalSlides={infinite ? items.length + 2 : items.length}
        $isTransitioning={carousel.isTransitioning}
        $speed={speed}
      >
        {renderSlides()}
      </CarouselWrapper>
      
      {arrows && (
        <>
          {prevArrow || (
            <CarouselArrow
              $direction="prev"
              onClick={carousel.prevSlide}
              disabled={!infinite && carousel.isFirst}
              aria-label="Previous slide"
            >
              {direction === 'vertical' ? <ChevronUpIcon /> : <ChevronLeftIcon />}
            </CarouselArrow>
          )}
          
          {nextArrow || (
            <CarouselArrow
              $direction="next"
              onClick={carousel.nextSlide}
              disabled={!infinite && carousel.isLast}
              aria-label="Next slide"
            >
              {direction === 'vertical' ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </CarouselArrow>
          )}
        </>
      )}
      
      {counter && (
        <CarouselCounter>
          {carousel.currentSlide + 1} / {items.length}
        </CarouselCounter>
      )}
      
      {renderDots()}
    </CarouselContainer>
  );
};

export default Carousel;