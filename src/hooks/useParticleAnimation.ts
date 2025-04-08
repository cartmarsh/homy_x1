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
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    // Update time reference
    timeRef.current += delta;
    
    const time = timeRef.current;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = particlesRef.current.geometry.attributes.size.array as Float32Array;
    
    // Calculate smooth color transition based on time
    const colorProgress = (Math.sin(time * 0.5) + 1) * 0.5;
    const currentColor = lerpColor(startColor.current, endColor.current, colorProgress);
    
    // Update material color
    if (particlesRef.current.material instanceof THREE.PointsMaterial) {
      particlesRef.current.material.color = currentColor;
      
      // Increase point size during implosion for better visibility
      if (isImploding) {
        particlesRef.current.material.size = 0.04 * (1 + implodeProgress * 0.5);
      }
    }

    let i = 0;
    particles.forEach((particle: Particle, idx: number) => {
      const { radius, height, speed } = getAnimationParams(
        particle.initialRadius,
        particle.initialAngle,
        particle.initialHeight,
        particle.speed
      );
      
      // Rotate particles around y-axis with variable speed
      const baseSpeed = speed;
      const angle = particle.initialAngle + time * baseSpeed;
      
      // Add vertical movement that slows down during implosion
      const verticalOscillation = isImploding 
        ? Math.sin(time * 0.3 + idx) * 0.1 * (1 - implodeProgress)
        : Math.sin(time * 0.3 + idx) * 0.1;
        
      // Add radial oscillation that diminishes during implosion
      const radialOscillation = isImploding
        ? Math.sin(time * 0.5 + idx * 0.3) * 0.1 * (1 - implodeProgress)
        : Math.sin(time * 0.5 + idx * 0.3) * 0.1;
      
      // Calculate new position with implosion effect
      const currentRadius = radius + radialOscillation;
      positions[i] = Math.cos(angle) * currentRadius;
      positions[i+1] = height + verticalOscillation;
      positions[i+2] = Math.sin(angle) * currentRadius;
      
      // Enhanced size pulsing that converges during implosion
      const pulseFrequency = 1.5;
      const pulseAmplitude = isImploding 
        ? 0.15 * (1 - implodeProgress * 0.8) // Reduce pulsing during implosion
        : 0.15;
        
      const basePulse = Math.sin(time * pulseFrequency + idx * 0.1) * pulseAmplitude + 1;
      
      // During implosion, particles get smaller toward the center
      const implodingSizeMultiplier = isImploding 
        ? Math.pow(1 - implodeProgress, 1.5) // Less aggressive size reduction
        : 1;
        
      const finalSize = particle.size * implodingSizeMultiplier * basePulse;
      
      sizes[idx] = finalSize;
      
      i += 3;
    });
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.size.needsUpdate = true;
    
    // Rotate faster during implosion with eased acceleration
    const baseRotationSpeed = 0.05;
    const rotationSpeedMultiplier = isImploding 
      ? 1 + implodeProgress * implodeProgress * 2 // Quadratic acceleration
      : 1;
      
    particlesRef.current.rotation.y = time * baseRotationSpeed * rotationSpeedMultiplier;
  });
} 