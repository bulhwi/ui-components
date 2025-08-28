import { ReactNode, MouseEvent, TouchEvent } from 'react';

export type CarouselAnimation = 'slide' | 'fade';

export type CarouselDirection = 'horizontal' | 'vertical';

export interface CarouselItem {
  id?: string;
  content: ReactNode;
  alt?: string;
}

export interface CarouselBreakpoint {
  /** Viewport width in pixels */
  breakpoint: number;
  /** Number of slides to show */
  slidesToShow: number;
  /** Number of slides to scroll */
  slidesToScroll?: number;
  /** Gap between slides */
  gap?: number;
}

export interface CarouselProps {
  /** Array of carousel items */
  items: CarouselItem[];
  
  /** Number of slides to show at once */
  slidesToShow?: number;
  
  /** Number of slides to scroll at once */
  slidesToScroll?: number;
  
  /** Animation type for slide transitions */
  animation?: CarouselAnimation;
  
  /** Slide direction */
  direction?: CarouselDirection;
  
  /** Enable infinite looping */
  infinite?: boolean;
  
  /** Enable autoplay */
  autoplay?: boolean;
  
  /** Autoplay interval in milliseconds */
  autoplaySpeed?: number;
  
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  
  /** Show navigation arrows */
  arrows?: boolean;
  
  /** Show indicator dots */
  dots?: boolean;
  
  /** Show slide counter */
  counter?: boolean;
  
  /** Enable touch/swipe gestures */
  swipe?: boolean;
  
  /** Minimum swipe distance to trigger slide */
  swipeThreshold?: number;
  
  /** Gap between slides in pixels */
  gap?: number;
  
  /** Responsive breakpoints */
  responsive?: CarouselBreakpoint[];
  
  /** Transition duration in milliseconds */
  speed?: number;
  
  /** Initial slide index */
  initialSlide?: number;
  
  /** Custom CSS class */
  className?: string;
  
  /** Custom styles */
  style?: React.CSSProperties;
  
  /** Called when slide changes */
  onSlideChange?: (currentSlide: number) => void;
  
  /** Called before slide changes */
  onBeforeSlideChange?: (oldSlide: number, newSlide: number) => void;
  
  /** Called when carousel is initialized */
  onInit?: (carousel: any) => void;
  
  /** Custom previous arrow */
  prevArrow?: ReactNode;
  
  /** Custom next arrow */
  nextArrow?: ReactNode;
  
  /** Custom dot indicator */
  customDot?: (index: number, isActive: boolean) => ReactNode;
  
  /** Enable keyboard navigation */
  keyboard?: boolean;
  
  /** Enable focus management */
  focusOnSelect?: boolean;
  
  /** Accessibility label */
  'aria-label'?: string;
}

export interface CarouselStyleProps {
  $slidesToShow: number;
  $gap: number;
  $animation: CarouselAnimation;
  $direction: CarouselDirection;
  $infinite: boolean;
  $currentSlide: number;
  $totalSlides: number;
  $isTransitioning: boolean;
  $speed: number;
}

export interface CarouselState {
  currentSlide: number;
  isTransitioning: boolean;
  isDragging: boolean;
  startX: number;
  startY: number;
  translateX: number;
  translateY: number;
  autoplayTimer?: ReturnType<typeof setTimeout>;
}

export interface UseCarouselReturn {
  currentSlide: number;
  totalSlides: number;
  isFirst: boolean;
  isLast: boolean;
  isTransitioning: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

export interface CarouselArrowProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CarouselDotProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  className?: string;
}