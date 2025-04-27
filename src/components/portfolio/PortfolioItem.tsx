import React, { useRef, MouseEvent } from 'react';
import { PortfolioItemProps } from '../../types/portfolioTypes';
import useExpandableCard from '../../hooks/useExpandableCard';
import useAccessibilityProps from '../../hooks/useAccessibilityProps';
import usePortfolioItemHover from '../../hooks/usePortfolioItemHover';
import useTransitionState from '../../hooks/useTransitionState';
import usePortfolioImage from '../../hooks/usePortfolioImage';
import usePortfolioDetails from '../../hooks/usePortfolioDetails';
import PortfolioItemImage from './PortfolioItemImage';
import PortfolioItemDetails from './PortfolioItemDetails';
import PortfolioItemContainer from './PortfolioItemContainer';
import { DEFAULT_PORTFOLIO_VALUES } from '../../constants/portfolioConstants';
import { 
  getDetailsButtonStyle,
  getMainContentStyles,
  getTitleOverlayStyle
} from '../../utils/portfolioItemStyles';

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
  
  // Generate control ID for accessibility
  const detailsId = `details-${title.replace(/\s+/g, '-').toLowerCase()}`;
  
  // Use custom hooks - transition state
  const { isTransitioning, startTransition } = useTransitionState();
  
  // Use expandable card hook
  const { 
    showDetails, 
    isAnimating, 
    toggleDetails
  } = useExpandableCard({ 
    link,
    onToggle: () => startTransition()
  });
  
  // Use more custom hooks
  const { isItemHovered, handleMouseEnter, handleMouseLeave } = usePortfolioItemHover({ 
    showDetails 
  });
  const { containerStyles: imageContainerStyles, imageStyles } = usePortfolioImage({
    isHovered: isItemHovered
  });
  const { detailsStyles, detailsClassName } = usePortfolioDetails({
    showDetails,
    isTransitioning
  });

  // Use accessibility props hook
  const accessibilityProps = useAccessibilityProps({
    hasLink: false, // No longer treating entire card as clickable
    isExpanded: showDetails,
    title,
    controlsId: detailsId,
    onActivate: () => {} // Empty function since we're not making the whole card clickable
  });

  // Add example functionality if none provided
  if (functionality.length === 0) {
    functionality = DEFAULT_PORTFOLIO_VALUES.DEFAULT_FUNCTIONALITY;
  }

  // Create a compatible handler for the onClose prop
  const handleClose = (e?: MouseEvent<Element>) => {
    if (e) e.stopPropagation();
    toggleDetails(e as MouseEvent);
  };

  return (
    <PortfolioItemContainer
      containerRef={containerRef}
      showDetails={showDetails}
      title={title}
      detailsId={detailsId}
      accessibilityProps={accessibilityProps}
    >
      {/* Main content with relative positioning and no gap */}
      <div 
        className="relative z-10 flex flex-col overflow-hidden rounded-lg" 
        style={getMainContentStyles()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Upper section with image - with better containment */}
        <div className="w-full relative">
          {/* Image container with proper containment */}
          <div 
            className="w-full portfolio-image-container transition-all duration-500 ease-in-out"
            style={{
              ...imageContainerStyles,
              aspectRatio: '16/9',
              minHeight: '55vh',
              maxHeight: '70vh',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <PortfolioItemImage 
              image={image} 
              title={title} 
              tags={tags} 
              className="w-full h-full object-cover"
              style={{
                ...imageStyles,
                transform: isItemHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.5s ease-in-out'
              }}
            />
            
            {/* Large monospace title overlay in the area marked by red rectangle */}
            <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
              <div 
                className="w-11/12 text-center px-4"
                style={getTitleOverlayStyle()}
              >
                {title}
              </div>
            </div>
            
            {/* Prominent centered "Get Details" button */}
            {!showDetails && (
              <button
                onClick={toggleDetails}
                disabled={isAnimating}
                className="pointer-events-auto"
                style={getDetailsButtonStyle(isItemHovered)}
                aria-expanded={showDetails}
                aria-controls={detailsId}
              >
                Get Details
              </button>
            )}
          </div>
        </div>
        
        {/* Details section sliding up from bottom with curtain-like animation */}
        <div 
          ref={detailsRef}
          id={detailsId}
          className={detailsClassName}
          style={detailsStyles}
        >
          {/* Content with same slide animation */}
          <PortfolioItemDetails
            title={title}
            description={description}
            functionality={functionality}
            link={link}
            onClose={handleClose}
          />
        </div>
      </div>
    </PortfolioItemContainer>
  );
};

export default PortfolioItem; 