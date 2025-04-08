import { useMemo } from 'react';

/**
 * Hook for creating memoized byte elements for loading animations
 * Splits a string into individual characters and wraps each in a styled span
 * 
 * @param text The text to split into byte elements
 * @param className Optional custom class name for the byte elements (defaults to 'retro-loading-byte')
 * @returns Array of memoized span elements
 */
const useByteElementsLoaderMemo = (
  text: string,
  className: string = 'retro-loading-byte'
): JSX.Element[] => {
  return useMemo(() => {
    return text.split('').map((char, index) => (
      <span key={index} className={className}>{char}</span>
    ));
  }, [text, className]);
};

export default useByteElementsLoaderMemo; 