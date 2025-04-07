import React from 'react';
import { FeatureListProps } from '../../types/portfolioTypes';

const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Functionality</h3>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList; 