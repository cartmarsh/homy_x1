import { useState, useEffect } from 'react';
import { UseExpandableCardProps, ExpandableCardState } from '../types/portfolioTypes';
import { DEFAULT_PORTFOLIO_VALUES } from '../constants/portfolioConstants';

const useExpandableCard = ({ link, onToggle }: UseExpandableCardProps = {}): ExpandableCardState => {
  const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use the same animation duration for the animation states
  const ANIMATION_DURATION = 500;

  // Handle animation completion
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION + 50); // Add a small buffer to ensure animation completes
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Toggle show/hide details with smooth animation
  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setShowDetails(!showDetails);
    
    if (onToggle) {
      onToggle();
    }
  };

  // Handle clicking the entire portfolio item
  const handleItemClick = () => {
    if (link && !showDetails) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    showDetails,
    isAnimating,
    toggleDetails,
    handleItemClick
  };
};

export default useExpandableCard; 