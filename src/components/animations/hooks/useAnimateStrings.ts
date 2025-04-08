import { useCallback } from 'react';
import * as THREE from 'three';
import { TubeData } from './useStrings';

interface UseAnimateStringsProps {
  tubes: React.RefObject<THREE.Mesh[]>;
  time: React.MutableRefObject<number>;
}

export function useAnimateStrings({ 
  tubes,
  time
}: UseAnimateStringsProps) {
  // Animate a single tube
  const animateTube = useCallback((tube: THREE.Mesh) => {
    if (!tube.geometry) return;
    
    const userData = tube.userData as TubeData;
    const originalPoints = userData.originalPoints;
    const currentTime = time.current ?? 0; // Provide default value for time
    
    // Calculate phase offset based on angle to create circular wave effect
    const phaseOffset = userData.angle / (Math.PI * 2) * 4;
    const timeFactor = currentTime + phaseOffset;
    
    // Create new animated points based on original ones
    const animatedPoints: THREE.Vector3[] = [];
    
    for (let i = 0; i < originalPoints.length; i++) {
      const orig = originalPoints[i];
      
      // Keep first and last points fixed
      if (i === 0 || i === originalPoints.length - 1) {
        animatedPoints.push(orig.clone());
        continue;
      }
      
      const t = i / (originalPoints.length - 1);
      
      // Create a bell curve effect that is stronger in the middle
      const bellCurve = Math.sin(t * Math.PI);
      
      // Create a wave that travels along the line with time
      const wavePos = (t * 4 + timeFactor) % 4;
      const wave = Math.sin(wavePos * Math.PI);
      
      // Combine effects - bellCurve ensures ends stay fixed
      const effectStrength = bellCurve * wave * userData.maxDeflection;
      
      // Calculate perpendicular direction to the line
      const prevIdx = Math.max(0, i - 1);
      const nextIdx = Math.min(originalPoints.length - 1, i + 1);
      
      const prev = originalPoints[prevIdx];
      const next = originalPoints[nextIdx];
      
      // Direction vector along the line
      const dirX = next.x - prev.x;
      const dirY = next.y - prev.y;
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      
      if (length > 0) {
        // Perpendicular direction
        const perpX = -dirY / length;
        const perpY = dirX / length;
        
        // Apply deflection perpendicular to the line direction
        animatedPoints.push(new THREE.Vector3(
          orig.x + perpX * effectStrength,
          orig.y + perpY * effectStrength,
          orig.z
        ));
      } else {
        animatedPoints.push(orig.clone());
      }
    }
    
    // Create new curve and update geometry
    const animatedCurve = new THREE.CatmullRomCurve3(animatedPoints);
    const newGeometry = new THREE.TubeGeometry(
      animatedCurve,
      originalPoints.length - 1,
      userData.thickness,
      8,
      false
    );
    
    // Replace geometry
    tube.geometry.dispose();
    tube.geometry = newGeometry;
    
    // Update color based on the animation
    const colorPulse = (Math.sin(timeFactor * 1.5 + phaseOffset * 1.5) + 1) * 0.5;
    
    // Interpolate between original and animation color
    const r = userData.originalColor.r * (1 - colorPulse) + userData.animationColor.r * colorPulse;
    const g = userData.originalColor.g * (1 - colorPulse) + userData.animationColor.g * colorPulse;
    const b = userData.originalColor.b * (1 - colorPulse) + userData.animationColor.b * colorPulse;
    
    // Update both main color and emissive color for glow effect
    const material = tube.material as THREE.MeshStandardMaterial;
    material.color.setRGB(r, g, b);
    material.emissive.setRGB(r * 0.5, g * 0.5, b * 0.5);
    
    // Pulse opacity slightly based on animation for more dynamic effect
    material.opacity = 0.7 + colorPulse * 0.3;
  }, [time]);
  
  // Update all animations - optimized version
  const updateAnimation = useCallback(() => {
    if (!tubes.current) return;
    
    tubes.current.forEach(tube => {
      animateTube(tube);
    });
  }, [tubes, animateTube]);
  
  return { updateAnimation };
} 