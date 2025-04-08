import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

interface UseThreeSetupProps {
  animationSpeed: number;
  onSetup: (scene: THREE.Scene) => void;
  onAnimation: () => void;
  onResize?: () => void;
  timeRef?: React.MutableRefObject<number>;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function useThreeSetup({
  animationSpeed,
  onSetup,
  onAnimation,
  onResize,
  timeRef,
  containerRef: externalContainerRef
}: UseThreeSetupProps): void {
  // DOM container reference - use external if provided, otherwise create internal
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = externalContainerRef || internalContainerRef;
  
  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const internalTimeRef = useRef<number>(0);
  const frameIdRef = useRef<number>(0);
  
  // Initialize Three.js environment
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Setup renderer with better performance options
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Run setup callback with the scene
    onSetup(scene);
    
    // Start animation loop
    const animate = (time: number) => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Update animation time
      const newTime = time * animationSpeed;
      if (timeRef) {
        timeRef.current = newTime;
      } else {
        internalTimeRef.current = newTime;
      }
      
      // Run animation callback
      onAnimation();
      
      // Render the scene
      renderer.render(scene, camera);
    };
    animate(0);
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [containerRef, onSetup, onAnimation, animationSpeed, timeRef]);
  
  // Handle window resize
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;
    
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Call the onResize callback if provided
    if (onResize) {
      onResize();
    }
  }, [onResize]);
  
  // Add window resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
} 