import React, { useRef, Suspense } from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/output.png';
import './Hero.css';
import useScrollSnapping from '../../hooks/useScrollSnapping';
import useDimensions from '../../hooks/useDimensions';
import useMouseTracking from '../../hooks/useMouseTracking';
import useGlitchEffect from '../../hooks/useGlitchEffect';
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

interface GlitchEffect {
    triggerClickEffect: () => void;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    // Use custom hooks
    const { dimensions, isClient } = useDimensions(divRef);
    const { handleMouseMove, getOffsets } = useMouseTracking(divRef);
    const glitchEffect = useGlitchEffect() as unknown as GlitchEffect;
    const { triggerClickEffect } = glitchEffect;
    
    // Apply scroll snapping
    useScrollSnapping();
    
    // Get offsets for 3D effects
    const { offsetX, offsetY } = getOffsets();

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-transparent' 
            className={`${className} overflow-hidden`}
            padding="compact"
            backgroundElements={<HeroBackground />}
        >
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center relative overflow-hidden"
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
                <div className="flex flex-col items-center justify-start w-full relative">
                    <HeroContent 
                        offsetX={offsetX}
                        offsetY={offsetY}
                        triggerClickEffect={triggerClickEffect}
                        className="w-full md:w-3/4"
                    />
                    <ProfileImage 
                        imageSrc={profilePic}
                        alt="Dominik's Profile"
                    />
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;