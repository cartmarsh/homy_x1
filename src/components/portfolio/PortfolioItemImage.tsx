import React from 'react';

interface PortfolioItemImageProps {
  image: string;
  title: string;
  tags?: string[];
  className?: string;
}

const PortfolioItemImage: React.FC<PortfolioItemImageProps> = ({
  image,
  title,
  tags = [],
  className = ''
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Main image */}
      <img 
        src={image} 
        alt={`${title} project screenshot`}
        className={`${className} w-full h-auto object-cover`}
        style={{
          maxHeight: '280px', // Limit image height
          minHeight: '200px', // Ensure minimum height even with small images
          objectFit: 'cover',
          objectPosition: 'center top'
        }}
      />
    </div>
  );
};

export default PortfolioItemImage; 