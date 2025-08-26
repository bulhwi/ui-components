import styled, { css } from 'styled-components';

// 공통 컨테이너 스타일
const containerStyles = {
  sm: css`max-width: 640px;`,
  md: css`max-width: 768px;`,
  lg: css`max-width: 1024px;`,
  xl: css`max-width: 1280px;`,
  full: css`max-width: 100%;`,
};

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  
  ${({ maxWidth = 'lg' }) => containerStyles[maxWidth]}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

// Header 스타일
interface StyledHeaderProps {
  sticky?: boolean;
  transparent?: boolean;
}

export const StyledHeader = styled.header.withConfig({
  shouldForwardProp: (prop) => !['sticky', 'transparent'].includes(prop),
})<StyledHeaderProps>`
  width: 100%;
  background: ${({ transparent, theme }) => 
    transparent ? 'transparent' : theme.colors.background};
  border-bottom: ${({ transparent, theme }) => 
    transparent ? 'none' : `1px solid ${theme.colors.border}`};
  transition: all 0.3s ease;
  
  ${({ sticky }) =>
    sticky &&
    css`
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(8px);
      background: ${({ theme }) => `${theme.colors.background}f0`};
    `}
`;

export const StyledHeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 56px;
  }
`;

export const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  img {
    height: 32px;
    width: auto;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    img {
      height: 28px;
    }
  }
`;

export const StyledNavigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const StyledNavItem = styled.a.withConfig({
  shouldForwardProp: (prop) => !['active', 'disabled'].includes(prop),
})<{ active?: boolean; disabled?: boolean }>`
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ active, theme }) => 
    active ? theme.fonts.weights.semibold : theme.fonts.weights.normal};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  
  &:hover {
    background: ${({ disabled, theme }) => 
      disabled ? 'transparent' : theme.colors.surface};
    color: ${({ disabled, theme }) => 
      disabled ? 'inherit' : theme.colors.primary};
  }
`;

export const StyledHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledMobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

interface MobileMenuProps {
  isOpen?: boolean;
}

export const StyledMobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<MobileMenuProps>`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 99;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 56px;
  }
`;

export const StyledMobileMenuContent = styled(Container)`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const StyledMobileNavItem = styled.a.withConfig({
  shouldForwardProp: (prop) => !['active', 'disabled'].includes(prop),
})<{ active?: boolean; disabled?: boolean }>`
  display: block;
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text.primary};
  text-decoration: none;
  font-weight: ${({ active, theme }) => 
    active ? theme.fonts.weights.semibold : theme.fonts.weights.normal};
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${({ disabled, theme }) => 
      disabled ? 'inherit' : theme.colors.primary};
  }
`;

// Footer 스타일
export const StyledFooter = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

interface FooterContentProps {
  showDivider?: boolean;
}

export const StyledFooterContent = styled(Container).withConfig({
  shouldForwardProp: (prop) => !['showDivider'].includes(prop),
})<FooterContentProps>`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  
  ${({ showDivider, theme }) =>
    showDivider &&
    css`
      border-bottom: 1px solid ${theme.colors.border};
    `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.sm}`};
  }
`;

export const StyledFooterSections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const StyledFooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFooterSectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

export const StyledFooterLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledFooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    text-align: center;
  }
`;

export const StyledCopyright = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
  margin: 0;
`;

export const StyledSocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledSocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Layout 래퍼 스타일
export const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledLayoutMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;