import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';

describe('usePagination', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 1,
        initialPageSize: 10,
      })
    );

    expect(result.current.currentPage).toBe(1);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.totalPages).toBe(10);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it('calculates total pages correctly', () => {
    const { result: result1 } = renderHook(() =>
      usePagination({ total: 100, initialPageSize: 10 })
    );
    expect(result1.current.totalPages).toBe(10);

    const { result: result2 } = renderHook(() =>
      usePagination({ total: 105, initialPageSize: 10 })
    );
    expect(result2.current.totalPages).toBe(11);

    const { result: result3 } = renderHook(() =>
      usePagination({ total: 0, initialPageSize: 10 })
    );
    expect(result3.current.totalPages).toBe(0);
  });

  it('handles navigation correctly', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 5,
        initialPageSize: 10,
        onChange,
      })
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.hasPrevious).toBe(true);
    expect(result.current.hasNext).toBe(true);

    // Go to next page
    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentPage).toBe(6);
    expect(onChange).toHaveBeenCalledWith(6, 10);

    // Go to previous page
    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentPage).toBe(5);
    expect(onChange).toHaveBeenCalledWith(5, 10);
  });

  it('handles first and last page navigation', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 5,
        initialPageSize: 10,
      })
    );

    // Go to first page
    act(() => {
      result.current.goToFirst();
    });
    expect(result.current.currentPage).toBe(1);

    // Go to last page
    act(() => {
      result.current.goToLast();
    });
    expect(result.current.currentPage).toBe(10);
  });

  it('prevents navigation beyond boundaries', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 1,
        initialPageSize: 10,
      })
    );

    // Try to go to previous from first page
    act(() => {
      result.current.goToPrevious();
    });
    expect(result.current.currentPage).toBe(1);

    // Go to last page and try to go next
    act(() => {
      result.current.goToLast();
    });
    expect(result.current.currentPage).toBe(10);

    act(() => {
      result.current.goToNext();
    });
    expect(result.current.currentPage).toBe(10);
  });

  it('handles page size changes correctly', () => {
    const onPageSizeChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 5,
        initialPageSize: 10,
        onPageSizeChange,
      })
    );

    expect(result.current.totalPages).toBe(10);

    // Change page size
    act(() => {
      result.current.changePageSize(20);
    });

    expect(result.current.pageSize).toBe(20);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(5); // Should stay on same page if possible
    expect(onPageSizeChange).toHaveBeenCalledWith(20, 5);
  });

  it('adjusts current page when page size change makes it invalid', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 10,
        initialPageSize: 10,
      })
    );

    expect(result.current.currentPage).toBe(10);
    expect(result.current.totalPages).toBe(10);

    // Change to larger page size that makes current page invalid
    act(() => {
      result.current.changePageSize(50);
    });

    expect(result.current.pageSize).toBe(50);
    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPage).toBe(2); // Adjusted to last valid page
  });

  it('generates visible pages correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 1000,
        initialPage: 10,
        initialPageSize: 10,
        siblingCount: 1,
        boundaryCount: 1,
      })
    );

    const visiblePages = result.current.getVisiblePages();
    expect(visiblePages).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 100]);
  });

  it('shows all pages when total pages is small', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 50,
        initialPage: 3,
        initialPageSize: 10,
      })
    );

    const visiblePages = result.current.getVisiblePages();
    expect(visiblePages).toEqual([1, 2, 3, 4, 5]);
  });

  it('calculates range info correctly', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 3,
        initialPageSize: 20,
      })
    );

    const rangeInfo = result.current.getRangeInfo();
    expect(rangeInfo).toEqual({
      start: 41, // (3-1) * 20 + 1
      end: 60,   // 3 * 20
      total: 100,
    });
  });

  it('handles edge case with zero total', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 0,
        initialPage: 1,
        initialPageSize: 10,
      })
    );

    expect(result.current.totalPages).toBe(0);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(false);

    const rangeInfo = result.current.getRangeInfo();
    expect(rangeInfo).toEqual({
      start: 0,
      end: 0,
      total: 0,
    });
  });

  it('handles goto page correctly', () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      usePagination({
        total: 100,
        initialPage: 1,
        initialPageSize: 10,
        onChange,
      })
    );

    // Go to valid page
    act(() => {
      result.current.goToPage(5);
    });
    expect(result.current.currentPage).toBe(5);
    expect(onChange).toHaveBeenCalledWith(5, 10);

    // Try to go to invalid page (too high)
    act(() => {
      result.current.goToPage(20);
    });
    expect(result.current.currentPage).toBe(10); // Clamped to max

    // Try to go to invalid page (too low)
    act(() => {
      result.current.goToPage(-1);
    });
    expect(result.current.currentPage).toBe(1); // Clamped to min
  });

  it('clamps initial page to valid range', () => {
    const { result } = renderHook(() =>
      usePagination({
        total: 50,
        initialPage: 100, // Too high
        initialPageSize: 10,
      })
    );

    expect(result.current.currentPage).toBe(5); // Clamped to max page
  });
});