import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { DropdownOption, DropdownOptionGroup } from './types';

const VirtualizedContainer = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  overflow-y: auto;
  position: relative;
`;

const VirtualizedContent = styled.div<{ $totalHeight: number }>`
  height: ${({ $totalHeight }) => $totalHeight}px;
  position: relative;
`;

const VirtualizedViewport = styled.div<{ $translateY: number }>`
  transform: translateY(${({ $translateY }) => $translateY}px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

interface VirtualizedListProps<T> {
  items: (DropdownOption<T> | DropdownOptionGroup<T>)[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (
    item: DropdownOption<T> | DropdownOptionGroup<T>, 
    index: number,
    isVirtual?: boolean
  ) => React.ReactNode;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
}

// 옵션이 그룹인지 확인하는 타입 가드
function isOptionGroup<T>(item: DropdownOption<T> | DropdownOptionGroup<T>): item is DropdownOptionGroup<T> {
  return 'options' in item;
}

// 가상화된 아이템 정보
interface VirtualItem<T> {
  item: DropdownOption<T> | DropdownOptionGroup<T>;
  index: number;
  start: number;
  end: number;
  type: 'group-header' | 'option';
  groupIndex?: number;
  optionIndex?: number;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  onScroll,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 가상화된 아이템 목록 생성
  const virtualItems = useMemo((): VirtualItem<T>[] => {
    const result: VirtualItem<T>[] = [];
    let currentIndex = 0;
    let currentStart = 0;
    
    items.forEach((item, itemIndex) => {
      if (isOptionGroup(item)) {
        // 그룹 헤더 추가
        result.push({
          item,
          index: currentIndex,
          start: currentStart,
          end: currentStart + itemHeight,
          type: 'group-header',
          groupIndex: itemIndex,
        });
        currentIndex++;
        currentStart += itemHeight;
        
        // 그룹 내 옵션들 추가
        item.options.forEach((option, optionIndex) => {
          result.push({
            item: option,
            index: currentIndex,
            start: currentStart,
            end: currentStart + itemHeight,
            type: 'option',
            groupIndex: itemIndex,
            optionIndex,
          });
          currentIndex++;
          currentStart += itemHeight;
        });
      } else {
        // 단일 옵션 추가
        result.push({
          item,
          index: currentIndex,
          start: currentStart,
          end: currentStart + itemHeight,
          type: 'option',
        });
        currentIndex++;
        currentStart += itemHeight;
      }
    });
    
    return result;
  }, [items, itemHeight]);
  
  // 전체 높이 계산
  const totalHeight = virtualItems.length * itemHeight;
  
  // 현재 보이는 아이템들 계산
  const visibleItems = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      virtualItems.length
    );
    const actualStart = Math.max(0, start - overscan);
    
    return virtualItems.slice(actualStart, end).map(virtualItem => ({
      ...virtualItem,
      offsetY: virtualItem.start,
    }));
  }, [scrollTop, itemHeight, containerHeight, overscan, virtualItems]);
  
  // 스크롤 핸들러
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop;
    setScrollTop(newScrollTop);
    onScroll?.(newScrollTop);
  };
  
  // 외부에서 스크롤 위치 설정
  const scrollToIndex = (index: number) => {
    if (containerRef.current && index >= 0 && index < virtualItems.length) {
      const targetScrollTop = index * itemHeight;
      containerRef.current.scrollTop = targetScrollTop;
      setScrollTop(targetScrollTop);
    }
  };
  
  // 가상화가 필요 없는 경우 (아이템이 적음)
  if (totalHeight <= containerHeight) {
    return (
      <div style={{ height: containerHeight, overflowY: 'auto' }}>
        {virtualItems.map((virtualItem) => (
          <div key={virtualItem.index}>
            {renderItem(virtualItem.item, virtualItem.index, false)}
          </div>
        ))}
      </div>
    );
  }
  
  const offsetY = visibleItems[0]?.start || 0;
  
  return (
    <VirtualizedContainer
      ref={containerRef}
      $height={containerHeight}
      onScroll={handleScroll}
    >
      <VirtualizedContent $totalHeight={totalHeight}>
        <VirtualizedViewport $translateY={offsetY}>
          {visibleItems.map((virtualItem) => (
            <div
              key={virtualItem.index}
              style={{
                position: 'absolute',
                top: virtualItem.start - offsetY,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              {renderItem(virtualItem.item, virtualItem.index, true)}
            </div>
          ))}
        </VirtualizedViewport>
      </VirtualizedContent>
    </VirtualizedContainer>
  );
}

// useVirtualizedList Hook
export function useVirtualizedList<T>(
  items: (DropdownOption<T> | DropdownOptionGroup<T>)[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  // 가상화된 아이템 목록 생성
  const virtualItems = useMemo((): VirtualItem<T>[] => {
    const result: VirtualItem<T>[] = [];
    let currentIndex = 0;
    let currentStart = 0;
    
    items.forEach((item, itemIndex) => {
      if (isOptionGroup(item)) {
        result.push({
          item,
          index: currentIndex,
          start: currentStart,
          end: currentStart + itemHeight,
          type: 'group-header',
          groupIndex: itemIndex,
        });
        currentIndex++;
        currentStart += itemHeight;
        
        item.options.forEach((option, optionIndex) => {
          result.push({
            item: option,
            index: currentIndex,
            start: currentStart,
            end: currentStart + itemHeight,
            type: 'option',
            groupIndex: itemIndex,
            optionIndex,
          });
          currentIndex++;
          currentStart += itemHeight;
        });
      } else {
        result.push({
          item,
          index: currentIndex,
          start: currentStart,
          end: currentStart + itemHeight,
          type: 'option',
        });
        currentIndex++;
        currentStart += itemHeight;
      }
    });
    
    return result;
  }, [items, itemHeight]);
  
  const totalHeight = virtualItems.length * itemHeight;
  
  // 보이는 아이템 범위 계산
  const getVisibleRange = (scrollTop: number, overscan = 5) => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      virtualItems.length
    );
    const actualStart = Math.max(0, start - overscan);
    
    return { start: actualStart, end };
  };
  
  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < virtualItems.length) {
      const targetScrollTop = index * itemHeight;
      setScrollTop(targetScrollTop);
      return targetScrollTop;
    }
    return scrollTop;
  };
  
  const scrollToItem = (item: DropdownOption<T>) => {
    const index = virtualItems.findIndex(vi => 
      vi.type === 'option' && vi.item === item
    );
    return scrollToIndex(index);
  };
  
  return {
    virtualItems,
    totalHeight,
    scrollTop,
    setScrollTop,
    getVisibleRange,
    scrollToIndex,
    scrollToItem,
    isVirtualizationNeeded: totalHeight > containerHeight,
  };
}

export default VirtualizedList;