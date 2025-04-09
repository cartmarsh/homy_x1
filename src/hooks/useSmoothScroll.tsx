import { useEffect, useRef, useState } from 'react';

interface UseSmoothScrollOptions {
  scrollThreshold?: number;
  animationDuration?: number;
  minDeltaY?: number;
}

/**
 * A hook that provides smooth section-based scrolling functionality
 * @param mainRef - Reference to the main scrollable container
 * @param options - Configuration options for the scroll behavior
 * @returns Object containing the scroll state and ref
 */
export function useSmoothScroll(
  mainRef: React.RefObject<HTMLElement>,
  options: UseSmoothScrollOptions = {}
) {
  const {
    scrollThreshold = 400,
    animationDuration = 1000,
    minDeltaY = 10
  } = options;

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    
    const mainElement = mainRef.current;
    let lastScrollTime = 0;
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Ignore rapid scrolling
      if (now - lastScrollTime < scrollThreshold) {
        e.preventDefault();
        return;
      }
      
      // If already in a scroll animation, prevent new scrolls
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < minDeltaY) return; // Ignore small scrolls
      
      // Find all sections
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) return;
      
      // Determine which section is currently in view
      const viewportMiddle = window.innerHeight / 2;
      let activeSection = null;
      let closestDistance = Infinity;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          activeSection = section;
        }
      });
      
      if (!activeSection) return;
      
      // Find next/previous section
      const sectionArray = Array.from(sections);
      const currentIndex = sectionArray.indexOf(activeSection);
      const direction = deltaY > 0 ? 1 : -1;
      const targetIndex = currentIndex + direction;
      
      // Don't scroll beyond first or last section
      if (targetIndex < 0 || targetIndex >= sections.length) {
        return;
      }
      
      e.preventDefault();
      setIsScrolling(true);
      
      // Add smooth scrolling class
      mainElement.classList.add('smooth-scrolling');
      
      // Get target section and scroll to it
      const targetSection = sections[targetIndex];
      
      // Scroll using both methods for better compatibility
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      
      // Set a new timeout for the current scroll
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
        mainElement.classList.remove('smooth-scrolling');
        lastScrollTime = Date.now();
      }, animationDuration);
    };
    
    // Add the wheel event listener with passive: false to allow preventDefault
    mainElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      mainElement.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [mainRef, isScrolling, scrollThreshold, animationDuration, minDeltaY]);

  return {
    isScrolling,
    scrollTimeout
  };
}

export default useSmoothScroll; 