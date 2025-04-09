import { useState, useEffect } from 'react';

// Cache to store loaded images
const imageCache = new Map<string, HTMLImageElement>();

interface UseImageLoadProps {
  src: string;
  preload?: boolean;
  maxWidth?: number;  // Maximum width for downscaling
  maxHeight?: number; // Maximum height for downscaling
}

interface UseImageLoadReturn {
  isLoading: boolean;
  hasError: boolean;
  handleImageLoad: () => void;
  handleImageError: () => void;
  optimizedSrc: string; // New property to hold the optimized image source
}

/**
 * A custom hook to handle image loading states including preloading, caching, and optimization
 * @param props Object containing image src and configuration options
 * @returns Object with loading state and handler functions
 */
const useImageLoad = ({ 
  src, 
  preload = true,
  maxWidth = 1200,  // Default max width
  maxHeight = 1200  // Default max height
}: UseImageLoadProps): UseImageLoadReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  // Function to downscale image if needed
  const downscaleImage = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    // Calculate new dimensions while maintaining aspect ratio
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return src;

    ctx.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL('image/webp', 0.85); // Use WebP format with 85% quality
  };

  useEffect(() => {
    if (!src || !preload) return;

    // Check if image is already in cache
    if (imageCache.has(src)) {
      const cachedImg = imageCache.get(src)!;
      setIsLoading(false);
      setOptimizedSrc(cachedImg.src);
      return;
    }

    const img = new Image();

    img.onload = () => {
      // Only downscale if the image is larger than maxWidth or maxHeight
      if (img.width > maxWidth || img.height > maxHeight) {
        const optimized = downscaleImage(img);
        setOptimizedSrc(optimized);
        
        // Cache the optimized version
        const optimizedImg = new Image();
        optimizedImg.src = optimized;
        imageCache.set(src, optimizedImg);
      } else {
        // Cache the original image if no optimization needed
        imageCache.set(src, img);
      }
      
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.src = src;

    // If the image is already cached in browser
    if (img.complete) {
      img.onload?.(new Event('load'));
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, preload, maxWidth, maxHeight]);

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
    handleImageError,
    optimizedSrc
  };
};

export default useImageLoad; 