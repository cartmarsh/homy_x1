import React, { Suspense, useEffect, useState } from 'react';
import LoadingScreen from './animations/RetroLoader';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingWrapperProps {
  children: React.ReactNode;
  duration: number;
  primaryText: string;
  accentText: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  duration,
  primaryText,
  accentText
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use a much shorter actual loading time
  const actualDuration = Math.min(duration, 2500); // Reduced by 0.7 seconds (from 4000)

  // Preload child components during loading screen
  useEffect(() => {
    // Begin content preloading instantly
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, actualDuration);

    return () => clearTimeout(timer);
  }, [actualDuration]);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" } // Faster exit transition
          }}
        >
          <LoadingScreen
            primaryText={primaryText}
            accentText={accentText}
            duration={actualDuration + 300} // Shorter animation extension
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.3, ease: "easeOut" } // Faster content appearance
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