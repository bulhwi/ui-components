import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { BadgeWrapper } from './BadgeWrapper';
import { Button } from '../Button';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Badge component for displaying status indicators, counts, and labels.

**Features:**
- Multiple variants (filled, outlined, soft, dot)
- Color themes (primary, secondary, success, warning, error, info)
- Size options (small, medium, large)
- Position support for overlay badges
- Count display with max value
- Closable badges
- Icon support
- Dot-only display
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'soft', 'dot'],
      description: 'Badge variant style',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Badge color theme',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position relative to parent',
    },
    visible: {
      control: 'boolean',
      description: 'Whether badge should be visible',
    },
    count: {
      control: 'number',
      description: 'Numeric count to display',
    },
    maxCount: {
      control: 'number',
      description: 'Maximum count before showing plus',
    },
    showZero: {
      control: 'boolean',
      description: 'Show zero count',
    },
    closable: {
      control: 'boolean',
      description: 'Whether badge can be dismissed',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to show as dot only',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'New',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge variant="filled" color="primary">Filled</Badge>
      <Badge variant="outlined" color="primary">Outlined</Badge>
      <Badge variant="soft" color="primary">Soft</Badge>
      <Badge variant="dot" color="primary" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge variants: filled, outlined, soft, and dot.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge color themes for different semantic meanings.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different badge sizes: small, medium, and large.',
      },
    },
  },
};

export const CountBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div>
        <h4>Count Examples:</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Badge count={0}>Zero (hidden)</Badge>
          <Badge count={0} showZero>Zero (shown)</Badge>
          <Badge count={1}>One</Badge>
          <Badge count={9}>Nine</Badge>
          <Badge count={99}>Ninety Nine</Badge>
          <Badge count={100}>Over Max</Badge>
          <Badge count={1000} maxCount={999}>Custom Max</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Count badges with different numeric values and max count handling.',
      },
    },
  },
};

export const DotBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge dot color="success" />
      <Badge dot color="warning" />
      <Badge dot color="error" />
      <Badge dot color="info" size="small" />
      <Badge dot color="primary" size="large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dot badges for simple status indicators without text.',
      },
    },
  },
};

export const ClosableBadges: Story = {
  render: () => {
    const handleClose = () => {
      alert('Badge closed!');
    };

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge closable onClose={handleClose}>Closable</Badge>
        <Badge closable onClose={handleClose} color="success">Success</Badge>
        <Badge closable onClose={handleClose} color="error" variant="soft">Error</Badge>
        <Badge closable onClose={handleClose} size="large">Large</Badge>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Badges with close functionality for dismissible content.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Badge icon={<span>🎉</span>}>Celebration</Badge>
      <Badge icon={<span>⚠️</span>} color="warning">Warning</Badge>
      <Badge icon={<span>✅</span>} color="success">Complete</Badge>
      <Badge icon={<span>🔥</span>} color="error">Hot</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with icons for enhanced visual communication.',
      },
    },
  },
};

export const PositionedOverlays: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: '3rem', justifyContent: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" style={{ width: '120px' }}>
          Notifications
        </Button>
        <Badge count={5} position="top-right" color="error" />
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" style={{ width: '120px' }}>
          Messages
        </Button>
        <Badge count={99} position="top-left" color="primary" />
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" style={{ width: '120px' }}>
          Settings
        </Button>
        <Badge dot position="bottom-right" color="success" />
      </div>
      
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="outlined" style={{ width: '120px' }}>
          Profile
        </Button>
        <Badge count={3} position="bottom-left" color="warning" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges positioned as overlays on other elements.',
      },
    },
  },
};

export const BadgeWrapperExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <BadgeWrapper 
        badge={{ count: 12, position: 'top-right', color: 'error' }}
      >
        <Button>Inbox</Button>
      </BadgeWrapper>
      
      <BadgeWrapper 
        badge={{ dot: true, position: 'top-right', color: 'success' }}
        inline
      >
        <div style={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%', 
          background: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          👤
        </div>
      </BadgeWrapper>
      
      <BadgeWrapper 
        badge={{ count: 99, maxCount: 50, position: 'bottom-right', color: 'warning' }}
      >
        <Button variant="ghost">Downloads</Button>
      </BadgeWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using BadgeWrapper for easy positioning of badges on elements.',
      },
    },
  },
};

export const AllVariantsDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Color variants for each style */}
      {(['filled', 'outlined', 'soft'] as const).map(variant => (
        <div key={variant}>
          <h4 style={{ marginBottom: '1rem', textTransform: 'capitalize' }}>{variant} Variant:</h4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge variant={variant} color="primary">Primary</Badge>
            <Badge variant={variant} color="secondary">Secondary</Badge>
            <Badge variant={variant} color="success">Success</Badge>
            <Badge variant={variant} color="warning">Warning</Badge>
            <Badge variant={variant} color="error">Error</Badge>
            <Badge variant={variant} color="info">Info</Badge>
          </div>
        </div>
      ))}
      
      {/* Dot variants */}
      <div>
        <h4 style={{ marginBottom: '1rem' }}>Dot Variant:</h4>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Badge variant="dot" color="primary" />
          <Badge variant="dot" color="secondary" />
          <Badge variant="dot" color="success" />
          <Badge variant="dot" color="warning" />
          <Badge variant="dot" color="error" />
          <Badge variant="dot" color="info" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all badge variants and colors.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Badge',
    variant: 'filled',
    color: 'primary',
    size: 'medium',
    closable: false,
    dot: false,
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example to test different Badge properties.',
      },
    },
  },
};