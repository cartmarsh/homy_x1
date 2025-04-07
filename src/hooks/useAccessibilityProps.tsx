import { KeyboardEvent } from 'react';

interface UseAccessibilityPropsParams {
  hasLink: boolean;
  isExpanded: boolean;
  title: string;
  controlsId: string;
  onActivate: () => void;
}

interface AccessibilityProps {
  role?: string;
  'aria-label'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
}

/**
 * Hook for generating accessibility props for interactive elements like portfolio items
 */
const useAccessibilityProps = ({
  hasLink,
  isExpanded,
  title,
  controlsId,
  onActivate
}: UseAccessibilityPropsParams): AccessibilityProps => {
  
  // Only add these props when it's a link and not expanded
  const shouldBeInteractive = hasLink && !isExpanded;

  // Create keyboard handler for activation via Enter or Space
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (shouldBeInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onActivate();
    }
  };

  return {
    role: shouldBeInteractive ? 'link' : undefined,
    'aria-label': shouldBeInteractive ? `View ${title} project` : undefined,
    'aria-expanded': isExpanded,
    'aria-controls': controlsId,
    tabIndex: shouldBeInteractive ? 0 : undefined,
    onKeyDown: handleKeyDown
  };
};

export default useAccessibilityProps; 