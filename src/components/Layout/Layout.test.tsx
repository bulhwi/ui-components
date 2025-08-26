import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Header } from './Header';
import { Footer } from './Footer';
import { Layout } from './Layout';

const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

const renderWithTheme = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MockThemeProvider });
};

// 테스트용 데이터
const mockNavigation = [
  { label: '홈', href: '/', active: true },
  { label: '제품', href: '/products' },
  { label: '회사소개', href: '/about' },
  { label: '문의', href: '/contact', disabled: true },
];

const mockFooterSections = [
  {
    title: '제품',
    links: [
      { label: '컴포넌트', href: '/components' },
      { label: '템플릿', href: '/templates' },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '소개', href: '/about' },
      { label: '채용', href: '/careers' },
    ],
  },
];

const mockSocialLinks = [
  { platform: 'github', href: 'https://github.com' },
  { platform: 'twitter', href: 'https://twitter.com' },
];

const MockLogo = () => <div>Test Logo</div>;

describe('Header', () => {
  describe('기본 렌더링', () => {
    it('로고가 렌더링된다', () => {
      renderWithTheme(
        <Header logo={<MockLogo />} />
      );
      
      expect(screen.getByText('Test Logo')).toBeInTheDocument();
    });

    it('네비게이션이 렌더링된다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      // 데스크톱 네비게이션에서 찾기 (첫 번째로 나타나는 것)
      const desktopNav = screen.getByLabelText('주요 네비게이션');
      expect(desktopNav).toBeInTheDocument();
      
      expect(screen.getAllByText('홈')).toHaveLength(2); // 데스크톱 + 모바일
      expect(screen.getAllByText('제품')).toHaveLength(2);
      expect(screen.getAllByText('회사소개')).toHaveLength(2);
      expect(screen.getAllByText('문의')).toHaveLength(2);
    });

    it('액션 영역이 렌더링된다', () => {
      renderWithTheme(
        <Header actions={<button>로그인</button>} />
      );
      
      expect(screen.getByText('로그인')).toBeInTheDocument();
    });
  });

  describe('네비게이션', () => {
    it('활성 상태가 올바르게 표시된다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      const homeLinks = screen.getAllByText('홈');
      expect(homeLinks[0]).toHaveAttribute('aria-current', 'page'); // 데스크톱 링크
      expect(homeLinks[1]).toHaveAttribute('aria-current', 'page'); // 모바일 링크
    });

    it('비활성화된 링크가 올바르게 처리된다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      const disabledLinks = screen.getAllByText('문의');
      expect(disabledLinks[0]).toHaveStyle('opacity: 0.5'); // 데스크톱 링크
    });

    it('네비게이션 클릭 이벤트가 호출된다', () => {
      const handleClick = jest.fn();
      const navigationWithHandler = [
        { label: '테스트', onClick: handleClick },
      ];
      
      renderWithTheme(
        <Header navigation={navigationWithHandler} />
      );
      
      const testLinks = screen.getAllByText('테스트');
      fireEvent.click(testLinks[0]); // 데스크톱 링크 클릭
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('모바일 메뉴', () => {
    it('모바일 메뉴 버튼이 렌더링된다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      expect(screen.getByLabelText('메뉴 열기')).toBeInTheDocument();
    });

    it('모바일 메뉴 토글이 작동한다', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      const menuButton = screen.getByLabelText('메뉴 열기');
      await user.click(menuButton);
      
      expect(screen.getByLabelText('메뉴 닫기')).toBeInTheDocument();
    });

    it('제어되는 모바일 메뉴가 작동한다', () => {
      const handleToggle = jest.fn();
      renderWithTheme(
        <Header 
          navigation={mockNavigation}
          showMobileMenu={true}
          onMobileMenuToggle={handleToggle}
        />
      );
      
      expect(screen.getByLabelText('메뉴 닫기')).toBeInTheDocument();
      
      fireEvent.click(screen.getByLabelText('메뉴 닫기'));
      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe('로고 상호작용', () => {
    it('로고 클릭 이벤트가 호출된다', () => {
      const handleLogoClick = jest.fn();
      renderWithTheme(
        <Header 
          logo={<MockLogo />}
          onLogoClick={handleLogoClick}
        />
      );
      
      fireEvent.click(screen.getByText('Test Logo'));
      expect(handleLogoClick).toHaveBeenCalled();
    });

    it('로고 href가 설정된다', () => {
      renderWithTheme(
        <Header 
          logo={<MockLogo />}
          logoHref="/"
        />
      );
      
      const logoElement = screen.getByText('Test Logo').closest('a');
      expect(logoElement).toHaveAttribute('href', '/');
    });
  });

  describe('접근성', () => {
    it('네비게이션에 올바른 ARIA 레이블이 있다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      expect(screen.getByLabelText('주요 네비게이션')).toBeInTheDocument();
    });

    it('모바일 메뉴 버튼에 올바른 ARIA 속성이 있다', () => {
      renderWithTheme(
        <Header navigation={mockNavigation} />
      );
      
      const menuButton = screen.getByLabelText('메뉴 열기');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });
  });
});

describe('Footer', () => {
  describe('기본 렌더링', () => {
    it('섹션들이 렌더링된다', () => {
      renderWithTheme(
        <Footer sections={mockFooterSections} />
      );
      
      expect(screen.getByText('제품')).toBeInTheDocument();
      expect(screen.getByText('회사')).toBeInTheDocument();
      expect(screen.getByText('컴포넌트')).toBeInTheDocument();
      expect(screen.getByText('소개')).toBeInTheDocument();
    });

    it('저작권 정보가 렌더링된다', () => {
      const copyright = '© 2024 Test Company';
      renderWithTheme(
        <Footer copyright={copyright} />
      );
      
      expect(screen.getByText(copyright)).toBeInTheDocument();
    });

    it('소셜 링크가 렌더링된다', () => {
      renderWithTheme(
        <Footer socialLinks={mockSocialLinks} />
      );
      
      expect(screen.getByLabelText('github 바로가기')).toBeInTheDocument();
      expect(screen.getByLabelText('twitter 바로가기')).toBeInTheDocument();
    });

    it('로고가 렌더링된다', () => {
      renderWithTheme(
        <Footer logo={<MockLogo />} />
      );
      
      expect(screen.getByText('Test Logo')).toBeInTheDocument();
    });
  });

  describe('링크 상호작용', () => {
    it('푸터 링크 클릭 이벤트가 호출된다', () => {
      const handleClick = jest.fn();
      const sectionsWithHandler = [
        {
          title: '테스트',
          links: [
            { label: '테스트 링크', onClick: handleClick },
          ],
        },
      ];
      
      renderWithTheme(
        <Footer sections={sectionsWithHandler} />
      );
      
      fireEvent.click(screen.getByText('테스트 링크'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('외부 링크가 올바른 속성을 가진다', () => {
      const sectionsWithExternal = [
        {
          title: '외부',
          links: [
            { label: '외부 링크', href: 'https://example.com', external: true },
          ],
        },
      ];
      
      renderWithTheme(
        <Footer sections={sectionsWithExternal} />
      );
      
      const externalLink = screen.getByText('외부 링크');
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('소셜 링크가 올바른 속성을 가진다', () => {
      renderWithTheme(
        <Footer socialLinks={mockSocialLinks} />
      );
      
      const githubLink = screen.getByLabelText('github 바로가기');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(githubLink).toHaveAttribute('href', 'https://github.com');
    });
  });

  describe('로고 상호작용', () => {
    it('푸터 로고 클릭 이벤트가 호출된다', () => {
      const handleLogoClick = jest.fn();
      renderWithTheme(
        <Footer 
          logo={<MockLogo />}
          onLogoClick={handleLogoClick}
        />
      );
      
      fireEvent.click(screen.getByText('Test Logo'));
      expect(handleLogoClick).toHaveBeenCalled();
    });
  });
});

describe('Layout', () => {
  it('기본 레이아웃이 렌더링된다', () => {
    renderWithTheme(
      <Layout>
        <div>Main Content</div>
      </Layout>
    );
    
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('헤더와 푸터가 포함된 레이아웃이 렌더링된다', () => {
    const header = <header>Test Header</header>;
    const footer = <footer>Test Footer</footer>;
    
    renderWithTheme(
      <Layout header={header} footer={footer}>
        <div>Main Content</div>
      </Layout>
    );
    
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  it('커스텀 클래스명이 적용된다', () => {
    const { container } = renderWithTheme(
      <Layout className="custom-layout">
        <div>Content</div>
      </Layout>
    );
    
    expect(container.firstChild).toHaveClass('custom-layout');
  });

  it('커스텀 스타일이 적용된다', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = renderWithTheme(
      <Layout style={customStyle}>
        <div>Content</div>
      </Layout>
    );
    
    expect(container.firstChild).toHaveStyle('background-color: red');
  });

  it('완전한 레이아웃 구조가 올바르게 렌더링된다', () => {
    const header = (
      <Header 
        logo={<MockLogo />}
        navigation={mockNavigation}
      />
    );
    
    const footer = (
      <Footer 
        sections={mockFooterSections}
        copyright="© 2024 Test"
      />
    );
    
    renderWithTheme(
      <Layout header={header} footer={footer}>
        <main>
          <h1>페이지 제목</h1>
          <p>페이지 내용</p>
        </main>
      </Layout>
    );
    
    // 헤더 요소들 확인
    expect(screen.getByText('Test Logo')).toBeInTheDocument();
    expect(screen.getAllByText('홈')).toHaveLength(2); // 데스크톱 + 모바일
    
    // 메인 콘텐츠 확인
    expect(screen.getByText('페이지 제목')).toBeInTheDocument();
    expect(screen.getByText('페이지 내용')).toBeInTheDocument();
    
    // 푸터 요소들 확인 (특정 링크로 확인)
    expect(screen.getByText('컴포넌트')).toBeInTheDocument(); // 푸터의 제품 섹션 링크
    expect(screen.getByText('© 2024 Test')).toBeInTheDocument();
  });
});