import React from 'react';

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-800/50 text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagsList; 