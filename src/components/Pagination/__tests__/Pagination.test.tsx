import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Pagination } from '../Pagination';
import { lightTheme } from '../../../styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Pagination', () => {
  const defaultProps = {
    current: 1,
    total: 100,
    pageSize: 10,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination with basic props', () => {
    renderWithTheme(<Pagination {...defaultProps} />);
    
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
  });

  it('handles page change correctly', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination {...defaultProps} onChange={onChange} />
    );
    
    const nextButton = screen.getByTestId('pagination-next');
    await user.click(nextButton);
    
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it('disables previous button on first page', () => {
    renderWithTheme(<Pagination {...defaultProps} current={1} />);
    
    const prevButton = screen.getByTestId('pagination-prev');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    renderWithTheme(<Pagination {...defaultProps} current={10} />);
    
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toBeDisabled();
  });

  it('highlights current page', () => {
    renderWithTheme(<Pagination {...defaultProps} current={3} />);
    
    const currentPageButton = screen.getByTestId('pagination-page-3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('shows page size selector when enabled', () => {
    renderWithTheme(
      <Pagination
        {...defaultProps}
        showSizeChanger
        pageSizeOptions={[10, 20, 50]}
      />
    );
    
    expect(screen.getByLabelText('Items per page')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('handles page size change', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination
        {...defaultProps}
        showSizeChanger
        pageSizeOptions={[10, 20, 50]}
        onChange={onChange}
      />
    );
    
    const sizeSelector = screen.getByLabelText('Items per page');
    await user.selectOptions(sizeSelector, '20');
    
    expect(onChange).toHaveBeenCalledWith(1, 20);
  });

  it('shows total items when enabled', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showTotal />
    );
    
    expect(screen.getByText('Showing 1-10 of 100 items')).toBeInTheDocument();
  });

  it('shows custom total display', () => {
    const customTotal = (total: number, range: [number, number]) =>
      `Items ${range[0]} to ${range[1]} of ${total}`;
      
    renderWithTheme(
      <Pagination {...defaultProps} showTotal={customTotal} />
    );
    
    expect(screen.getByText('Items 1 to 10 of 100')).toBeInTheDocument();
  });

  it('shows quick jumper when enabled', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showQuickJumper />
    );
    
    expect(screen.getByLabelText('Jump to page')).toBeInTheDocument();
  });

  it('handles quick jump to page', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination
        {...defaultProps}
        showQuickJumper
        onChange={onChange}
      />
    );
    
    const jumpInput = screen.getByLabelText('Jump to page');
    await user.type(jumpInput, '5');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith(5, 10);
  });

  it('shows first and last buttons when enabled', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showFirstLast />
    );
    
    expect(screen.getByTestId('pagination-first')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-last')).toBeInTheDocument();
  });

  it('handles first and last button clicks', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination
        {...defaultProps}
        current={5}
        showFirstLast
        onChange={onChange}
      />
    );
    
    const firstButton = screen.getByTestId('pagination-first');
    await user.click(firstButton);
    expect(onChange).toHaveBeenCalledWith(1, 10);
    
    const lastButton = screen.getByTestId('pagination-last');
    await user.click(lastButton);
    expect(onChange).toHaveBeenCalledWith(10, 10);
  });

  it('renders simple variant correctly', () => {
    renderWithTheme(
      <Pagination {...defaultProps} variant="simple" />
    );
    
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-page-1')).not.toBeInTheDocument();
  });

  it('renders simple variant with custom total', () => {
    const customTotal = (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total}`;
      
    renderWithTheme(
      <Pagination
        {...defaultProps}
        variant="simple"
        showTotal={customTotal}
      />
    );
    
    expect(screen.getByText('1-10 of 100')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    renderWithTheme(<Pagination {...defaultProps} disabled />);
    
    const prevButton = screen.getByTestId('pagination-prev');
    const nextButton = screen.getByTestId('pagination-next');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('hides on single page when enabled', () => {
    const { container } = renderWithTheme(
      <Pagination
        {...defaultProps}
        total={5}
        pageSize={10}
        hideOnSinglePage
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('shows on single page when hideOnSinglePage is false', () => {
    renderWithTheme(
      <Pagination
        {...defaultProps}
        total={5}
        pageSize={10}
        hideOnSinglePage={false}
      />
    );
    
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
  });

  it('renders with custom navigation text', () => {
    renderWithTheme(
      <Pagination
        {...defaultProps}
        showFirstLast
        prevText="Previous"
        nextText="Next"
        firstText="First"
        lastText="Last"
      />
    );
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('shows ellipsis for many pages', () => {
    renderWithTheme(
      <Pagination
        {...defaultProps}
        current={50}
        total={1000}
        pageSize={10}
      />
    );
    
    // Should have ellipsis somewhere
    const ellipsisButtons = screen.getAllByRole('button', { name: /more/i });
    expect(ellipsisButtons.length).toBeGreaterThan(0);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination {...defaultProps} onChange={onChange} />
    );
    
    const nextButton = screen.getByTestId('pagination-next');
    nextButton.focus();
    
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(<Pagination {...defaultProps} current={3} />);
    
    const currentPageButton = screen.getByTestId('pagination-page-3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    
    const prevButton = screen.getByTestId('pagination-prev');
    expect(prevButton).toHaveAttribute('aria-label', 'Go to previous page');
    
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toHaveAttribute('aria-label', 'Go to next page');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <Pagination {...defaultProps} className="custom-pagination" />
    );
    
    expect(container.firstChild?.firstChild).toHaveClass('custom-pagination');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = renderWithTheme(
      <Pagination {...defaultProps} style={customStyle} />
    );
    
    expect(container.firstChild?.firstChild).toHaveStyle({ backgroundColor: 'red' });
  });

  it('handles zero total items', () => {
    renderWithTheme(
      <Pagination {...defaultProps} total={0} showTotal />
    );
    
    expect(screen.getByText('Showing 0-0 of 0 items')).toBeInTheDocument();
  });

  it('handles large page sizes', () => {
    renderWithTheme(
      <Pagination
        {...defaultProps}
        total={50}
        pageSize={100}
        showTotal
      />
    );
    
    expect(screen.getByText('Showing 1-50 of 50 items')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-next')).toBeDisabled();
  });

  it('validates page jump input', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination
        {...defaultProps}
        showQuickJumper
        onChange={onChange}
      />
    );
    
    const jumpInput = screen.getByLabelText('Jump to page');
    
    // Try invalid input (too high)
    await user.type(jumpInput, '20');
    await user.keyboard('{Enter}');
    
    // Should not call onChange for invalid page
    expect(onChange).not.toHaveBeenCalledWith(20, 10);
    
    // Try valid input
    await user.clear(jumpInput);
    await user.type(jumpInput, '5');
    await user.keyboard('{Enter}');
    
    expect(onChange).toHaveBeenCalledWith(5, 10);
  });

  it('displays name correctly', () => {
    expect(Pagination.displayName).toBe('Pagination');
  });
});