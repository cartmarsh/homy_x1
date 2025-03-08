import ContentSection from './layout/ContentSection';
import PortfolioItem from './portfolio/PortfolioItem';
import RetroHeader from './portfolio/RetroHeader';
import SoundRoomImage from './../assets/SoundRoom1.jpg';

interface PortfolioProps {
    className?: string;
    id?: string;
}

export const Portfolio = ({ className, id }: PortfolioProps) => {
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

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className} overflow-hidden`}
        >
            <div className="w-full h-full flex flex-col items-center justify-start py-8 px-4 sm:px-8 md:px-12">
                {/* Center header with consistent padding */}
                <div className="w-full flex justify-center mb-8 md:mb-12">
                    <RetroHeader title="PORTFOLIO" className="text-4xl md:text-5xl lg:text-6xl" />
                </div>
                
                {/* Project Display - Make it prominent */}
                <div className="w-full flex-1 flex items-center justify-center">
                    {projects.length === 1 ? (
                        // Single project centered with more space
                        <div className="w-full max-w-5xl mx-auto">
                            <PortfolioItem 
                                title={projects[0].title}
                                description={projects[0].description}
                                image={projects[0].image}
                                link={projects[0].link}
                                tags={projects[0].tags}
                            />
                        </div>
                    ) : (
                        // Grid for multiple projects with larger gap
                        <div className="grid gap-8 md:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-2 w-full max-w-7xl">
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
