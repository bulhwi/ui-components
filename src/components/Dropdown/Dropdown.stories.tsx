import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { Button } from '../Button';
import { Dropdown, DropdownOption, DropdownOptionGroup } from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <div style={{ padding: '2rem', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '선택 옵션을 제공하는 드롭다운 컴포넌트입니다. 단일 선택, 다중 선택, 검색, 그룹화 등을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// 기본 옵션 데이터
const basicOptions: DropdownOption<string>[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
];

// 아이콘과 설명이 있는 옵션들
const richOptions: DropdownOption<string>[] = [
  { 
    label: 'User', 
    value: 'user', 
    icon: '👤',
    description: 'Standard user account'
  },
  { 
    label: 'Admin', 
    value: 'admin', 
    icon: '🔧',
    description: 'Full administrative access'
  },
  { 
    label: 'Editor', 
    value: 'editor', 
    icon: '✏️',
    description: 'Can edit and publish content'
  },
  { 
    label: 'Viewer', 
    value: 'viewer', 
    icon: '👁️',
    description: 'Read-only access',
    disabled: true
  },
];

// 그룹화된 옵션들
const groupedOptions: DropdownOptionGroup<string>[] = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ]
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ]
  },
  {
    label: 'Disabled Group',
    disabled: true,
    options: [
      { label: 'Item 1', value: 'disabled1' },
      { label: 'Item 2', value: 'disabled2' },
    ]
  }
];

// 많은 옵션들 (가상화 테스트용)
const manyOptions: DropdownOption<number>[] = Array.from({ length: 1000 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: i + 1,
  description: `This is option number ${i + 1}`,
}));

// 기본 스토리들
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '과일을 선택하세요',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    value: 'banana',
    placeholder: '과일을 선택하세요',
  },
};

export const Different_Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Small:</label>
        <Dropdown options={basicOptions} size="small" placeholder="Small dropdown" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Medium (default):</label>
        <Dropdown options={basicOptions} size="medium" placeholder="Medium dropdown" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Large:</label>
        <Dropdown options={basicOptions} size="large" placeholder="Large dropdown" />
      </div>
    </div>
  ),
};

export const Full_Width: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Dropdown 
        options={basicOptions} 
        placeholder="전체 너비 드롭다운"
        fullWidth 
      />
    </div>
  ),
};

export const With_Icons_And_Descriptions: Story = {
  args: {
    options: richOptions,
    placeholder: '역할을 선택하세요',
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    
    return (
      <Dropdown
        options={basicOptions}
        value={value}
        onChange={setValue}
        searchable
        searchPlaceholder="과일 검색..."
        placeholder="검색 가능한 드롭다운"
      />
    );
  },
};

export const Multi_Select: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    
    return (
      <Dropdown
        options={basicOptions}
        values={values}
        onMultiChange={setValues}
        multiple
        placeholder="여러 개를 선택하세요"
        closeOnSelect={false}
      />
    );
  },
};

export const Multi_Select_With_Tags: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['apple', 'banana']);
    
    return (
      <Dropdown
        options={basicOptions}
        values={values}
        onMultiChange={setValues}
        multiple
        showTags
        maxTags={2}
        placeholder="태그 형태로 표시"
      />
    );
  },
};

export const Grouped_Options: Story = {
  args: {
    options: groupedOptions,
    placeholder: '카테고리별로 선택하세요',
  },
};

export const Searchable_Groups: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    
    return (
      <Dropdown
        options={groupedOptions}
        value={value}
        onChange={setValue}
        searchable
        searchPlaceholder="그룹에서 검색..."
        placeholder="검색 가능한 그룹 드롭다운"
      />
    );
  },
};

export const Different_Positions: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(2, 1fr)', 
      gap: '2rem',
      padding: '2rem',
      minHeight: '300px'
    }}>
      <div>
        <label>Bottom Start:</label>
        <Dropdown 
          options={basicOptions} 
          position="bottom-start" 
          placeholder="Bottom Start"
        />
      </div>
      <div>
        <label>Bottom End:</label>
        <Dropdown 
          options={basicOptions} 
          position="bottom-end" 
          placeholder="Bottom End"
        />
      </div>
      <div>
        <label>Top Start:</label>
        <Dropdown 
          options={basicOptions} 
          position="top-start" 
          placeholder="Top Start"
        />
      </div>
      <div>
        <label>Top End:</label>
        <Dropdown 
          options={basicOptions} 
          position="top-end" 
          placeholder="Top End"
        />
      </div>
    </div>
  ),
};

export const Loading_State: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: '로딩 중...',
  },
};

export const Error_State: Story = {
  args: {
    options: basicOptions,
    error: true,
    placeholder: '에러 상태',
  },
};

export const Disabled_State: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    placeholder: '비활성화됨',
    value: 'apple',
  },
};

export const Custom_Option_Rendering: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    
    const customOptions: DropdownOption<string>[] = [
      { label: 'High Priority', value: 'high', description: 'Urgent task' },
      { label: 'Medium Priority', value: 'medium', description: 'Normal task' },
      { label: 'Low Priority', value: 'low', description: 'Can wait' },
    ];
    
    return (
      <Dropdown
        options={customOptions}
        value={value}
        onChange={setValue}
        placeholder="우선순위 선택"
        renderOption={(option, isSelected) => (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '8px 0'
          }}>
            <div>
              <div style={{ fontWeight: isSelected ? 'bold' : 'normal' }}>
                {option.label}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {option.description}
              </div>
            </div>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%',
              backgroundColor: 
                option.value === 'high' ? '#ff4444' :
                option.value === 'medium' ? '#ffaa00' :
                '#44aa44'
            }} />
          </div>
        )}
      />
    );
  },
};

export const Virtualized_Large_List: Story = {
  render: () => {
    const [value, setValue] = useState<number>();
    
    return (
      <Dropdown
        options={manyOptions}
        value={value}
        onChange={setValue}
        placeholder="1000개 옵션 (가상화)"
        searchable
        virtualized
        maxHeight={250}
        itemHeight={40}
      />
    );
  },
};

export const Controlled_Open_State: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState<string>();
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '드롭다운 닫기' : '드롭다운 열기'}
          </Button>
        </div>
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={setValue}
          open={isOpen}
          onOpenChange={setIsOpen}
          placeholder="외부 제어 드롭다운"
        />
      </div>
    );
  },
};

export const No_Options: Story = {
  args: {
    options: [],
    placeholder: '옵션 없음',
    noOptionsText: '표시할 옵션이 없습니다',
  },
};

export const Interactive_Demo: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState<string>();
    const [multiValues, setMultiValues] = useState<string[]>([]);
    const [groupValue, setGroupValue] = useState<string>();
    
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2rem',
        maxWidth: '400px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Single Select:
          </label>
          <Dropdown
            options={basicOptions}
            value={singleValue}
            onChange={setSingleValue}
            searchable
            placeholder="과일 하나를 선택하세요"
          />
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Selected: {singleValue || 'None'}
          </p>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Multi Select with Tags:
          </label>
          <Dropdown
            options={richOptions}
            values={multiValues}
            onMultiChange={setMultiValues}
            multiple
            showTags
            searchable
            placeholder="여러 역할을 선택하세요"
          />
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Selected: {multiValues.length ? multiValues.join(', ') : 'None'}
          </p>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Grouped Options:
          </label>
          <Dropdown
            options={groupedOptions}
            value={groupValue}
            onChange={setGroupValue}
            searchable
            placeholder="카테고리에서 선택하세요"
          />
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Selected: {groupValue || 'None'}
          </p>
        </div>
      </div>
    );
  },
};

export const Dark_Mode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <div style={{ 
          padding: '2rem', 
          minHeight: '400px',
          backgroundColor: darkTheme.colors.background,
          color: darkTheme.colors.text.primary
        }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  render: () => {
    const [value, setValue] = useState<string>();
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Dark Mode Dropdown</h3>
          <Dropdown
            options={richOptions}
            value={value}
            onChange={setValue}
            searchable
            placeholder="다크 모드에서 확인"
          />
        </div>
      </div>
    );
  },
};

export const Accessibility_Features: Story = {
  render: () => {
    const [value, setValue] = useState<string>();
    
    return (
      <div>
        <label 
          id="accessibility-label" 
          style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}
        >
          Accessible Dropdown (키보드로 조작해보세요):
        </label>
        <Dropdown
          options={basicOptions}
          value={value}
          onChange={setValue}
          searchable
          placeholder="접근성 기능 포함"
          aria-label="접근 가능한 드롭다운"
          aria-describedby="accessibility-help"
        />
        <p id="accessibility-help" style={{ 
          fontSize: '0.75rem', 
          color: '#666', 
          marginTop: '0.5rem' 
        }}>
          화살표 키로 이동, Enter로 선택, Escape로 닫기
        </p>
      </div>
    );
  },
};