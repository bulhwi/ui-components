import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Table } from './Table';
import { TableColumn, TableRowSelection } from './types';
import { lightTheme } from '../../styles/theme';

// 테스트용 데이터
interface TestUser {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const testData: TestUser[] = [
  { id: 1, name: '김철수', age: 25, email: 'kim@test.com', status: 'active' },
  { id: 2, name: '이영희', age: 30, email: 'lee@test.com', status: 'inactive' },
  { id: 3, name: '박민수', age: 28, email: 'park@test.com', status: 'active' },
];

const testColumns: TableColumn<TestUser>[] = [
  {
    key: 'name',
    title: '이름',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'age',
    title: '나이',
    dataIndex: 'age',
    sortable: true,
    align: 'center',
  },
  {
    key: 'email',
    title: '이메일',
    dataIndex: 'email',
  },
  {
    key: 'status',
    title: '상태',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={`status-${status}`}>{status}</span>
    ),
  },
];

// 테스트 래퍼 컴포넌트
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>
);

// 기본 렌더링 헬퍼
const renderTable = (props: any = {}) => {
  const defaultProps = {
    columns: testColumns,
    dataSource: testData,
    rowKey: 'id',
  };

  return render(
    <TestWrapper>
      <Table {...defaultProps} {...props} />
    </TestWrapper>
  );
};

describe('Table Component', () => {
  describe('기본 렌더링', () => {
    test('테이블이 정상적으로 렌더링된다', () => {
      renderTable();
      
      // 헤더 확인
      expect(screen.getByText('이름')).toBeInTheDocument();
      expect(screen.getByText('나이')).toBeInTheDocument();
      expect(screen.getByText('이메일')).toBeInTheDocument();
      expect(screen.getByText('상태')).toBeInTheDocument();
      
      // 데이터 확인
      expect(screen.getByText('김철수')).toBeInTheDocument();
      expect(screen.getByText('이영희')).toBeInTheDocument();
      expect(screen.getByText('박민수')).toBeInTheDocument();
    });

    test('데이터가 없을 때 빈 상태를 표시한다', () => {
      renderTable({ dataSource: [] });
      
      expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
    });

    test('로딩 상태를 표시한다', () => {
      renderTable({ loading: true });
      
      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    });

    test('테두리 스타일이 적용된다', () => {
      renderTable({ bordered: true });
      
      const table = screen.getByRole('table').parentElement;
      expect(table).toHaveStyle('border: 1px solid');
    });

    test('다양한 크기가 적용된다', () => {
      const { rerender } = renderTable({ size: 'small' });
      let table = screen.getByRole('table');
      expect(table).toHaveStyle('font-size: 14px');

      rerender(
        <TestWrapper>
          <Table columns={testColumns} dataSource={testData} rowKey="id" size="large" />
        </TestWrapper>
      );
      table = screen.getByRole('table');
      expect(table).toHaveStyle('font-size: 18px');
    });
  });

  describe('정렬 기능', () => {
    test('정렬 가능한 열을 클릭하면 정렬된다', async () => {
      const mockOnChange = jest.fn();
      renderTable({ onChange: mockOnChange });
      
      const nameHeader = screen.getByText('이름').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
      
      // 첫 번째 클릭: 오름차순
      fireEvent.click(nameHeader!);
      
      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(
          expect.objectContaining({ current: 1 }),
          {},
          expect.objectContaining({ order: 'ascend' }),
          expect.objectContaining({ action: 'sort' })
        );
      });
    });

    test('정렬 아이콘이 표시된다', () => {
      renderTable();
      
      const sortableHeaders = screen.getAllByRole('columnheader');
      const nameHeader = sortableHeaders.find(header => 
        header.textContent?.includes('이름')
      );
      
      expect(nameHeader?.querySelector('span[class*="SortIcon"]')).toBeInTheDocument();
    });
  });

  describe('행 선택 기능', () => {
    test('체크박스 선택이 작동한다', () => {
      const mockOnChange = jest.fn();
      const rowSelection: TableRowSelection<TestUser> = {
        type: 'checkbox',
        onChange: mockOnChange,
      };
      
      renderTable({ rowSelection });
      
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 헤더 + 3개 행
      
      // 첫 번째 행 선택
      fireEvent.click(checkboxes[1]);
      
      expect(mockOnChange).toHaveBeenCalledWith([1], [testData[0]]);
    });

    test('전체 선택이 작동한다', () => {
      const mockOnSelectAll = jest.fn();
      const rowSelection: TableRowSelection<TestUser> = {
        type: 'checkbox',
        onSelectAll: mockOnSelectAll,
      };
      
      renderTable({ rowSelection });
      
      const headerCheckbox = screen.getAllByRole('checkbox')[0];
      fireEvent.click(headerCheckbox);
      
      expect(mockOnSelectAll).toHaveBeenCalledWith(true, testData, testData);
    });

    test('라디오 버튼 선택이 작동한다', () => {
      const mockOnChange = jest.fn();
      const rowSelection: TableRowSelection<TestUser> = {
        type: 'radio',
        onChange: mockOnChange,
      };
      
      renderTable({ rowSelection });
      
      const radioButtons = screen.getAllByRole('radio');
      expect(radioButtons).toHaveLength(3); // 3개 행 (헤더는 라디오 없음)
      
      fireEvent.click(radioButtons[0]);
      
      expect(mockOnChange).toHaveBeenCalledWith([1], [testData[0]]);
    });
  });

  describe('페이지네이션', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `사용자${i + 1}`,
      age: 20 + i,
      email: `user${i + 1}@test.com`,
      status: i % 2 === 0 ? 'active' as const : 'inactive' as const,
    }));

    test('페이지네이션이 렌더링된다', () => {
      const mockOnChange = jest.fn();
      renderTable({
        dataSource: largeData,
        pagination: {
          pageSize: 10,
          onChange: mockOnChange,
        },
      });
      
      // 페이지 번호 버튼들이 있는지 확인
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      
      // 총 개수 표시 확인
      expect(screen.getByText('총 25개 중 1-10개')).toBeInTheDocument();
    });

    test('페이지 변경이 작동한다', () => {
      const mockOnChange = jest.fn();
      renderTable({
        dataSource: largeData,
        pagination: {
          pageSize: 10,
          onChange: mockOnChange,
        },
      });
      
      const page2Button = screen.getByText('2');
      fireEvent.click(page2Button);
      
      expect(mockOnChange).toHaveBeenCalledWith(2, 10);
    });

    test('페이지 크기 변경이 작동한다', () => {
      const mockOnChange = jest.fn();
      renderTable({
        dataSource: largeData,
        pagination: {
          pageSize: 10,
          showSizeChanger: true,
          onChange: mockOnChange,
        },
      });
      
      const sizeSelect = screen.getByRole('combobox');
      fireEvent.change(sizeSelect, { target: { value: '20' } });
      
      expect(mockOnChange).toHaveBeenCalledWith(1, 20);
    });
  });

  describe('확장 가능한 행', () => {
    test('확장 버튼이 렌더링된다', () => {
      renderTable({
        expandable: {
          expandedRowRender: (record: TestUser) => <div>상세 정보: {record.name}</div>,
        },
      });
      
      const expandButtons = screen.getAllByRole('button');
      expect(expandButtons).toHaveLength(3); // 각 행마다 하나씩
    });

    test('행 확장이 작동한다', () => {
      const mockOnExpand = jest.fn();
      renderTable({
        expandable: {
          expandedRowRender: (record: TestUser) => <div>상세: {record.name}</div>,
          onExpand: mockOnExpand,
        },
      });
      
      const firstExpandButton = screen.getAllByRole('button')[0];
      fireEvent.click(firstExpandButton);
      
      expect(mockOnExpand).toHaveBeenCalledWith(true, testData[0]);
      expect(screen.getByText('상세: 김철수')).toBeInTheDocument();
    });
  });

  describe('행 이벤트', () => {
    test('행 클릭 이벤트가 작동한다', () => {
      const mockOnClick = jest.fn();
      renderTable({
        onRow: (record: TestUser) => ({
          onClick: () => mockOnClick(record),
        }),
      });
      
      const firstRow = screen.getByText('김철수').closest('tr');
      fireEvent.click(firstRow!);
      
      expect(mockOnClick).toHaveBeenCalledWith(testData[0]);
    });

    test('행 더블클릭 이벤트가 작동한다', () => {
      const mockOnDoubleClick = jest.fn();
      renderTable({
        onRow: (record: TestUser) => ({
          onDoubleClick: () => mockOnDoubleClick(record),
        }),
      });
      
      const firstRow = screen.getByText('김철수').closest('tr');
      fireEvent.doubleClick(firstRow!);
      
      expect(mockOnDoubleClick).toHaveBeenCalledWith(testData[0]);
    });
  });

  describe('커스텀 렌더링', () => {
    test('커스텀 셀 렌더링이 작동한다', () => {
      renderTable();
      
      // status 열의 커스텀 렌더링 확인
      expect(screen.getByText('active').closest('span')).toHaveClass('status-active');
      expect(screen.getByText('inactive').closest('span')).toHaveClass('status-inactive');
    });

    test('제목과 푸터가 렌더링된다', () => {
      renderTable({
        title: (data: TestUser[]) => <div>사용자 목록 ({data.length}명)</div>,
        footer: (data: TestUser[]) => <div>총 {data.length}명</div>,
      });
      
      expect(screen.getByText('사용자 목록 (3명)')).toBeInTheDocument();
      expect(screen.getByText('총 3명')).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    test('테이블 역할이 설정된다', () => {
      renderTable();
      
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    test('정렬 상태가 aria-sort로 표시된다', () => {
      renderTable();
      
      const nameHeader = screen.getByText('이름').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'none');
    });

    test('체크박스에 적절한 라벨이 설정된다', () => {
      renderTable({
        rowSelection: { type: 'checkbox' },
      });
      
      expect(screen.getByLabelText('모든 행 선택')).toBeInTheDocument();
      expect(screen.getByLabelText('행 1 선택')).toBeInTheDocument();
    });
  });

  describe('에러 케이스', () => {
    test('잘못된 데이터 타입에 대해 우아하게 처리한다', () => {
      const invalidData = [
        { id: 1, name: null, age: 'invalid', email: undefined },
      ] as any;
      
      expect(() => {
        renderTable({ dataSource: invalidData });
      }).not.toThrow();
    });

    test('빈 컬럼 배열에 대해 우아하게 처리한다', () => {
      expect(() => {
        renderTable({ columns: [] });
      }).not.toThrow();
    });
  });
});