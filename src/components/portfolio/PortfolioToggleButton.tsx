import React from 'react';
import { ANIMATION_EASING } from '../../hooks/useAnimationStyles';

interface PortfolioToggleButtonProps {
  showDetails: boolean;
  isAnimating: boolean;
  toggleDetails: (e: React.MouseEvent) => void;
  ariaControls: string;
}

const PortfolioToggleButton: React.FC<PortfolioToggleButtonProps> = ({
  showDetails,
  isAnimating,
  toggleDetails,
  ariaControls
}) => {
  return (
    <button
      className={`
        relative inline-flex items-center px-4 py-2 rounded-md
        bg-gradient-to-r from-blue-500 to-indigo-600 text-white
        hover:from-blue-600 hover:to-indigo-700
        transform transition-all duration-500 ease-out
        ${showDetails ? 'scale-95' : 'hover:scale-105 active:scale-95'}
        focus:outline-none focus:ring-2 focus:ring-blue-300
      `}
      onClick={(e) => {
        e.stopPropagation();
        toggleDetails(e);
      }}
      aria-expanded={showDetails}
      aria-controls={ariaControls}
      disabled={isAnimating}
      style={{
        boxShadow: showDetails 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        transition: `all 500ms ${ANIMATION_EASING.SPRING}`,
        position: 'relative',
        zIndex: 5,
        fontWeight: 500,
        letterSpacing: '0.025em'
      }}
    >
      <span className="relative z-10">{showDetails ? "Hide Details" : "Show Details"}</span>
      <svg xmlns="http://www.w3.org/2000/svg" 
        className={`
          h-4 w-4 ml-1 transform transition-transform duration-700
          ${showDetails ? 'rotate-180' : 'group-hover:translate-x-1'}
        `} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        style={{
          transitionTimingFunction: ANIMATION_EASING.SPRING
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default PortfolioToggleButton; 