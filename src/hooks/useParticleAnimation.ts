import { useFrame } from '@react-three/fiber';
import { RefObject, useRef } from 'react';
import * as THREE from 'three';
import type { Particle } from './useParticles';

interface AnimationConfig {
  particlesRef: RefObject<THREE.Points>;
  particles: Particle[];
  isImploding: boolean;
  implodeProgress: number;
  getAnimationParams: (
    initialRadius: number,
    initialAngle: number,
    initialHeight: number,
    speed: number
  ) => { radius: number; height: number; speed: number };
}

// Helper function to interpolate between colors
function lerpColor(color1: THREE.Color, color2: THREE.Color, factor: number): THREE.Color {
  const result = new THREE.Color();
  result.r = color1.r + (color2.r - color1.r) * factor;
  result.g = color1.g + (color2.g - color1.g) * factor;
  result.b = color1.b + (color2.b - color1.b) * factor;
  return result;
}

export function useParticleAnimation({
  particlesRef,
  particles,
  isImploding,
  implodeProgress,
  getAnimationParams,
}: AnimationConfig) {
  // Create color references
  const startColor = useRef(new THREE.Color('#ff9d00')); // Orange
  const endColor = useRef(new THREE.Color('#ff4400')); // Warmer orange-red

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;
    
    // Calculate smooth color transition based on time
    const colorProgress = (Math.sin(state.clock.elapsedTime * 0.5) + 1) * 0.5;
    const currentColor = lerpColor(startColor.current, endColor.current, colorProgress);
    
    // Update material color
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.color = currentColor;
    }

    let i = 0;
    particles.forEach((particle: Particle, idx: number) => {
      const { radius, height, speed } = getAnimationParams(
        particle.initialRadius,
        particle.initialAngle,
        particle.initialHeight,
        particle.speed
      );
      
      // Rotate particles around y-axis with accelerating implosion speed
      const baseSpeed = speed * 2;
      const implodingSpeedMultiplier = isImploding ? Math.pow(implodeProgress, 2) * 2 : 1; // Exponential acceleration
      const angle = particle.initialAngle + state.clock.elapsedTime * baseSpeed * implodingSpeedMultiplier;
      
      // Calculate new position with implosion effect
      const currentRadius = radius + (isImploding ? 0 : Math.sin(state.clock.elapsedTime + idx) * 0.1);
      positions[i] = Math.cos(angle) * currentRadius;
      positions[i+1] = height + (isImploding ? 0 : Math.sin(state.clock.elapsedTime * 0.5 + idx) * 0.1);
      positions[i+2] = Math.sin(angle) * currentRadius;
      
      // Enhanced size pulsing and implosion effect
      const pulseFrequency = 1.5;
      const pulseAmplitude = 0.15;
      const basePulse = Math.sin(state.clock.elapsedTime * pulseFrequency + idx * 0.1) * pulseAmplitude + 1;
      
      // During implosion, particles get much smaller
      const implodingSizeMultiplier = isImploding ? Math.pow(1 - implodeProgress, 2) : 1;
      const finalSize = particle.size * implodingSizeMultiplier * basePulse;
      
      sizes[idx] = finalSize;
      
      i += 3;
    });
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;
    
    // Rotate faster during implosion
    const rotationSpeed = isImploding ? 0.05 + implodeProgress * 0.2 : 0.05;
    particlesRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
  });
} 