import { useState, useLayoutEffect, useCallback, useRef } from 'react';

interface TabItem {
  id: string;
  label: string;
}

export function useResponsiveTabs(tabs: TabItem[], containerRef: React.RefObject<HTMLElement | null>) {
  const [visibleCount, setVisibleCount] = useState(tabs.length);
  const tabWidths = useRef<number[]>([]);
  const moreButtonWidth = useRef(80); 
  const gap = 16; // 1rem gap from StyledTabsList

  const updateTabs = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    let currentWidth = 0;
    let count = 0;

    for (let i = 0; i < tabs.length; i++) {
      const tabWidth = tabWidths.current[i] || 100;
      
      // Calculate width if we add this tab
      // If it's not the first tab, add the gap
      const widthWithGap = currentWidth + (count > 0 ? gap : 0) + tabWidth;
      
      // If it's not the last tab, we might need space for the "More" button
      const needsMoreButton = i < tabs.length - 1;
      const potentialWidthWithMore = widthWithGap + (needsMoreButton ? gap + moreButtonWidth.current : 0);
      
      if (potentialWidthWithMore > containerWidth && i > 0) {
        // If it doesn't fit with the More button, stop here
        break;
      }
      
      if (widthWithGap > containerWidth && i > 0) {
        // If it doesn't fit even without the More button (last item case)
        break;
      }

      currentWidth = widthWithGap;
      count++;
    }

    // Ensure we don't show all tabs if the last one technically fits but triggered the "needsMoreButton" logic
    setVisibleCount(count);
  }, [tabs.length, containerRef]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // Measure only when all tabs are likely rendered (initially or after reset)
    const tabElements = containerRef.current.querySelectorAll('.record-tab');
    if (tabElements.length >= tabs.length) {
      const widths: number[] = [];
      tabElements.forEach((el) => {
        widths.push(el.getBoundingClientRect().width);
      });
      tabWidths.current = widths;
    }

    const moreBtn = containerRef.current.querySelector('.more-tabs-trigger');
    if (moreBtn) {
      moreButtonWidth.current = moreBtn.getBoundingClientRect().width;
    }

    updateTabs();

    const observer = new ResizeObserver(() => {
      updateTabs();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateTabs, tabs.length, containerRef]);

  return {
    visibleTabs: tabs.slice(0, visibleCount),
    overflowTabs: tabs.slice(visibleCount),
  };
}
