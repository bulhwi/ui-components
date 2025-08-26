import React from 'react';

// Header 관련 타입
export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

export interface HeaderProps {
  logo?: React.ReactNode;
  logoHref?: string;
  onLogoClick?: () => void;
  navigation?: NavigationItem[];
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sticky?: boolean;
  transparent?: boolean;
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Footer 관련 타입
export interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export interface FooterSection {
  title?: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: React.ReactNode;
  label?: string;
}

export interface FooterProps {
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyright?: string;
  logo?: React.ReactNode;
  logoHref?: string;
  onLogoClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showDivider?: boolean;
}

// Layout 래퍼 타입
export interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}