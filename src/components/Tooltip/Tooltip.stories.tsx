import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tooltip component for displaying additional information on hover, click, or focus.

**Features:**
- Multiple positioning options with auto-adjustment
- Various trigger methods (hover, click, focus, manual)
- Theme support (light/dark)
- Configurable delays and animations
- Portal rendering for proper z-index management
- Full accessibility support
- Boundary detection and smart positioning
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top', 'bottom', 'left', 'right',
        'top-start', 'top-end',
        'bottom-start', 'bottom-end',
        'left-start', 'left-end',
        'right-start', 'right-end',
        'auto'
      ],
      description: 'Position of tooltip relative to target',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual'],
      description: 'How tooltip is triggered',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Visual theme',
    },
    delayIn: {
      control: 'number',
      description: 'Delay before showing (ms)',
    },
    delayOut: {
      control: 'number',
      description: 'Delay before hiding (ms)',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show arrow',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width of tooltip',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether tooltip should be disabled',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Whether to close on outside click',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close on Escape key',
    },
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
    trigger: 'hover',
    theme: 'dark',
  },
  render: (args) => (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '2rem',
      padding: '100px',
      textAlign: 'center'
    }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
      
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
      
      <Tooltip content="Top start tooltip" position="top-start">
        <Button>Top Start</Button>
      </Tooltip>
      
      <Tooltip content="Top end tooltip" position="top-end">
        <Button>Top End</Button>
      </Tooltip>
      
      <Tooltip content="Bottom start tooltip" position="bottom-start">
        <Button>Bottom Start</Button>
      </Tooltip>
      
      <Tooltip content="Bottom end tooltip" position="bottom-end">
        <Button>Bottom End</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different tooltip positions relative to the target element.',
      },
    },
  },
};

export const Triggers: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <Tooltip content="Hover to see tooltip" trigger="hover">
        <Button>Hover Trigger</Button>
      </Tooltip>
      
      <Tooltip content="Click to toggle tooltip" trigger="click">
        <Button>Click Trigger</Button>
      </Tooltip>
      
      <Tooltip content="Focus to see tooltip" trigger="focus">
        <Button>Focus Trigger</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different trigger methods: hover, click, and focus.',
      },
    },
  },
};

export const Themes: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center'
    }}>
      <Tooltip content="Light theme tooltip" theme="light" showArrow>
        <Button>Light Theme</Button>
      </Tooltip>
      
      <Tooltip content="Dark theme tooltip" theme="dark" showArrow>
        <Button>Dark Theme</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Light and dark theme variants.',
      },
    },
  },
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center'
    }}>
      <Tooltip content="Tooltip with arrow" showArrow={true}>
        <Button>With Arrow</Button>
      </Tooltip>
      
      <Tooltip content="Tooltip without arrow" showArrow={false}>
        <Button>Without Arrow</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with and without arrows.',
      },
    },
  },
};

export const Delays: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <Tooltip content="No delay" delayIn={0} delayOut={0}>
        <Button>No Delay</Button>
      </Tooltip>
      
      <Tooltip content="500ms delay in" delayIn={500} delayOut={0}>
        <Button>Delay In</Button>
      </Tooltip>
      
      <Tooltip content="500ms delay out" delayIn={0} delayOut={500}>
        <Button>Delay Out</Button>
      </Tooltip>
      
      <Tooltip content="Both delays" delayIn={300} delayOut={300}>
        <Button>Both Delays</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different delay configurations for showing and hiding tooltips.',
      },
    },
  },
};

export const ComplexContent: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <Tooltip 
        content={
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>Rich Content</h4>
            <p style={{ margin: '0 0 8px 0' }}>This tooltip contains:</p>
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              <li>HTML elements</li>
              <li>Multiple paragraphs</li>
              <li>Lists and more</li>
            </ul>
          </div>
        }
        maxWidth={250}
      >
        <Button>Rich Content</Button>
      </Tooltip>
      
      <Tooltip 
        content="This is a very long tooltip text that will wrap to multiple lines and demonstrate the maxWidth property in action."
        maxWidth={200}
      >
        <Button>Long Text</Button>
      </Tooltip>
      
      <Tooltip 
        content={
          <div>
            <code>const example = "code snippet";</code>
            <p style={{ margin: '8px 0 0 0' }}>
              With <a href="#" onClick={(e) => e.preventDefault()}>link</a>
            </p>
          </div>
        }
      >
        <Button>Code & Links</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with complex content including HTML, lists, code, and links.',
      },
    },
  },
};

export const ManualControl: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '2rem', 
        padding: '100px',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setIsVisible(true)}>Show Tooltip</Button>
          <Button onClick={() => setIsVisible(false)}>Hide Tooltip</Button>
          <Button onClick={() => setIsVisible(!isVisible)}>Toggle Tooltip</Button>
        </div>
        
        <Tooltip 
          content={`Manually controlled tooltip. Current state: ${isVisible ? 'visible' : 'hidden'}`}
          trigger="manual"
          visible={isVisible}
          onVisibilityChange={setIsVisible}
        >
          <Button>Target Element</Button>
        </Tooltip>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Manually controlled tooltip visibility with external buttons.',
      },
    },
  },
};

export const AutoPositioning: Story = {
  render: () => (
    <div style={{ height: '200vh', padding: '50px' }}>
      <p>Scroll around and test tooltips near viewport edges:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {/* Top edge */}
        <div style={{ position: 'relative', top: '10px' }}>
          <Tooltip content="Auto-positioned near top edge" position="auto">
            <Button>Near Top Edge</Button>
          </Tooltip>
        </div>
        
        {/* Left edge */}
        <div style={{ position: 'relative', left: '10px' }}>
          <Tooltip content="Auto-positioned near left edge" position="auto">
            <Button>Near Left Edge</Button>
          </Tooltip>
        </div>
        
        {/* Right edge */}
        <div style={{ position: 'relative', right: '10px', textAlign: 'right' }}>
          <Tooltip content="Auto-positioned near right edge" position="auto">
            <Button>Near Right Edge</Button>
          </Tooltip>
        </div>
        
        {/* Center */}
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Tooltip content="Center positioned tooltip" position="auto">
            <Button>Center Position</Button>
          </Tooltip>
        </div>
        
        {/* Bottom area */}
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
          <Tooltip content="Auto-positioned near bottom" position="auto">
            <Button>Near Bottom</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Auto-positioning tooltips that adjust based on available viewport space.',
      },
    },
  },
};

export const DisabledTooltip: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      gap: '2rem', 
      padding: '100px',
      justifyContent: 'center'
    }}>
      <Tooltip content="This tooltip is enabled">
        <Button>Enabled</Button>
      </Tooltip>
      
      <Tooltip content="This tooltip is disabled" disabled>
        <Button disabled>Disabled</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled tooltips will not show even when triggered.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    content: 'Interactive tooltip example',
    position: 'top',
    trigger: 'hover',
    theme: 'dark',
    delayIn: 0,
    delayOut: 0,
    showArrow: true,
    maxWidth: 320,
    disabled: false,
  },
  render: (args) => (
    <div style={{ padding: '100px', textAlign: 'center' }}>
      <Tooltip {...args}>
        <Button>Interactive Example</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive example to test different Tooltip properties.',
      },
    },
  },
};