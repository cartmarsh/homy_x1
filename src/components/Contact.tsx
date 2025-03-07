import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import ContentSection from './layout/ContentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type p5Types from 'p5';

// Import p5 dynamically to avoid SSR issues
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
});

interface ContactProps {
    className?: string;
    id?: string;
}

const Contact: React.FC<ContactProps> = ({ className, id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    let time = 0;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        if (!containerRef.current) return;
        const canvas = p5.createCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        canvas.parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.clear(0, 0, 0, 0);
        time += 0.02;

        // Draw animated borders
        p5.push();
        p5.noFill();
        
        // Draw outer border in deeper purple
        p5.strokeWeight(2);
        p5.stroke(126, 34, 206, 100); // Main border
        drawAnimatedBorder(p5, time, 0.8); // Larger outer border
        
        // Draw middle border with different timing and more transparency
        p5.strokeWeight(1.5);
        p5.stroke(126, 34, 206, 60); // More transparent purple
        drawAnimatedBorder(p5, time * 1.5, 0.5); // Much smaller middle border
        
        // Draw inner border with different timing and most transparency
        p5.strokeWeight(1);
        p5.stroke(126, 34, 206, 30); // Most transparent purple
        drawAnimatedBorder(p5, time * 0.8, 0.25); // Tiny inner border
        
        p5.pop();
    };

    const drawAnimatedBorder = (p5: p5Types, time: number, scale: number) => {
        const padding = 40 * scale; // Increased base padding to make differences more noticeable
        const numPoints = 50;
        const amplitude = 6 * scale; // Slightly increased base amplitude
        
        p5.beginShape();
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            let x, y;
            
            if (t < 0.25) {
                // Top edge
                x = p5.lerp(padding, p5.width - padding, t * 4);
                y = padding + Math.sin(time + t * 10) * amplitude;
            } else if (t < 0.5) {
                // Right edge
                x = p5.width - padding + Math.sin(time + t * 10) * amplitude;
                y = p5.lerp(padding, p5.height - padding, (t - 0.25) * 4);
            } else if (t < 0.75) {
                // Bottom edge
                x = p5.lerp(p5.width - padding, padding, (t - 0.5) * 4);
                y = p5.height - padding + Math.sin(time + t * 10) * amplitude;
            } else {
                // Left edge
                x = padding + Math.sin(time + t * 10) * amplitude;
                y = p5.lerp(p5.height - padding, padding, (t - 0.75) * 4);
            }
            
            p5.curveVertex(x, y);
            
            // Add extra vertices at corners for smoother curves
            if (i === 0 || i === numPoints) {
                p5.curveVertex(x, y);
            }
        }
        p5.endShape();
    };

    const windowResized = (p5: p5Types) => {
        if (!containerRef.current) return;
        p5.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };

    return (
        <ContentSection id={id} bgColor='bg-lemon' className={className}>
            <div ref={containerRef} className="relative w-full h-full">
                {/* P5.js Canvas Container */}
                <div className="absolute inset-0 pointer-events-none">
                    <Sketch 
                        setup={setup}
                        draw={draw}
                        windowResized={windowResized}
                        preload={() => {}}
                    />
                </div>

                <div className="w-full h-full flex flex-col justify-center items-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Contact Me</h2>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-8 mb-8">
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                        >
                            <FontAwesomeIcon icon={faLinkedin} size="3x" />
                        </a>
                        <a 
                            href="https://github.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
                        >
                            <FontAwesomeIcon icon={faGithub} size="3x" />
                        </a>
                        <a 
                            href="mailto:dominik@example.com" 
                            className="text-gray-800 hover:text-red-600 transition-colors duration-300"
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="3x" />
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center">
                        <p className="text-xl text-gray-700 mb-4">
                            Feel free to reach out for collaborations or just a friendly hello
                        </p>
                        <p className="text-gray-600">
                            Email: domi.hauger@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

export default Contact;

