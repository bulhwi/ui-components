import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Layout } from './Layout';
import { Button } from '../Button/Button';
import { HeaderProps, FooterProps } from './types';

// Header Stories
const headerMeta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '로고, 네비게이션, 액션 버튼을 포함한 반응형 Header 컴포넌트입니다. 스티키 모드와 투명 모드를 지원하며, 모바일에서는 햄버거 메뉴로 전환됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
      description: '스티키 헤더 여부',
    },
    transparent: {
      control: 'boolean',
      description: '투명 배경 여부',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: '최대 너비',
    },
  },
};

export default headerMeta;
type HeaderStory = StoryObj<HeaderProps>;

// 기본 로고 컴포넌트
const Logo = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    fontWeight: 'bold', 
    fontSize: '20px',
    color: '#007bff'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      background: '#007bff',
      borderRadius: '8px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '14px',
      fontWeight: 'bold'
    }}>
      UI
    </div>
    MBSW UI Kit
  </div>
);

// 네비게이션 데이터
const navigationItems = [
  { label: '홈', href: '/', active: true },
  { label: '컴포넌트', href: '/components' },
  { label: '가이드', href: '/guide' },
  { label: '블로그', href: '/blog' },
  { label: '문의', href: '/contact' },
];

// 기본 헤더
export const DefaultHeader: HeaderStory = {
  args: {
    logo: <Logo />,
    logoHref: '/',
    navigation: navigationItems,
    actions: (
      <>
        <Button variant="secondary" size="small">로그인</Button>
        <Button variant="primary" size="small">회원가입</Button>
      </>
    ),
  },
};

// 스티키 헤더
export const StickyHeader: HeaderStory = {
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ height: '200vh', padding: '20px', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
        <h1>스크롤하여 스티키 헤더를 확인하세요</h1>
        <p>헤더가 페이지 상단에 고정됩니다.</p>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>스크롤 콘텐츠 {i + 1}</p>
        ))}
      </div>
    </div>
  ),
  args: {
    logo: <Logo />,
    navigation: navigationItems,
    sticky: true,
    actions: <Button variant="primary" size="small">시작하기</Button>,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// 투명 헤더
export const TransparentHeader: HeaderStory = {
  render: (args) => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <Header {...args} />
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>투명 헤더</h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>배경이 투명한 헤더로 히어로 섹션에 적합합니다.</p>
      </div>
    </div>
  ),
  args: {
    logo: <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>BRAND</div>,
    navigation: navigationItems.map(item => ({ ...item, active: false })),
    transparent: true,
    actions: <Button variant="primary" size="small">시작하기</Button>,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// 모바일 메뉴 제어
export const MobileMenuControlled: HeaderStory = {
  render: () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
      <div>
        <Header
          logo={<Logo />}
          navigation={navigationItems}
          showMobileMenu={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          actions={<Button variant="primary" size="small">로그인</Button>}
        />
        <div style={{ padding: '20px' }}>
          <p>화면을 좁혀서 모바일 메뉴를 확인하거나 아래 버튼을 사용하세요.</p>
          <Button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            모바일 메뉴 {isMobileMenuOpen ? '닫기' : '열기'}
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Footer Stories
const footerMeta: Meta<typeof Footer> = {
  title: 'Components/Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '다단 레이아웃을 지원하는 Footer 컴포넌트입니다. 섹션별 링크, 소셜 링크, 저작권 정보를 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export { footerMeta as FooterMeta };
type FooterStory = StoryObj<FooterProps>;

// Footer 데이터
const footerSections = [
  {
    title: '제품',
    links: [
      { label: '컴포넌트', href: '/components' },
      { label: '템플릿', href: '/templates' },
      { label: '아이콘', href: '/icons' },
      { label: '테마', href: '/themes' },
    ],
  },
  {
    title: '개발자',
    links: [
      { label: 'API 문서', href: '/docs' },
      { label: '가이드', href: '/guide' },
      { label: '예제', href: '/examples' },
      { label: 'GitHub', href: 'https://github.com', external: true },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '소개', href: '/about' },
      { label: '채용', href: '/careers' },
      { label: '블로그', href: '/blog' },
      { label: '문의', href: '/contact' },
    ],
  },
  {
    title: '지원',
    links: [
      { label: '도움말', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: '커뮤니티', href: '/community' },
      { label: '상태', href: '/status' },
    ],
  },
];

const socialLinks = [
  { platform: 'github', href: 'https://github.com' },
  { platform: 'twitter', href: 'https://twitter.com' },
  { platform: 'linkedin', href: 'https://linkedin.com' },
  { platform: 'instagram', href: 'https://instagram.com' },
];

// 기본 푸터
export const DefaultFooter: FooterStory = {
  args: {
    sections: footerSections,
    socialLinks: socialLinks,
    copyright: '© 2024 MBSW UI Kit. All rights reserved.',
    logo: <Logo />,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// 간단한 푸터
export const SimpleFooter: FooterStory = {
  args: {
    copyright: '© 2024 My Company. All rights reserved.',
    socialLinks: socialLinks.slice(0, 2),
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Layout Stories
const layoutMeta: Meta<typeof Layout> = {
  title: 'Components/Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header, Main Content, Footer를 포함하는 전체 페이지 레이아웃 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export { layoutMeta as LayoutMeta };
type LayoutStory = StoryObj<typeof Layout>;

// 완전한 레이아웃
export const CompleteLayout: LayoutStory = {
  render: () => {
    const header = (
      <Header
        logo={<Logo />}
        navigation={navigationItems}
        actions={
          <>
            <Button variant="secondary" size="small">로그인</Button>
            <Button variant="primary" size="small">회원가입</Button>
          </>
        }
      />
    );
    
    const footer = (
      <Footer
        sections={footerSections}
        socialLinks={socialLinks}
        copyright="© 2024 MBSW UI Kit. All rights reserved."
        logo={<Logo />}
      />
    );
    
    return (
      <Layout header={header} footer={footer}>
        <div style={{ padding: '40px 20px', minHeight: '60vh' }}>
          <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <h1>메인 콘텐츠 영역</h1>
            <p>여기에 페이지의 주요 콘텐츠가 들어갑니다.</p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px', 
              margin: '40px 0' 
            }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  padding: '20px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}>
                  <h3>섹션 {i}</h3>
                  <p>콘텐츠 예시입니다. 실제 프로젝트에서는 다양한 컴포넌트와 콘텐츠가 들어갈 수 있습니다.</p>
                  <Button variant={i === 1 ? 'primary' : 'secondary'}>
                    더 알아보기
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// 스티키 헤더를 가진 레이아웃
export const StickyHeaderLayout: LayoutStory = {
  render: () => {
    const header = (
      <Header
        logo={<Logo />}
        navigation={navigationItems}
        sticky={true}
        actions={<Button variant="primary" size="small">시작하기</Button>}
      />
    );
    
    const footer = (
      <Footer
        sections={footerSections.slice(0, 2)}
        copyright="© 2024 MBSW UI Kit. All rights reserved."
      />
    );
    
    return (
      <Layout header={header} footer={footer}>
        <div style={{ padding: '20px' }}>
          <h1>스티키 헤더 레이아웃</h1>
          <p>스크롤해도 헤더가 상단에 고정됩니다.</p>
          
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ 
              padding: '20px', 
              margin: '10px 0', 
              background: '#f9f9f9',
              borderRadius: '4px'
            }}>
              <h3>섹션 {i + 1}</h3>
              <p>스크롤 콘텐츠입니다. 헤더가 상단에 고정되는지 확인해보세요.</p>
            </div>
          ))}
        </div>
      </Layout>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};