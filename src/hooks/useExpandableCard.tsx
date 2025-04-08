import { useState, useEffect } from 'react';
import { UseExpandableCardProps, ExpandableCardState } from '../types/portfolioTypes';
import { DEFAULT_PORTFOLIO_VALUES } from '../constants/portfolioConstants';

const useExpandableCard = ({ link, onToggle }: UseExpandableCardProps = {}): ExpandableCardState => {
  const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Use the same animation duration for the animation states - further increased for slower curtain effect
  const ANIMATION_DURATION = 600;

  // Handle animation completion
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, ANIMATION_DURATION + 150); // Add a larger buffer to ensure curtain animation completes fully
      
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Toggle show/hide details with smooth curtain animation
  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setShowDetails(!showDetails);
    
    if (onToggle) {
      onToggle();
    }
  };

  // No longer needed - we've removed click functionality on the whole component
  const handleItemClick = () => {
    // Empty function, retained for interface compatibility
  };

  return {
    showDetails,
    isAnimating,
    toggleDetails,
    handleItemClick // Keep returning this for interface compatibility
  };
};

export default useExpandableCard; 