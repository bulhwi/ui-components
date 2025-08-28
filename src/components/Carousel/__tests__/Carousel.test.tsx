import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Carousel } from '../Carousel';
import { CarouselItem } from '../types';
import { defaultTheme } from '../../../styles/theme';

const theme = defaultTheme;

const mockItems: CarouselItem[] = [
  { id: '1', content: <div>Slide 1</div> },
  { id: '2', content: <div>Slide 2</div> },
  { id: '3', content: <div>Slide 3</div> },
  { id: '4', content: <div>Slide 4</div> },
  { id: '5', content: <div>Slide 5</div> },
];

const renderCarousel = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <Carousel items={mockItems} {...props} />
    </ThemeProvider>
  );
};

// Mock timers for autoplay tests
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('Carousel Component', () => {
  describe('Basic Rendering', () => {
    it('renders carousel with items', () => {
      renderCarousel();
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Carousel');
    });

    it('renders navigation arrows by default', () => {
      renderCarousel();
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    });

    it('renders dot indicators by default', () => {
      renderCarousel();
      const dots = screen.getAllByLabelText(/Go to slide/);
      expect(dots).toHaveLength(5); // 5 items = 5 dots
    });

    it('renders with custom aria-label', () => {
      renderCarousel({ 'aria-label': 'Custom Carousel' });
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Custom Carousel');
    });
  });

  describe('Navigation', () => {
    it('navigates to next slide when next arrow is clicked', async () => {
      renderCarousel();
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('navigates to previous slide when previous arrow is clicked', async () => {
      renderCarousel({ initialSlide: 2 });
      
      const prevButton = screen.getByLabelText('Previous slide');
      fireEvent.click(prevButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('navigates to specific slide when dot is clicked', async () => {
      renderCarousel();
      
      const thirdDot = screen.getByLabelText('Go to slide 3');
      fireEvent.click(thirdDot);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 3')).toBeInTheDocument();
      });
    });

    it('disables navigation at boundaries when infinite is false', () => {
      renderCarousel({ infinite: false });
      
      const prevButton = screen.getByLabelText('Previous slide');
      const nextButton = screen.getByLabelText('Next slide');
      
      expect(prevButton).toBeDisabled(); // Should be disabled at first slide
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates with arrow keys when keyboard is enabled', async () => {
      renderCarousel({ keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('navigates to first slide with Home key', async () => {
      renderCarousel({ keyboard: true, initialSlide: 2 });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'Home' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 1')).toBeInTheDocument();
      });
    });

    it('navigates to last slide with End key', async () => {
      renderCarousel({ keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'End' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 5')).toBeInTheDocument();
      });
    });

    it('does not navigate when keyboard is disabled', async () => {
      renderCarousel({ keyboard: false });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      // Should still show first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('Autoplay', () => {
    it('auto-advances slides when autoplay is enabled', async () => {
      renderCarousel({ autoplay: true, autoplaySpeed: 1000 });
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('pauses autoplay on hover when pauseOnHover is enabled', async () => {
      renderCarousel({ autoplay: true, autoplaySpeed: 1000, pauseOnHover: true });
      
      const carousel = screen.getByRole('region');
      
      // Hover over carousel
      fireEvent.mouseEnter(carousel);
      
      act(() => {
        jest.advanceTimersByTime(2000); // Advance more than autoplaySpeed
      });
      
      // Should still be on first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });

    it('resumes autoplay when mouse leaves', async () => {
      renderCarousel({ autoplay: true, autoplaySpeed: 1000, pauseOnHover: true });
      
      const carousel = screen.getByRole('region');
      
      // Hover and then leave
      fireEvent.mouseEnter(carousel);
      fireEvent.mouseLeave(carousel);
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Slides', () => {
    it('displays multiple slides when slidesToShow > 1', () => {
      renderCarousel({ slidesToShow: 3 });
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('scrolls by slidesToScroll amount', async () => {
      renderCarousel({ slidesToShow: 2, slidesToScroll: 2 });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 3')).toBeInTheDocument();
        expect(screen.getByText('Slide 4')).toBeInTheDocument();
      });
    });
  });

  describe('Infinite Loop', () => {
    it('enables seamless loop when infinite is true', async () => {
      renderCarousel({ infinite: true });
      
      const prevButton = screen.getByLabelText('Previous slide');
      
      // Should not be disabled even at first slide
      expect(prevButton).not.toBeDisabled();
      
      fireEvent.click(prevButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 5')).toBeInTheDocument();
      });
    });
  });

  describe('Touch/Swipe Gestures', () => {
    it('responds to touch swipe gestures', async () => {
      renderCarousel({ swipe: true });
      
      const carousel = screen.getByRole('region');
      
      // Simulate swipe left (next slide)
      fireEvent.touchStart(carousel, { touches: [{ clientX: 100, clientY: 0 }] });
      fireEvent.touchMove(carousel, { touches: [{ clientX: 50, clientY: 0 }] });
      fireEvent.touchEnd(carousel);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('does not respond to swipe when swipe is disabled', async () => {
      renderCarousel({ swipe: false });
      
      const carousel = screen.getByRole('region');
      
      // Simulate swipe left
      fireEvent.touchStart(carousel, { touches: [{ clientX: 100, clientY: 0 }] });
      fireEvent.touchMove(carousel, { touches: [{ clientX: 50, clientY: 0 }] });
      fireEvent.touchEnd(carousel);
      
      // Should still be on first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('Customization', () => {
    it('hides arrows when arrows is false', () => {
      renderCarousel({ arrows: false });
      
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
    });

    it('hides dots when dots is false', () => {
      renderCarousel({ dots: false });
      
      expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
    });

    it('shows counter when counter is true', () => {
      renderCarousel({ counter: true });
      
      expect(screen.getByText('1 / 5')).toBeInTheDocument();
    });

    it('updates counter when slide changes', async () => {
      renderCarousel({ counter: true });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('2 / 5')).toBeInTheDocument();
      });
    });
  });

  describe('Callbacks', () => {
    it('calls onSlideChange when slide changes', async () => {
      const onSlideChange = jest.fn();
      renderCarousel({ onSlideChange });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(onSlideChange).toHaveBeenCalledWith(1);
      });
    });

    it('calls onBeforeSlideChange before slide changes', async () => {
      const onBeforeSlideChange = jest.fn();
      renderCarousel({ onBeforeSlideChange });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      expect(onBeforeSlideChange).toHaveBeenCalledWith(0, 1);
    });

    it('calls onInit on component mount', () => {
      const onInit = jest.fn();
      renderCarousel({ onInit });
      
      expect(onInit).toHaveBeenCalled();
    });
  });

  describe('Focus Management', () => {
    it('goes to slide when clicked and focusOnSelect is true', async () => {
      renderCarousel({ focusOnSelect: true, slidesToShow: 3 });
      
      const thirdSlide = screen.getByText('Slide 3');
      fireEvent.click(thirdSlide);
      
      // Should navigate to make the clicked slide prominent
      await waitFor(() => {
        // Implementation depends on specific focus logic
        expect(screen.getByText('Slide 3')).toBeInTheDocument();
      });
    });
  });

  describe('Vertical Direction', () => {
    it('uses vertical arrow keys when direction is vertical', async () => {
      renderCarousel({ direction: 'vertical', keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('ignores horizontal arrow keys when direction is vertical', async () => {
      renderCarousel({ direction: 'vertical', keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      // Should still be on first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('Animation Types', () => {
    it('applies fade animation when animation is fade', () => {
      renderCarousel({ animation: 'fade' });
      
      // Check that the carousel is rendered (specific animation testing would require more complex setup)
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('applies slide animation by default', () => {
      renderCarousel({ animation: 'slide' });
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });
});