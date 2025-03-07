import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

interface RetroHeaderProps {
  title: string;
}

const RetroHeader: React.FC<RetroHeaderProps> = ({ title }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Trigger random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Initialize p5 sketch
  useEffect(() => {
    if (!p5ContainerRef.current) return;

    const sketch = (p: p5) => {
      const gridSize = 20;
      const particles: Particle[] = [];
      const particleCount = 15; // Further reduced particle count

      interface Particle {
        x: number;
        y: number;
        size: number;
        speed: number;
        color: string;
        shape: 'square' | 'circle' | 'triangle';
      }

      p.setup = () => {
        const container = headerRef.current;
        if (!container) return;
        
        const width = container.offsetWidth;
        const height = 50; // Match the container height
        
        p.createCanvas(width, height);
        p.noStroke();
        
        // Create initial particles
        const colors = ['#FF5E5B', '#D8D8F6', '#39CCCC', '#FFDC00', '#01FF70'];
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: p.random(width),
            y: p.random(height),
            size: p.random(3, 10), // Even smaller particles
            speed: p.random(0.5, 1.5),
            color: colors[Math.floor(p.random(colors.length))],
            shape: shapes[Math.floor(p.random(shapes.length))] as 'square' | 'circle' | 'triangle'
          });
        }
      };

      p.draw = () => {
        p.clear(0, 0, 0, 0);
        
        // Draw grid
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(1);
        
        for (let x = 0; x < p.width; x += gridSize) {
          p.line(x, 0, x, p.height);
        }
        
        for (let y = 0; y < p.height; y += gridSize) {
          p.line(0, y, p.width, y);
        }
        
        // Draw and update particles
        p.noStroke();
        particles.forEach(particle => {
          p.fill(particle.color);
          
          switch (particle.shape) {
            case 'square':
              p.rect(particle.x, particle.y, particle.size, particle.size);
              break;
            case 'circle':
              p.ellipse(particle.x, particle.y, particle.size);
              break;
            case 'triangle':
              p.triangle(
                particle.x, particle.y - particle.size/2,
                particle.x - particle.size/2, particle.y + particle.size/2,
                particle.x + particle.size/2, particle.y + particle.size/2
              );
              break;
          }
          
          // Move particles
          particle.y += particle.speed;
          
          // Reset particles when they go off-screen
          if (particle.y > p.height) {
            particle.y = -particle.size;
            particle.x = p.random(p.width);
          }
        });
      };

      p.windowResized = () => {
        const container = headerRef.current;
        if (container) {
          p.resizeCanvas(container.offsetWidth, 50); // Match the container height
        }
      };
    };

    p5Instance.current = new p5(sketch, p5ContainerRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  // Generate random offsets for glitch effect
  const getGlitchStyle = () => {
    if (!glitchActive) return {};
    
    return {
      transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
      textShadow: `
        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(255,0,0,0.7),
        ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 rgba(0,255,255,0.7)
      `
    };
  };

  return (
    <div 
      ref={headerRef}
      className="w-full relative mb-1 cursor-pointer flex justify-center" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={p5ContainerRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-[40px] sm:h-[45px] md:h-[50px] w-auto">
        {/* Scanline effect - reduced number and spacing */}
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isHovered ? 'opacity-20' : 'opacity-10'}`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i} 
              className="h-[4px] w-full bg-black opacity-30"
              style={{ marginTop: `${i * 12}px` }}
            />
          ))}
        </div>
        
        {/* Title */}
        <h1 
          className="text-base sm:text-lg md:text-xl font-bold tracking-wider uppercase text-center text-gray-800"
          style={{
            fontFamily: "'Press Start 2P', 'VT323', monospace",
            WebkitTextStroke: "0.7px rgba(0,0,0,0.3)",
            ...getGlitchStyle()
          }}
        >
          {title}
        </h1>
        
        {/* Decorative line */}
        <div className="w-24 sm:w-28 md:w-32 h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mt-0"></div>
      </div>
    </div>
  );
};

export default RetroHeader; 