import { useRef } from 'react';
import * as THREE from 'three';
import useImplodingWhirlwind from '../../hooks/useImplodingWhirlwind';
import { useParticles } from '../../hooks/useParticles';
import { useParticleAnimation } from '../../hooks/useParticleAnimation';

interface WhirlwindProps {
  duration: number;
  onImplodeComplete?: () => void;
}

function Whirlwind({ duration, onImplodeComplete }: WhirlwindProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { isImploding, implodeProgress, getAnimationParams } = useImplodingWhirlwind({
    duration,
    onImplodeComplete
  });
  
  const particles = useParticles();
  
  useParticleAnimation({
    particlesRef,
    particles,
    isImploding,
    implodeProgress,
    getAnimationParams,
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={new Float32Array(particles.flatMap((p) => p.position))}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.length}
          array={new Float32Array(particles.map((p) => p.size))}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        color="#ff9d00"
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default Whirlwind; 