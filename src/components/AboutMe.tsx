import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import ContentSection from './layout/ContentSection';
import profileImage from '../assets/Hauger2.png';
import styles from './AboutMe.module.css';
import type p5Types from 'p5';
import { setupCanvas, prepareDrawing, drawMultipleBorders } from '../utils/p5Setup';

// Import p5 dynamically using React.lazy
const Sketch = React.lazy(() => import('react-p5'));

interface AboutMeProps {
    className?: string;
    id?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ className, id }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    let time = 0;

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        if (!containerRef.current) return;
        const canvas = p5.createCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        canvas.parent(canvasParentRef);
        setupCanvas(p5, canvas, canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        prepareDrawing(p5);
        time += 0.02;
        drawMultipleBorders(p5, time);
        p5.pop();
    };

    const windowResized = (p5: p5Types) => {
        if (!containerRef.current) return;
        p5.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        p5.pixelDensity(window.devicePixelRatio);
    };

    return (
        <ContentSection id={id} bgColor='bg-lemon' className={className}>
            <div ref={containerRef} className="relative w-full h-full">
                {/* P5.js Canvas Container */}
                <div className="absolute inset-0 pointer-events-none">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Sketch 
                            setup={setup}
                            draw={draw}
                            windowResized={windowResized}
                            preload={() => {}}
                        />
                    </Suspense>
                </div>
                
                <motion.div 
                    className="w-full h-full flex flex-col lg:flex-row items-center justify-around px-4 lg:px-8 gap-6 lg:gap-12 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="space-y-6 text-gray-600">
                            <p className={`text-lg sm:text-xl ${styles['retro-text']}`}>
                                Born in <span>1993</span> in Munich, Dominik did a <span>gap year</span> in Australia and went to study {' '}
                                <span>Medical Informatics</span> at the Technical University Vienna (TU Vienna).
                            </p>
                            
                            <p className={`text-lg sm:text-xl ${styles['retro-text']}`}>
                                During that time <span>Web Development</span> became an interest and {' '}
                                <span>User Experience</span> a passion.
                            </p>
                            
                            <p className={`text-lg sm:text-xl ${styles['retro-text']}`}>
                                After working hours he loves <span>organizing musical events</span> with his friends.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="aspect-square relative overflow-hidden bg-transparent max-w-[50vh] mx-auto 
                                    hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300">
                            <img 
                                src={profileImage}
                                alt="Profile picture"
                                className="w-full h-full object-cover scale-[0.85] hover:scale-110 transition-all duration-300"
                            />
           
                        </div>
                    </div>
                </motion.div>
            </div>
        </ContentSection>
    );
};

export default AboutMe;

