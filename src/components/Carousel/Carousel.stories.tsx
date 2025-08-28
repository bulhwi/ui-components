import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { CarouselItem } from './types';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile carousel component with support for multiple slides, autoplay, infinite loop, touch gestures, and responsive design.',
      },
    },
  },
  argTypes: {
    slidesToShow: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of slides to show at once',
    },
    slidesToScroll: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of slides to scroll at once',
    },
    animation: {
      control: { type: 'select' },
      options: ['slide', 'fade'],
      description: 'Animation type for transitions',
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Direction of carousel movement',
    },
    infinite: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    autoplay: {
      control: 'boolean',
      description: 'Enable autoplay',
    },
    autoplaySpeed: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
      description: 'Autoplay speed in milliseconds',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay on hover',
    },
    arrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    dots: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
    counter: {
      control: 'boolean',
      description: 'Show slide counter',
    },
    swipe: {
      control: 'boolean',
      description: 'Enable touch/swipe gestures',
    },
    keyboard: {
      control: 'boolean',
      description: 'Enable keyboard navigation',
    },
    focusOnSelect: {
      control: 'boolean',
      description: 'Go to slide when clicked',
    },
    gap: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Gap between slides in pixels',
    },
    speed: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Transition speed in milliseconds',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

// Sample data for stories
const createImageSlides = (count: number): CarouselItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `slide-${i + 1}`,
    content: (
      <div
        style={{
          width: '100%',
          height: '300px',
          background: `linear-gradient(135deg, hsl(${(i * 45) % 360}, 70%, 60%), hsl(${((i * 45) + 60) % 360}, 70%, 80%))`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          borderRadius: '8px',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        Slide {i + 1}
      </div>
    ),
  }));

const createCardSlides = (): CarouselItem[] => [
  {
    id: 'card-1',
    content: (
      <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', height: '200px' }}>
        <h3 style={{ color: '#343a40', marginBottom: '10px' }}>Product 1</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>High-quality product with excellent features and great value.</p>
        <button style={{ marginTop: '15px', padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
      </div>
    ),
  },
  {
    id: 'card-2',
    content: (
      <div style={{ padding: '20px', background: '#e8f5e8', borderRadius: '8px', textAlign: 'center', height: '200px' }}>
        <h3 style={{ color: '#155724', marginBottom: '10px' }}>Product 2</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>Premium solution designed for professionals and businesses.</p>
        <button style={{ marginTop: '15px', padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
      </div>
    ),
  },
  {
    id: 'card-3',
    content: (
      <div style={{ padding: '20px', background: '#fff3cd', borderRadius: '8px', textAlign: 'center', height: '200px' }}>
        <h3 style={{ color: '#856404', marginBottom: '10px' }}>Product 3</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>Innovative technology that transforms the way you work.</p>
        <button style={{ marginTop: '15px', padding: '8px 16px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
      </div>
    ),
  },
  {
    id: 'card-4',
    content: (
      <div style={{ padding: '20px', background: '#f8d7da', borderRadius: '8px', textAlign: 'center', height: '200px' }}>
        <h3 style={{ color: '#721c24', marginBottom: '10px' }}>Product 4</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>Advanced features for enterprise-level requirements.</p>
        <button style={{ marginTop: '15px', padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
      </div>
    ),
  },
  {
    id: 'card-5',
    content: (
      <div style={{ padding: '20px', background: '#d1ecf1', borderRadius: '8px', textAlign: 'center', height: '200px' }}>
        <h3 style={{ color: '#0c5460', marginBottom: '10px' }}>Product 5</h3>
        <p style={{ color: '#6c757d', fontSize: '14px' }}>Reliable and scalable solution for growing teams.</p>
        <button style={{ marginTop: '15px', padding: '8px 16px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px' }}>
          Learn More
        </button>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: createImageSlides(5),
    slidesToShow: 1,
    arrows: true,
    dots: true,
  },
};

export const MultipleSlides: Story = {
  args: {
    items: createImageSlides(8),
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 20,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display multiple slides at once with customizable gap between slides.',
      },
    },
  },
};

export const Autoplay: Story = {
  args: {
    items: createImageSlides(6),
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    infinite: true,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with autoplay enabled. Pauses on hover and supports infinite loop.',
      },
    },
  },
};

export const InfiniteLoop: Story = {
  args: {
    items: createImageSlides(4),
    slidesToShow: 1,
    infinite: true,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Infinite loop carousel allows seamless navigation from last to first slide and vice versa.',
      },
    },
  },
};

export const FadeTransition: Story = {
  args: {
    items: createImageSlides(5),
    slidesToShow: 1,
    animation: 'fade',
    speed: 500,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fade transition animation creates a smooth cross-fade effect between slides.',
      },
    },
  },
};

export const VerticalCarousel: Story = {
  args: {
    items: createImageSlides(5),
    slidesToShow: 1,
    direction: 'vertical',
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical carousel with up/down navigation arrows and keyboard support.',
      },
    },
  },
};

export const ProductCards: Story = {
  args: {
    items: createCardSlides(),
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 16,
    arrows: true,
    dots: true,
    focusOnSelect: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel displaying product cards with focus on select functionality.',
      },
    },
  },
};

export const ResponsiveCarousel: Story = {
  args: {
    items: createImageSlides(8),
    slidesToShow: 4,
    slidesToScroll: 2,
    gap: 16,
    responsive: [
      {
        breakpoint: 1024,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
      {
        breakpoint: 768,
        slidesToShow: 2,
        slidesToScroll: 1,
      },
      {
        breakpoint: 480,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    ],
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive carousel that adapts the number of visible slides based on screen size.',
      },
    },
  },
};

export const WithCounter: Story = {
  args: {
    items: createImageSlides(7),
    slidesToShow: 1,
    arrows: true,
    dots: false,
    counter: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with slide counter instead of dots, showing current position.',
      },
    },
  },
};

export const MinimalCarousel: Story = {
  args: {
    items: createImageSlides(4),
    slidesToShow: 1,
    arrows: false,
    dots: false,
    counter: false,
    swipe: true,
    keyboard: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal carousel with no UI controls, only swipe/touch gestures and autoplay.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  args: {
    items: createImageSlides(6),
    slidesToShow: 1,
    keyboard: true,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with keyboard navigation support. Click to focus and use arrow keys, Home, and End keys.',
      },
    },
  },
};

export const CustomGap: Story = {
  args: {
    items: createCardSlides(),
    slidesToShow: 3,
    slidesToScroll: 1,
    gap: 32,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with custom gap between slides for better spacing.',
      },
    },
  },
};

export const FastTransitions: Story = {
  args: {
    items: createImageSlides(5),
    slidesToShow: 1,
    speed: 150,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with fast transitions for snappy user experience.',
      },
    },
  },
};

export const SlowTransitions: Story = {
  args: {
    items: createImageSlides(5),
    slidesToShow: 1,
    speed: 800,
    arrows: true,
    dots: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with slow, smooth transitions for elegant presentation.',
      },
    },
  },
};