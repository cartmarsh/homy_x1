import React, { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface RetroCanvasProps {
  children: ReactNode;
  height?: string;
  className?: string;
}

/**
 * A configured Canvas component for retro Three.js elements
 */
const RetroCanvas: React.FC<RetroCanvasProps> = ({ 
  children, 
  height = '2.5rem',
  className = ''
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`} 
      style={{ height }}
    >
      <Canvas
        orthographic
        camera={{
          zoom: 100,
          position: [0, 0, 1],
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]} // Optimize performance by limiting pixel ratio
      >
        {children}
      </Canvas>
    </div>
  );
};

export default RetroCanvas; 