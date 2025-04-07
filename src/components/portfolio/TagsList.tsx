import React from 'react';
import { TagsListProps } from '../../types/portfolioTypes';

const TagsList: React.FC<TagsListProps> = ({ 
  tags, 
  size = 'medium', 
  className = '' 
}) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  // Size classes
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-3 py-1',
    large: 'text-base px-4 py-1.5'
  };

  const tagClass = `bg-blue-500/80 text-white rounded-full ${sizeClasses[size]} ${className}`;

  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Technologies</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className={tagClass}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsList; 