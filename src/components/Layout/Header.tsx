import React, { useState, useCallback } from 'react';
import { HeaderProps, NavigationItem } from './types';
import {
  StyledHeader,
  StyledHeaderContainer,
  StyledLogo,
  StyledNavigation,
  StyledNavItem,
  StyledHeaderActions,
  StyledMobileMenuButton,
  StyledMobileMenu,
  StyledMobileMenuContent,
  StyledMobileNavItem,
} from './styles';

// 햄버거 메뉴 아이콘
const HamburgerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
  </svg>
);

// 닫기 아이콘
const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  logo,
  logoHref,
  onLogoClick,
  navigation = [],
  actions,
  className,
  style,
  sticky = false,
  transparent = false,
  showMobileMenu: controlledMobileMenu,
  onMobileMenuToggle,
  maxWidth = 'lg',
}) => {
  const [internalMobileMenu, setInternalMobileMenu] = useState(false);
  
  // 제어되는 상태인지 확인
  const isControlledMobileMenu = controlledMobileMenu !== undefined;
  const isMobileMenuOpen = isControlledMobileMenu ? controlledMobileMenu : internalMobileMenu;
  
  const handleMobileMenuToggle = useCallback(() => {
    if (isControlledMobileMenu) {
      onMobileMenuToggle?.();
    } else {
      setInternalMobileMenu(prev => !prev);
    }
  }, [isControlledMobileMenu, onMobileMenuToggle]);
  
  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  }, [onLogoClick]);
  
  const handleNavItemClick = useCallback((item: NavigationItem, e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    
    if (item.onClick) {
      e.preventDefault();
      item.onClick();
    }
    
    // 모바일 메뉴가 열려있으면 닫기
    if (isMobileMenuOpen) {
      handleMobileMenuToggle();
    }
  }, [isMobileMenuOpen, handleMobileMenuToggle]);
  
  const renderNavItem = (item: NavigationItem, isMobile = false) => {
    const Component = isMobile ? StyledMobileNavItem : StyledNavItem;
    const commonProps = {
      key: item.label,
      href: item.href || '#',
      active: item.active,
      disabled: item.disabled,
      onClick: (e: React.MouseEvent) => handleNavItemClick(item, e),
      'aria-current': item.active ? 'page' as const : undefined,
    };
    
    return (
      <Component {...commonProps}>
        {item.label}
      </Component>
    );
  };
  
  const renderNavigation = (items: NavigationItem[], isMobile = false) => {
    return items.map(item => renderNavItem(item, isMobile));
  };

  return (
    <>
      <StyledHeader
        className={className}
        style={style}
        sticky={sticky}
        transparent={transparent}
      >
        <StyledHeaderContainer maxWidth={maxWidth}>
          {/* 로고 */}
          {logo && (
            <StyledLogo
              as={logoHref ? 'a' : 'div'}
              href={logoHref}
              onClick={handleLogoClick}
              role={onLogoClick ? 'button' : undefined}
              tabIndex={onLogoClick ? 0 : undefined}
            >
              {logo}
            </StyledLogo>
          )}
          
          {/* 데스크톱 네비게이션 */}
          {navigation.length > 0 && (
            <StyledNavigation role="navigation" aria-label="주요 네비게이션">
              {renderNavigation(navigation)}
            </StyledNavigation>
          )}
          
          {/* 액션 영역 */}
          <StyledHeaderActions>
            {actions}
            
            {/* 모바일 메뉴 버튼 */}
            {navigation.length > 0 && (
              <StyledMobileMenuButton
                onClick={handleMobileMenuToggle}
                aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </StyledMobileMenuButton>
            )}
          </StyledHeaderActions>
        </StyledHeaderContainer>
      </StyledHeader>
      
      {/* 모바일 메뉴 */}
      {navigation.length > 0 && (
        <StyledMobileMenu id="mobile-menu" isOpen={isMobileMenuOpen}>
          <StyledMobileMenuContent maxWidth={maxWidth}>
            <nav role="navigation" aria-label="모바일 네비게이션">
              {renderNavigation(navigation, true)}
            </nav>
          </StyledMobileMenuContent>
        </StyledMobileMenu>
      )}
    </>
  );
};