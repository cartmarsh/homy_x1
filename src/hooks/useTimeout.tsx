import { useState, useEffect } from 'react';

interface UseTimeoutOptions {
  duration: number;
  initialVisibility?: boolean;
  onTimeout?: () => void;
}

/**
 * Hook for handling timeout-based visibility states
 * Useful for components that need to be hidden after a certain duration
 * 
 * @param options Configuration options for the timeout
 * @param options.duration Duration in milliseconds before the visibility changes
 * @param options.initialVisibility Initial visibility state (defaults to true)
 * @param options.onTimeout Optional callback to execute when timeout completes
 * @returns Object containing current visibility state and function to reset visibility
 */
const useTimeout = ({
  duration,
  initialVisibility = true,
  onTimeout
}: UseTimeoutOptions) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    // Main timer to hide after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeout?.();
    }, duration);

    // Cleanup timer on unmount or when dependencies change
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onTimeout]);

  // Function to reset visibility state
  const reset = () => {
    setIsVisible(true);
  };

  return {
    isVisible,
    reset
  };
};

export default useTimeout; 