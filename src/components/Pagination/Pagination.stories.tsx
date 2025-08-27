import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component for navigating through large datasets with various customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: { type: 'number', min: 1 },
      description: 'Current page number (1-based)',
    },
    total: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items',
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description: 'Number of items per page',
    },
    variant: {
      control: 'select',
      options: ['default', 'simple', 'compact'],
      description: 'Pagination display variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pagination component',
    },
    showSizeChanger: {
      control: 'boolean',
      description: 'Show page size selector',
    },
    showTotal: {
      control: 'boolean',
      description: 'Show total items information',
    },
    showQuickJumper: {
      control: 'boolean',
      description: 'Show quick page jumper input',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Show first and last page buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the pagination',
    },
    hideOnSinglePage: {
      control: 'boolean',
      description: 'Hide pagination when there is only one page',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive pagination component for stories
const PaginationDemo = ({ current: initialCurrent = 1, pageSize: initialPageSize = 10, ...args }) => {
  const [current, setCurrent] = useState(initialCurrent);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handleChange = (page: number, newPageSize: number) => {
    setCurrent(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <Pagination
        {...args}
        current={current}
        pageSize={pageSize}
        onChange={handleChange}
        onShowSizeChange={handleChange}
      />
    </div>
  );
};

/**
 * Basic pagination with default settings
 */
export const Default: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
  },
};

/**
 * Pagination with many pages showing ellipsis
 */
export const ManyPages: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 25,
    total: 10000,
    pageSize: 20,
    showFirstLast: true,
  },
};

/**
 * Small size pagination
 */
export const SmallSize: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
    size: 'sm',
  },
};

/**
 * Large size pagination
 */
export const LargeSize: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
    size: 'lg',
  },
};

/**
 * Pagination with page size selector
 */
export const WithSizeChanger: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 1000,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100],
  },
};

/**
 * Pagination with total items display
 */
export const WithTotal: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 1000,
    pageSize: 20,
    showTotal: true,
  },
};

/**
 * Pagination with custom total display
 */
export const WithCustomTotal: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 1000,
    pageSize: 20,
    showTotal: (total, range) => `Displaying ${range[0]}-${range[1]} of ${total} results`,
  },
};

/**
 * Pagination with quick jumper
 */
export const WithQuickJumper: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 1000,
    pageSize: 20,
    showQuickJumper: true,
  },
};

/**
 * Full-featured pagination with all options
 */
export const FullFeatured: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 5,
    total: 2000,
    pageSize: 25,
    showSizeChanger: true,
    showTotal: true,
    showQuickJumper: true,
    showFirstLast: true,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

/**
 * Simple pagination variant
 */
export const SimpleVariant: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
    variant: 'simple',
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
  },
};

/**
 * Compact pagination variant
 */
export const CompactVariant: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 1,
    total: 500,
    pageSize: 20,
    variant: 'compact',
  },
};

/**
 * Disabled pagination
 */
export const Disabled: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 5,
    total: 500,
    pageSize: 20,
    disabled: true,
    showSizeChanger: true,
    showQuickJumper: true,
  },
};

/**
 * Single page - hidden when hideOnSinglePage is true
 */
export const SinglePageHidden: Story = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>With hideOnSinglePage=true (should be hidden):</h3>
        <PaginationDemo {...args} hideOnSinglePage />
      </div>
      <div>
        <h3>With hideOnSinglePage=false (should be visible):</h3>
        <PaginationDemo {...args} hideOnSinglePage={false} />
      </div>
    </div>
  ),
  args: {
    current: 1,
    total: 5,
    pageSize: 20,
  },
};

/**
 * Custom text for navigation buttons
 */
export const CustomText: Story = {
  render: (args) => <PaginationDemo {...args} />,
  args: {
    current: 5,
    total: 500,
    pageSize: 20,
    showFirstLast: true,
    prevText: 'Previous',
    nextText: 'Next',
    firstText: 'First',
    lastText: 'Last',
  },
};

/**
 * Responsive pagination demo
 */
export const Responsive: Story = {
  render: (args) => (
    <div style={{ padding: '20px', width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Desktop View:</h3>
        <div style={{ width: '800px' }}>
          <PaginationDemo {...args} />
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Tablet View:</h3>
        <div style={{ width: '600px' }}>
          <PaginationDemo {...args} />
        </div>
      </div>
      
      <div>
        <h3>Mobile View:</h3>
        <div style={{ width: '320px' }}>
          <PaginationDemo {...args} />
        </div>
      </div>
    </div>
  ),
  args: {
    current: 5,
    total: 1000,
    pageSize: 20,
    showSizeChanger: true,
    showTotal: true,
    showQuickJumper: true,
  },
};

/**
 * Edge cases
 */
export const EdgeCases: Story = {
  render: () => (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h3>No items (total: 0):</h3>
        <PaginationDemo current={1} total={0} pageSize={20} />
      </div>
      
      <div>
        <h3>Single item:</h3>
        <PaginationDemo current={1} total={1} pageSize={20} />
      </div>
      
      <div>
        <h3>Exactly one page:</h3>
        <PaginationDemo current={1} total={10} pageSize={20} />
      </div>
      
      <div>
        <h3>Large page size:</h3>
        <PaginationDemo current={1} total={50} pageSize={100} />
      </div>
    </div>
  ),
};