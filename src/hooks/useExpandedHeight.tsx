import { useState, useEffect, RefObject } from 'react';

interface UseExpandedHeightProps {
  containerRef: RefObject<HTMLDivElement>;
  detailsRef: RefObject<HTMLDivElement>;
  showDetails: boolean;
  bufferSize?: number;
}

const useExpandedHeight = ({
  containerRef,
  detailsRef,
  showDetails,
  bufferSize = 120 // Default buffer size
}: UseExpandedHeightProps) => {
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  // Calculate expanded height manually to prevent scrollbars
  useEffect(() => {
    if (showDetails && detailsRef.current) {
      // Give the details time to render before measuring
      setTimeout(() => {
        if (detailsRef.current && containerRef.current) {
          const imageContainer = containerRef.current.querySelector('.portfolio-image-container');
          const imageHeight = imageContainer ? (imageContainer as HTMLElement).offsetHeight : 0;
          const detailsHeight = detailsRef.current.scrollHeight;
          
          // Account for padding and set adequate height with extra buffer
          setExpandedHeight(imageHeight + detailsHeight + bufferSize);
        }
      }, 100); // Increased timeout to ensure content is fully rendered
    }
  }, [showDetails, detailsRef, containerRef, bufferSize]);

  return { expandedHeight };
};

export default useExpandedHeight; 