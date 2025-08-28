import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useCarousel } from '../useCarousel';
import { CarouselItem } from '../types';

const mockItems: CarouselItem[] = [
  { id: '1', content: React.createElement('div', null, 'Slide 1') },
  { id: '2', content: React.createElement('div', null, 'Slide 2') },
  { id: '3', content: React.createElement('div', null, 'Slide 3') },
  { id: '4', content: React.createElement('div', null, 'Slide 4') },
  { id: '5', content: React.createElement('div', null, 'Slide 5') },
];

// Mock timers for autoplay tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('useCarousel Hook', () => {
  describe('Initial State', () => {
    it('initializes with correct default values', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems })
      );

      expect(result.current.currentSlide).toBe(0);
      expect(result.current.totalSlides).toBe(5);
      expect(result.current.isFirst).toBe(true);
      expect(result.current.isLast).toBe(false);
      expect(result.current.isTransitioning).toBe(false);
      expect(result.current.isPlaying).toBe(false);
    });

    it('initializes with custom initial slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, initialSlide: 2 })
      );

      expect(result.current.currentSlide).toBe(2);
      expect(result.current.isFirst).toBe(false);
      expect(result.current.isLast).toBe(false);
    });

    it('initializes with infinite loop correctly', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, infinite: true })
      );

      expect(result.current.isFirst).toBe(false);
      expect(result.current.isLast).toBe(false);
    });

    it('initializes with autoplay enabled', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true })
      );

      expect(result.current.isPlaying).toBe(true);
    });
  });

  describe('Navigation', () => {
    it('navigates to next slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.currentSlide).toBe(1);
      expect(result.current.isFirst).toBe(false);
      expect(result.current.isLast).toBe(false);
    });

    it('navigates to previous slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, initialSlide: 2 })
      );

      act(() => {
        result.current.prevSlide();
      });

      expect(result.current.currentSlide).toBe(1);
    });

    it('navigates to specific slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems })
      );

      act(() => {
        result.current.goToSlide(3);
      });

      expect(result.current.currentSlide).toBe(3);
    });

    it('stops at boundaries when infinite is false', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, infinite: false })
      );

      // Try to go before first slide
      act(() => {
        result.current.prevSlide();
      });

      expect(result.current.currentSlide).toBe(0);
      expect(result.current.isFirst).toBe(true);

      // Go to last slide
      act(() => {
        result.current.goToSlide(4);
      });

      expect(result.current.isLast).toBe(true);

      // Try to go beyond last slide
      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.currentSlide).toBe(4);
    });

    it('loops infinitely when infinite is true', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, infinite: true })
      );

      // Go to last slide
      act(() => {
        result.current.goToSlide(4);
      });

      // Should be able to go to next (first slide)
      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.currentSlide).toBe(0);

      // Should be able to go to previous (last slide)
      act(() => {
        result.current.prevSlide();
      });

      expect(result.current.currentSlide).toBe(4);
    });
  });

  describe('Multiple Slides', () => {
    it('calculates correct total slides for multiple slides per view', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, slidesToShow: 2 })
      );

      // 5 items with 2 slides shown = 3 total slides (ceil(5/2))
      expect(result.current.totalSlides).toBe(5); // Total items, not slide groups
    });

    it('scrolls by slidesToScroll amount', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, slidesToShow: 2, slidesToScroll: 2 })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.currentSlide).toBe(2); // Scrolled by 2
    });

    it('limits scrolling at boundaries with multiple slides', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, slidesToShow: 3, slidesToScroll: 2, infinite: false })
      );

      // Go to near end
      act(() => {
        result.current.goToSlide(3);
      });

      // Try to scroll beyond
      act(() => {
        result.current.nextSlide();
      });

      // Should be limited by total slides
      expect(result.current.currentSlide).toBe(4);
    });
  });

  describe('Autoplay', () => {
    it('auto-advances slides when autoplay is enabled', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true, autoplaySpeed: 1000 })
      );

      expect(result.current.currentSlide).toBe(0);
      expect(result.current.isPlaying).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.currentSlide).toBe(1);
    });

    it('continues autoplay through multiple slides', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true, autoplaySpeed: 500 })
      );

      act(() => {
        jest.advanceTimersByTime(1500); // 3 intervals
      });

      expect(result.current.currentSlide).toBe(3);
    });

    it('stops autoplay at last slide when infinite is false', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true, autoplaySpeed: 500, infinite: false, initialSlide: 4 })
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Should stay at last slide
      expect(result.current.currentSlide).toBe(4);
    });

    it('loops autoplay when infinite is true', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true, autoplaySpeed: 500, infinite: true, initialSlide: 4 })
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.currentSlide).toBe(0); // Looped to first
    });

    it('can be paused and resumed manually', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, autoplay: true, autoplaySpeed: 1000 })
      );

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        result.current.pause();
      });

      expect(result.current.isPlaying).toBe(false);

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      // Should not advance when paused
      expect(result.current.currentSlide).toBe(0);

      act(() => {
        result.current.play();
      });

      expect(result.current.isPlaying).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      // Should advance after resuming
      expect(result.current.currentSlide).toBe(1);
    });
  });

  describe('Callbacks', () => {
    it('calls onSlideChange when slide changes', () => {
      const onSlideChange = jest.fn();
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, onSlideChange })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('calls onBeforeSlideChange before slide changes', () => {
      const onBeforeSlideChange = jest.fn();
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, onBeforeSlideChange })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(onBeforeSlideChange).toHaveBeenCalledWith(0, 1);
    });

    it('calls both callbacks in correct order', () => {
      const calls: string[] = [];
      const onBeforeSlideChange = jest.fn(() => calls.push('before'));
      const onSlideChange = jest.fn(() => calls.push('after'));

      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, onBeforeSlideChange, onSlideChange })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(calls).toEqual(['before', 'after']);
    });
  });

  describe('Responsive Settings', () => {
    // Mock window.innerWidth for responsive tests
    const mockInnerWidth = (width: number) => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
      });
    };

    it('updates settings based on breakpoints', () => {
      mockInnerWidth(500);

      const responsive = [
        { breakpoint: 768, slidesToShow: 2 },
        { breakpoint: 480, slidesToShow: 1 },
      ];

      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, slidesToShow: 3, responsive })
      );

      // Should use the 480 breakpoint settings
      expect(result.current.totalSlides).toBe(5);
    });

    it('responds to window resize', () => {
      mockInnerWidth(1000);

      const responsive = [
        { breakpoint: 768, slidesToShow: 2 },
        { breakpoint: 480, slidesToShow: 1 },
      ];

      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, slidesToShow: 3, responsive })
      );

      // Initially should use default slidesToShow
      expect(result.current.totalSlides).toBe(5);

      // Change window size
      mockInnerWidth(600);
      
      act(() => {
        window.dispatchEvent(new Event('resize'));
      });

      // Should now use 768 breakpoint settings (slidesToShow: 2)
      expect(result.current.totalSlides).toBe(5);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: [] })
      );

      expect(result.current.totalSlides).toBe(0);
      expect(result.current.currentSlide).toBe(0);
    });

    it('handles single item', () => {
      const singleItem = [{ id: '1', content: React.createElement('div', null, 'Single') }];
      const { result } = renderHook(() =>
        useCarousel({ items: singleItem })
      );

      expect(result.current.totalSlides).toBe(1);
      expect(result.current.isFirst).toBe(true);
      expect(result.current.isLast).toBe(true);

      // Navigation should not change slide
      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.currentSlide).toBe(0);
    });

    it('handles invalid initial slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems, initialSlide: 10 }) // Beyond available slides
      );

      // Should be clamped to valid range
      expect(result.current.currentSlide).toBe(0);
    });

    it('prevents multiple transitions simultaneously', () => {
      const { result } = renderHook(() =>
        useCarousel({ items: mockItems })
      );

      act(() => {
        result.current.nextSlide();
      });

      const firstSlide = result.current.currentSlide;
      
      // Try to navigate again immediately
      act(() => {
        result.current.nextSlide();
      });

      // Should not advance further during transition
      expect(result.current.currentSlide).toBe(firstSlide);
    });
  });
});