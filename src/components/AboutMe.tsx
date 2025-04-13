import React, { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import ContentSection from './layout/ContentSection';
import profileImage from '../assets/hauger4.png';
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
                    className="w-full h-full flex flex-col lg:flex-row items-center justify-around px-4 lg:px-8 gap-6 lg:gap-12 relative z-10 mt-[4.5rem] lg:mt-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="space-y-4 lg:space-y-6 text-black/90 bg-white/[0.67] backdrop-blur-[2px] p-4 lg:p-8 rounded-xl border border-white/20 shadow-lg mx-2 lg:mx-0">
                            <p className={`text-base lg:text-xl ${styles['retro-text']}`}>
                                Born in <span className="text-black font-semibold">1993</span> in Munich, Dominik did a <span className="text-black font-semibold">gap year</span> in Australia and went to study {' '}
                                <span className="text-black font-semibold">Medical Informatics</span> at the Technical University Vienna (TU Vienna).
                            </p>
                            
                            <p className={`text-base lg:text-xl ${styles['retro-text']}`}>
                                During that time <span className="text-black font-semibold">Web Development</span> became an interest and {' '}
                                <span className="text-black font-semibold">User Experience</span> a passion.
                            </p>
                            
                            <p className={`text-base lg:text-xl ${styles['retro-text']}`}>
                                After working hours he loves <span className="text-black font-semibold">organizing music events</span> with his friends.
                            </p>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
                        <div className="aspect-square relative overflow-hidden bg-transparent w-[80vw] max-w-[20rem] lg:max-w-[35vh] mx-auto 
                                    shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] 
                                    transition-all duration-300 rounded-xl">
                            <img 
                                src={profileImage}
                                alt="Profile picture"
                                className="w-full h-full object-cover scale-[0.85] hover:scale-110 transition-all duration-300 rounded-xl"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </ContentSection>
    );
};

export default AboutMe;

