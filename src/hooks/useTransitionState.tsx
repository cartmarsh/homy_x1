import { useState, useCallback } from 'react';

interface UseTransitionStateProps {
  transitionDuration?: number;
}

/**
 * Custom hook to manage transition states with timeouts
 * @param props Configuration options
 * @returns Object with transition state and start transition function
 */
const useTransitionState = ({ transitionDuration = 800 }: UseTransitionStateProps = {}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Start transition and set timer to end it
  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    // Mark end of transition to allow final image position adjustment
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [transitionDuration]);

  return {
    isTransitioning,
    startTransition
  };
};

export default useTransitionState; 