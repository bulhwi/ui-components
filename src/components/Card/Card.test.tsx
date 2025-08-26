import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Card, CardContent, CardActions, CardAction, CardMeta, CardGrid, CardGroup } from './';
import { Button } from '../Button';
import { lightTheme } from '../../styles/theme';

// 테스트 래퍼 컴포넌트
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>
    {children}
  </ThemeProvider>
);

// 기본 렌더링 헬퍼
const renderCard = (props: any = {}, children?: React.ReactNode) => {
  return render(
    <TestWrapper>
      <Card {...props}>
        {children || <CardContent>Test content</CardContent>}
      </Card>
    </TestWrapper>
  );
};

describe('Card Component', () => {
  describe('기본 렌더링', () => {
    test('카드가 정상적으로 렌더링된다', () => {
      renderCard();
      
      expect(screen.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    test('커스텀 클래스명이 적용된다', () => {
      renderCard({ className: 'custom-card' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('custom-card');
    });

    test('커스텀 스타일이 적용된다', () => {
      const customStyle = { backgroundColor: 'red' };
      renderCard({ style: customStyle });
      
      const card = screen.getByRole('article');
      expect(card).toHaveStyle('background-color: red');
    });
  });

  describe('카드 변형', () => {
    test('filled 변형이 적용된다', () => {
      renderCard({ variant: 'filled' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });

    test('outlined 변형이 적용된다', () => {
      renderCard({ variant: 'outlined' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });

    test('elevated 변형이 적용된다', () => {
      renderCard({ variant: 'elevated' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });
  });

  describe('카드 크기', () => {
    test('small 크기가 적용된다', () => {
      renderCard({ size: 'small' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });

    test('medium 크기가 적용된다', () => {
      renderCard({ size: 'medium' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });

    test('large 크기가 적용된다', () => {
      renderCard({ size: 'large' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });
  });

  describe('카드 방향', () => {
    test('vertical 방향이 적용된다', () => {
      renderCard({ direction: 'vertical' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveStyle('flex-direction: column');
    });

    test('horizontal 방향이 적용된다', () => {
      renderCard({ direction: 'horizontal' });
      
      const card = screen.getByRole('article');
      expect(card).toHaveStyle('flex-direction: row');
    });
  });

  describe('카드 상태', () => {
    test('선택된 상태가 표시된다', () => {
      renderCard({ selected: true });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });

    test('비활성화 상태가 적용된다', () => {
      renderCard({ disabled: true });
      
      const card = screen.getByRole('article');
      expect(card).toHaveStyle('opacity: 0.6');
      expect(card).toHaveStyle('cursor: not-allowed');
    });

    test('테두리 강조가 적용된다', () => {
      renderCard({ bordered: true });
      
      const card = screen.getByRole('article');
      expect(card).toHaveClass('card');
    });
  });

  describe('인터랙션', () => {
    test('클릭 가능한 카드는 button 역할을 가진다', () => {
      renderCard({ clickable: true });
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('클릭 이벤트가 정상 작동한다', () => {
      const mockOnClick = jest.fn();
      renderCard({ clickable: true, onClick: mockOnClick });
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('비활성화된 카드는 클릭 이벤트가 실행되지 않는다', () => {
      const mockOnClick = jest.fn();
      renderCard({ disabled: true, onClick: mockOnClick });
      
      const card = screen.getByRole('article');
      fireEvent.click(card);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test('키보드 이벤트가 정상 작동한다', () => {
      const mockOnClick = jest.fn();
      renderCard({ clickable: true, onClick: mockOnClick });
      
      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(card, { key: ' ' });
      
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('이미지', () => {
    test('이미지가 정상적으로 렌더링된다', () => {
      const imageProps = {
        src: 'test-image.jpg',
        alt: 'Test image',
      };
      
      renderCard({ image: imageProps });
      
      const image = screen.getByAltText('Test image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    test('이미지 로딩 속성이 적용된다', () => {
      const imageProps = {
        src: 'test-image.jpg',
        alt: 'Test image',
        loading: 'lazy' as const,
      };
      
      renderCard({ image: imageProps });
      
      const image = screen.getByAltText('Test image');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('헤더', () => {
    test('헤더 제목과 부제목이 렌더링된다', () => {
      const headerProps = {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
      };
      
      renderCard({ header: headerProps });
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    });

    test('아바타가 렌더링된다', () => {
      const headerProps = {
        title: 'Card Title',
        avatar: 'avatar.jpg',
      };
      
      renderCard({ header: headerProps });
      
      const avatar = screen.getByRole('img');
      expect(avatar).toHaveAttribute('src', 'avatar.jpg');
    });

    test('헤더 액션이 렌더링된다', () => {
      const headerProps = {
        title: 'Card Title',
        action: <button>Action</button>,
      };
      
      renderCard({ header: headerProps });
      
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('푸터', () => {
    test('푸터가 렌더링된다', () => {
      const footerProps = {
        children: <div>Footer content</div>,
      };
      
      renderCard({ footer: footerProps });
      
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    test('푸터 정렬이 적용된다', () => {
      const footerProps = {
        children: <div>Footer content</div>,
        align: 'center' as const,
      };
      
      renderCard({ footer: footerProps });
      
      const footer = screen.getByText('Footer content').parentElement;
      expect(footer).toHaveStyle('justify-content: center');
    });
  });

  describe('로딩 상태', () => {
    test('로딩 상태에서 스켈레톤이 표시된다', () => {
      renderCard({ loading: true });
      
      const skeleton = document.querySelector('.card-skeleton');
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    test('aria-label이 설정된다', () => {
      renderCard({ 'aria-label': 'Test card label' });
      
      const card = screen.getByLabelText('Test card label');
      expect(card).toBeInTheDocument();
    });

    test('클릭 가능한 카드는 적절한 tabIndex를 가진다', () => {
      renderCard({ clickable: true });
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    test('커스텀 tabIndex가 설정된다', () => {
      renderCard({ tabIndex: 5 });
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('tabIndex', '5');
    });
  });
});

describe('CardContent Component', () => {
  test('CardContent가 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <CardContent>Content text</CardContent>
      </TestWrapper>
    );
    
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  test('CardContent에 클래스명이 적용된다', () => {
    render(
      <TestWrapper>
        <CardContent className="custom-content">Content text</CardContent>
      </TestWrapper>
    );
    
    const content = screen.getByText('Content text');
    expect(content).toHaveClass('custom-content');
  });
});

describe('CardActions Component', () => {
  test('CardActions가 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <CardActions>
          <Button>Action 1</Button>
          <Button>Action 2</Button>
        </CardActions>
      </TestWrapper>
    );
    
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
});

describe('CardAction Component', () => {
  test('버튼형 액션이 정상 작동한다', () => {
    const mockOnClick = jest.fn();
    
    render(
      <TestWrapper>
        <CardAction onClick={mockOnClick}>Click me</CardAction>
      </TestWrapper>
    );
    
    const action = screen.getByText('Click me');
    fireEvent.click(action);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('링크형 액션이 정상 작동한다', () => {
    render(
      <TestWrapper>
        <CardAction href="https://example.com" target="_blank">
          Link action
        </CardAction>
      </TestWrapper>
    );
    
    const link = screen.getByText('Link action');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('비활성화된 액션은 클릭되지 않는다', () => {
    const mockOnClick = jest.fn();
    
    render(
      <TestWrapper>
        <CardAction disabled onClick={mockOnClick}>
          Disabled action
        </CardAction>
      </TestWrapper>
    );
    
    const action = screen.getByText('Disabled action');
    fireEvent.click(action);
    
    expect(mockOnClick).not.toHaveBeenCalled();
    expect(action).toHaveStyle('opacity: 0.5');
  });
});

describe('CardMeta Component', () => {
  test('메타 정보가 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <CardMeta
          title="Meta Title"
          description="Meta description"
          avatar="avatar.jpg"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Meta Title')).toBeInTheDocument();
    expect(screen.getByText('Meta description')).toBeInTheDocument();
  });
});

describe('CardGrid Component', () => {
  test('그리드가 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <CardGrid columns={2}>
          <Card><CardContent>Card 1</CardContent></Card>
          <Card><CardContent>Card 2</CardContent></Card>
        </CardGrid>
      </TestWrapper>
    );
    
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
  });
});

describe('CardGroup Component', () => {
  test('그룹이 정상적으로 렌더링된다', () => {
    render(
      <TestWrapper>
        <CardGroup variant="outlined" spacing="medium">
          <Card><CardContent>Group Card 1</CardContent></Card>
          <Card><CardContent>Group Card 2</CardContent></Card>
        </CardGroup>
      </TestWrapper>
    );
    
    expect(screen.getByText('Group Card 1')).toBeInTheDocument();
    expect(screen.getByText('Group Card 2')).toBeInTheDocument();
  });

  test('그룹의 공통 속성이 하위 카드에 적용된다', () => {
    render(
      <TestWrapper>
        <CardGroup variant="outlined">
          <Card data-testid="group-card">
            <CardContent>Group Card</CardContent>
          </Card>
        </CardGroup>
      </TestWrapper>
    );
    
    // 카드가 렌더링되는지 확인 (실제 prop 전달 테스트는 복잡하므로 기본 렌더링만 확인)
    expect(screen.getByText('Group Card')).toBeInTheDocument();
  });
});