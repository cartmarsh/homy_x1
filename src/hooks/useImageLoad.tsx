import { useState, useEffect } from 'react';

interface UseImageLoadProps {
  src: string;
  preload?: boolean;
}

interface UseImageLoadReturn {
  isLoading: boolean;
  hasError: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

/**
 * A custom hook to handle image loading states including preloading
 * @param props Object containing image src and preload flag
 * @returns Object with loading state and handler functions
 */
const useImageLoad = ({ 
  src, 
  preload = true 
}: UseImageLoadProps): UseImageLoadReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Preload image when component mounts if enabled
  useEffect(() => {
    if (!src || !preload) return;
    
    const img = new Image();
    
    img.onload = () => {
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = src;
    
    // If the image is already cached, the onload event may not fire
    // Check if complete is already true
    if (img.complete) {
      setIsLoading(false);
    }
    
    return () => {
      // Clean up event listeners
      img.onload = null;
      img.onerror = null;
    };
  }, [src, preload]);

  // Handlers for direct use with img tags
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return {
    isLoading,
    hasError,
    handleImageLoad,
    handleImageError
  };
};

export default useImageLoad; 