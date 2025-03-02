import React from 'react';
import p5Types from 'p5';
import dynamic from 'next/dynamic';

// Dynamically import p5 with no SSR to avoid window undefined errors
const P5 = dynamic(() => import('react-p5'), { ssr: false });

interface BackgroundStringsProps {
  className?: string;
}

interface String {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  originalColor: string; // Store the original color
  animationColor: string; // Color to transition to during animation
  thickness: number;
  // Animation properties
  hasAnimation: boolean;
  animationPosition: number; // 0 to 1 - position along the string
  animationSize: number; // Maximum size of the bulge
  animationSpeed: number; // Speed of animation movement
  animationDirection: 1 | -1; // Direction: 1 = outward, -1 = inward
}

export function BackgroundStrings({ className = '' }: BackgroundStringsProps) {
  const strings: String[] = [];
  const numStrings = 50;
  const colors = ['#b088ff', '#c4a9ff', '#9f7aea', '#a78bfa'];
  
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent(canvasParentRef);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1');
    canvas.style('pointer-events', 'none');
    
    // Initialize strings from center to corners
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    
    // Multiple animation color palettes for more variety
    const animationColorPalettes = [
      // Purple/violet palette (original)
      ['#d4b3ff', '#e6d9ff', '#c4adfc', '#c4b0fa'],
      // Red/orange palette
      ['#ff5e62', '#ff9966', '#ff7e5f', '#feb47b'],
      // Cyan/blue palette
      ['#48d1cc', '#00ffff', '#7fffd4', '#00bfff'],
      // Gold/yellow palette
      ['#ffd700', '#ffdf00', '#f5bc00', '#ffb90f']
    ];
    
    for (let i = 0; i < numStrings; i++) {
      const angle = (i / numStrings) * p5.TWO_PI;
      const targetX = centerX + p5.cos(angle) * p5.width;
      const targetY = centerY + p5.sin(angle) * p5.height;
      
      // Randomly decide if this string gets animation (about 30% chance)
      const hasAnimation = p5.random() < 0.3;
      
      // Pick colors
      const originalColor = colors[Math.floor(p5.random(colors.length))];
      
      // Select a random color palette, then a random color from that palette
      const selectedPalette = animationColorPalettes[Math.floor(p5.random(animationColorPalettes.length))];
      const animationColor = selectedPalette[Math.floor(p5.random(selectedPalette.length))];
      
      strings.push({
        x: centerX,
        y: centerY,
        targetX,
        targetY,
        color: originalColor,
        originalColor,
        animationColor,
        thickness: p5.random(0.5, 5), // Randomized thickness
        hasAnimation,
        animationPosition: 1.0, // Start at the edge of the string
        animationSize: p5.random(5, 15), // Random size of bulge
        animationSpeed: p5.random(0.0003, 0.0015), // Slower speed
        animationDirection: -1 // Start moving inward
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0); // Clear with RGBA values (transparent)
    
    // Draw strings
    strings.forEach((string) => {
      p5.stroke(string.color);
      p5.strokeWeight(string.thickness);
      p5.noFill();
      
      // Draw string path with possible animation
      if (string.hasAnimation) {
        drawAnimatedString(p5, string);
        
        // Update animation position based on direction
        string.animationPosition += string.animationSpeed * string.animationDirection;
        
        // Reverse direction at endpoints instead of jumping
        if (string.animationPosition <= 0.0) {
          string.animationPosition = 0.0;
          string.animationDirection = 1; // Change to outward/toward center
        } else if (string.animationPosition >= 1.0) {
          string.animationPosition = 1.0;
          string.animationDirection = -1; // Change to inward/toward center
        }
      } else {
        // Draw normal string
        p5.beginShape();
        for (let t = 0; t <= 1; t += 0.02) {
          const x = p5.lerp(string.x, string.targetX, t);
          const y = p5.lerp(string.y, string.targetY, t);
          p5.vertex(x, y);
        }
        p5.endShape();
      }
    });
  };

  // Helper function to draw strings with animation
  const drawAnimatedString = (p5: p5Types, string: String) => {
    const steps = 200; // Resolution of the string
    
    // Golden animation colors
    const goldColors = ['#ffd700', '#ffdf00', '#f5bc00', '#ffb90f', '#e6c200'];
    const animColor = goldColors[Math.floor(p5.random() * goldColors.length)];
    
    // 1. Draw the base string (slightly thinner than original to hide potential artifacts)
    p5.stroke(string.originalColor);
    p5.strokeWeight(string.thickness * 0.9);
    p5.beginShape();
    for (let t = 0; t <= 1; t += 0.01) {
      const x = p5.lerp(string.x, string.targetX, t);
      const y = p5.lerp(string.y, string.targetY, t);
      p5.vertex(x, y);
    }
    p5.endShape();
    
    // 2. Draw the animated overlay segments
    for (let i = 0; i < steps; i++) {
      const t1 = i / steps;
      const t2 = (i + 1) / steps;
      
      const x1 = p5.lerp(string.x, string.targetX, t1);
      const y1 = p5.lerp(string.y, string.targetY, t1);
      const x2 = p5.lerp(string.x, string.targetX, t2);
      const y2 = p5.lerp(string.y, string.targetY, t2);
      
      // Calculate midpoint of this segment
      const segmentMidPoint = (t1 + t2) / 2;
      
      // Calculate distance from animation position
      const distFromAnimation = Math.abs(segmentMidPoint - string.animationPosition);
      
      // Use Gaussian distribution for the bulge effect
      const sigma = 0.05; // Controls width of the Gaussian peak
      const gaussianFactor = p5.exp(-(distFromAnimation * distFromAnimation) / (2 * sigma * sigma));
      
      // Only draw segments that are affected by the animation (where gaussianFactor is significant)
      if (gaussianFactor > 0.05) {
        // Calculate transition factor based on animation position and direction
        // This creates a smooth transition from original color to gold and back
        const positionProgress = Math.abs(string.animationPosition - 0.5) * 2; // 0 at center, 1 at edge
        
        // Smooth color transition based on position
        const colorTransition = positionProgress * gaussianFactor;
        
        // Apply color interpolation between original color and gold
        const orig = p5.color(string.originalColor);
        const gold = p5.color(animColor);
        
        // Interpolate RGB values
        const r = p5.lerp(p5.red(orig), p5.red(gold), colorTransition);
        const g = p5.lerp(p5.green(orig), p5.green(gold), colorTransition);
        const b = p5.lerp(p5.blue(orig), p5.blue(gold), colorTransition);
        
        p5.stroke(r, g, b);
        
        // Set the stroke weight
        const newThickness = string.thickness + (string.animationSize * gaussianFactor);
        p5.strokeWeight(newThickness);
        
        // Draw this segment with slightly extended endpoints for better overlap
        const extendFactor = 0.001; // Small extension to ensure segments connect
        const x1Ext = p5.lerp(x1, x2, -extendFactor);
        const y1Ext = p5.lerp(y1, y2, -extendFactor);
        const x2Ext = p5.lerp(x1, x2, 1 + extendFactor);
        const y2Ext = p5.lerp(y1, y2, 1 + extendFactor);
        
        p5.line(x1Ext, y1Ext, x2Ext, y2Ext);
      }
    }
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return (
    <P5
      setup={setup}
      draw={draw}
      windowResized={windowResized}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

export default BackgroundStrings; 