import { 
  TooltipPosition, 
  TooltipPosition2D, 
  TooltipDimensions, 
  TooltipBoundary 
} from './types';

const ARROW_SIZE = 8;
const DEFAULT_OFFSET = 8;

export interface PositionResult {
  position: TooltipPosition2D;
  actualPosition: TooltipPosition;
  arrowPosition?: TooltipPosition2D;
}

/**
 * Calculate tooltip position relative to target element
 */
export function calculateTooltipPosition(
  targetElement: HTMLElement,
  tooltipDimensions: TooltipDimensions,
  preferredPosition: TooltipPosition,
  offset: number = DEFAULT_OFFSET,
  showArrow: boolean = true
): PositionResult {
  const targetRect = targetElement.getBoundingClientRect();
  const viewportBoundary: TooltipBoundary = {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };

  // Adjust offset for arrow
  const actualOffset = showArrow ? offset + ARROW_SIZE : offset;
  
  // Try preferred position first
  let result = getPositionForPlacement(
    targetRect, 
    tooltipDimensions, 
    preferredPosition, 
    actualOffset
  );

  // Check if preferred position fits in viewport
  if (preferredPosition !== 'auto' && !fitsInViewport(result.position, tooltipDimensions, viewportBoundary)) {
    // Try alternative positions
    const alternatives = getAlternativePositions(preferredPosition);
    
    for (const altPosition of alternatives) {
      const altResult = getPositionForPlacement(
        targetRect, 
        tooltipDimensions, 
        altPosition, 
        actualOffset
      );
      
      if (fitsInViewport(altResult.position, tooltipDimensions, viewportBoundary)) {
        result = { ...altResult, actualPosition: altPosition };
        break;
      }
    }
  }

  // Calculate arrow position if needed
  if (showArrow) {
    result.arrowPosition = calculateArrowPosition(
      targetRect,
      result.position,
      tooltipDimensions,
      result.actualPosition
    );
  }

  return result;
}

function getPositionForPlacement(
  targetRect: DOMRect,
  tooltipDimensions: TooltipDimensions,
  position: TooltipPosition,
  offset: number
): PositionResult {
  const { width: tooltipWidth, height: tooltipHeight } = tooltipDimensions;
  const { left, top, right, bottom, width: targetWidth, height: targetHeight } = targetRect;
  
  let x = 0;
  let y = 0;

  switch (position) {
    case 'top':
      x = left + targetWidth / 2 - tooltipWidth / 2;
      y = top - tooltipHeight - offset;
      break;
    case 'top-start':
      x = left;
      y = top - tooltipHeight - offset;
      break;
    case 'top-end':
      x = right - tooltipWidth;
      y = top - tooltipHeight - offset;
      break;
    case 'bottom':
      x = left + targetWidth / 2 - tooltipWidth / 2;
      y = bottom + offset;
      break;
    case 'bottom-start':
      x = left;
      y = bottom + offset;
      break;
    case 'bottom-end':
      x = right - tooltipWidth;
      y = bottom + offset;
      break;
    case 'left':
      x = left - tooltipWidth - offset;
      y = top + targetHeight / 2 - tooltipHeight / 2;
      break;
    case 'left-start':
      x = left - tooltipWidth - offset;
      y = top;
      break;
    case 'left-end':
      x = left - tooltipWidth - offset;
      y = bottom - tooltipHeight;
      break;
    case 'right':
      x = right + offset;
      y = top + targetHeight / 2 - tooltipHeight / 2;
      break;
    case 'right-start':
      x = right + offset;
      y = top;
      break;
    case 'right-end':
      x = right + offset;
      y = bottom - tooltipHeight;
      break;
    case 'auto':
    default:
      // Auto position - choose best fit
      return getBestAutoPosition(targetRect, tooltipDimensions, offset);
  }

  return {
    position: { x, y },
    actualPosition: position,
  };
}

function getBestAutoPosition(
  targetRect: DOMRect,
  tooltipDimensions: TooltipDimensions,
  offset: number
): PositionResult {
  const positions: TooltipPosition[] = ['bottom', 'top', 'right', 'left'];
  const viewportBoundary: TooltipBoundary = {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };

  for (const position of positions) {
    const result = getPositionForPlacement(targetRect, tooltipDimensions, position, offset);
    if (fitsInViewport(result.position, tooltipDimensions, viewportBoundary)) {
      return { ...result, actualPosition: position };
    }
  }

  // If nothing fits perfectly, use bottom as fallback
  const fallback = getPositionForPlacement(targetRect, tooltipDimensions, 'bottom', offset);
  return { ...fallback, actualPosition: 'bottom' };
}

function fitsInViewport(
  position: TooltipPosition2D,
  dimensions: TooltipDimensions,
  boundary: TooltipBoundary
): boolean {
  const { x, y } = position;
  const { width, height } = dimensions;
  
  return (
    x >= boundary.left &&
    y >= boundary.top &&
    x + width <= boundary.right &&
    y + height <= boundary.bottom
  );
}

function getAlternativePositions(preferredPosition: TooltipPosition): TooltipPosition[] {
  const opposites: Record<string, TooltipPosition[]> = {
    'top': ['bottom', 'right', 'left'],
    'top-start': ['bottom-start', 'right-start', 'left-start'],
    'top-end': ['bottom-end', 'right-end', 'left-end'],
    'bottom': ['top', 'right', 'left'],
    'bottom-start': ['top-start', 'right-start', 'left-start'],
    'bottom-end': ['top-end', 'right-end', 'left-end'],
    'left': ['right', 'top', 'bottom'],
    'left-start': ['right-start', 'top-start', 'bottom-start'],
    'left-end': ['right-end', 'top-end', 'bottom-end'],
    'right': ['left', 'top', 'bottom'],
    'right-start': ['left-start', 'top-start', 'bottom-start'],
    'right-end': ['left-end', 'top-end', 'bottom-end'],
  };

  return opposites[preferredPosition] || ['bottom', 'top', 'right', 'left'];
}

function calculateArrowPosition(
  targetRect: DOMRect,
  tooltipPosition: TooltipPosition2D,
  tooltipDimensions: TooltipDimensions,
  actualPosition: TooltipPosition
): TooltipPosition2D {
  const { left, top, width: targetWidth, height: targetHeight } = targetRect;
  const { x: tooltipX, y: tooltipY } = tooltipPosition;
  
  let arrowX = 0;
  let arrowY = 0;

  const isTopOrBottom = actualPosition.startsWith('top') || actualPosition.startsWith('bottom');
  const isLeftOrRight = actualPosition.startsWith('left') || actualPosition.startsWith('right');

  if (isTopOrBottom) {
    // Arrow should point horizontally to target center
    const targetCenterX = left + targetWidth / 2;
    arrowX = targetCenterX - tooltipX;
    
    // Clamp arrow to tooltip bounds
    arrowX = Math.max(ARROW_SIZE, Math.min(arrowX, tooltipDimensions.width - ARROW_SIZE));
    
    arrowY = actualPosition.startsWith('top') 
      ? tooltipDimensions.height - 1 // Bottom of tooltip
      : -ARROW_SIZE + 1; // Top of tooltip
  }

  if (isLeftOrRight) {
    // Arrow should point vertically to target center
    const targetCenterY = top + targetHeight / 2;
    arrowY = targetCenterY - tooltipY;
    
    // Clamp arrow to tooltip bounds  
    arrowY = Math.max(ARROW_SIZE, Math.min(arrowY, tooltipDimensions.height - ARROW_SIZE));
    
    arrowX = actualPosition.startsWith('left')
      ? tooltipDimensions.width - 1 // Right of tooltip
      : -ARROW_SIZE + 1; // Left of tooltip
  }

  return { x: arrowX, y: arrowY };
}

/**
 * Get tooltip dimensions from element
 */
export function getTooltipDimensions(tooltipElement: HTMLElement): TooltipDimensions {
  const rect = tooltipElement.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Clamp position to viewport bounds with padding
 */
export function clampToViewport(
  position: TooltipPosition2D,
  dimensions: TooltipDimensions,
  padding: number = 8
): TooltipPosition2D {
  const { x, y } = position;
  const { width, height } = dimensions;
  
  const clampedX = Math.max(
    padding,
    Math.min(x, window.innerWidth - width - padding)
  );
  
  const clampedY = Math.max(
    padding,
    Math.min(y, window.innerHeight - height - padding)
  );
  
  return { x: clampedX, y: clampedY };
}