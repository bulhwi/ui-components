import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: '소개/시작하기',
  parameters: {
    docs: {
      page: () => (
        <div style={{ padding: '2rem', maxWidth: '800px' }}>
          <h1>MBSW UI Kit</h1>
          <p>React와 Next.js, TypeScript 기반의 사내 전용 UI 컴포넌트 라이브러리</p>
          
          <h2>개요</h2>
          <p>
            사내 프런트엔드 개발자가 프로젝트를 시작하거나 기존 프로젝트를 확장할 때, 
            일관성 있고 검증된 UI 컴포넌트를 빠르게 가져다 쓸 수 있는 React·Next.js·TypeScript 기반 내부 전용 라이브러리입니다.
          </p>

          <h2>주요 기능</h2>
          <ul>
            <li><strong>Storybook 프리뷰</strong>: 컴포넌트별 실시간 렌더·Docs 패널 자동 생성</li>
            <li><strong>다크 모드 스위처</strong>: Global 토글 및 ThemeProvider 구현</li>
            <li><strong>i18n 지원</strong>: Storybook UI & 데모 텍스트 다국어</li>
            <li><strong>Jest + RTL 테스트</strong>: 유닛 테스트·커버리지 리포트</li>
            <li><strong>반응형</strong>: 뷰포트 컨트롤로 모바일/태블릿 미리보기</li>
          </ul>

          <h2>사용 방법</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
{`import { Button, Input, Modal } from 'mbsw-ui-kit';

function App() {
  return (
    <div>
      <Button variant="primary">클릭하세요</Button>
      <Input placeholder="이메일을 입력하세요" />
    </div>
  );
}`}
          </pre>

          <h2>컴포넌트 목록</h2>
          <p>좌측 사이드바에서 각 컴포넌트의 스토리를 확인하고 다양한 props를 실시간으로 테스트해보세요.</p>
        </div>
      ),
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const 시작하기: Story = {};