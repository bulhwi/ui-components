import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { useI18n } from '../../contexts/I18nContext';

const meta: Meta<typeof Button> = {
  title: '컴포넌트/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
다양한 스타일과 상태를 지원하는 버튼 컴포넌트입니다.

## 특징
- 4가지 variant: primary, secondary, tertiary, danger
- 3가지 size: small, medium, large
- 아이콘 지원 (왼쪽/오른쪽 위치)
- 로딩 상태 및 비활성화 지원
- 완전한 접근성 준수 (WCAG 2.1)
- 다크모드 자동 지원

## 접근성
- button 역할 자동 적용
- 키보드 탐색 지원 (Tab, Enter, Space)
- 스크린 리더 호환
- 적절한 색상 대비율 (4.5:1 이상)
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
      description: '버튼의 시각적 스타일',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태 표시',
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: '아이콘 위치',
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
  },
};

export const Variants: Story = {
  render: () => {
    const { t } = useI18n();
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary">{t('common.confirm')}</Button>
        <Button variant="secondary">{t('common.cancel')}</Button>
        <Button variant="tertiary">{t('common.edit')}</Button>
        <Button variant="danger">{t('common.delete')}</Button>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="small">작은 버튼</Button>
      <Button size="medium">중간 버튼</Button>
      <Button size="large">큰 버튼</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button icon={<span>📝</span>}>편집</Button>
      <Button icon={<span>📋</span>} iconPosition="right">
        복사
      </Button>
      <Button variant="danger" icon={<span>🗑️</span>}>
        삭제
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button>일반</Button>
      <Button loading>로딩 중...</Button>
      <Button disabled>비활성</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Button fullWidth>전체 너비 버튼</Button>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '클릭해보세요',
    onClick: () => alert('버튼이 클릭되었습니다!'),
  },
};

export const ResponsiveTest: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '100%' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button size="small">작은 버튼</Button>
        <Button size="medium">중간 버튼</Button>
        <Button size="large">큰 버튼</Button>
      </div>
      <Button fullWidth>전체 너비 버튼 (반응형)</Button>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
        <Button variant="primary">주요</Button>
        <Button variant="secondary">보조</Button>
        <Button variant="tertiary">3차</Button>
        <Button variant="danger">위험</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 뷰포트에서 버튼의 반응형 동작을 테스트하세요. Viewport 툴바에서 다른 화면 크기를 선택해보세요.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const AccessibilityTest: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button>기본 버튼</Button>
      <Button aria-label="사용자 프로필 편집">✏️</Button>
      <Button disabled>비활성화된 버튼</Button>
      <Button loading>로딩 중인 버튼</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 테스트합니다. A11y 패널에서 접근성 검사 결과를 확인하세요.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
        ],
      },
    },
  },
};