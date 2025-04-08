import React, { useRef } from 'react';
import * as THREE from 'three';

/**
 * Renders a retro grid effect with horizontal and vertical lines
 */
const RetroGrid: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);
  
  // Configuration
  const horizontalLines = 6;
  const verticalLines = 30;
  const gridOpacity = 0.3;
  const gridColor = 'white';
  
  return (
    <group ref={gridRef}>
      {/* Horizontal grid lines */}
      {Array.from({ length: horizontalLines }).map((_, i) => (
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[new Float32Array([-3, i * 0.1 - 0.25, 0, 3, i * 0.1 - 0.25, 0]), 3]} 
            />
          </bufferGeometry>
          <lineBasicMaterial color={gridColor} transparent opacity={gridOpacity} />
        </line>
      ))}
      
      {/* Vertical grid lines */}
      {Array.from({ length: verticalLines }).map((_, i) => (
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              args={[new Float32Array([i * 0.2 - 3, -0.25, 0, i * 0.2 - 3, 0.25, 0]), 3]} 
            />
          </bufferGeometry>
          <lineBasicMaterial color={gridColor} transparent opacity={gridOpacity} />
        </line>
      ))}
    </group>
  );
};

export default RetroGrid; 