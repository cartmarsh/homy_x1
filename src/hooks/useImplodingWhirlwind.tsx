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
  implodeDuration = 1000, // Longer implosion duration for smoother effect
  onImplodeComplete
}: UseImplodingWhirlwindProps) => {
  const [isImploding, setIsImploding] = useState(false);
  const [implodeProgress, setImplodeProgress] = useState(0);
  
  // Start the implosion effect before the duration ends
  useEffect(() => {
    const implodeStartTime = duration - implodeDuration;
    
    const implodeTimer = setTimeout(() => {
      setIsImploding(true);
    }, Math.max(0, implodeStartTime));

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
      
      // Use easeInQuad for smoother acceleration
      const linearProgress = Math.min(elapsed / implodeDuration, 1);
      const easedProgress = linearProgress * linearProgress;
      
      setImplodeProgress(easedProgress);

      if (linearProgress < 1) {
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
      // Slower initial movement
      return { radius: initialRadius, height: initialHeight, speed: speed * 0.5 };
    }

    // During implosion, particles move towards center and speed up
    // Use a cubic function for more dramatic acceleration
    const speedMultiplier = 1 + implodeProgress * implodeProgress * 4;
    
    // Use angle to create a subtle spiral effect during implosion
    // Particles closer to certain angles move inward faster
    const angleModifier = Math.sin(initialAngle * 2) * 0.1 + 1;
    const radiusMultiplier = (1 - implodeProgress) * angleModifier;

    return {
      radius: initialRadius * radiusMultiplier,
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