import React, { ReactNode, RefObject } from 'react';
import { getPortfolioContainerStyles, HIDE_SCROLLBAR_STYLE, WEBKIT_SCROLLBAR_STYLE } from '../../utils/portfolioStyles';
import { DEFAULT_PORTFOLIO_VALUES } from '../../constants/portfolioConstants';

interface PortfolioItemContainerProps {
  containerRef: RefObject<HTMLDivElement>;
  showDetails: boolean;
  expandedHeight: number | null;
  containerHeight: number | null;
  imageHeight: number | null;
  link?: string;
  title: string;
  detailsId: string;
  onClick?: () => void;
  accessibilityProps: Record<string, any>;
  children: ReactNode;
}

const PortfolioItemContainer: React.FC<PortfolioItemContainerProps> = ({
  containerRef,
  showDetails,
  expandedHeight,
  containerHeight,
  imageHeight,
  link,
  onClick,
  accessibilityProps,
  children
}) => {
  // Generate styles for the container
  const containerStyles = getPortfolioContainerStyles(
    showDetails, 
    expandedHeight, 
    containerHeight, 
    imageHeight
  );

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className={`
          relative bg-transparent shadow-md rounded-lg
          transform transition-all duration-700 ease-in-out
          mx-auto no-scrollbar hide-scrollbar
          w-full max-w-[${DEFAULT_PORTFOLIO_VALUES.COLLAPSED_MAX_WIDTH}] hover:shadow-xl
          ${showDetails ? 'z-20' : 'z-10'}
          ${link && !showDetails ? 'cursor-pointer' : ''}
        `}
        style={containerStyles}
        onClick={link && !showDetails ? onClick : undefined}
        {...accessibilityProps}
      >
        {children}
      </div>
    </div>
  );
};

export default PortfolioItemContainer; 