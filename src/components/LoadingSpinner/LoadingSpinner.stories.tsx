import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner, LoadingSpinnerOverlay, LoadingSpinnerGroup } from './';
import { Button } from '../Button';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 애니메이션과 설정을 지원하는 로딩 스피너 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'dots', 'bars', 'pulse'],
      description: '스피너 애니메이션 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '스피너 크기',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
      description: '스피너 색상 테마',
    },
    text: {
      control: 'text',
      description: '로딩 텍스트',
    },
    textPosition: {
      control: 'select',
      options: ['bottom', 'right'],
      description: '텍스트 위치',
    },
    overlay: {
      control: 'boolean',
      description: '전체 화면 오버레이 모드',
    },
    overlayOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '오버레이 배경 투명도',
    },
    inline: {
      control: 'boolean',
      description: '인라인 표시',
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스피너
export const Default: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
  },
};

// 변형별 스피너
export const Variants: Story = {
  render: () => (
    <LoadingSpinnerGroup direction="horizontal" spacing="large">
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner variant="circular" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Circular</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner variant="dots" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Dots</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner variant="bars" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Bars</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner variant="pulse" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Pulse</p>
      </div>
    </LoadingSpinnerGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스피너 애니메이션 변형을 보여줍니다.',
      },
    },
  },
};

// 크기별 스피너
export const Sizes: Story = {
  render: () => (
    <LoadingSpinnerGroup direction="horizontal" spacing="large">
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="medium" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner size="large" />
        <p style={{ marginTop: '8px', fontSize: '16px' }}>Large</p>
      </div>
    </LoadingSpinnerGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '스피너의 다양한 크기를 보여줍니다.',
      },
    },
  },
};

// 색상별 스피너
export const Colors: Story = {
  render: () => (
    <LoadingSpinnerGroup direction="horizontal" spacing="large">
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner color="primary" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner color="secondary" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Secondary</p>
      </div>
      <div style={{ textAlign: 'center', backgroundColor: '#333', padding: '16px', borderRadius: '8px' }}>
        <LoadingSpinner color="white" />
        <p style={{ marginTop: '8px', fontSize: '14px', color: 'white' }}>White</p>
      </div>
    </LoadingSpinnerGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '스피너의 다양한 색상 테마를 보여줍니다.',
      },
    },
  },
};

// 텍스트와 함께
export const WithText: Story = {
  render: () => (
    <LoadingSpinnerGroup direction="vertical" spacing="large">
      <LoadingSpinner text="로딩 중..." textPosition="bottom" />
      <LoadingSpinner text="데이터를 불러오는 중..." textPosition="right" />
      <LoadingSpinner 
        variant="dots" 
        text="잠시만 기다려주세요..." 
        textPosition="bottom" 
      />
    </LoadingSpinnerGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '텍스트와 함께 표시되는 스피너입니다.',
      },
    },
  },
};

// 인라인 스피너
export const Inline: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: '16px' }}>
        데이터를 불러오는 중입니다 <LoadingSpinner size="small" inline /> 잠시만 기다려주세요.
      </p>
      <p style={{ fontSize: '16px', marginTop: '16px' }}>
        처리 중 <LoadingSpinner variant="dots" size="small" inline /> 완료될 때까지 기다려주세요.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '텍스트 내에서 인라인으로 표시되는 스피너입니다.',
      },
    },
  },
};

// 그룹 레이아웃
export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px' }}>수평 그룹</h4>
        <LoadingSpinnerGroup direction="horizontal" spacing="large">
          <LoadingSpinner variant="circular" text="로딩 1" />
          <LoadingSpinner variant="dots" text="로딩 2" />
          <LoadingSpinner variant="pulse" text="로딩 3" />
        </LoadingSpinnerGroup>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '16px' }}>수직 그룹</h4>
        <LoadingSpinnerGroup direction="vertical" spacing="medium">
          <LoadingSpinner variant="bars" text="첫 번째 작업" />
          <LoadingSpinner variant="circular" text="두 번째 작업" />
          <LoadingSpinner variant="dots" text="세 번째 작업" />
        </LoadingSpinnerGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 스피너를 그룹으로 배치하는 방법을 보여줍니다.',
      },
    },
  },
};

// 오버레이 스피너 (Interactive)
export const OverlayDemo: Story = {
  render: function OverlayStory() {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowOverlay = () => {
      setShowOverlay(true);
      // 3초 후 자동으로 숨김
      setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
    };

    return (
      <div>
        <Button onClick={handleShowOverlay}>
          오버레이 스피너 표시 (3초)
        </Button>
        
        <LoadingSpinnerOverlay
          show={showOverlay}
          spinnerProps={{
            variant: 'circular',
            size: 'large',
            text: '데이터를 처리하고 있습니다...',
            color: 'white',
          }}
          opacity={0.7}
          closeOnClick={true}
          onClose={() => setShowOverlay(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '전체 화면 오버레이로 표시되는 스피너입니다. 버튼을 클릭하여 테스트해보세요.',
      },
    },
  },
};

// 로딩 상태 시뮬레이션
export const LoadingStates: Story = {
  render: function LoadingStatesStory() {
    const [loadingState, setLoadingState] = useState<string>('');

    const simulateLoading = (type: string) => {
      setLoadingState(type);
      setTimeout(() => {
        setLoadingState('');
      }, 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={() => simulateLoading('save')} size="small">
            저장
          </Button>
          <Button onClick={() => simulateLoading('load')} size="small">
            로드
          </Button>
          <Button onClick={() => simulateLoading('delete')} size="small">
            삭제
          </Button>
        </div>

        <div style={{ minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loadingState === 'save' && (
            <LoadingSpinner variant="circular" text="저장 중..." />
          )}
          {loadingState === 'load' && (
            <LoadingSpinner variant="dots" text="로드 중..." />
          )}
          {loadingState === 'delete' && (
            <LoadingSpinner variant="bars" text="삭제 중..." color="secondary" />
          )}
          {!loadingState && (
            <p style={{ color: '#666' }}>버튼을 클릭하여 로딩 상태를 확인하세요</p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 시나리오에서의 로딩 상태를 시뮬레이션합니다.',
      },
    },
  },
};

// 다양한 애니메이션 속도
export const AnimationSpeeds: Story = {
  render: () => (
    <LoadingSpinnerGroup direction="horizontal" spacing="large">
      <div style={{ textAlign: 'center' }}>
        <div style={{ animationDuration: '0.5s' }}>
          <LoadingSpinner variant="circular" />
        </div>
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Fast</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingSpinner variant="circular" />
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Normal</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ animationDuration: '2s' }}>
          <LoadingSpinner variant="circular" />
        </div>
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Slow</p>
      </div>
    </LoadingSpinnerGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '애니메이션 속도를 조정한 스피너들입니다.',
      },
    },
  },
};