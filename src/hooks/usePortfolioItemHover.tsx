import { useState, useCallback } from 'react';

interface UsePortfolioItemHoverProps {
  showDetails?: boolean;
}

/**
 * Custom hook to manage hover state for portfolio items
 * @param props Configuration options
 * @returns Object with hover state and handlers
 */
const usePortfolioItemHover = ({ showDetails = false }: UsePortfolioItemHoverProps = {}) => {
  const [isItemHovered, setIsItemHovered] = useState(false);
  
  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    if (!showDetails) {
      setIsItemHovered(true);
    }
  }, [showDetails]);

  const handleMouseLeave = useCallback(() => {
    setIsItemHovered(false);
  }, []);

  return {
    isItemHovered,
    handleMouseEnter,
    handleMouseLeave
  };
};

export default usePortfolioItemHover; 