import { useRef, useEffect, RefObject } from 'react';
import p5 from 'p5';

interface UsePortfolioAnimationProps {
  containerRef: RefObject<HTMLDivElement>;
  shouldReinitialize?: boolean;
  color?: string;
  density?: number;
}

interface UsePortfolioAnimationResult {
  p5ContainerRef: RefObject<HTMLDivElement>;
}

// Animation parameters
const DEFAULT_COLOR = 'rgba(66, 153, 225, 0.2)'; // Light blue with transparency
const DEFAULT_PARTICLE_DENSITY = 5; // Number of particles

const usePortfolioAnimation = ({
  containerRef,
  shouldReinitialize = false,
  color = DEFAULT_COLOR,
  density = DEFAULT_PARTICLE_DENSITY
}: UsePortfolioAnimationProps): UsePortfolioAnimationResult => {
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  // Initialize and cleanup p5 sketch
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const createSketch = () => {
      // If already initialized and not forcing reinitialization, exit
      if (p5InstanceRef.current && !shouldReinitialize) return;
      
      // Clean up previous instance if it exists
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      
      // Only initialize if both container and p5 container refs exist
      if (!containerRef.current || !p5ContainerRef.current) return;
      
      // Create new p5 sketch
      const sketch = (p: p5) => {
        let particles: Particle[] = [];
        
        class Particle {
          x: number;
          y: number;
          size: number;
          speedX: number;
          speedY: number;
          opacity: number;
          
          constructor() {
            this.x = p.random(p.width);
            this.y = p.random(p.height);
            this.size = p.random(3, 8);
            this.speedX = p.random(-0.5, 0.5);
            this.speedY = p.random(-0.5, 0.5);
            this.opacity = p.random(0.1, 0.3);
          }
          
          move() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Loop around edges
            if (this.x > p.width) this.x = 0;
            if (this.x < 0) this.x = p.width;
            if (this.y > p.height) this.y = 0;
            if (this.y < 0) this.y = p.height;
          }
          
          display() {
            p.noStroke();
            const particleColor = p.color(color);
            particleColor.setAlpha(this.opacity * 255);
            p.fill(particleColor);
            p.circle(this.x, this.y, this.size);
          }
        }
        
        p.setup = () => {
          const rect = p5ContainerRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          p.createCanvas(rect.width, rect.height);
          
          // Create initial particles
          for (let i = 0; i < density; i++) {
            particles.push(new Particle());
          }
        };
        
        p.draw = () => {
          // Fix for p.clear() error - use background with alpha instead
          p.background(255, 255, 255, 0);
          
          // Update and display particles
          for (let particle of particles) {
            particle.move();
            particle.display();
          }
        };
        
        p.windowResized = () => {
          const rect = p5ContainerRef.current?.getBoundingClientRect();
          if (!rect) return;
          
          p.resizeCanvas(rect.width, rect.height);
        };
      };
      
      // Start the sketch with a slight delay to ensure container is ready
      timeoutId = setTimeout(() => {
        if (p5ContainerRef.current) {
          p5InstanceRef.current = new p5(sketch, p5ContainerRef.current);
        }
      }, 100);
    };
    
    createSketch();
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [containerRef, shouldReinitialize, color, density]);
  
  return { p5ContainerRef };
};

export default usePortfolioAnimation; 