import React, { useEffect, useState } from 'react';
import RetroLoader from './animations/RetroLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImages, CRITICAL_IMAGES } from '../utils/imagePreloader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  duration?: number;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, duration = 3000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Use a much shorter actual loading time, but ensure critical assets are loaded
  const actualDuration = Math.min(duration, 2500);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const startTime = Date.now();
    
    const handleProgress = (progress: number) => {
      setLoadingProgress(progress);
    };

    // Start preloading images immediately
    const startLoading = async () => {
      try {
        // Start preloading images and track progress
        await preloadImages(CRITICAL_IMAGES, handleProgress);
        
        // Ensure minimum display time for loading screen
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, actualDuration - elapsedTime);
        
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error('Error during preloading:', error);
        // Fallback to minimum display time if preloading fails
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, actualDuration);
      }
    };

    startLoading();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [actualDuration]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <RetroLoader
            primaryText="hello world"
            accentText="..."
            duration={actualDuration}
            progress={loadingProgress}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingWrapper; 