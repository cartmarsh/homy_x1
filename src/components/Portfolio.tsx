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
            <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12">
                {/* Center header with consistent padding */}
                <div onClick={handleHeaderClick} className="w-full flex justify-center mb-4">
                    <RetroHeader title="PORTFOLIO" />
                </div>
                
                {/* Project Display */}
                <div className="w-full h-[85%] flex items-center justify-center">
                    {projects.length === 1 ? (
                        // Single project centered
                        <div className="h-full flex items-center justify-start">
                            <div className="w-[90%] sm:w-[80%] md:w-[70%] h-[90%]">
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
                        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-full items-center justify-items-center">
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
