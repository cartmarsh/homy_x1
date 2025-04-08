import { CSSProperties, useMemo } from 'react';
import { getDetailsSectionStyles } from '../utils/portfolioItemStyles';

interface UsePortfolioDetailsProps {
  showDetails: boolean;
  isTransitioning: boolean;
}

/**
 * Custom hook to manage portfolio details section
 * @param props Configuration options
 * @returns Object with details section properties
 */
const usePortfolioDetails = ({ 
  showDetails, 
  isTransitioning 
}: UsePortfolioDetailsProps) => {
  // Details section styles
  const detailsStyles = useMemo<CSSProperties>(() => 
    getDetailsSectionStyles(showDetails, isTransitioning), 
    [showDetails, isTransitioning]
  );

  // Determine visibility class
  const detailsClassName = useMemo(() => 
    `w-full hide-scrollbar ${(showDetails || isTransitioning) ? 'block' : 'hidden'}`,
    [showDetails, isTransitioning]
  );

  return {
    detailsStyles,
    detailsClassName,
    isVisible: showDetails
  };
};

export default usePortfolioDetails; 