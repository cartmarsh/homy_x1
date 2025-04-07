import React from 'react';
import { getDetailsButtonStyles, getButtonHoverHandlers } from '../../utils/portfolioStyles';

interface PortfolioItemButtonProps {
  showDetails: boolean;
  isAnimating: boolean;
  detailsId: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PortfolioItemButton: React.FC<PortfolioItemButtonProps> = ({
  showDetails,
  isAnimating,
  detailsId,
  onClick
}) => {
  // Get style functions
  const buttonStyles = getDetailsButtonStyles();
  const hoverHandlers = getButtonHoverHandlers();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      aria-expanded={showDetails}
      aria-controls={detailsId}
      disabled={isAnimating}
      className={`
        px-10 py-2 rounded-lg
        border-0 hover:border-0 outline-none
        transition-all duration-300
        font-semibold text-2xl
        focus:outline-none focus:ring-0
        text-black
        flex items-center justify-center gap-2
      `}
      style={buttonStyles}
      {...hoverHandlers}
    >
      <div className="flex items-center justify-center h-full leading-relaxed" style={{ lineHeight: '3' }}>Get Details</div>
    </button>
  );
};

export default PortfolioItemButton; 