import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';

// Custom type for tube data
export interface TubeData {
  originalPoints: THREE.Vector3[];
  originalCurve: THREE.CatmullRomCurve3;
  angle: number;
  index: number;
  maxDeflection: number;
  originalColor: THREE.Color;
  animationColor: THREE.Color;
  thickness: number;
}

interface UseStringsProps {
  scene: React.RefObject<THREE.Scene | null>;
  numStrings: number;
}

interface UseStringsResult {
  tubes: React.RefObject<THREE.Mesh[]>;
  lights: React.RefObject<THREE.Light[]>;
  createStrings: () => void;
  removeAllStrings: () => void;
  getVisibleDimensions: (camera: THREE.PerspectiveCamera) => { width: number; height: number };
  scene: React.RefObject<THREE.Scene | null>;
}

export function useStrings({
  scene,
  numStrings
}: UseStringsProps): UseStringsResult {
  const tubesRef = useRef<THREE.Mesh[]>([]);
  const lightsRef = useRef<THREE.Light[]>([]);
  
  // Color palettes using useMemo to prevent unnecessary recreations
  const colors = useMemo(() => [
    new THREE.Color('#FF8C00'), // Dark Orange
    new THREE.Color('#FFA500'), // Orange
    new THREE.Color('#FF7F50'), // Coral
    new THREE.Color('#FF6347')  // Tomato
  ], []);
  
  const animationColors = useMemo(() => [
    new THREE.Color('#FFD700'), // Gold
    new THREE.Color('#FFAE42'), // Yellow Orange
    new THREE.Color('#FF4500'), // Orange Red
    new THREE.Color('#FF8C00')  // Dark Orange
  ], []);
  
  // Calculate visible dimensions based on camera
  const getVisibleDimensions = useCallback((camera: THREE.PerspectiveCamera) => {
    const fov = camera.fov;
    const distance = camera.position.z;
    
    // Calculate visibleWidth and visibleHeight in world space
    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * distance;
    const visibleWidth = visibleHeight * (window.innerWidth / window.innerHeight);
    
    return { width: visibleWidth, height: visibleHeight };
  }, []);
  
  // Clean up resources - using useCallback to memoize the function
  const removeAllStrings = useCallback(() => {
    if (!scene.current) return;
    
    tubesRef.current.forEach(tube => {
      scene.current?.remove(tube);
      if (tube.geometry) tube.geometry.dispose();
      if (tube.material && Array.isArray(tube.material)) {
        tube.material.forEach(material => material.dispose());
      } else if (tube.material) {
        (tube.material as THREE.Material).dispose();
      }
    });
    
    tubesRef.current = [];
    
    // Remove existing lights
    lightsRef.current.forEach(light => {
      scene.current?.remove(light);
    });
    lightsRef.current = [];
  }, [scene]);
  
  // Add and configure lights
  const setupLights = useCallback(() => {
    if (!scene.current) return;
    
    // Remove existing lights
    lightsRef.current.forEach(light => {
      scene.current?.remove(light);
    });
    lightsRef.current = [];
    
    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);
    lightsRef.current.push(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 5);
    scene.current.add(directionalLight);
    lightsRef.current.push(directionalLight);
  }, [scene]);
  
  // Create a single tube/string
  const createTube = useCallback((
    index: number, 
    maxRadius: number, 
    totalStrings: number
  ) => {
    if (!scene.current) return;
    
    const center = new THREE.Vector3(0, 0, 0);
    const angle = (index / totalStrings) * Math.PI * 2;
    const targetX = Math.cos(angle) * maxRadius;
    const targetY = Math.sin(angle) * maxRadius;
    
    // Create curve with more points for smoother animation
    const points: THREE.Vector3[] = [];
    const steps = 40; // Increased for smoother curves
    
    for (let j = 0; j <= steps; j++) {
      const t = j / steps;
      points.push(new THREE.Vector3(
        center.x + (targetX - center.x) * t,
        center.y + (targetY - center.y) * t,
        0
      ));
    }
    
    // Create a smooth curve through the points
    const curve = new THREE.CatmullRomCurve3(points);
    
    // Random color from palette with higher opacity
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex].clone();
    
    // Thicker lines using TubeGeometry
    const thickness = Math.random() * 0.03 + 0.01;
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      steps, // tubular segments
      thickness, // radius
      8, // radial segments
      false // closed
    );
    
    // Create material with proper lighting
    const material = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.85,
      roughness: 0.3,
      metalness: 1,
      emissive: color.clone().multiplyScalar(0.3),
      emissiveIntensity: 0.5,
    });
    
    const tube = new THREE.Mesh(tubeGeometry, material);
    
    // Assign a random animation color and store data for animation
    const animationColorIndex = Math.floor(Math.random() * animationColors.length);
    
    const tubeData: TubeData = {
      originalPoints: [...points],
      originalCurve: curve,
      angle,
      index,
      maxDeflection: Math.random() * 0.08 + 0.02,
      originalColor: color.clone(),
      animationColor: animationColors[animationColorIndex].clone(),
      thickness
    };
    
    tube.userData = tubeData;
    
    scene.current.add(tube);
    tubesRef.current.push(tube);
    
    return tube;
  }, [scene, colors, animationColors]);
  
  // Create all strings/tubes
  const createStrings = useCallback(() => {
    if (!scene.current) return;
    
    // Get camera from scene
    const camera = scene.current.children.find(
      child => child.type === 'PerspectiveCamera'
    ) as THREE.PerspectiveCamera;
    
    // Use a default calculation if no camera is found
    let dimensions;
    if (camera) {
      dimensions = getVisibleDimensions(camera);
    } else {
      // Fallback dimensions for when camera isn't available yet
      const aspectRatio = window.innerWidth / window.innerHeight;
      dimensions = {
        width: 10 * aspectRatio,
        height: 10
      };
    }
    
    const maxRadius = Math.max(dimensions.width, dimensions.height) * 0.7;
    
    // First clean up any existing strings
    removeAllStrings();
    
    // Create new strings
    for (let i = 0; i < numStrings; i++) {
      createTube(i, maxRadius, numStrings);
    }
    
    // Add lights after creating tubes
    setupLights();
  }, [scene, numStrings, createTube, getVisibleDimensions, removeAllStrings, setupLights]);
  
  return {
    tubes: tubesRef,
    lights: lightsRef,
    createStrings,
    removeAllStrings,
    getVisibleDimensions,
    scene
  };
} 