import { useMemo } from 'react';

interface Particle {
  position: [number, number, number];
  size: number;
  initialAngle: number;
  initialRadius: number;
  initialHeight: number;
  speed: number;
}

export interface ParticleConfig {
  count: number;
  radiusRange: [number, number];
  sizeRange: [number, number];
  speedRange: [number, number];
  edgeParticleRatio: number; // Ratio of particles to place on edges (0-1)
}

const defaultConfig: ParticleConfig = {
  count: 800,
  radiusRange: [1, 3], // min: 1, max: 3
  sizeRange: [0.01, 0.06], // min: 0.01, max: 0.06
  speedRange: [0.02, 0.07], // min: 0.02, max: 0.07
  edgeParticleRatio: 0.5, // 20% of particles will be on edges
};

export function useParticles(config: Partial<ParticleConfig> = {}): Particle[] {
  const finalConfig = { ...defaultConfig, ...config };

  return useMemo(() => {
    const temp: Particle[] = [];
    const edgeParticleCount = Math.floor(finalConfig.count * finalConfig.edgeParticleRatio);
    const centerParticleCount = finalConfig.count - edgeParticleCount;

    // Create center particles (whirlwind)
    for (let i = 0; i < centerParticleCount; i++) {
      const radius = Math.random() * 
        (finalConfig.radiusRange[1] - finalConfig.radiusRange[0]) + 
        finalConfig.radiusRange[0];
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 2;
      
      temp.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        size: Math.random() * 
          (finalConfig.sizeRange[1] - finalConfig.sizeRange[0]) + 
          finalConfig.sizeRange[0],
        initialAngle: angle,
        initialRadius: radius,
        initialHeight: height,
        speed: Math.random() * 
          (finalConfig.speedRange[1] - finalConfig.speedRange[0]) + 
          finalConfig.speedRange[0]
      });
    }

    // Create edge particles
    for (let i = 0; i < edgeParticleCount; i++) {
      const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      const maxRadius = finalConfig.radiusRange[1];
      let x: number, y: number, z: number;
      const angle = Math.random() * Math.PI * 2;

      switch (edge) {
        case 0: // top
          x = (Math.random() * 2 - 1) * maxRadius;
          y = maxRadius;
          z = (Math.random() * 2 - 1) * maxRadius;
          break;
        case 1: // right
          x = maxRadius;
          y = (Math.random() * 2 - 1) * maxRadius;
          z = (Math.random() * 2 - 1) * maxRadius;
          break;
        case 2: // bottom
          x = (Math.random() * 2 - 1) * maxRadius;
          y = -maxRadius;
          z = (Math.random() * 2 - 1) * maxRadius;
          break;
        default: // left
          x = -maxRadius;
          y = (Math.random() * 2 - 1) * maxRadius;
          z = (Math.random() * 2 - 1) * maxRadius;
          break;
      }

      temp.push({
        position: [x, y, z],
        size: Math.random() * 
          (finalConfig.sizeRange[1] - finalConfig.sizeRange[0]) + 
          finalConfig.sizeRange[0],
        initialAngle: angle,
        initialRadius: Math.sqrt(x * x + z * z),
        initialHeight: y,
        speed: Math.random() * 
          (finalConfig.speedRange[1] - finalConfig.speedRange[0]) + 
          finalConfig.speedRange[0]
      });
    }

    return temp;
  }, [
    finalConfig.count,
    finalConfig.radiusRange[0],
    finalConfig.radiusRange[1],
    finalConfig.sizeRange[0],
    finalConfig.sizeRange[1],
    finalConfig.speedRange[0],
    finalConfig.speedRange[1],
    finalConfig.edgeParticleRatio
  ]);
}

export type { Particle }; 