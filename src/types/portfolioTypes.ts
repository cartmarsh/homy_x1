import { RefObject } from 'react';

// Main PortfolioItem Props
export interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
  functionality?: string[];
}

// Animation Note type (moved from usePortfolioAnimation to centralize types)
export interface Note {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  opacity: number;
  isQuarterNote: boolean;
}

// Props for the usePortfolioAnimation hook
export interface UsePortfolioAnimationProps {
  containerRef: RefObject<HTMLDivElement>;
  shouldReinitialize?: boolean;
}

// Props for the PortfolioItemImage component
export interface PortfolioItemImageProps {
  image: string;
  title: string;
  tags: string[];
  className?: string;
}

// Props for the PortfolioItemDetails component
export interface PortfolioItemDetailsProps {
  title: string;
  description: string;
  functionality: string[];
  tags: string[];
  link?: string;
  isVisible: boolean;
  onClose: (e: React.MouseEvent) => void;
}

// Props for the FeatureList component
export interface FeatureListProps {
  features: string[];
}

// Props for the TagsList component
export interface TagsListProps {
  tags: string[];
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Props for the useExpandableCard hook
export interface UseExpandableCardProps {
  link?: string;
  onToggle?: () => void;
}

// State returned by the useExpandableCard hook
export interface ExpandableCardState {
  showDetails: boolean;
  isAnimating: boolean;
  toggleDetails: (e: React.MouseEvent) => void;
  handleItemClick: () => void;
} 