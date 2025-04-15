import React from 'react';
import ContentSection from '../layout/ContentSection';
import profilePic from './../../assets/output.png';
import './Hero.css';
import HeroContent from './HeroContent';

interface HeroProps {
    className?: string;
    id?: string;
}

const Hero: React.FC<HeroProps> = ({ className, id }) => {
    return (
        <ContentSection 
            id={id} 
            className={`${className} min-h-[100vh] flex items-center justify-center`}
        >
            {/* Content */}
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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
                        className="rounded-xl"
                        profileImage={profilePic}
                    />
                </div>
            </div>
        </ContentSection>
    );
};

export default Hero;