import React, { useState, useEffect, CSSProperties } from 'react';
import ContentSection from './layout/ContentSection';
import PortfolioItem from './portfolio/PortfolioItem';
import RetroHeader from './portfolio/RetroHeader';
import SoundRoomImage from './../assets/SoundRoom2.png';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface PortfolioProps {
    className?: string;
    id?: string;
}

export const Portfolio = ({ className, id }: PortfolioProps) => {
    // Portfolio project data
    const projects = [
        {
            title: "SoundRoom",
            description: "A visual sound creation tool that lets users design custom audio by drawing waveforms, applying effects, and collaborating in a shared sound environment.",
            image: SoundRoomImage,
            link: "https://sound-room.vercel.app/",
            tags: ["React", "Node.js", "Tone.js", "TypeScript"]
        }
    ];

    // State to manage the currently displayed project
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for transition animation
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [slideDirection, setSlideDirection] = useState("right");

    // Navigation functions with animation
    const goToNext = () => {
        if (isTransitioning) return;
        
        setSlideDirection("right");
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        }, 200);
    };

    const goToPrevious = () => {
        if (isTransitioning) return;
        
        setSlideDirection("left");
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
        }, 200);
    };

    // Reset transition state after animation
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning, currentIndex]);

    // Direct navigation
    const goToIndex = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        
        setSlideDirection(index > currentIndex ? "right" : "left");
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIndex(index);
        }, 200);
    };

    // Arrow button style with responsive sizing - made bigger with slower hover effect
    const arrowButtonStyle = "bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 sm:p-5 focus:outline-none transition-all duration-700 transform hover:scale-110 shadow-lg";

    // Style to ensure content is visible and contained within card
    const portfolioContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '1rem',
        paddingBottom: '1rem',
    };

    // Card container styling to match the red rectangle in the screenshot
    const cardContainerStyle: CSSProperties = {
        width: '90%',
        maxWidth: '850px',
        padding: '0',
        margin: '0 auto',
        boxSizing: 'border-box',
    };

    // Project display section style for better vertical centering
    const projectDisplayStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        width: '100%',
        padding: '1rem 0',
    };

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className}`}
            isPortfolio={true}
        >
            <div className="w-full h-full flex flex-col" style={portfolioContainerStyle}>
                {/* Header with responsive sizing */}
                <div className="w-full flex flex-col items-center justify-center mb-4 sm:mb-6 py-1 sm:py-2">
                    <RetroHeader title="PORTFOLIO" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                </div>
                
                {/* Project Carousel Display - with flex-grow to take available space */}
                <div style={projectDisplayStyle} className="relative">
                    {/* Main project display with transition - adjusted width to match red outline */}
                    <div style={cardContainerStyle} className="relative">
                        <div 
                            className={`transform transition-all duration-300 ease-out ${
                                isTransitioning 
                                    ? slideDirection === "right" 
                                        ? "-translate-x-10 opacity-0" 
                                        : "translate-x-10 opacity-0"
                                    : "translate-x-0 opacity-100"
                            }`}
                        >
                            <PortfolioItem 
                                title={projects[currentIndex].title}
                                description={projects[currentIndex].description}
                                image={projects[currentIndex].image}
                                link={projects[currentIndex].link}
                                tags={projects[currentIndex].tags}
                            />
                        </div>
                    </div>

                    {/* Navigation arrows - only show if there are multiple projects */}
                    {projects.length > 1 && (
                        <>
                            {/* Left arrow - adjusted position to match new container width */}
                            <button 
                                className={`${arrowButtonStyle} absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16`}
                                onClick={goToPrevious}
                                disabled={isTransitioning}
                                aria-label="Previous project"
                            >
                                <HiChevronLeft className="text-2xl sm:text-3xl md:text-4xl" />
                            </button>
                            
                            {/* Right arrow - adjusted position to match new container width */}
                            <button 
                                className={`${arrowButtonStyle} absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-16 sm:h-16`}
                                onClick={goToNext}
                                disabled={isTransitioning}
                                aria-label="Next project"
                            >
                                <HiChevronRight className="text-2xl sm:text-3xl md:text-4xl" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </ContentSection>
    );
};

export default Portfolio;
