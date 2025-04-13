import React from 'react';
import { getDetailsButtonStyles } from '../../utils/portfolioStyles';

interface PortfolioItemButtonProps {
  showDetails: boolean;
  isAnimating: boolean;
  detailsId: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isHovered?: boolean;
}

const PortfolioItemButton: React.FC<PortfolioItemButtonProps> = ({
  showDetails,
  isAnimating,
  detailsId,
  onClick,
  isHovered = false
}) => {
  // Get style functions
  const buttonStyles = getDetailsButtonStyles();

  // Enhanced styles when parent container is hovered
  const enhancedButtonStyle = {
    ...buttonStyles,
    transform: 'translateY(0)', // Prevent movement
    boxShadow: isHovered 
      ? '0 0.5rem 1.5625rem rgba(0, 0, 0, 0.25), 0 0.625rem 1.25rem rgba(147, 51, 234, 0.35)'
      : buttonStyles.boxShadow,
    transition: 'all 0.4s ease-in-out',
    background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
    border: '0.125rem solid rgba(255, 255, 255, 0.3)'
  };

  const buttonClasses = `
    block
    px-6 py-3
    text-xl
    font-['Space_Mono',_monospace]
    text-white
    bg-purple-600
    hover:bg-purple-700
    rounded-lg
    transition-all
    duration-300
    shadow-lg
    hover:shadow-xl
    transform
    hover:-translate-y-1
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
    focus:ring-opacity-50
    ${isHovered ? 'scale-105' : 'scale-100'}
  `;

  const ariaProps = {
    'aria-expanded': showDetails,
    'aria-controls': detailsId,
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={isAnimating}
      {...ariaProps}
      style={{ 
        fontFamily: "'Space Mono', monospace",
        opacity: 1,
        visibility: 'visible',
        ...enhancedButtonStyle
      }}
    >
      {showDetails ? "Hide Details" : "Get Details"}
    </button>
  );
};

export default PortfolioItemButton; 