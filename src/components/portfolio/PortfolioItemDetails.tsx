import React, { CSSProperties, useEffect, useState } from 'react';

interface PortfolioItemDetailsProps {
  title: string;
  description: string;
  functionality: string[];
  link?: string;
  onClose: () => void;
}

const PortfolioItemDetails: React.FC<PortfolioItemDetailsProps> = ({
  title,
  description,
  functionality,
  link,
  onClose
}) => {
  // State for content fade-in
  const [contentVisible, setContentVisible] = useState(false);
  
  // Trigger fade-in effect when component mounts
  useEffect(() => {
    // Small delay to ensure the fade-in happens after slide-in animation starts
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Define button styles for reuse
  const buttonStyles = `
    inline-flex items-center justify-center
    px-3 py-1.5 sm:px-4 sm:py-2
    text-xs sm:text-sm font-medium
    rounded-md
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    font-secondary
  `;

  const primaryButtonStyles = `
    ${buttonStyles}
    bg-purple-600 hover:bg-purple-700
    text-white
    shadow-md hover:shadow-lg
    focus:ring-purple-500
  `;
  
  // Content animation styles
  const contentStyles: CSSProperties = {
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? 'translateY(0)' : 'translateY(0.625rem)',
    transition: 'opacity 0.5s ease, transform 0.4s ease',
  };

  return (
    <div 
      className="p-3 sm:p-5 bg-gradient-to-b from-purple-700/70 to-purple-900/80 rounded-b-lg text-white hide-scrollbar relative font-secondary"
    >
      {/* Two-column layout with clear separation */}
      <div 
        className="flex flex-col md:flex-row md:space-x-6"
        style={contentStyles}
      >
        {/* Left Column - Title and Features - with border on larger screens */}
        <div className="w-full md:w-1/2 flex flex-col md:pr-4 md:border-r md:border-purple-500/30">
          {/* Project Title */}
          <h3 className="text-sm sm:text-lg font-bold leading-tight sm:leading-6 text-white border-b border-purple-400/30 pb-2 mb-3 font-primary tracking-wide">
            {title}
          </h3>
          
          {/* Features list without the "Key Features" header */}
          {functionality.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-1.5">
                {functionality.map((feature, index) => (
                  <li key={index} className="flex items-start text-xs sm:text-sm">
                    <span className="text-purple-300 mr-1.5 flex-shrink-0">✓</span>
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Right Column - Description and Buttons - aligned with left column content */}
        <div className="w-full md:w-1/2 flex flex-col h-full mt-4 pt-4 border-t border-purple-500/30 md:mt-0 md:pt-0 md:border-t-0">
          {/* Project Description - Starting at the same level as features */}
          <div className="flex-grow md:pt-10">
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">{description}</p>
          </div>
          
          {/* Action Buttons - Only View Project, no Close button */}
          {link && (
            <div className="mt-4 flex justify-end">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryButtonStyles}
                aria-label={`View ${title} project`}
              >
                View Project
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Close button - positioned at the center-bottom */}
      <div 
        className="absolute bottom-3 left-0 right-0 flex justify-center mt-4"
        style={{
          ...contentStyles,
          transitionDelay: '0.2s', // Slight delay for close button to appear after content
        }}
      >
        <button
          onClick={onClose}
          className="bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-all duration-300 z-50"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PortfolioItemDetails; 