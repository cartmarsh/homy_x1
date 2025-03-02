import React, { useState } from 'react';
import ContentSection from './layout/ContentSection';
import PortfolioItem from './portfolio/PortfolioItem';
import RetroHeader from './portfolio/RetroHeader';
import SoundRoomImage from './../assets/SoundRoom1.jpg';

interface PortfolioProps {
    className?: string;
    id?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ className, id }) => {
    const [isHeaderClicked, setIsHeaderClicked] = useState(false);
    
    // Portfolio project data
    const projects = [
        {
            title: "SoundRoom",
            description: "A collaborative music sharing platform where users can create virtual rooms and share music in real-time.",
            image: SoundRoomImage,
            link: "#",
            tags: ["React", "Node.js", "WebSockets", "WebAudio API"]
        }
    ];

    // Trigger a fun animation when header is clicked
    const handleHeaderClick = () => {
        setIsHeaderClicked(true);
        setTimeout(() => setIsHeaderClicked(false), 1000);
    };

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className} overflow-hidden`}
            noScroll={true}
        >
            <div className="w-full flex flex-col items-center max-h-full overflow-hidden">
                {/* Replace standard header with RetroHeader */}
                <div onClick={handleHeaderClick} className="w-full">
                    <RetroHeader title="PORTFOLIO" />
                </div>
                
                {/* Project Display - Center a single project */}
                <div 
                    className={`w-full max-w-5xl mx-auto px-4 transition-all duration-300 overflow-hidden ${
                        isHeaderClicked ? 'animate-pulse scale-105' : ''
                    }`}
                >
                    {projects.length === 1 ? (
                        // Single project centered
                        <div className="flex justify-center">
                            <div className="w-full max-w-md">
                                <PortfolioItem 
                                    title={projects[0].title}
                                    description={projects[0].description}
                                    image={projects[0].image}
                                    link={projects[0].link}
                                    tags={projects[0].tags}
                                />
                            </div>
                        </div>
                    ) : (
                        // Grid for multiple projects
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project, index) => (
                                <PortfolioItem 
                                    key={index}
                                    title={project.title}
                                    description={project.description}
                                    image={project.image}
                                    link={project.link}
                                    tags={project.tags}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ContentSection>
    );
};

export default Portfolio;
