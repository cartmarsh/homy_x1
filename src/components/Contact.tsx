import React, { useRef, Suspense, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type p5 from 'p5';
import ContentSection from './layout/ContentSection';
import { setupCanvas, prepareDrawing, drawMultipleBorders } from '../utils/p5Setup';

// Import p5 dynamically using React.lazy
const Sketch = React.lazy(() => import('react-p5'));

interface ContactProps {
    className?: string;
    id?: string;
}

const Contact: React.FC<ContactProps> = ({ className, id }) => {
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
        setupCanvas(p5, canvas, canvasParentRef);
    };

    const draw = (p5: p5) => {
        prepareDrawing(p5);
        time += 0.02;

        // Check if canvas needs resizing and parent dimensions have changed
        if (containerRef.current && (p5.width !== dimensions.width || p5.height !== dimensions.height)) {
            const newWidth = dimensions.width || containerRef.current.offsetWidth;
            const newHeight = dimensions.height || containerRef.current.offsetHeight;
            
            if (newWidth > 0 && newHeight > 0) {
                p5.resizeCanvas(newWidth, newHeight, true);
                p5.pixelDensity(window.devicePixelRatio);
            }
        }

        drawMultipleBorders(p5, time);
        p5.pop();
    };

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className} relative`}
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
                <div className="w-full h-full min-h-[80vh] flex flex-col justify-center items-center relative z-10">
                    {/* Content Wrapper */}
                    <div className="w-full max-w-4xl mx-auto text-center bg-white/[0.67] backdrop-blur-[0.25rem] p-8 rounded-xl">
                        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black/90 mb-8 font-primary">Contact Me</h2>

                        {/* Social Icons */}
                        <div className="flex justify-center space-x-12 mb-8">
                            <a 
                                href="https://www.linkedin.com/in/dominik-hauger-148315205/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-black/80 hover:text-black transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faLinkedin} size="3x" />
                            </a>
                            <a 
                                href="https://github.com/cartmarsh" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-black/80 hover:text-black transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faGithub} size="3x" />
                            </a>
                            <a 
                                href="mailto:domi.hauger@gmail.com" 
                                className="text-black/80 hover:text-black transition-colors duration-300"
                            >
                                <FontAwesomeIcon icon={faEnvelope} size="3x" />
                            </a>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-12">
                            <p className="text-2xl sm:text-3xl text-black/90 mb-4 font-secondary leading-relaxed">
                                Feel free to reach out for collaborations or just a friendly hello
                            </p>
                            <p className="text-xl sm:text-2xl text-black/80 font-secondary">
                                Email: domi.hauger@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Footer Content */}
                    <div className="absolute bottom-0 right-0 p-4 text-right">
                        <p className="text-sm mb-1 text-black/70 font-medium font-secondary">
                            © {new Date().getFullYear()} Dominik. All rights reserved.
                        </p>
                        <div className="flex justify-end space-x-3 text-black/70">
                            <a
                                href="/privacy-policy"
                                className="text-sm hover:text-black transition duration-300 font-secondary"
                            >
                                Privacy Policy
                            </a>
                            <span className="text-sm font-secondary">|</span>
                            <a
                                href="/terms-of-service"
                                className="text-sm hover:text-black transition duration-300 font-secondary"
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

