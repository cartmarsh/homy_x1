import { useState, useEffect, RefObject } from 'react';

interface UseDimensionCalculationProps {
  containerRef: RefObject<HTMLDivElement>;
  detailsRef: RefObject<HTMLDivElement>;
  showDetails: boolean;
}

interface DimensionResult {
  containerHeight: number | null;
  fullHeight: number | null;
  imageHeight: number | null;
  hasCalculatedHeights: boolean;
  updateContainerHeight: () => void;
}

const useDimensionCalculation = ({
  containerRef,
  detailsRef,
  showDetails
}: UseDimensionCalculationProps): DimensionResult => {
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [hasCalculatedHeights, setHasCalculatedHeights] = useState(false);

  // Calculate and store heights on initial render
  useEffect(() => {
    if (!hasCalculatedHeights && containerRef.current) {
      // Set initial container height
      const initialHeight = containerRef.current.offsetHeight;
      setContainerHeight(initialHeight);
      
      // Find and measure the image container
      const imageElement = containerRef.current.querySelector('.portfolio-image-container');
      if (imageElement) {
        setImageHeight((imageElement as HTMLElement).offsetHeight);
      }
      
      // We need to temporarily show details to calculate full height
      if (detailsRef.current) {
        // Clone the container to calculate full height without affecting UI
        const clone = containerRef.current.cloneNode(true) as HTMLDivElement;
        clone.style.position = 'absolute';
        clone.style.opacity = '0';
        clone.style.pointerEvents = 'none';
        clone.style.maxHeight = 'none';
        clone.style.height = 'auto';
        clone.style.overflow = 'visible';
        
        // Ensure all details are visible in the clone
        const detailsElement = clone.querySelector('[id^="details-"]');
        if (detailsElement) {
          (detailsElement as HTMLElement).style.maxHeight = 'none';
          (detailsElement as HTMLElement).style.opacity = '1';
          (detailsElement as HTMLElement).style.display = 'block';
        }
        
        // Append to document, measure, then remove
        document.body.appendChild(clone);
        const fullExpandedHeight = clone.offsetHeight;
        setFullHeight(fullExpandedHeight);
        document.body.removeChild(clone);
      }
      
      setHasCalculatedHeights(true);
    }
  }, [hasCalculatedHeights, containerRef, detailsRef]);

  // Function to update container height
  const updateContainerHeight = () => {
    if (hasCalculatedHeights && containerRef.current) {
      const newHeight = showDetails 
        ? (fullHeight || containerRef.current.offsetHeight + 400) // Add buffer if full height isn't calculated
        : (containerHeight || containerRef.current.offsetHeight);
      
      containerRef.current.style.height = `${newHeight}px`;
    }
  };

  // Update container height when details toggle
  useEffect(() => {
    updateContainerHeight();
  }, [showDetails, hasCalculatedHeights, fullHeight, containerHeight]);

  return {
    containerHeight,
    fullHeight,
    imageHeight,
    hasCalculatedHeights,
    updateContainerHeight
  };
};

export default useDimensionCalculation; 