import React from 'react';

interface PortfolioItemDetailsProps {
  title: string;
  description: string;
  functionality: string[];
  tags: string[];
  link?: string;
  isVisible: boolean;
  onClose: (e: React.MouseEvent) => void;
}

const PortfolioItemDetails: React.FC<PortfolioItemDetailsProps> = ({
  title,
  description,
  functionality,
  tags,
  link,
  isVisible,
  onClose
}) => {
  // Ensure we don't render too much content that might cause scrolling
  const truncatedDescription = description.length > 280 
    ? `${description.substring(0, 280)}...` 
    : description;
  
  // Limit number of functionality items to prevent overflow
  const displayFunctionality = functionality.slice(0, 4);
  
  // Limit number of tags to prevent overflow
  const displayTags = tags.slice(0, 8);
  
  return (
    <div 
      className="p-5 rounded-b-lg"
      onClick={(e) => e.stopPropagation()}
      style={{ 
        overflow: 'hidden',
        background: '#2d1b69',
        boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(5px)'
      }}
    >
      {/* Header with title and close button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-white truncate" style={{ maxWidth: 'calc(100% - 40px)' }}>{title}</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 flex-shrink-0"
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.293 5.293a1 1 0 00-1.414 0L10 8.586 6.707 5.293a1 1 0 00-1.414 1.414L8.586 10l-3.293 3.293a1 1 0 101.414 1.414L10 11.414l3.293 3.293a1 1 0 001.414-1.414L11.414 10l3.293-3.293a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Project description */}
      <p className="text-gray-300 mb-5 text-sm leading-relaxed line-clamp-3">{truncatedDescription}</p>
      
      {/* Functionality section */}
      <div className="mb-5">
        <h4 className="text-lg font-semibold text-gray-200 mb-2">Functionality</h4>
        <ul className="space-y-1">
          {displayFunctionality.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
              <span className="text-gray-300 text-sm truncate">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tags section */}
      {displayTags.length > 0 && (
        <div className="mb-5">
          <h4 className="text-lg font-semibold text-gray-200 mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium text-blue-200 bg-blue-900 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Visit project link */}
      {link && (
        <div className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md
                     hover:bg-blue-700 transition-colors duration-300 font-medium text-sm"
          >
            Visit Project
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default PortfolioItemDetails; 