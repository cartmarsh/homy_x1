import { useState, useEffect, useCallback } from 'react';

interface UseImplodingWhirlwindProps {
  duration: number;
  implodeDuration?: number;
  onImplodeComplete?: () => void;
}

/**
 * Hook to manage the state of an imploding whirlwind animation
 * Handles the timing of when to start the implosion effect
 */
const useImplodingWhirlwind = ({
  duration,
  implodeDuration = 600,
  onImplodeComplete
}: UseImplodingWhirlwindProps) => {
  const [isImploding, setIsImploding] = useState(false);
  const [implodeProgress, setImplodeProgress] = useState(0);
  
  // Start the implosion effect before the duration ends
  useEffect(() => {
    const implodeStartTime = duration - implodeDuration;
    
    const implodeTimer = setTimeout(() => {
      setIsImploding(true);
    }, implodeStartTime);

    return () => {
      clearTimeout(implodeTimer);
    };
  }, [duration, implodeDuration]);

  // Track implosion progress
  useEffect(() => {
    if (!isImploding) return;

    let startTime: number;
    let animationFrame: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / implodeDuration, 1);
      
      setImplodeProgress(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        onImplodeComplete?.();
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isImploding, implodeDuration, onImplodeComplete]);

  // Calculate animation parameters based on implosion state
  const getAnimationParams = useCallback((
    initialRadius: number,
    initialAngle: number,
    initialHeight: number,
    speed: number
  ) => {
    if (!isImploding) {
      return { radius: initialRadius, height: initialHeight, speed };
    }

    // During implosion, particles move towards center and speed up
    const targetRadius = 0;
    const targetHeight = 0;
    const speedMultiplier = 1 + implodeProgress * 2; // Particles speed up during implosion

    return {
      radius: initialRadius * (1 - implodeProgress),
      height: initialHeight * (1 - implodeProgress),
      speed: speed * speedMultiplier
    };
  }, [isImploding, implodeProgress]);

  return {
    isImploding,
    implodeProgress,
    getAnimationParams
  };
};

export default useImplodingWhirlwind; 