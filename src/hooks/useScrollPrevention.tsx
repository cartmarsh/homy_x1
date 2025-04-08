import { useEffect, RefObject } from 'react';

interface UseScrollPreventionProps {
  containerRef: RefObject<HTMLDivElement>;
}

const useScrollPrevention = ({ containerRef }: UseScrollPreventionProps): void => {
  // Prevent scrolling in the portfolio item
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable scrolling on the container itself
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', preventScroll, { passive: false });
    container.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      container.removeEventListener('wheel', preventScroll);
      container.removeEventListener('touchmove', preventScroll);
    };
  }, [containerRef]);
};

export default useScrollPrevention; 