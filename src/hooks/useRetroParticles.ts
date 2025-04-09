import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';

interface ThreeObjects {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  particles: THREE.Points | null;
}

interface UseRetroParticlesProps {
  containerRef: React.RefObject<HTMLDivElement>;
  progress: number;
}

const useRetroParticles = ({ containerRef, progress }: UseRetroParticlesProps) => {
  const timeRef = useRef<number>(0);
  const frameIdRef = useRef<number>(0);
  
  const [threeObjects, setThreeObjects] = useState<ThreeObjects>({
    scene: null,
    camera: null,
    renderer: null,
    particles: null
  });

  // Memoize color palette for particle creation
  const colorPalette = useMemo(() => [
    new THREE.Color(0xff8c42), // Orange
    new THREE.Color(0xff6b6b), // Coral
    new THREE.Color(0xffd93d), // Warm yellow
    new THREE.Color(0xff4f4f), // Red-orange
    new THREE.Color(0xffaa5c)  // Light orange
  ], []);

  // Create particles with memoized implementation
  const createParticles = useCallback(() => {
    if (!threeObjects.scene || !threeObjects.camera) return null;

    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Create particles in a whirlwind shape
      const baseRadius = 1 + Math.random() * 8; // Base radius between 2 and 5
      const angle = Math.random() * Math.PI * 4;
      
      // Height varies with angle to create spiral effect, increased range
      const heightOffset = (angle / (Math.PI * 2)) * 6 - 3; // Maps angle to -3 to 3
      const height = heightOffset + (Math.random() - 0.5) * 0.2; // Reduced randomness for smoother effect
      
      // Radius decreases slightly with height for conical shape
      const radius = baseRadius * (1 - Math.abs(height/3) * 0.2); // Smoother conical shape

      positions[i3] = radius * Math.cos(angle);
      positions[i3 + 1] = height;
      positions[i3 + 2] = radius * Math.sin(angle);

      // Use more consistent coloring
      const colorIndex = Math.floor((i / particleCount) * colorPalette.length);
      const color = colorPalette[colorIndex % colorPalette.length];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    threeObjects.scene.add(particles);
    return particles;
  }, [threeObjects.scene, threeObjects.camera, colorPalette]);

  // Update particles with useCallback - preserving original animation logic
  const updateParticles = useCallback(() => {
    if (!threeObjects.particles) return;

    const positions = threeObjects.particles.geometry.attributes.position.array as Float32Array;
    const particleCount = positions.length / 3;
    const time = timeRef.current;

    // Target position (where "hello world" text is)
    const targetX = 0;
    const targetY = 0;
    const targetZ = 0;

    // Calculate speed factor - smoother motion with less exponential acceleration
    const speedFactor = Math.min(0.03, 0.001 * (1 + time * 0.01));

    // Calculate shape transition factor (0 to 1) - used to flatten the shape over time
    // More linear transition for smoother movement
    const shapeFactor = Math.min(100, time * 0.01);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];

      // Calculate radius in xz-plane for whirlwind
      const xzRadius = Math.sqrt(x * x + z * z);
      
      if (progress >= 100) {
        // Smooth transition for completion effect
        const shrinkFactor = Math.max(0.1, 1 - (progress - 99) * 0.01);
        const newRadius = xzRadius * shrinkFactor;
        const angle = Math.atan2(z, x) + time * 0.01 * speedFactor * 2; // Smoother rotation
        
        // Spiral inward with smooth height transition
        positions[i3] = newRadius * Math.cos(angle);
        positions[i3 + 1] = y;
        positions[i3 + 2] = newRadius * Math.sin(angle);

        // Once particles are close enough to center, move to target smoothly
        if (newRadius < 0.5) {
          const dirX = targetX - x;
          const dirY = targetY - y;
          const dirZ = targetZ - z;
          const distToTarget = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
          
          const rushSpeed = 0.02 * speedFactor * 2; // More consistent speed
          positions[i3] += (dirX / distToTarget) * rushSpeed;
          positions[i3 + 1] += (dirY / distToTarget) * rushSpeed;
          positions[i3 + 2] += (dirZ / distToTarget) * rushSpeed;
        }
      } else {
        // Fixed animation to create disc shape around y-axis
        // Maintain the original radius in xz-plane
        const rotationSpeed = speedFactor * 0.5;
        
        // Rotate around y-axis at a consistent speed
        const angle = Math.atan2(z, x) + rotationSpeed;
        
        // Gradually flatten y values to create disc shape with smoother transition
        // Use stronger flattening effect to counteract any z-axis movement
        const newY = y * (1 - shapeFactor * 1.2) + targetY * shapeFactor * 0.8;
        
        // Maintain the same radius but with updated angle to create rotation
        positions[i3] = xzRadius * Math.cos(angle);
        positions[i3 + 1] = newY;
        positions[i3 + 2] = xzRadius * Math.sin(angle);
      }
    }

    threeObjects.particles.geometry.attributes.position.needsUpdate = true;
  }, [threeObjects.particles, progress]);

  // Animation frame callback
  const animate = useCallback(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    timeRef.current += 0.016;
    
    updateParticles();
    
    if (threeObjects.renderer && threeObjects.scene && threeObjects.camera) {
      threeObjects.renderer.render(threeObjects.scene, threeObjects.camera);
    }
  }, [updateParticles, threeObjects]);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !threeObjects.renderer || !threeObjects.camera) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    threeObjects.renderer.setSize(width, height);
    
    threeObjects.camera.aspect = width / height;
    threeObjects.camera.updateProjectionMatrix();
  }, [containerRef, threeObjects]);

  // Setup effect
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Fixed camera position to better view the disc formation
    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    containerRef.current.appendChild(renderer.domElement);

    // Update state with created objects
    setThreeObjects({
      scene,
      camera,
      renderer,
      particles: null
    });

    // Clean up function
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      
      if (renderer && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [containerRef]);

  // Create particles once scene and camera are ready
  useEffect(() => {
    if (threeObjects.scene && threeObjects.camera && !threeObjects.particles) {
      const particles = createParticles();
      if (particles) {
        setThreeObjects(prev => ({
          ...prev,
          particles
        }));
      }
    }
  }, [threeObjects.scene, threeObjects.camera, threeObjects.particles, createParticles]);

  // Setup resize listener and start animation
  useEffect(() => {
    if (!threeObjects.scene || !threeObjects.camera || !threeObjects.renderer || !threeObjects.particles) {
      return;
    }
    
    // Start animation loop
    animate();
    
    // Setup resize handler
    handleResize(); // Call resize handler immediately
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [threeObjects, animate, handleResize]);

  // No need to return containerRef as it's already provided by the component
  return {};
};

export default useRetroParticles; 