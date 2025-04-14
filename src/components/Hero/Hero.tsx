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
            className={`${className} min-h-screen flex items-center justify-center overflow-visible font-primary`}
            backgroundElements={
                <div className="absolute inset-0 overflow-visible">
                    <HeroBackground />
                </div>
            }
        >
            {/* Content */}
            <div className="w-[90%] h-[80vh] relative z-10 flex items-center justify-center overflow-visible">
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
                    className="rounded-xl overflow-visible h-full"
                    profileImage={profilePic}
                />
            </div>
        </ContentSection>
    );
};

export default Hero;