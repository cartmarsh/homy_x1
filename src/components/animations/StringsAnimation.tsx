import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface StringsAnimationProps {
  className?: string;
}

interface String {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
}

const StringsAnimation: React.FC<StringsAnimationProps> = ({ className }) => {
  const strings: String[] = [];
  const numStrings = 50;
  const noiseScale = 0.002;
  const noiseSpeed = 0.003;
  
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    canvas.parent(canvasParentRef);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
    
    // Initialize strings from center to corners
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    
    for (let i = 0; i < numStrings; i++) {
      const angle = (i / numStrings) * p5.TWO_PI;
      const targetX = centerX + p5.cos(angle) * p5.width;
      const targetY = centerY + p5.sin(angle) * p5.height;
      
      strings.push({
        x: centerX,
        y: centerY,
        targetX,
        targetY,
        noiseOffsetX: p5.random(1000),
        noiseOffsetY: p5.random(1000)
      });
    }
  };

  const draw = (p5: p5Types) => {
    p5.clear();
    p5.stroke(255, 255, 255, 30); // White with low opacity
    p5.strokeWeight(1);
    
    strings.forEach((string) => {
      string.noiseOffsetX += noiseSpeed;
      string.noiseOffsetY += noiseSpeed;
      
      const noiseX = p5.noise(string.noiseOffsetX) * 100 - 50;
      const noiseY = p5.noise(string.noiseOffsetY) * 100 - 50;
      
      p5.beginShape();
      for (let t = 0; t <= 1; t += 0.1) {
        const x = p5.lerp(string.x, string.targetX, t);
        const y = p5.lerp(string.y, string.targetY, t);
        
        const windX = noiseX * p5.sin(t * p5.PI);
        const windY = noiseY * p5.sin(t * p5.PI);
        
        p5.curveVertex(x + windX, y + windY);
      }
      p5.endShape();
    });
  };

  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    
    strings.forEach((string, i) => {
      const angle = (i / numStrings) * p5.TWO_PI;
      string.x = centerX;
      string.y = centerY;
      string.targetX = centerX + p5.cos(angle) * p5.width;
      string.targetY = centerY + p5.sin(angle) * p5.height;
    });
  };

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Sketch 
        setup={setup}
        draw={draw}
        windowResized={windowResized}
      />
    </div>
  );
};

export default StringsAnimation; 