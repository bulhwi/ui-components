import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Card, CardContent, CardActions, CardAction, CardMeta, CardGrid, CardGroup } from './';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '다양한 콘텐츠를 담을 수 있는 카드 컴포넌트입니다. 이미지, 텍스트, 액션 등을 조합하여 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'elevated'],
      description: '카드 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '카드 크기',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '카드 방향',
    },
    hoverable: {
      control: 'boolean',
      description: '호버 효과 활성화',
    },
    clickable: {
      control: 'boolean',
      description: '클릭 가능 여부',
    },
    selected: {
      control: 'boolean',
      description: '선택된 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    bordered: {
      control: 'boolean',
      description: '테두리 강조',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 기본 카드
export const Default: Story = {
  args: {
    children: (
      <CardContent>
        <h3>카드 제목</h3>
        <p>이것은 기본 카드 컴포넌트입니다. 다양한 콘텐츠를 담을 수 있습니다.</p>
      </CardContent>
    ),
  },
};

// 카드 변형들
export const Variants: Story = {
  render: () => (
    <CardGrid columns={3} gap="large">
      <Card variant="filled">
        <CardContent>
          <h3>Filled Card</h3>
          <p>배경이 채워진 카드입니다.</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined">
        <CardContent>
          <h3>Outlined Card</h3>
          <p>테두리만 있는 카드입니다.</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardContent>
          <h3>Elevated Card</h3>
          <p>그림자가 있는 카드입니다.</p>
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 카드 크기들
export const Sizes: Story = {
  render: () => (
    <CardGroup spacing="large">
      <Card size="small" variant="outlined">
        <CardContent>
          <h4>Small Card</h4>
          <p>작은 카드입니다.</p>
        </CardContent>
      </Card>
      
      <Card size="medium" variant="outlined">
        <CardContent>
          <h3>Medium Card</h3>
          <p>보통 크기의 카드입니다.</p>
        </CardContent>
      </Card>
      
      <Card size="large" variant="outlined">
        <CardContent>
          <h2>Large Card</h2>
          <p>큰 카드입니다.</p>
        </CardContent>
      </Card>
    </CardGroup>
  ),
};

// 이미지가 있는 카드
export const WithImage: Story = {
  render: () => (
    <CardGrid columns={2} gap="large">
      <Card 
        variant="outlined"
        image={{
          src: 'https://picsum.photos/400/250',
          alt: '풍경 이미지',
          aspectRatio: '16/9',
        }}
      >
        <CardContent>
          <h3>이미지 카드</h3>
          <p>상단에 이미지가 있는 카드입니다.</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="outlined"
        direction="horizontal"
        image={{
          src: 'https://picsum.photos/200/200',
          alt: '정사각형 이미지',
          position: 'left',
          aspectRatio: '1/1',
        }}
      >
        <CardContent>
          <h3>가로 이미지 카드</h3>
          <p>좌측에 이미지가 있는 가로형 카드입니다.</p>
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 헤더가 있는 카드
export const WithHeader: Story = {
  render: () => (
    <CardGrid columns={2} gap="large">
      <Card 
        variant="elevated"
        header={{
          title: '사용자 프로필',
          subtitle: '개발자',
          avatar: 'https://picsum.photos/80/80?random=1',
        }}
      >
        <CardContent>
          <p>이름: 김개발자</p>
          <p>이메일: dev@example.com</p>
          <p>경력: 5년</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="outlined"
        header={{
          title: '프로젝트 상태',
          subtitle: '진행 중',
          action: <Button size="small" variant="secondary">더보기</Button>,
        }}
      >
        <CardContent>
          <p>완료율: 75%</p>
          <p>남은 일정: 2주</p>
          <p>팀원: 4명</p>
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 액션이 있는 카드
export const WithActions: Story = {
  render: () => (
    <CardGrid columns={2} gap="large">
      <Card variant="outlined">
        <CardContent>
          <h3>액션 카드</h3>
          <p>하단에 액션 버튼들이 있는 카드입니다.</p>
        </CardContent>
        <CardActions>
          <Button variant="primary" size="small" onClick={action('primary-action')}>
            주요 액션
          </Button>
          <Button variant="secondary" size="small" onClick={action('secondary-action')}>
            보조 액션
          </Button>
        </CardActions>
      </Card>
      
      <Card 
        variant="outlined"
        footer={{
          align: 'space-between',
          children: (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <CardMeta
                title="작성자"
                description="2024.01.15"
                avatar="https://picsum.photos/32/32?random=2"
              />
              <CardActions>
                <CardAction onClick={action('like')}>👍</CardAction>
                <CardAction onClick={action('share')}>📤</CardAction>
              </CardActions>
            </div>
          ),
        }}
      >
        <CardContent>
          <h3>메타 정보 카드</h3>
          <p>작성자 정보와 액션이 하단에 있는 카드입니다.</p>
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 인터랙티브 카드
export const Interactive: Story = {
  render: () => (
    <CardGrid columns={3} gap="medium">
      <Card 
        variant="outlined" 
        hoverable
        onClick={action('card-hover-click')}
      >
        <CardContent>
          <h3>Hoverable Card</h3>
          <p>마우스를 올려보세요!</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="filled" 
        clickable
        onClick={action('card-click')}
      >
        <CardContent>
          <h3>Clickable Card</h3>
          <p>클릭해보세요!</p>
        </CardContent>
      </Card>
      
      <Card 
        variant="elevated" 
        selected
        onClick={action('selected-card-click')}
      >
        <CardContent>
          <h3>Selected Card</h3>
          <p>선택된 상태입니다.</p>
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <CardGrid columns={3} gap="medium">
      <Card loading variant="outlined" />
      <Card loading variant="outlined" />
      <Card loading variant="outlined" />
    </CardGrid>
  ),
};

// 복잡한 카드 예시
export const Complex: Story = {
  render: () => (
    <CardGrid columns={2} gap="large">
      <Card 
        variant="elevated"
        hoverable
        image={{
          src: 'https://picsum.photos/400/200',
          alt: '제품 이미지',
          aspectRatio: '2/1',
        }}
        header={{
          title: '새로운 제품',
          subtitle: '혁신적인 기술',
          action: <Button size="small" variant="tertiary">북마크</Button>,
        }}
        footer={{
          align: 'space-between',
          children: (
            <>
              <CardMeta
                title="₩299,000"
                description="무료 배송"
              />
              <CardActions>
                <Button variant="primary" size="small" onClick={action('buy')}>
                  구매하기
                </Button>
                <Button variant="secondary" size="small" onClick={action('cart')}>
                  장바구니
                </Button>
              </CardActions>
            </>
          ),
        }}
      >
        <CardContent>
          <p>최신 기술을 적용한 혁신적인 제품입니다. 뛰어난 성능과 디자인을 자랑합니다.</p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <span style={{ padding: '2px 8px', background: '#e3f2fd', borderRadius: '12px', fontSize: '12px' }}>
              인기
            </span>
            <span style={{ padding: '2px 8px', background: '#f3e5f5', borderRadius: '12px', fontSize: '12px' }}>
              신제품
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        variant="outlined"
        direction="horizontal"
        clickable
        onClick={action('article-click')}
        image={{
          src: 'https://picsum.photos/150/150',
          alt: '기사 썸네일',
          position: 'left',
          aspectRatio: '1/1',
        }}
      >
        <CardContent style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>기술 뉴스</h3>
          <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
            최신 기술 트렌드에 대한 흥미로운 기사입니다. 업계 전문가들의 인사이트를 확인해보세요.
          </p>
          <CardMeta
            title="TechNews"
            description="2시간 전"
            avatar="https://picsum.photos/24/24?random=3"
          />
        </CardContent>
      </Card>
    </CardGrid>
  ),
};

// 카드 그리드 예시
export const GridLayout: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '24px' }}>반응형 카드 그리드</h2>
      <CardGrid 
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        gap="medium"
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Card 
            key={index}
            variant="outlined"
            hoverable
            image={{
              src: `https://picsum.photos/300/200?random=${index + 1}`,
              alt: `이미지 ${index + 1}`,
              aspectRatio: '3/2',
            }}
          >
            <CardContent>
              <h4>카드 {index + 1}</h4>
              <p>그리드 레이아웃의 카드 예시입니다.</p>
            </CardContent>
            <CardActions>
              <Button variant="primary" size="small" onClick={action(`card-${index + 1}-action`)}>
                액션
              </Button>
            </CardActions>
          </Card>
        ))}
      </CardGrid>
    </div>
  ),
};

// 카드 그룹 예시
export const GroupLayout: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '24px' }}>카드 그룹</h2>
      <CardGroup variant="outlined" spacing="large">
        <Card>
          <CardContent>
            <h3>그룹 카드 1</h3>
            <p>같은 스타일을 공유하는 카드들입니다.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>그룹 카드 2</h3>
            <p>variant가 자동으로 적용됩니다.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>그룹 카드 3</h3>
            <p>일관성 있는 디자인을 유지합니다.</p>
          </CardContent>
        </Card>
      </CardGroup>
    </div>
  ),
};

// 모든 기능이 포함된 완전한 예시
export const Complete: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '24px' }}>완전한 카드 예시</h2>
      <CardGrid columns={3} gap="large">
        {/* 제품 카드 */}
        <Card 
          variant="elevated"
          hoverable
          image={{
            src: 'https://picsum.photos/400/250?random=100',
            alt: '제품',
            aspectRatio: '16/10',
          }}
          header={{
            title: 'Premium 제품',
            subtitle: '최고급 라인',
            avatar: 'https://picsum.photos/40/40?random=101',
          }}
          footer={{
            align: 'space-between',
            children: (
              <>
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1976d2' }}>
                  ₩399,000
                </span>
                <CardActions>
                  <CardAction onClick={action('wishlist')}>💖</CardAction>
                  <Button variant="primary" size="small" onClick={action('purchase')}>
                    구매
                  </Button>
                </CardActions>
              </>
            ),
          }}
        >
          <CardContent>
            <p>프리미엄 품질의 제품으로 최상의 사용자 경험을 제공합니다.</p>
            <div style={{ marginTop: '12px' }}>
              <span style={{ padding: '4px 8px', background: '#fff3e0', borderRadius: '12px', fontSize: '12px', marginRight: '8px' }}>
                베스트셀러
              </span>
              <span style={{ padding: '4px 8px', background: '#e8f5e8', borderRadius: '12px', fontSize: '12px' }}>
                무료배송
              </span>
            </div>
          </CardContent>
        </Card>
        
        {/* 프로필 카드 */}
        <Card 
          variant="filled"
          clickable
          onClick={action('profile-click')}
          header={{
            title: '김개발자',
            subtitle: 'Senior Frontend Developer',
            avatar: 'https://picsum.photos/40/40?random=102',
            action: <Button size="small" variant="tertiary">팔로우</Button>,
          }}
        >
          <CardContent>
            <p>5년차 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용합니다.</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '14px' }}>
              <span><strong>프로젝트:</strong> 47</span>
              <span><strong>팔로워:</strong> 1.2K</span>
            </div>
          </CardContent>
          <CardActions>
            <CardAction href="mailto:dev@example.com">📧 이메일</CardAction>
            <CardAction href="https://github.com" target="_blank">🔗 GitHub</CardAction>
          </CardActions>
        </Card>
        
        {/* 뉴스 카드 */}
        <Card 
          variant="outlined"
          hoverable
          image={{
            src: 'https://picsum.photos/400/200?random=103',
            alt: '뉴스',
            aspectRatio: '2/1',
          }}
        >
          <CardContent>
            <h3 style={{ margin: '0 0 8px 0' }}>기술 트렌드 2024</h3>
            <p>올해 주목해야 할 최신 기술 트렌드들을 소개합니다. AI, 클라우드, 보안 등...</p>
          </CardContent>
          <CardMeta
            title="TechBlog"
            description="1시간 전 • 5분 읽기"
            avatar="https://picsum.photos/32/32?random=104"
          />
        </Card>
      </CardGrid>
    </div>
  ),
};