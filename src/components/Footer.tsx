'use client';

import React, { useRef, Suspense, useState, useEffect } from 'react';
import type p5 from 'p5';
import ContentSection from './layout/ContentSection';

// Import p5 dynamically using React.lazy
const Sketch = React.lazy(() => import('react-p5'));

interface FooterProps {
  className?: string;
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({
  className,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  let time = 0;

  // Update dimensions on resize and visibility change
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        const newHeight = containerRef.current.offsetHeight;
        setDimensions({
          width: newWidth,
          height: newHeight,
        });
      }
    };

    const handleResize = () => {
      // Clear the previous timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      // Set a new timeout to update dimensions after resize ends
      resizeTimeoutRef.current = setTimeout(() => {
        updateDimensions();
      }, 100);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateDimensions();
      }
    };

    // Initial update
    updateDimensions();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, []);

  const setup = (p5: p5, canvasParentRef: Element) => {
    if (!containerRef.current) return;
    p5InstanceRef.current = p5;
    const canvas = p5.createCanvas(dimensions.width || containerRef.current.offsetWidth, dimensions.height || containerRef.current.offsetHeight);
    canvas.parent(canvasParentRef);
  };

  const draw = (p5: p5) => {
    p5.clear(0, 0, 0, 0);
    time += 0.005; // Slower animation speed

    // Check if canvas needs resizing and parent dimensions have changed
    if (containerRef.current && (p5.width !== dimensions.width || p5.height !== dimensions.height)) {
      const newWidth = dimensions.width || containerRef.current.offsetWidth;
      const newHeight = dimensions.height || containerRef.current.offsetHeight;
      
      if (newWidth > 0 && newHeight > 0) {
        p5.resizeCanvas(newWidth, newHeight, true);
      }
    }

    // Draw animated gradient background
    drawGradientBackground(p5);
    
    // Draw animated blobs
    drawAnimatedBlobs(p5);
  };

  const drawGradientBackground = (p5: p5) => {
    const colors = [
      p5.color(219, 234, 254, 50), // blue-300
      p5.color(216, 180, 254, 50), // purple-300
      p5.color(249, 168, 212, 50), // pink-300
    ];

    for (let y = 0; y < p5.height; y++) {
      const inter1 = p5.map(y, 0, p5.height, 0, 1);
      const inter2 = p5.map(p5.sin(time + y * 0.01), -1, 1, 0, 1);
      
      const c1 = p5.lerpColor(colors[0], colors[1], inter1);
      const c2 = p5.lerpColor(colors[1], colors[2], inter2);
      const finalColor = p5.lerpColor(c1, c2, p5.sin(time));
      
      p5.stroke(finalColor);
      p5.line(0, y, p5.width, y);
    }
  };

  const drawAnimatedBlobs = (p5: p5) => {
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    const size = Math.min(p5.width, p5.height) * 0.8;

    // Draw multiple blobs with different phases
    drawBlob(p5, centerX, centerY, size, time, p5.color(167, 139, 250, 40)); // violet
    drawBlob(p5, centerX, centerY, size * 0.9, time + 1, p5.color(251, 113, 133, 40)); // rose
    drawBlob(p5, centerX, centerY, size * 0.8, time + 2, p5.color(147, 197, 253, 40)); // blue
  };

  const drawBlob = (p5: p5, x: number, y: number, size: number, phase: number, color: p5.Color) => {
    p5.push();
    p5.translate(x, y);
    p5.noStroke();
    p5.fill(color);
    
    p5.beginShape();
    for (let angle = 0; angle < p5.TWO_PI; angle += 0.1) {
      const xoff = p5.map(p5.cos(angle), -1, 1, 0, 3);
      const yoff = p5.map(p5.sin(angle), -1, 1, 0, 3);
      const r = size * 0.3 * (1 + p5.noise(xoff + phase, yoff + phase) * 0.5);
      const blobX = r * p5.cos(angle);
      const blobY = r * p5.sin(angle);
      p5.curveVertex(blobX, blobY);
    }
    p5.endShape(p5.CLOSE);
    p5.pop();
  };

  return (
    <ContentSection 
      className={`relative min-h-[150px] overflow-hidden ${className}`}
    >
      {/* P5.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-0">
        <Suspense fallback={<div>Loading...</div>}>
          <Sketch 
            setup={setup}
            draw={draw}
            preload={() => {}}
          />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col min-h-[150px]">
          {children}
          
          {/* Footer Links - Positioned bottom right */}
          <div className="mt-auto ml-auto text-right pb-3 pr-3">
            <p className="text-xs mb-1 text-neutral-700 font-medium">
              © {new Date().getFullYear()} Dominik. All rights reserved.
            </p>
            <div className="flex justify-end space-x-3 text-neutral-700">
              <a
                href="/privacy-policy"
                className="text-xs hover:text-neutral-900 transition duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-xs">|</span>
              <a
                href="/terms-of-service"
                className="text-xs hover:text-neutral-900 transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  );
};

export default Footer;

