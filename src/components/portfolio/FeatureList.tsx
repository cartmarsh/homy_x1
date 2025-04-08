import React from 'react';

interface FeatureListProps {
  features: string[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-1.5">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start text-xs sm:text-sm">
          <span className="text-purple-300 mr-1.5 flex-shrink-0">✓</span>
          <span className="text-white/90">{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default FeatureList; 