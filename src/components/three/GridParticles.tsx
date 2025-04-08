import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * Configuration options for grid particles
 */
interface GridParticlesConfig {
  count?: number;
  colors?: number[];
  shapes?: string[];
  speedRange?: [number, number];
  sizeRange?: [number, number];
}

/**
 * Renders animated particles over the retro grid
 */
const GridParticles: React.FC<GridParticlesConfig> = ({
  count = 15,
  colors = [0xFF5E5B, 0xD8D8F6, 0x39CCCC, 0xFFDC00, 0x01FF70],
  shapes = ['square', 'circle', 'triangle'],
  speedRange = [0.005, 0.015],
  sizeRange = [0.03, 0.1]
}) => {
  const pointsRef = useRef<THREE.Group>(null);
  
  // Create particles with memoization
  const particles = useMemo(() => {
    const temp = [];
    
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          Math.random() * 6 - 3,  // x: -3 to 3
          Math.random() * 0.5,    // y: 0 to 0.5
          0.1                     // z: slightly in front of the grid
        ],
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        speed: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0]
      });
    }
    return temp;
  }, [count, colors, shapes, speedRange, sizeRange]);
  
  // Generate geometry for different shapes
  const shapeGeometries = useMemo(() => {
    // Circle shape
    const circleShape = new THREE.CircleGeometry(1, 16);
    
    // Square shape
    const squareShape = new THREE.PlaneGeometry(1, 1);
    
    // Triangle shape
    const triangleShape = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 1, 0,   // top
      -1, -1, 0, // bottom left
      1, -1, 0   // bottom right
    ]);
    triangleShape.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    return { circleShape, squareShape, triangleShape };
  }, []);
  
  // Handle animation with useFrame
  useFrame(() => {
    if (!pointsRef.current) return;
    
    const meshes = pointsRef.current.children;
    
    meshes.forEach((child, i) => {
      if (child instanceof THREE.Mesh && i < particles.length) {
        // Move particles downward
        child.position.y -= particles[i].speed;
        
        // Reset particles when they go off-screen
        if (child.position.y < -0.5) {
          child.position.y = 0.5;
          child.position.x = Math.random() * 6 - 3;
        }
      }
    });
  });
  
  return (
    <group ref={pointsRef}>
      {particles.map((particle, i) => {
        const color = new THREE.Color(particle.color);
        
        let geometry;
        switch (particle.shape) {
          case 'circle':
            geometry = shapeGeometries.circleShape;
            break;
          case 'triangle':
            geometry = shapeGeometries.triangleShape;
            break;
          default:
            geometry = shapeGeometries.squareShape;
        }
        
        return (
          <mesh 
            key={i}
            position={particle.position as [number, number, number]}
            scale={[particle.size, particle.size, 1]}
          >
            <primitive object={geometry} attach="geometry" />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

export default React.memo(GridParticles); 