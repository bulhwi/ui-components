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

describe('Pagination 컴포넌트', () => {
  const defaultProps = {
    current: 1,
    total: 100,
    pageSize: 10,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 props로 페이지네이션을 렌더링한다', () => {
    renderWithTheme(<Pagination {...defaultProps} />);
    
    expect(screen.getByTestId('pagination-prev')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-1')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-page-2')).toBeInTheDocument();
  });

  it('페이지 변경을 올바르게 처리한다', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    renderWithTheme(
      <Pagination {...defaultProps} onChange={onChange} />
    );
    
    const nextButton = screen.getByTestId('pagination-next');
    await user.click(nextButton);
    
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it('첫 페이지에서 이전 버튼을 비활성화한다', () => {
    renderWithTheme(<Pagination {...defaultProps} current={1} />);
    
    const prevButton = screen.getByTestId('pagination-prev');
    expect(prevButton).toBeDisabled();
  });

  it('마지막 페이지에서 다음 버튼을 비활성화한다', () => {
    renderWithTheme(<Pagination {...defaultProps} current={10} />);
    
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toBeDisabled();
  });

  it('현재 페이지를 강조 표시한다', () => {
    renderWithTheme(<Pagination {...defaultProps} current={3} />);
    
    const currentPageButton = screen.getByTestId('pagination-page-3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('활성화되면 페이지 크기 선택기를 표시한다', () => {
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

  it('페이지 크기 변경을 처리한다', async () => {
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

  it('활성화되면 전체 아이템을 표시한다', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showTotal />
    );
    
    expect(screen.getByText('Showing 1-10 of 100 items')).toBeInTheDocument();
  });

  it('커스텀 전체 표시를 보여준다', () => {
    const customTotal = (total: number, range: [number, number]) =>
      `Items ${range[0]} to ${range[1]} of ${total}`;
      
    renderWithTheme(
      <Pagination {...defaultProps} showTotal={customTotal} />
    );
    
    expect(screen.getByText('Items 1 to 10 of 100')).toBeInTheDocument();
  });

  it('활성화되면 빠른 이동을 표시한다', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showQuickJumper />
    );
    
    expect(screen.getByLabelText('Jump to page')).toBeInTheDocument();
  });

  it('페이지로 빠르게 이동을 처리한다', async () => {
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

  it('활성화되면 처음과 마지막 버튼을 표시한다', () => {
    renderWithTheme(
      <Pagination {...defaultProps} showFirstLast />
    );
    
    expect(screen.getByTestId('pagination-first')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-last')).toBeInTheDocument();
  });

  it('처음과 마지막 버튼 클릭을 처리한다', async () => {
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

  it('simple variant를 올바르게 렌더링한다', () => {
    renderWithTheme(
      <Pagination {...defaultProps} variant="simple" />
    );
    
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination-page-1')).not.toBeInTheDocument();
  });

  it('커스텀 전체와 함께 simple variant를 렌더링한다', () => {
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

  it('비활성화 상태를 처리한다', () => {
    renderWithTheme(<Pagination {...defaultProps} disabled />);
    
    const prevButton = screen.getByTestId('pagination-prev');
    const nextButton = screen.getByTestId('pagination-next');
    
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('활성화되면 단일 페이지에서 숨긴다', () => {
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

  it('hideOnSinglePage가 false일 때 단일 페이지에 표시한다', () => {
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

  it('커스텀 네비게이션 텍스트로 렌더링한다', () => {
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

  it('많은 페이지에 대해 말줄임표를 표시한다', () => {
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

  it('키보드 네비게이션을 처리한다', async () => {
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

  it('올바른 접근성 속성을 가진다', () => {
    renderWithTheme(<Pagination {...defaultProps} current={3} />);
    
    const currentPageButton = screen.getByTestId('pagination-page-3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    
    const prevButton = screen.getByTestId('pagination-prev');
    expect(prevButton).toHaveAttribute('aria-label', 'Go to previous page');
    
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toHaveAttribute('aria-label', 'Go to next page');
  });

  it('커스텀 className을 적용한다', () => {
    const { container } = renderWithTheme(
      <Pagination {...defaultProps} className="custom-pagination" />
    );
    
    expect(container.firstChild?.firstChild).toHaveClass('custom-pagination');
  });

  it('커스텀 스타일을 적용한다', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = renderWithTheme(
      <Pagination {...defaultProps} style={customStyle} />
    );
    
    expect(container.firstChild?.firstChild).toHaveStyle({ backgroundColor: 'red' });
  });

  it('전체 아이템이 0인 경우를 처리한다', () => {
    renderWithTheme(
      <Pagination {...defaultProps} total={0} showTotal />
    );
    
    expect(screen.getByText('Showing 0-0 of 0 items')).toBeInTheDocument();
  });

  it('큰 페이지 크기를 처리한다', () => {
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

  it('페이지 이동 입력을 검증한다', async () => {
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

  it('이름을 올바르게 표시한다', () => {
    expect(Pagination.displayName).toBe('Pagination');
  });
});