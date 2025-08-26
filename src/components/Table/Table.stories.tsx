import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Table } from './Table';
import { TableColumn, TableRowSelection } from './types';

interface SampleUser {
  id: number;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
}

const sampleData: SampleUser[] = [
  {
    id: 1,
    name: '김철수',
    age: 28,
    email: 'kimcs@company.com',
    status: 'active',
    department: '개발팀',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: '이영희',
    age: 32,
    email: 'leeyh@company.com',
    status: 'active',
    department: '디자인팀',
    joinDate: '2022-08-10',
  },
  {
    id: 3,
    name: '박민수',
    age: 25,
    email: 'parkms@company.com',
    status: 'inactive',
    department: '마케팅팀',
    joinDate: '2023-03-20',
  },
  {
    id: 4,
    name: '정수진',
    age: 29,
    email: 'jungsj@company.com',
    status: 'pending',
    department: '개발팀',
    joinDate: '2023-06-01',
  },
  {
    id: 5,
    name: '최동욱',
    age: 35,
    email: 'choidu@company.com',
    status: 'active',
    department: '기획팀',
    joinDate: '2021-12-05',
  },
];

// 더 많은 데이터 생성 (페이지네이션 테스트용)
const generateLargeDataset = (count: number): SampleUser[] => {
  const names = ['김철수', '이영희', '박민수', '정수진', '최동욱', '한미영', '조성호', '윤지혜', '강태호', '임선영'];
  const departments = ['개발팀', '디자인팀', '마케팅팀', '기획팀', '영업팀'];
  const statuses: ('active' | 'inactive' | 'pending')[] = ['active', 'inactive', 'pending'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`,
    age: 22 + Math.floor(Math.random() * 20),
    email: `user${index + 1}@company.com`,
    status: statuses[index % statuses.length],
    department: departments[index % departments.length],
    joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  }));
};

const columns: TableColumn<SampleUser>[] = [
  {
    key: 'name',
    title: '이름',
    dataIndex: 'name',
    sortable: true,
    width: 120,
  },
  {
    key: 'age',
    title: '나이',
    dataIndex: 'age',
    sortable: true,
    width: 80,
    align: 'center',
  },
  {
    key: 'email',
    title: '이메일',
    dataIndex: 'email',
    width: 200,
    ellipsis: true,
  },
  {
    key: 'status',
    title: '상태',
    dataIndex: 'status',
    width: 100,
    align: 'center',
    render: (status: string) => {
      const statusColors = {
        active: '#52c41a',
        inactive: '#f5222d',
        pending: '#faad14',
      };
      
      const statusLabels = {
        active: '활성',
        inactive: '비활성',
        pending: '대기',
      };

      return (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: statusColors[status as keyof typeof statusColors],
          }}
        >
          {statusLabels[status as keyof typeof statusLabels]}
        </span>
      );
    },
  },
  {
    key: 'department',
    title: '부서',
    dataIndex: 'department',
    sortable: true,
    width: 120,
  },
  {
    key: 'joinDate',
    title: '입사일',
    dataIndex: 'joinDate',
    sortable: true,
    width: 120,
  },
  {
    key: 'actions',
    title: '액션',
    dataIndex: 'id',
    width: 120,
    render: (id: number, record: SampleUser) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            action('edit-user')(record);
          }}
          style={{
            padding: '4px 8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          수정
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            action('delete-user')(record);
          }}
          style={{
            padding: '4px 8px',
            border: '1px solid #ff4d4f',
            borderRadius: '4px',
            background: '#ff4d4f',
            color: 'white',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          삭제
        </button>
      </div>
    ),
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '데이터를 표 형태로 표시하는 컴포넌트입니다. 정렬, 페이지네이션, 행 선택 등의 기능을 제공합니다.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'middle', 'default'],
      description: '테이블 크기',
    },
    bordered: {
      control: 'boolean',
      description: '테두리 표시 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    showHeader: {
      control: 'boolean',
      description: '헤더 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
  },
};

export const WithBorder: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    bordered: true,
  },
};

export const SmallSize: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    size: 'small',
    bordered: true,
  },
};

export const Loading: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
  },
};

export const WithSorting: Story = {
  args: {
    columns: columns.map(col => ({ ...col, sortable: ['name', 'age', 'department', 'joinDate'].includes(col.key) })),
    dataSource: sampleData,
    rowKey: 'id',
    onChange: action('table-change'),
  },
};

export const WithRowSelection: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
      onChange: action('selection-change'),
      onSelect: action('row-select'),
      onSelectAll: action('select-all'),
    } as TableRowSelection<SampleUser>,
  },
};

export const WithRadioSelection: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    rowSelection: {
      type: 'radio',
      onChange: action('radio-selection-change'),
      onSelect: action('radio-select'),
    } as TableRowSelection<SampleUser>,
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    dataSource: generateLargeDataset(50),
    rowKey: 'id',
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      onChange: action('page-change'),
      onShowSizeChange: action('page-size-change'),
    },
  },
};

export const WithExpandable: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    expandable: {
      expandedRowRender: (record: SampleUser) => (
        <div style={{ padding: '16px', background: '#fafafa' }}>
          <h4>상세 정보</h4>
          <p><strong>ID:</strong> {record.id}</p>
          <p><strong>이메일:</strong> {record.email}</p>
          <p><strong>부서:</strong> {record.department}</p>
          <p><strong>입사일:</strong> {record.joinDate}</p>
          <p><strong>상태:</strong> {record.status}</p>
        </div>
      ),
      onExpand: action('row-expand'),
    },
  },
};

export const WithFixedColumns: Story = {
  args: {
    columns: [
      { ...columns[0], fixed: 'left' },
      ...columns.slice(1, -1),
      { ...columns[columns.length - 1], fixed: 'right' },
    ],
    dataSource: sampleData,
    rowKey: 'id',
    scroll: { x: 1200 },
  },
};

export const WithClickableRows: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    onRow: (record) => ({
      onClick: () => action('row-click')(record),
      onDoubleClick: () => action('row-double-click')(record),
      onMouseEnter: () => action('row-mouse-enter')(record),
      onMouseLeave: () => action('row-mouse-leave')(record),
    }),
  },
};

export const WithTitleAndFooter: Story = {
  args: {
    columns,
    dataSource: sampleData,
    rowKey: 'id',
    title: (data) => <div style={{ padding: '8px 0', fontWeight: 'bold' }}>사용자 목록 ({data.length}명)</div>,
    footer: (data) => <div style={{ padding: '8px 0', textAlign: 'center', color: '#666' }}>총 {data.length}명의 사용자</div>,
  },
};

export const CompleteExample: Story = {
  args: {
    columns: columns.map(col => ({ 
      ...col, 
      sortable: ['name', 'age', 'department', 'joinDate'].includes(col.key) 
    })),
    dataSource: generateLargeDataset(100),
    rowKey: 'id',
    bordered: true,
    size: 'middle',
    rowSelection: {
      type: 'checkbox',
      onChange: action('selection-change'),
      onSelect: action('row-select'),
      onSelectAll: action('select-all'),
    } as TableRowSelection<SampleUser>,
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      onChange: action('page-change'),
      onShowSizeChange: action('page-size-change'),
    },
    expandable: {
      expandedRowRender: (record: SampleUser) => (
        <div style={{ padding: '16px', background: '#fafafa' }}>
          <h4>{record.name} 상세 정보</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            <p><strong>ID:</strong> {record.id}</p>
            <p><strong>나이:</strong> {record.age}세</p>
            <p><strong>이메일:</strong> {record.email}</p>
            <p><strong>부서:</strong> {record.department}</p>
            <p><strong>입사일:</strong> {record.joinDate}</p>
            <p><strong>상태:</strong> {record.status}</p>
          </div>
        </div>
      ),
      onExpand: action('row-expand'),
    },
    title: (data) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>사용자 관리</span>
        <span style={{ color: '#666', fontSize: '14px' }}>총 {data.length}명</span>
      </div>
    ),
    onRow: (record) => ({
      onClick: () => action('row-click')(record),
    }),
    onChange: action('table-change'),
  },
};