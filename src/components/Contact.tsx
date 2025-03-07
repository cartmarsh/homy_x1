import React, { useRef, Suspense, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type p5 from 'p5';
import ContentSection from './layout/ContentSection';

// Import p5 dynamically using React.lazy
const Sketch = React.lazy(() => import('react-p5'));

interface ContactProps {
    className?: string;
    id?: string;
    isLastSection?: boolean;
}

const Contact: React.FC<ContactProps> = ({ className, id, isLastSection = false }) => {
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
        time += 0.02;

        // Check if canvas needs resizing and parent dimensions have changed
        if (containerRef.current && (p5.width !== dimensions.width || p5.height !== dimensions.height)) {
            const newWidth = dimensions.width || containerRef.current.offsetWidth;
            const newHeight = dimensions.height || containerRef.current.offsetHeight;
            
            if (newWidth > 0 && newHeight > 0) {
                p5.resizeCanvas(newWidth, newHeight, true);
            }
        }

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

    const drawAnimatedBorder = (p5: p5, time: number, scale: number) => {
        const padding = 20 * scale;
        const numPoints = 50;
        
        p5.beginShape();
        
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            let x, y;
            
            if (t < 0.25) {
                // Top edge
                x = p5.lerp(padding, p5.width - padding, t * 4);
                y = padding + Math.sin(time + t * 10) * 5;
            } else if (t < 0.5) {
                // Right edge
                x = p5.width - padding + Math.sin(time + t * 10) * 5;
                y = p5.lerp(padding, p5.height - padding, (t - 0.25) * 4);
            } else if (t < 0.75) {
                // Bottom edge
                x = p5.lerp(p5.width - padding, padding, (t - 0.5) * 4);
                y = p5.height - padding + Math.sin(time + t * 10) * 5;
            } else {
                // Left edge
                x = padding + Math.sin(time + t * 10) * 5;
                y = p5.lerp(p5.height - padding, padding, (t - 0.75) * 4);
            }
            
            // Add extra vertices at corners for smoother curves
            if (i === 0 || i === numPoints) {
                p5.curveVertex(x, y);
            }
            p5.curveVertex(x, y);
        }
        
        p5.endShape(); // Remove CLOSE parameter to keep the border open
    };

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className} relative`}
            isLastSection={isLastSection}
        >
            <div ref={containerRef} className="relative w-full h-full">
                {/* P5.js Canvas Container */}
                <div className="absolute inset-0 pointer-events-none">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Sketch 
                            setup={setup}
                            draw={draw}
                            preload={() => {}}
                        />
                    </Suspense>
                </div>

                {/* Content Container */}
                <div className="w-full h-full flex flex-col justify-center items-center relative z-10">
                    {/* Content Wrapper */}
                    <div className="w-full max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Contact Me</h2>

                        {/* Social Icons */}
                        <div className="flex justify-center space-x-12 mb-8">
                            <a 
                                href="https://www.linkedin.com/in/dominik-hauger-148315205/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faLinkedin} size="3x" />
                            </a>
                            <a 
                                href="https://github.com/cartmarsh" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faGithub} size="3x" />
                            </a>
                            <a 
                                href="mailto:domi.hauger@gmail.com" 
                                className="text-gray-800 hover:text-red-600 transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faEnvelope} size="3x" />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-12">
                            <p className="text-xl text-gray-800 mb-4">
                                Feel free to reach out for collaborations or just a friendly hello
                            </p>
                            <p className="text-gray-700">
                                Email: domi.hauger@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className="absolute bottom-0 right-0 p-4 text-right">
                        <p className="text-xs mb-1 text-gray-700 font-medium">
                            © {new Date().getFullYear()} Dominik. All rights reserved.
                        </p>
                        <div className="flex justify-end space-x-3 text-gray-700">
                            <a
                                href="/privacy-policy"
                                className="text-xs hover:text-gray-900 transition duration-300"
                            >
                                Privacy Policy
                            </a>
                            <span className="text-xs">|</span>
                            <a
                                href="/terms-of-service"
                                className="text-xs hover:text-gray-900 transition duration-300"
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

export default Contact;

