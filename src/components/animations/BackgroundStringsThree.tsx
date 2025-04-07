import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useThreeSetup } from './hooks/useThreeSetup';
import { useStrings } from './hooks/useStrings';
import { useAnimateStrings } from './hooks/useAnimateStrings';

interface BackgroundStringsThreeProps {
  className?: string;
  numStrings?: number;
  animationSpeed?: number;
}

// Custom type for tube data
interface TubeData {
  originalPoints: THREE.Vector3[];
  originalCurve: THREE.CatmullRomCurve3;
  angle: number;
  index: number;
  maxDeflection: number;
  originalColor: THREE.Color;
  animationColor: THREE.Color;
  thickness: number;
}

function BackgroundStringsThree({ 
  className = '',
  numStrings = 50,
  animationSpeed = 0.0005 
}: BackgroundStringsThreeProps) {
  // Create shared refs that will be used across hooks
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animationTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Setup string creation and management
  const stringHandlers = useStrings({
    scene: sceneRef,
    numStrings
  });
  
  // Setup animation handlers
  const animationHandlers = useAnimateStrings({
    tubes: stringHandlers.tubes,
    time: animationTimeRef
  });
  
  // Handle resize - recreate strings on window resize
  const handleResize = useCallback(() => {
    stringHandlers.removeAllStrings();
    stringHandlers.createStrings();
  }, [stringHandlers]);
  
  // Setup scene and Three.js environment
  useThreeSetup({
    animationSpeed,
    containerRef,
    onSetup: (scene: THREE.Scene) => {
      // Store the scene in our shared ref
      sceneRef.current = scene;
      // Create the strings
      stringHandlers.createStrings();
    },
    onAnimation: () => {
      // Update animation
      animationHandlers.updateAnimation();
    },
    onResize: handleResize,
    timeRef: animationTimeRef
  });
  
  return (
    <div 
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-1 ${className}`}
    />
  );
}

export default BackgroundStringsThree; 