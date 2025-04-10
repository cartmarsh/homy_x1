import React, { useRef, Suspense } from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/output.png';
import './Hero.css';
import useScrollSnapping from '../../hooks/useScrollSnapping';
import useDimensions from '../../hooks/useDimensions';
import useMouseTracking from '../../hooks/useMouseTracking';
import HeroContent from './HeroContent';
import ProfileImage from './ProfileImage';
import ThreeBackground from './ThreeBackground';
import HeroBackground from './HeroBackground';

// Pre-load Three.js early but don't block rendering
import('three');

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    // Use custom hooks
    const { dimensions, isClient } = useDimensions(divRef);
    const { handleMouseMove, getOffsets } = useMouseTracking(divRef);
    
    // Apply scroll snapping
    useScrollSnapping();
    
    // Get offsets for 3D effects
    const { offsetX, offsetY } = getOffsets();

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-transparent' 
            className={`${className} overflow-hidden min-h-screen`}
            padding="compact"
            backgroundElements={<HeroBackground />}
        >
            <div 
                ref={divRef}
                className="w-full h-full flex items-start sm:items-center justify-center relative overflow-hidden py-4 sm:py-0"
                onMouseMove={handleMouseMove}
                style={{ position: 'relative', minHeight: '100%' }}
            >
                {/* Three.js Canvas with higher z-index than the ContentSection background */}
                {isClient && dimensions.width > 0 && (
                    <div
                        className="absolute inset-0 z-10 overflow-hidden"
                        style={{ 
                            borderRadius: 'inherit',
                            mixBlendMode: 'lighten'
                        }}
                    >
                        <div 
                            className="absolute inset-0 pointer-events-none overflow-hidden"
                            style={{ 
                                width: '100%',
                                height: '100%',
                                borderRadius: 'inherit',
                                opacity: 1
                            }}
                        >
                            <Suspense fallback={null}>
                                <ThreeBackground />
                            </Suspense>
                        </div>
                    </div>
                )}
                
                {/* Content */}
                <div className="flex flex-col items-center justify-start w-full relative mt-12 sm:mt-0">
                    <HeroContent 
                        offsetX={offsetX}
                        offsetY={offsetY}
                        className="w-full md:w-3/4"
                    />
                    <ProfileImage 
                        imageSrc={profilePic}
                        alt="Dominik's Profile"
                        className="mt-4 sm:mt-8"
                    />
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;