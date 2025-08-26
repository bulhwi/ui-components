export type LoadingSpinnerVariant = 'circular' | 'dots' | 'bars' | 'pulse';
export type LoadingSpinnerSize = 'small' | 'medium' | 'large';
export type LoadingSpinnerColor = 'primary' | 'secondary' | 'white';

export interface LoadingSpinnerProps {
  /** 스피너 변형 타입 */
  variant?: LoadingSpinnerVariant;
  /** 스피너 크기 */
  size?: LoadingSpinnerSize;
  /** 스피너 색상 테마 */
  color?: LoadingSpinnerColor;
  /** 로딩 텍스트 표시 */
  text?: string;
  /** 텍스트 위치 */
  textPosition?: 'bottom' | 'right';
  /** 전체 화면 오버레이 모드 */
  overlay?: boolean;
  /** 오버레이 배경 투명도 */
  overlayOpacity?: number;
  /** 인라인 표시 (기본값: false) */
  inline?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 접근성 라벨 */
  'aria-label'?: string;
  /** 테스트 ID */
  'data-testid'?: string;
}

export interface LoadingSpinnerOverlayProps {
  /** 표시 여부 */
  show: boolean;
  /** 스피너 속성 */
  spinnerProps?: Omit<LoadingSpinnerProps, 'overlay'>;
  /** 오버레이 배경 투명도 */
  opacity?: number;
  /** 오버레이 z-index */
  zIndex?: number;
  /** 오버레이 클릭 시 닫기 */
  closeOnClick?: boolean;
  /** 닫기 콜백 */
  onClose?: () => void;
}

export interface LoadingSpinnerGroupProps {
  /** 여러 스피너 표시 */
  children: React.ReactNode;
  /** 그룹 방향 */
  direction?: 'horizontal' | 'vertical';
  /** 그룹 간격 */
  spacing?: 'small' | 'medium' | 'large';
  /** 그룹 정렬 */
  align?: 'start' | 'center' | 'end';
  /** 커스텀 클래스명 */
  className?: string;
}