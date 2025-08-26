import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../styles/theme';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { Button } from '../Button';
import { ToastProvider, useToast } from './index';

const meta: Meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <div style={{ padding: '2rem', height: '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사용자에게 중요한 정보를 일시적으로 표시하는 Toast 알림 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo 컴포넌트
const ToastDemo: React.FC = () => {
  const toast = useToast();

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button onClick={() => toast.success('성공적으로 저장되었습니다!')}>
        Success Toast
      </Button>
      <Button 
        variant="destructive"
        onClick={() => toast.error('오류가 발생했습니다. 다시 시도해주세요.')}
      >
        Error Toast
      </Button>
      <Button 
        variant="secondary"
        onClick={() => toast.warning('경고: 이 작업은 되돌릴 수 없습니다.')}
      >
        Warning Toast
      </Button>
      <Button 
        variant="outline"
        onClick={() => toast.info('새로운 업데이트가 있습니다.')}
      >
        Info Toast
      </Button>
    </div>
  );
};

// 액션이 있는 Toast Demo
const ToastWithActionsDemo: React.FC = () => {
  const toast = useToast();

  const showToastWithActions = () => {
    toast.success('파일이 업로드되었습니다.', {
      duration: 0,
      actions: [
        {
          label: '보기',
          onClick: () => alert('파일 보기'),
          variant: 'primary'
        },
        {
          label: '공유',
          onClick: () => alert('파일 공유'),
          variant: 'secondary'
        }
      ]
    });
  };

  return (
    <Button onClick={showToastWithActions}>
      Actions가 있는 Toast
    </Button>
  );
};

// 포지션 Demo
const PositionDemo: React.FC = () => {
  const toast = useToast();

  const positions = [
    { pos: 'top-right' as const, label: '우상단' },
    { pos: 'top-left' as const, label: '좌상단' },
    { pos: 'top-center' as const, label: '상단 중앙' },
    { pos: 'bottom-right' as const, label: '우하단' },
    { pos: 'bottom-left' as const, label: '좌하단' },
    { pos: 'bottom-center' as const, label: '하단 중앙' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {positions.map(({ pos, label }) => (
        <Button
          key={pos}
          onClick={() => toast.info(`${label} 위치의 토스트`, { position: pos })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

// 애니메이션 Demo
const AnimationDemo: React.FC = () => {
  const toast = useToast();

  const animations = [
    { anim: 'slide' as const, label: '슬라이드' },
    { anim: 'fade' as const, label: '페이드' },
    { anim: 'bounce' as const, label: '바운스' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {animations.map(({ anim, label }) => (
        <Button
          key={anim}
          onClick={() => toast.info(`${label} 애니메이션`, { animation: anim })}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

// Promise Demo
const PromiseDemo: React.FC = () => {
  const toast = useToast();

  const simulateApiCall = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve('성공 데이터') : reject(new Error('API 오류'));
      }, 2000);
    });

    toast.promise(promise, {
      loading: 'API 호출 중...',
      success: (data) => `성공: ${data}`,
      error: (err) => `실패: ${err.message}`,
    });
  };

  return (
    <Button onClick={simulateApiCall}>
      Promise Toast (2초 후 랜덤 결과)
    </Button>
  );
};

// 다크모드 Demo
const DarkModeDemo: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <ToastProvider>
        <div style={{ 
          padding: '2rem', 
          minHeight: '50vh',
          backgroundColor: isDark ? darkTheme.colors.background : lightTheme.colors.background,
          color: isDark ? darkTheme.colors.text.primary : lightTheme.colors.text.primary 
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <Button onClick={() => setIsDark(!isDark)}>
              {isDark ? '라이트 모드' : '다크 모드'}로 변경
            </Button>
          </div>
          <ToastDemo />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

// Stories
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본적인 Toast 알림의 4가지 타입 (success, error, warning, info)을 보여줍니다.',
      },
    },
  },
};

export const WithActions: Story = {
  render: () => (
    <ToastProvider>
      <ToastWithActionsDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '사용자가 클릭할 수 있는 액션 버튼이 포함된 Toast입니다.',
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <ToastProvider>
      <PositionDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '화면의 6가지 위치에 Toast를 표시할 수 있습니다.',
      },
    },
  },
};

export const Animations: Story = {
  render: () => (
    <ToastProvider>
      <AnimationDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '3가지 애니메이션 효과 (slide, fade, bounce)를 적용할 수 있습니다.',
      },
    },
  },
};

export const PromiseToast: Story = {
  render: () => (
    <ToastProvider>
      <PromiseDemo />
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Promise의 상태에 따라 자동으로 Toast를 업데이트합니다.',
      },
    },
  },
};

export const DarkMode: Story = {
  render: () => <DarkModeDemo />,
  parameters: {
    docs: {
      description: {
        story: '다크모드와 라이트모드에서 Toast의 모습을 확인할 수 있습니다.',
      },
    },
  },
};

export const CustomDuration: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button onClick={() => useToast().info('짧은 토스트 (1초)', { duration: 1000 })}>
          1초 토스트
        </Button>
        <Button onClick={() => useToast().info('긴 토스트 (10초)', { duration: 10000 })}>
          10초 토스트
        </Button>
        <Button onClick={() => useToast().info('영구 토스트 (수동 닫기)', { duration: 0 })}>
          영구 토스트
        </Button>
      </div>
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 지속시간을 가진 Toast를 보여줍니다.',
      },
    },
  },
};

export const WithoutProgress: Story = {
  render: () => (
    <ToastProvider>
      <Button onClick={() => useToast().info('프로그레스 바 없는 토스트', { showProgress: false })}>
        프로그레스 바 숨김
      </Button>
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '프로그레스 바를 숨긴 Toast입니다.',
      },
    },
  },
};

export const DisablePauseOnHover: Story = {
  render: () => (
    <ToastProvider>
      <Button onClick={() => useToast().info('호버해도 멈추지 않는 토스트', { pauseOnHover: false })}>
        호버 일시정지 비활성화
      </Button>
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '마우스 호버 시 타이머가 멈추지 않는 Toast입니다.',
      },
    },
  },
};

export const NotClosable: Story = {
  render: () => (
    <ToastProvider>
      <Button onClick={() => useToast().info('닫기 버튼 없는 토스트', { closable: false, duration: 3000 })}>
        닫기 버튼 없음
      </Button>
    </ToastProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '수동으로 닫을 수 없는 Toast입니다.',
      },
    },
  },
};