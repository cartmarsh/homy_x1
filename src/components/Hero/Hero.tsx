import React from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/output.png';
import './Hero.css';
import HeroContent from './HeroContent';
import HeroBackground from './HeroBackground';

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    return (
        <ContentSection 
            id={id} 
            className={`${className} overflow-visible font-primary`}
            backgroundElements={
                <div className="absolute inset-0 overflow-visible">
                    <HeroBackground />
                </div>
            }
        >
            {/* Content */}
            <div className="w-[90%] sm:w-[85%] md:w-[80%] max-w-6xl mx-auto px-2 sm:px-4 relative z-10 h-full sm:h-auto flex items-center overflow-visible">
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
                        className="w-full rounded-xl overflow-visible"
                        profileImage={profilePic}
                    />
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;