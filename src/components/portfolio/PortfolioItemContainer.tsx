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
    maxHeight: 'min(55vh, 500px)', // Taller to match the red outline
    minHeight: '400px', // Ensure minimum height for smaller screens
    padding: 0, // Ensure no padding inside container
    margin: '0 auto', // Center the container
    position: 'relative' as const,
    display: 'block' as const,
    borderRadius: '0.75rem', // Slightly larger border radius
    overflow: 'hidden', // Ensure content doesn't spill out
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)', // Enhanced shadow for depth
    border: '2px solid rgba(0, 0, 0, 0.1)', // Subtle border
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