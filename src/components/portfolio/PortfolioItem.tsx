import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  tags?: string[];
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  title,
  description,
  image,
  link,
  tags = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!p5ContainerRef.current) return;

    // Initialize P5 sketch
    const sketch = (p: p5) => {
      const notes: Note[] = [];
      const noteCount = 12;
      
      interface Note {
        x: number;
        y: number;
        size: number;
        angle: number;
        speed: number;
        opacity: number;
        isQuarterNote: boolean;
      }

      p.setup = () => {
        const container = containerRef.current;
        if (!container) return;
        
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        
        p.createCanvas(width, height);
        p.noFill();
        
        // Initialize notes
        for (let i = 0; i < noteCount; i++) {
          const side = Math.floor(p.random(4)); // 0: top, 1: right, 2: bottom, 3: left
          let x, y;
          
          // Position notes along the border
          switch (side) {
            case 0: // top
              x = p.random(width);
              y = 0;
              break;
            case 1: // right
              x = width;
              y = p.random(height);
              break;
            case 2: // bottom
              x = p.random(width);
              y = height;
              break;
            case 3: // left
              x = 0;
              y = p.random(height);
              break;
            default:
              x = p.random(width);
              y = p.random(height);
          }
          
          notes.push({
            x,
            y,
            size: p.random(10, 20),
            angle: p.random(p.TWO_PI),
            speed: p.random(0.5, 1.5),
            opacity: p.random(50, 200),
            isQuarterNote: p.random() > 0.5,
          });
        }
      };

      p.draw = () => {
        p.clear(0, 0, 0, 0);
        
        // Draw border glow
        p.stroke(255, 240, 100, 50);
        p.strokeWeight(2);
        const container = containerRef.current;
        if (container) {
          const padding = 10;
          p.rect(padding, padding, container.offsetWidth - padding * 2, container.offsetHeight - padding * 2, 8);
        }
        
        // Draw and update notes
        for (const note of notes) {
          p.push();
          p.translate(note.x, note.y);
          p.rotate(note.angle);
          p.stroke(0, 0, 0, note.opacity);
          p.strokeWeight(1.5);
          
          if (note.isQuarterNote) {
            // Draw quarter note
            p.fill(0, 0, 0, note.opacity);
            p.ellipse(0, 0, note.size, note.size * 0.8);
            p.line(note.size / 2, 0, note.size / 2, -note.size * 1.8);
          } else {
            // Draw eighth note
            p.fill(0, 0, 0, note.opacity);
            p.ellipse(0, 0, note.size, note.size * 0.8);
            p.line(note.size / 2, 0, note.size / 2, -note.size * 1.8);
            p.beginShape();
            p.vertex(note.size / 2, -note.size * 1.8);
            p.bezierVertex(
              note.size * 1.2, -note.size * 1.8,
              note.size * 1.2, -note.size * 1.2,
              note.size / 2, -note.size * 1.2
            );
            p.endShape();
          }
          p.pop();
          
          // Move notes
          note.x += p.cos(note.angle) * note.speed;
          note.y += p.sin(note.angle) * note.speed;
          note.opacity -= 0.5;
          
          // Reset notes that fade out or move out of bounds
          if (note.opacity <= 0 || 
              note.x < -note.size * 2 || 
              note.x > p.width + note.size * 2 || 
              note.y < -note.size * 2 || 
              note.y > p.height + note.size * 2) {
            const side = Math.floor(p.random(4));
            
            switch (side) {
              case 0: // top
                note.x = p.random(p.width);
                note.y = 0;
                break;
              case 1: // right
                note.x = p.width;
                note.y = p.random(p.height);
                break;
              case 2: // bottom
                note.x = p.random(p.width);
                note.y = p.height;
                break;
              case 3: // left
                note.x = 0;
                note.y = p.random(p.height);
                break;
            }
            
            note.angle = p.random(p.TWO_PI);
            note.speed = p.random(0.5, 1.5);
            note.opacity = p.random(50, 200);
            note.isQuarterNote = p.random() > 0.5;
          }
        }
      };

      p.windowResized = () => {
        const container = containerRef.current;
        if (container) {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight);
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

  return (
    <div 
      ref={containerRef}
      className="relative bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-[17.5rem] sm:w-[20rem] md:w-[21.875rem]"
    >
      <div 
        ref={p5ContainerRef} 
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10 p-3">
        <div className="relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-24 sm:h-28 md:h-32 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-[0.625rem] bg-blue-500/80 text-white px-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block text-xs text-blue-600 hover:text-blue-800 transition-colors"
            >
              View Project →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem; 