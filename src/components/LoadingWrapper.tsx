import React, { useEffect, useState } from 'react';
import RetroLoader from './animations/RetroLoader';
import { motion, AnimatePresence } from 'framer-motion';
import { preloadImages, CRITICAL_IMAGES } from '../utils/imagePreloader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  duration?: number;
  primaryText?: string;
  accentText?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children, duration = 3000, primaryText, accentText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Use a shorter actual loading time, but ensure critical assets are loaded
  const actualDuration = Math.min(duration, 3000); // Reduced from 2500ms to 1500ms
  const minLoadingTime = 2500; // Minimum time to show loading screen

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const startTime = Date.now();
    
    const handleProgress = (progress: number) => {
      setLoadingProgress(progress);
      
      // If progress is complete and minimum time has passed, finish loading
      if (progress === 100 && Date.now() - startTime >= minLoadingTime) {
        setIsLoading(false);
      }
    };

    // Start preloading images immediately
    const startLoading = async () => {
      try {
        // Start preloading images and track progress
        await preloadImages(CRITICAL_IMAGES, handleProgress);
        
        // Ensure minimum display time for loading screen
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, Math.min(actualDuration, minLoadingTime) - elapsedTime);
        
        if (remainingTime > 0) {
          timeoutId = setTimeout(() => {
            setIsLoading(false);
          }, remainingTime);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error during preloading:', error);
        // Fallback to minimum display time if preloading fails
        const remainingTime = Math.max(0, minLoadingTime - (Date.now() - startTime));
        timeoutId = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      }
    };

    startLoading();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [actualDuration, minLoadingTime]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.1, ease: "easeInOut" } // Reduced from 0.3s to 0.2s
          }}
        >
          <RetroLoader
            primaryText={primaryText}
            accentText={accentText}
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
            transition: { duration: 0.2, ease: "easeOut" } // Reduced from 0.3s to 0.2s
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