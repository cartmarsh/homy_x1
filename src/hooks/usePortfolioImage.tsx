import { CSSProperties, useMemo } from 'react';

interface UsePortfolioImageProps {
  isHovered?: boolean;
}

/**
 * Custom hook to manage portfolio image styles and properties
 * @param props Configuration options
 * @returns Object with image styles and properties
 */
const usePortfolioImage = ({ isHovered = false }: UsePortfolioImageProps = {}) => {
  // Image container styles with responsive height 
  const containerStyles = useMemo<CSSProperties>(() => ({
    position: 'relative',
    zIndex: 10,
    overflow: 'hidden',
    boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.15)' : 'none',
    height: 'min(70vh, 500px)', // Adjusted height
    width: '100%',
    transform: 'none',
    borderRadius: '0.75rem',
    transition: 'all 0.3s ease',
  }), [isHovered]);

  // Image element styles
  const imageStyles = useMemo<CSSProperties>(() => ({
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center', // Ensure image is centered
  }), []);

  return {
    containerStyles,
    imageStyles,
    imageClassName: "w-full h-full object-cover"
  };
};

export default usePortfolioImage; 