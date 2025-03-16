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
            description: "A visual sound creation tool that lets users design custom audio by drawing waveforms, applying effects, and collaborating in a shared sound environment.",
            image: SoundRoomImage,
            link: "https://sound-room.vercel.app/",
            tags: ["React", "Node.js", "Tone.js", "TypeScript"]
        }
    ];

    return (
        <ContentSection 
            id={id} 
            bgColor='bg-lemon' 
            className={`${className} overflow-hidden`}
        >
            <div className="w-full h-full flex flex-col items-center justify-center py-4 sm:py-6 px-4 sm:px-8 md:px-12">
                {/* Center header with reduced padding */}
                <div className="w-full flex justify-center mb-4 md:mb-8 py-2 md:py-4">
                    <RetroHeader title="PORTFOLIO" className="text-3xl md:text-4xl lg:text-5xl" />
                </div>
                
                {/* Project Display - Make it prominent */}
                <div className="w-full flex-1 flex items-start justify-center">
                    {projects.length === 1 ? (
                        // Single project centered with more space
                        <div className="w-full max-w-4xl mx-auto">
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
