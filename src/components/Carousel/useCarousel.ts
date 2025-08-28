import { useState, useEffect, useCallback, useRef } from 'react';
import { CarouselProps, CarouselState, UseCarouselReturn, CarouselBreakpoint } from './types';

export const useCarousel = ({
  items,
  slidesToShow = 1,
  slidesToScroll = 1,
  infinite = false,
  autoplay = false,
  autoplaySpeed = 3000,
  pauseOnHover = true,
  initialSlide = 0,
  onSlideChange,
  onBeforeSlideChange,
  responsive = [],
}: Partial<CarouselProps>): UseCarouselReturn => {
  const totalItems = items?.length || 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout>>();
  
  // Responsive settings
  const [currentSettings, setCurrentSettings] = useState({
    slidesToShow,
    slidesToScroll,
  });
  
  // Carousel state
  const [state, setState] = useState<CarouselState>({
    currentSlide: infinite ? 1 : initialSlide,
    isTransitioning: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    translateX: 0,
    translateY: 0,
  });
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  
  // Calculate total slides based on current settings
  const totalSlides = infinite 
    ? totalItems + 2 // Add clones for infinite loop
    : Math.ceil(totalItems / currentSettings.slidesToShow);
  
  // Check if we're at first/last slide
  const isFirst = infinite ? false : state.currentSlide === 0;
  const isLast = infinite 
    ? false 
    : state.currentSlide >= totalSlides - 1;
  
  // Update responsive settings based on viewport
  const updateResponsiveSettings = useCallback(() => {
    if (!responsive.length) return;
    
    const width = window.innerWidth;
    let newSettings = { slidesToShow, slidesToScroll };
    
    // Find the matching breakpoint
    const sortedBreakpoints = [...responsive].sort((a, b) => b.breakpoint - a.breakpoint);
    
    for (const bp of sortedBreakpoints) {
      if (width <= bp.breakpoint) {
        newSettings = {
          slidesToShow: bp.slidesToShow,
          slidesToScroll: bp.slidesToScroll || bp.slidesToShow,
        };
      }
    }
    
    setCurrentSettings(newSettings);
  }, [slidesToShow, slidesToScroll, responsive]);
  
  // Initialize responsive settings
  useEffect(() => {
    updateResponsiveSettings();
    window.addEventListener('resize', updateResponsiveSettings);
    return () => window.removeEventListener('resize', updateResponsiveSettings);
  }, [updateResponsiveSettings]);
  
  // Go to specific slide
  const goToSlide = useCallback((index: number, immediate = false) => {
    if (state.isTransitioning && !immediate) return;
    
    const targetSlide = infinite ? index + 1 : index;
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    
    onBeforeSlideChange?.(state.currentSlide, clampedIndex);
    
    setState(prev => ({
      ...prev,
      currentSlide: targetSlide,
      isTransitioning: !immediate,
    }));
    
    if (!immediate) {
      setTimeout(() => {
        setState(prev => ({ ...prev, isTransitioning: false }));
      }, 300);
    }
    
    onSlideChange?.(clampedIndex);
  }, [state.currentSlide, state.isTransitioning, infinite, totalSlides, onSlideChange, onBeforeSlideChange]);
  
  // Handle infinite loop transitions
  const handleInfiniteTransition = useCallback(() => {
    if (!infinite) return;
    
    if (state.currentSlide === 0) {
      // Jump to last real slide
      setTimeout(() => {
        goToSlide(totalItems - 1, true);
      }, 300);
    } else if (state.currentSlide === totalItems + 1) {
      // Jump to first real slide
      setTimeout(() => {
        goToSlide(0, true);
      }, 300);
    }
  }, [state.currentSlide, infinite, totalItems, goToSlide]);
  
  useEffect(() => {
    if (state.isTransitioning) {
      handleInfiniteTransition();
    }
  }, [state.isTransitioning, handleInfiniteTransition]);
  
  // Next slide
  const nextSlide = useCallback(() => {
    if (state.isTransitioning) return;
    
    if (infinite) {
      const nextIndex = state.currentSlide + currentSettings.slidesToScroll;
      goToSlide(nextIndex > totalItems ? 0 : nextIndex - 1);
    } else {
      const nextIndex = Math.min(
        state.currentSlide + currentSettings.slidesToScroll,
        totalSlides - 1
      );
      if (nextIndex !== state.currentSlide) {
        goToSlide(nextIndex);
      }
    }
  }, [state.currentSlide, state.isTransitioning, currentSettings.slidesToScroll, infinite, totalItems, totalSlides, goToSlide]);
  
  // Previous slide
  const prevSlide = useCallback(() => {
    if (state.isTransitioning) return;
    
    if (infinite) {
      const prevIndex = state.currentSlide - currentSettings.slidesToScroll;
      goToSlide(prevIndex < 1 ? totalItems - 1 : prevIndex - 1);
    } else {
      const prevIndex = Math.max(
        state.currentSlide - currentSettings.slidesToScroll,
        0
      );
      if (prevIndex !== state.currentSlide) {
        goToSlide(prevIndex);
      }
    }
  }, [state.currentSlide, state.isTransitioning, currentSettings.slidesToScroll, infinite, totalItems, goToSlide]);
  
  // Autoplay functions
  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);
  
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
  }, []);
  
  // Autoplay effect
  useEffect(() => {
    if (isPlaying && autoplaySpeed > 0) {
      autoplayTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoplaySpeed);
      
      return () => {
        if (autoplayTimerRef.current) {
          clearTimeout(autoplayTimerRef.current);
        }
      };
    }
  }, [isPlaying, autoplaySpeed, state.currentSlide, nextSlide]);
  
  // Pause on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !pauseOnHover) return;
    
    const handleMouseEnter = () => {
      if (autoplay && isPlaying) {
        pause();
      }
    };
    
    const handleMouseLeave = () => {
      if (autoplay) {
        play();
      }
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoplay, isPlaying, pauseOnHover, play, pause]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);
  
  return {
    currentSlide: infinite ? Math.max(0, state.currentSlide - 1) : state.currentSlide,
    totalSlides: totalItems,
    isFirst,
    isLast,
    isTransitioning: state.isTransitioning,
    goToSlide,
    nextSlide,
    prevSlide,
    play,
    pause,
    isPlaying,
  };
};