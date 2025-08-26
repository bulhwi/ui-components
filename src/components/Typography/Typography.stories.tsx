import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';
import { TypographyVariant, TypographyColor } from './types';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Typography component for consistent text display throughout the application.

**Features:**
- Multiple typography variants (h1-h6, body, caption, etc.)
- Color options (primary, secondary, disabled, semantic colors)
- Text alignment and decoration
- Truncation with ellipsis
- Multi-line truncation
- Responsive font sizing
- Code text support
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline', 'code', 'inlineCode'],
      description: 'Typography variant that defines size and styling',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'disabled', 'success', 'warning', 'error', 'info'],
      description: 'Text color',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    truncate: {
      control: 'boolean',
      description: 'Whether to enable text truncation with ellipsis',
    },
    maxLines: {
      control: 'number',
      description: 'Maximum number of lines before truncation',
    },
    underline: {
      control: 'boolean',
      description: 'Whether to underline text',
    },
    strikeThrough: {
      control: 'boolean',
      description: 'Whether to strike through text',
    },
    italic: {
      control: 'boolean',
      description: 'Whether text should be italic',
    },
    children: {
      control: 'text',
      description: 'Content to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'Default typography text',
    variant: 'body1',
  },
};

export const HeadingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">Heading 1 - Main Title</Typography>
      <Typography variant="h2">Heading 2 - Section Title</Typography>
      <Typography variant="h3">Heading 3 - Subsection</Typography>
      <Typography variant="h4">Heading 4 - Sub-subsection</Typography>
      <Typography variant="h5">Heading 5 - Minor Heading</Typography>
      <Typography variant="h6">Heading 6 - Smallest Heading</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different heading variants (h1-h6) with appropriate font sizes and weights.',
      },
    },
  },
};

export const TextVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="subtitle1">Subtitle 1 - Main subtitle text</Typography>
      <Typography variant="subtitle2">Subtitle 2 - Secondary subtitle</Typography>
      <Typography variant="body1">Body 1 - Main body text for paragraphs and content</Typography>
      <Typography variant="body2">Body 2 - Smaller body text for secondary information</Typography>
      <Typography variant="caption">Caption - Small text for labels and captions</Typography>
      <Typography variant="overline">Overline - All caps text for categories</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various text variants for different use cases.',
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography color="primary">Primary text color</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="disabled">Disabled text color</Typography>
      <Typography color="success">Success message color</Typography>
      <Typography color="warning">Warning message color</Typography>
      <Typography color="error">Error message color</Typography>
      <Typography color="info">Information message color</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different color options for semantic meaning and hierarchy.',
      },
    },
  },
};

export const TextAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      <Typography align="left">Left aligned text</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">
        Justified text that will stretch across the full width of the container. 
        This is useful for paragraphs where you want even spacing on both sides.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options: left, center, right, and justify.',
      },
    },
  },
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography weight="normal">Normal weight text</Typography>
      <Typography weight="medium">Medium weight text</Typography>
      <Typography weight="semibold">Semibold weight text</Typography>
      <Typography weight="bold">Bold weight text</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different font weights for emphasis and hierarchy.',
      },
    },
  },
};

export const TextDecorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography>Regular text without decoration</Typography>
      <Typography underline>Underlined text for emphasis</Typography>
      <Typography strikeThrough>Strike-through text for deletions</Typography>
      <Typography italic>Italic text for emphasis</Typography>
      <Typography underline strikeThrough>Combined decorations</Typography>
      <Typography italic underline weight="bold">Multiple styles combined</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text decoration options: underline, strike-through, and italic.',
      },
    },
  },
};

export const TextTruncation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <div>
        <Typography variant="subtitle2" color="secondary">Single Line Truncation:</Typography>
        <Typography truncate>
          This is a very long text that will be truncated with ellipsis when it exceeds the container width
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" color="secondary">Multi-line Truncation (2 lines):</Typography>
        <Typography maxLines={2}>
          This is a longer text that demonstrates multi-line truncation. It will show up to 2 lines 
          and then truncate with ellipsis. This is useful for cards and previews where you want to 
          limit the amount of text displayed while maintaining readability.
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" color="secondary">Multi-line Truncation (3 lines):</Typography>
        <Typography maxLines={3}>
          This is an even longer text that demonstrates multi-line truncation with 3 lines maximum. 
          This approach is perfect for article previews, product descriptions, or any content where 
          you need to show more context while still maintaining a consistent layout. The text will 
          be cut off cleanly after the specified number of lines.
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text truncation options: single line with ellipsis and multi-line truncation.',
      },
    },
  },
};

export const CodeText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <Typography variant="subtitle2" color="secondary">Inline Code:</Typography>
        <Typography variant="body1">
          Use <Typography variant="inlineCode" as="span">const variable = true;</Typography> for inline code snippets.
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle2" color="secondary">Code Block:</Typography>
        <Typography variant="code">{`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}</Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Code text variants for inline code and code blocks.',
      },
    },
  },
};

export const ResponsiveText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">Responsive Heading</Typography>
      <Typography variant="h2">Responsive Subheading</Typography>
      <Typography variant="body1">
        This text demonstrates responsive typography. The font sizes will adjust 
        automatically on smaller screens for better readability. Try resizing your 
        browser window or viewing on different devices to see the effect.
      </Typography>
      <Typography variant="caption" color="secondary">
        Resize the viewport to see responsive font sizing in action
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Typography automatically adjusts font sizes for different screen sizes.',
      },
    },
  },
};

export const CustomElement: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography variant="h3" as="span">H3 styled as span element</Typography>
      <Typography variant="body1" as="div">Body text as div element</Typography>
      <Typography variant="caption" as="label">Caption as label element</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using custom HTML elements while maintaining typography styling.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive typography example',
    variant: 'body1',
    color: 'primary',
    align: 'left',
    weight: 'normal',
    truncate: false,
    underline: false,
    strikeThrough: false,
    italic: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example to test different Typography properties.',
      },
    },
  },
};