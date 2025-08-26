import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputProps } from './types';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const ClearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 형태의 입력 필드를 제공하는 Input 컴포넌트입니다. 텍스트, 이메일, 비밀번호 등 다양한 타입을 지원하며, 아이콘, 검증, 도움말 텍스트 등의 기능을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
      description: '입력 필드의 시각적 스타일',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 필드의 타입',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

// 기본 사용법
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// 라벨과 함께 사용
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: true,
  },
};

// 도움말 텍스트
export const WithHelperText: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
    helperText: '유효한 이메일 주소를 입력해주세요',
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    error: true,
    errorMessage: '비밀번호는 최소 8자 이상이어야 합니다',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '비활성화된 입력',
    placeholder: '수정할 수 없습니다',
    disabled: true,
    value: '비활성화된 값',
  },
};

// 변형들
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Input variant="default" placeholder="Default 변형" />
      <Input variant="filled" placeholder="Filled 변형" />
      <Input variant="outlined" placeholder="Outlined 변형" />
    </div>
  ),
};

// 크기들
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Input size="small" placeholder="Small 크기" />
      <Input size="medium" placeholder="Medium 크기" />
      <Input size="large" placeholder="Large 크기" />
    </div>
  ),
};

// 타입들
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Input type="text" label="텍스트" placeholder="일반 텍스트" />
      <Input type="email" label="이메일" placeholder="example@email.com" />
      <Input type="password" label="비밀번호" placeholder="비밀번호 입력" />
      <Input type="number" label="숫자" placeholder="123" />
      <Input type="tel" label="전화번호" placeholder="010-1234-5678" />
      <Input type="url" label="URL" placeholder="https://example.com" />
      <Input type="search" label="검색" placeholder="검색어 입력" />
    </div>
  ),
};

// 아이콘 사용
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Input 
        label="검색" 
        placeholder="검색어를 입력하세요" 
        leftIcon={<SearchIcon />} 
      />
      <Input 
        label="비밀번호" 
        type="password"
        placeholder="비밀번호를 입력하세요" 
        rightIcon={<EyeIcon />}
        onIconClick={() => console.log('비밀번호 표시 토글')}
      />
      <Input 
        label="검색 가능한 입력" 
        placeholder="검색어 입력" 
        leftIcon={<SearchIcon />}
        rightIcon={<ClearIcon />}
        onIconClick={(position) => console.log(`${position} 아이콘 클릭됨`)}
      />
    </div>
  ),
};

// 전체 너비
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '600px', padding: '20px' }}>
      <Input 
        label="전체 너비 입력" 
        placeholder="전체 너비를 사용합니다"
        fullWidth
        helperText="이 입력 필드는 부모 컨테이너의 전체 너비를 사용합니다"
      />
    </div>
  ),
};

// 상태 조합
export const StateCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
      <Input 
        label="기본 상태"
        placeholder="일반적인 입력 필드"
        helperText="도움말 텍스트입니다"
      />
      <Input 
        label="필수 입력"
        placeholder="반드시 입력해야 합니다"
        required
        helperText="이 필드는 필수입니다"
      />
      <Input 
        label="에러 상태"
        placeholder="잘못된 값"
        error
        errorMessage="유효하지 않은 입력입니다"
      />
      <Input 
        label="비활성화"
        placeholder="수정 불가"
        disabled
        value="고정된 값"
      />
    </div>
  ),
};