import React, { useRef, useState } from 'react';
import { PortfolioItemProps } from '../../types/portfolioTypes';
import useExpandableCard from '../../hooks/useExpandableCard';
import useDimensionCalculation from '../../hooks/useDimensionCalculation';
import useScrollPrevention from '../../hooks/useScrollPrevention';
import useExpandedHeight from '../../hooks/useExpandedHeight';
import useAccessibilityProps from '../../hooks/useAccessibilityProps';
import useAnimationStyles from '../../hooks/useAnimationStyles';
import PortfolioItemImage from './PortfolioItemImage';
import PortfolioItemDetails from './PortfolioItemDetails';
import PortfolioItemButton from './PortfolioItemButton';
import PortfolioItemContainer from './PortfolioItemContainer';
import { DEFAULT_PORTFOLIO_VALUES } from '../../constants/portfolioConstants';
import { getMainContentStyles, getDetailButtonContainerStyles } from '../../utils/portfolioStyles';
import { cx } from '../../utils/classUtils';

// CSS utility to hide scrollbars across browsers
const HIDE_SCROLLBAR_STYLE = {
  '-ms-overflow-style': 'none',  // IE and Edge
  'scrollbarWidth': 'none',      // Firefox
  '&::-webkit-scrollbar': {      // Chrome, Safari and Opera
    display: 'none'
  }
};

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  description,
  image,
  link,
  tags = [],
  functionality = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Generate control ID for accessibility
  const detailsId = `details-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Use custom hooks
  const { 
    showDetails, 
    isAnimating, 
    toggleDetails, 
    handleItemClick 
  } = useExpandableCard({ 
    link,
    onToggle: () => {
      setIsTransitioning(true);
      // Mark end of transition to allow final image position adjustment
      setTimeout(() => setIsTransitioning(false), 600);
    }
  });

  const {
    imageHeight,
    containerHeight,
    hasCalculatedHeights
  } = useDimensionCalculation({
    containerRef,
    detailsRef,
    showDetails
  });

  // Use the expanded height hook
  const { expandedHeight } = useExpandedHeight({
    containerRef,
    detailsRef,
    showDetails
  });

  // Use accessibility props hook
  const accessibilityProps = useAccessibilityProps({
    hasLink: !!link,
    isExpanded: showDetails,
    title,
    controlsId: detailsId,
    onActivate: handleItemClick
  });

  // Get animation styles
  const animationStyles = useAnimationStyles();
  const buttonContainerStyles = animationStyles.getButtonContainerStyles(showDetails);
  const detailsSectionStyles = animationStyles.getDetailsSectionStyles(showDetails);
  
  // Prevent scrolling when expanded
  useScrollPrevention({ containerRef });

  // Add example functionality if none provided
  if (functionality.length === 0) {
    functionality = DEFAULT_PORTFOLIO_VALUES.DEFAULT_FUNCTIONALITY;
  }

  // Main content styles
  const mainContentStyles = getMainContentStyles();

  return (
    <PortfolioItemContainer
      containerRef={containerRef}
      showDetails={showDetails}
      expandedHeight={expandedHeight}
      containerHeight={containerHeight}
      imageHeight={imageHeight}
      link={link}
      title={title}
      detailsId={detailsId}
      onClick={handleItemClick}
      accessibilityProps={accessibilityProps}
    >
      {/* Main content */}
      <div 
        className="relative z-10 flex flex-col h-full no-scrollbar hide-scrollbar" 
        style={mainContentStyles}
      >
        {/* Prominent image section */}
        <div 
          className="w-full portfolio-image-container"
          style={{
            position: 'relative',
            zIndex: 10
          }}
        >
          <PortfolioItemImage 
            image={image} 
            title={title} 
            tags={tags} 
            className="w-full h-auto object-cover rounded-t-lg"
          />
        </div>
        
        {/* Button area */}
        <div 
          className="p-16 flex justify-center items-center relative z-20"
          style={buttonContainerStyles}
        >
          <PortfolioItemButton
            showDetails={showDetails}
            isAnimating={isAnimating}
            detailsId={detailsId}
            onClick={toggleDetails}
          />
        </div>
        
        {/* Details section */}
        <div 
          ref={detailsRef}
          id={detailsId}
          className={cx(
            'w-full no-scrollbar hide-scrollbar',
            showDetails ? 'block' : 'hidden'
          )}
          style={detailsSectionStyles}
        >
          <PortfolioItemDetails
            title={title}
            description={description}
            functionality={functionality}
            tags={tags}
            link={link}
            isVisible={showDetails}
            onClose={toggleDetails}
          />
        </div>
      </div>
    </PortfolioItemContainer>
  );
};

export default PortfolioItem; 