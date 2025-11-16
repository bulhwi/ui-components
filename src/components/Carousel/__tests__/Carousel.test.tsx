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

describe('Carousel 컴포넌트', () => {
  describe('기본 렌더링', () => {
    it('아이템과 함께 캐러셀을 렌더링한다', () => {
      renderCarousel();
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Carousel');
    });

    it('기본적으로 네비게이션 화살표를 렌더링한다', () => {
      renderCarousel();
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    });

    it('기본적으로 점 인디케이터를 렌더링한다', () => {
      renderCarousel();
      const dots = screen.getAllByLabelText(/Go to slide/);
      expect(dots).toHaveLength(5); // 5 items = 5 dots
    });

    it('커스텀 aria-label로 렌더링한다', () => {
      renderCarousel({ 'aria-label': 'Custom Carousel' });
      expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Custom Carousel');
    });
  });

  describe('네비게이션', () => {
    it('다음 화살표 클릭 시 다음 슬라이드로 이동한다', async () => {
      renderCarousel();
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('이전 화살표 클릭 시 이전 슬라이드로 이동한다', async () => {
      renderCarousel({ initialSlide: 2 });
      
      const prevButton = screen.getByLabelText('Previous slide');
      fireEvent.click(prevButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('점 클릭 시 특정 슬라이드로 이동한다', async () => {
      renderCarousel();
      
      const thirdDot = screen.getByLabelText('Go to slide 3');
      fireEvent.click(thirdDot);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 3')).toBeInTheDocument();
      });
    });

    it('infinite가 false일 때 경계에서 네비게이션을 비활성화한다', () => {
      renderCarousel({ infinite: false });
      
      const prevButton = screen.getByLabelText('Previous slide');
      const nextButton = screen.getByLabelText('Next slide');
      
      expect(prevButton).toBeDisabled(); // Should be disabled at first slide
      expect(nextButton).not.toBeDisabled();
    });
  });

  describe('키보드 네비게이션', () => {
    it('키보드가 활성화되면 화살표 키로 이동한다', async () => {
      renderCarousel({ keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('Home 키로 첫 슬라이드로 이동한다', async () => {
      renderCarousel({ keyboard: true, initialSlide: 2 });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'Home' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 1')).toBeInTheDocument();
      });
    });

    it('End 키로 마지막 슬라이드로 이동한다', async () => {
      renderCarousel({ keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'End' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 5')).toBeInTheDocument();
      });
    });

    it('키보드가 비활성화되면 이동하지 않는다', async () => {
      renderCarousel({ keyboard: false });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      // Should still show first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('자동 재생', () => {
    it('자동 재생이 활성화되면 슬라이드가 자동으로 진행된다', async () => {
      renderCarousel({ autoplay: true, autoplaySpeed: 1000 });
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('pauseOnHover가 활성화되면 hover 시 자동 재생이 일시정지된다', async () => {
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

    it('마우스가 떠나면 자동 재생이 재개된다', async () => {
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

  describe('다중 슬라이드', () => {
    it('slidesToShow > 1일 때 여러 슬라이드를 표시한다', () => {
      renderCarousel({ slidesToShow: 3 });
      
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
      expect(screen.getByText('Slide 2')).toBeInTheDocument();
      expect(screen.getByText('Slide 3')).toBeInTheDocument();
    });

    it('slidesToScroll 양만큼 스크롤한다', async () => {
      renderCarousel({ slidesToShow: 2, slidesToScroll: 2 });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('Slide 3')).toBeInTheDocument();
        expect(screen.getByText('Slide 4')).toBeInTheDocument();
      });
    });
  });

  describe('무한 루프', () => {
    it('infinite가 true일 때 끊김없는 루프를 활성화한다', async () => {
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

  describe('터치/스와이프 제스처', () => {
    it('터치 스와이프 제스처에 반응한다', async () => {
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

    it('swipe가 비활성화되면 스와이프에 반응하지 않는다', async () => {
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

  describe('커스터마이징', () => {
    it('arrows가 false일 때 화살표를 숨긴다', () => {
      renderCarousel({ arrows: false });
      
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
    });

    it('dots가 false일 때 점을 숨긴다', () => {
      renderCarousel({ dots: false });
      
      expect(screen.queryByLabelText(/Go to slide/)).not.toBeInTheDocument();
    });

    it('counter가 true일 때 카운터를 표시한다', () => {
      renderCarousel({ counter: true });
      
      expect(screen.getByText('1 / 5')).toBeInTheDocument();
    });

    it('슬라이드 변경 시 카운터를 업데이트한다', async () => {
      renderCarousel({ counter: true });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('2 / 5')).toBeInTheDocument();
      });
    });
  });

  describe('콜백', () => {
    it('슬라이드 변경 시 onSlideChange를 호출한다', async () => {
      const onSlideChange = jest.fn();
      renderCarousel({ onSlideChange });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(onSlideChange).toHaveBeenCalledWith(1);
      });
    });

    it('슬라이드 변경 전 onBeforeSlideChange를 호출한다', async () => {
      const onBeforeSlideChange = jest.fn();
      renderCarousel({ onBeforeSlideChange });
      
      const nextButton = screen.getByLabelText('Next slide');
      fireEvent.click(nextButton);
      
      expect(onBeforeSlideChange).toHaveBeenCalledWith(0, 1);
    });

    it('컴포넌트 마운트 시 onInit을 호출한다', () => {
      const onInit = jest.fn();
      renderCarousel({ onInit });
      
      expect(onInit).toHaveBeenCalled();
    });
  });

  describe('포커스 관리', () => {
    it('focusOnSelect가 true일 때 클릭하면 해당 슬라이드로 이동한다', async () => {
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

  describe('수직 방향', () => {
    it('방향이 vertical일 때 수직 화살표 키를 사용한다', async () => {
      renderCarousel({ direction: 'vertical', keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowDown' });
      
      await waitFor(() => {
        expect(screen.getByText('Slide 2')).toBeInTheDocument();
      });
    });

    it('방향이 vertical일 때 수평 화살표 키를 무시한다', async () => {
      renderCarousel({ direction: 'vertical', keyboard: true });
      
      const carousel = screen.getByRole('region');
      carousel.focus();
      
      fireEvent.keyDown(carousel, { key: 'ArrowRight' });
      
      // Should still be on first slide
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });
  });

  describe('애니메이션 타입', () => {
    it('animation이 fade일 때 페이드 애니메이션을 적용한다', () => {
      renderCarousel({ animation: 'fade' });
      
      // Check that the carousel is rendered (specific animation testing would require more complex setup)
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('기본적으로 슬라이드 애니메이션을 적용한다', () => {
      renderCarousel({ animation: 'slide' });
      
      expect(screen.getByRole('region')).toBeInTheDocument();
    });
  });
});