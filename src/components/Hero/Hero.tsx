import React, { useRef, Suspense } from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/output.png';
import './Hero.css';
import useScrollSnapping from '../../hooks/useScrollSnapping';
import useDimensions from '../../hooks/useDimensions';
import useMouseTracking from '../../hooks/useMouseTracking';
import HeroContent from './HeroContent';
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
    const { handleMouseMove } = useMouseTracking(divRef);
    
    // Apply scroll snapping
    useScrollSnapping();

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-transparent' 
            className={`${className} overflow-visible min-h-screen`}
            padding="compact"
            backgroundElements={<HeroBackground />}
        >
            <div 
                ref={divRef}
                className="w-full h-full flex items-center justify-center relative overflow-visible"
                onMouseMove={handleMouseMove}
                style={{ position: 'relative', minHeight: '100%' }}
            >
                {/* Three.js Canvas */}
                {isClient && dimensions.width > 0 && (
                    <div
                        className="absolute inset-0 z-0 overflow-visible"
                        style={{ 
                            borderRadius: 'inherit'
                        }}
                    >
                        <div 
                            className="absolute inset-0 pointer-events-none overflow-visible"
                            style={{ 
                                width: '100%',
                                height: '100%',
                                borderRadius: 'inherit'
                            }}
                        >
                            <Suspense fallback={null}>
                                <ThreeBackground />
                            </Suspense>
                        </div>
                    </div>
                )}
                
                {/* Content Card */}
                <div className="w-full max-w-6xl mx-auto px-4 relative z-10 h-full sm:h-auto flex items-center overflow-visible">
                    <div className="w-full flex flex-col items-center justify-center relative overflow-visible">
                        <HeroContent 
                            title="Hi, I'm Dominik"
                            subtitle="Full Stack Developer & Creative Technologist"
                            buttonText="View My Work"
                            onButtonClick={() => {
                                const portfolioSection = document.getElementById('portfolio');
                                if (portfolioSection) {
                                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="w-full rounded-xl overflow-hidden"
                            profileImage={profilePic}
                        />
                    </div>
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;