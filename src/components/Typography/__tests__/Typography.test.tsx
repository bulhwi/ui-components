import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Typography } from '../Typography';
import { lightTheme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Typography', () => {
  it('renders children correctly', () => {
    renderWithTheme(<Typography>Test text</Typography>);
    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('applies default variant (body1)', () => {
    renderWithTheme(<Typography>Default text</Typography>);
    const element = screen.getByText('Default text');
    expect(element.tagName).toBe('P'); // Default element for body1
  });

  it('renders different variants with correct semantic elements', () => {
    const testCases = [
      { variant: 'h1', expectedTag: 'H1' },
      { variant: 'h2', expectedTag: 'H2' },
      { variant: 'h3', expectedTag: 'H3' },
      { variant: 'h4', expectedTag: 'H4' },
      { variant: 'h5', expectedTag: 'H5' },
      { variant: 'h6', expectedTag: 'H6' },
      { variant: 'body1', expectedTag: 'P' },
      { variant: 'body2', expectedTag: 'P' },
      { variant: 'caption', expectedTag: 'SPAN' },
      { variant: 'overline', expectedTag: 'SPAN' },
      { variant: 'code', expectedTag: 'PRE' },
      { variant: 'inlineCode', expectedTag: 'CODE' },
    ] as const;

    testCases.forEach(({ variant, expectedTag }) => {
      const { unmount } = renderWithTheme(
        <Typography variant={variant}>{variant} text</Typography>
      );
      
      const element = screen.getByText(`${variant} text`);
      expect(element.tagName).toBe(expectedTag);
      
      unmount();
    });
  });

  it('uses custom element when "as" prop is provided', () => {
    renderWithTheme(
      <Typography variant="h1" as="span">Custom element</Typography>
    );
    
    const element = screen.getByText('Custom element');
    expect(element.tagName).toBe('SPAN');
  });

  it('applies color variants correctly', () => {
    const colorVariants = ['primary', 'secondary', 'disabled', 'success', 'warning', 'error', 'info'] as const;
    
    colorVariants.forEach((color) => {
      const { unmount } = renderWithTheme(
        <Typography color={color} data-testid={`color-${color}`}>
          {color} text
        </Typography>
      );
      
      const element = screen.getByTestId(`color-${color}`);
      expect(element).toBeInTheDocument();
      
      unmount();
    });
  });

  it('applies text alignment correctly', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;
    
    alignments.forEach((align) => {
      const { unmount } = renderWithTheme(
        <Typography align={align} data-testid={`align-${align}`}>
          {align} text
        </Typography>
      );
      
      const element = screen.getByTestId(`align-${align}`);
      expect(element).toBeInTheDocument();
      
      unmount();
    });
  });

  it('applies font weights correctly', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const;
    
    weights.forEach((weight) => {
      const { unmount } = renderWithTheme(
        <Typography weight={weight} data-testid={`weight-${weight}`}>
          {weight} text
        </Typography>
      );
      
      const element = screen.getByTestId(`weight-${weight}`);
      expect(element).toBeInTheDocument();
      
      unmount();
    });
  });

  it('applies text decorations correctly', () => {
    renderWithTheme(
      <Typography underline data-testid="underline">Underlined text</Typography>
    );
    expect(screen.getByTestId('underline')).toBeInTheDocument();

    renderWithTheme(
      <Typography strikeThrough data-testid="strike">Strike-through text</Typography>
    );
    expect(screen.getByTestId('strike')).toBeInTheDocument();

    renderWithTheme(
      <Typography italic data-testid="italic">Italic text</Typography>
    );
    expect(screen.getByTestId('italic')).toBeInTheDocument();
  });

  it('applies truncation correctly', () => {
    renderWithTheme(
      <Typography truncate data-testid="truncated">
        Very long text that should be truncated
      </Typography>
    );
    
    const element = screen.getByTestId('truncated');
    expect(element).toBeInTheDocument();
  });

  it('applies multi-line truncation correctly', () => {
    renderWithTheme(
      <Typography maxLines={2} data-testid="multi-line">
        Very long text that should be truncated after multiple lines
      </Typography>
    );
    
    const element = screen.getByTestId('multi-line');
    expect(element).toBeInTheDocument();
  });

  it('passes additional props correctly', () => {
    renderWithTheme(
      <Typography 
        data-testid="custom-props" 
        id="custom-id"
        role="text"
        aria-label="Custom label"
      >
        Text with props
      </Typography>
    );
    
    const element = screen.getByTestId('custom-props');
    expect(element).toHaveAttribute('id', 'custom-id');
    expect(element).toHaveAttribute('role', 'text');
    expect(element).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies custom className', () => {
    renderWithTheme(
      <Typography className="custom-class" data-testid="custom-class">
        Text with class
      </Typography>
    );
    
    const element = screen.getByTestId('custom-class');
    expect(element).toHaveClass('custom-class');
  });

  it('handles code variants correctly', () => {
    const { unmount } = renderWithTheme(
      <Typography variant="code">
        function test() {'{'}
        {'  '}console.log('code');
        {'}'}
      </Typography>
    );
    
    const element = screen.getByText(/function test/);
    expect(element.tagName).toBe('PRE');
    
    unmount();

    renderWithTheme(
      <Typography variant="inlineCode">inline code</Typography>
    );
    
    const inlineElement = screen.getByText('inline code');
    expect(inlineElement.tagName).toBe('CODE');
  });

  it('handles nested Typography components', () => {
    renderWithTheme(
      <Typography variant="body1">
        Regular text with{' '}
        <Typography variant="inlineCode" as="span">inline code</Typography>
        {' '}in between.
      </Typography>
    );
    
    expect(screen.getByText('Regular text with')).toBeInTheDocument();
    expect(screen.getByText('inline code')).toBeInTheDocument();
    expect(screen.getByText('in between.')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLParagraphElement>();
    
    renderWithTheme(
      <Typography ref={ref}>Ref test</Typography>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.textContent).toBe('Ref test');
  });

  it('has correct display name', () => {
    expect(Typography.displayName).toBe('Typography');
  });

  it('renders empty children gracefully', () => {
    renderWithTheme(<Typography />);
    const elements = document.querySelectorAll('p');
    expect(elements[elements.length - 1]).toBeInTheDocument();
  });

  it('handles boolean false children', () => {
    renderWithTheme(<Typography>{false}</Typography>);
    const elements = document.querySelectorAll('p');
    expect(elements[elements.length - 1]).toBeInTheDocument();
  });

  it('handles number children', () => {
    renderWithTheme(<Typography>{42}</Typography>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies multiple props simultaneously', () => {
    renderWithTheme(
      <Typography
        variant="h2"
        color="primary"
        align="center"
        weight="bold"
        italic
        underline
        data-testid="multiple-props"
      >
        Multiple props text
      </Typography>
    );
    
    const element = screen.getByTestId('multiple-props');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H2');
  });
});