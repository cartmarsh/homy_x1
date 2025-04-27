import React, { ReactNode, RefObject, CSSProperties } from 'react';
import { getPortfolioContainerStyles } from '../../utils/portfolioStyles';

interface PortfolioItemContainerProps {
  containerRef: RefObject<HTMLDivElement>;
  showDetails: boolean;
  title: string;
  detailsId: string;
  accessibilityProps: Record<string, any>;
  children: ReactNode;
}

const PortfolioItemContainer: React.FC<PortfolioItemContainerProps> = ({
  containerRef,
  showDetails,
  accessibilityProps,
  children
}) => {
  // Generate styles for the container
  const containerStyles = getPortfolioContainerStyles(
    showDetails
  );

  // Remove any overflow hidden from container styles to enable scrolling
  if (containerStyles.overflow === 'hidden') {
    delete containerStyles.overflow;
  }
  
  // Adjusted container styles to match the red outlined area in the screenshot
  const enhancedContainerStyles: CSSProperties = {
    ...containerStyles,
    height: 'auto',
    maxHeight: 'min(55vh, 31.25rem)', // Changed from 500px to 31.25rem
    minHeight: '25rem', // Changed from 400px to 25rem
    padding: 0,
    margin: '0 auto',
    position: 'relative' as const,
    display: 'block' as const,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 0.3125rem 1.25rem rgba(0, 0, 0, 0.15)', // Changed from 5px 20px to rem
    border: '0.125rem solid rgba(0, 0, 0, 0.1)', // Changed from 2px to 0.125rem
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={containerRef}
        className={`
          relative bg-transparent
          transform transition-all duration-700 ease-in-out
          w-full
          ${showDetails ? 'z-20' : 'z-10'}
        `}
        style={enhancedContainerStyles}
        {...accessibilityProps}
      >
        {children}
      </div>
    </div>
  );
};

export default PortfolioItemContainer; 