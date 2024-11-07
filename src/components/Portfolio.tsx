import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SoundRoomImage from '../assets/SoundRoom1.jpg';

interface PortfolioProps {
    className?: string;
    children?: React.ReactNode;
}

interface ProjectCard {
    id: string;
    title: string;
    description: string;
    image: string;
    techStack: string[];
    link: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ className, children }) => {
    const [navbarHeight, setNavbarHeight] = useState(0);
    
    // Container Setup
    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) setNavbarHeight(navbar.offsetHeight);
        };
        
        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);
        return () => window.removeEventListener('resize', updateNavbarHeight);
    }, []);

    // Project Cards Data
    const projects: ProjectCard[] = [
        {
            id: 'soundroom',
            title: 'SoundRoom',
            description: 'Create funny sounds with AI',
            image: SoundRoomImage,
            techStack: ['React', 'TypeScript', 'TailwindCSS'],
            link: '/projects/soundroom'
        },
        // Add more projects here
    ];

    return (
        <motion.section 
            className={`
                relative min-h-screen w-full
                bg-peach
                flex flex-col items-center justify-center
                overflow-y-auto
                section-base
                ${className}
            `}
            style={{ 
                paddingTop: `${navbarHeight + navbarHeight * 0.6}px`,
                minHeight: `calc(100vh - ${navbarHeight}px)`,
                paddingBottom: 'clamp(3rem, 8vh, 6rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="
                container
                w-full max-w-7xl
                px-6 sm:px-8 lg:px-12
                py-8 sm:py-12 lg:py-16
                mx-auto
            ">
                <div className="text-container mb-4 sm:mb-4">
                    <h2 className="
                        text-3xl sm:text-4xl lg:text-5xl
                        text-gray-800
                        mb-2
                        tracking-tight
                        text-center
                        relative
                    ">
                        Portfolio
                        <span className="
                            absolute
                            left-1/2
                            -translate-x-1/2
                            -bottom-4
                            w-24 sm:w-32
                            h-1
                            bg-gray-800/20
                        "/>
                    </h2>
                    <p className="
                        text-lg sm:text-xl
                        text-gray-600
                        max-w-2xl
                        mx-auto
                        pt-4
                        text-center
                        leading-relaxed
                    ">
                        Explore my latest projects and creative works in web development and design
                    </p>
                </div>
                
                <div className="
                    grid
                    gap-6 sm:gap-8 lg:gap-10
                    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                    w-full
                    max-w-[95%]
                    mx-auto
                ">
                    {projects.map(project => (
                        <motion.article
                            key={project.id}
                            className="
                                group
                                bg-white
                                rounded-2xl
                                overflow-hidden
                                transition-all duration-300
                                border border-gray-200/50
                                hover:border-gray-300/50
                                shadow-sm hover:shadow-lg
                                hover:-translate-y-2
                            "
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="
                                relative
                                w-full
                                aspect-w-16 aspect-h-9
                                overflow-hidden
                                border-b border-gray-100/50
                            ">
                                <img 
                                    src={project.image}
                                    alt={project.title}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        object-center
                                        transform group-hover:scale-105
                                        transition-transform duration-500 ease-out
                                    "
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="
                                    text-xl sm:text-2xl
                                    font-semibold text-gray-900
                                    mb-1
                                ">
                                    {project.title}
                                </h3>
                                <p className="
                                    text-base sm:text-lg
                                    text-gray-600
                                    mb-2
                                    leading-relaxed
                                ">
                                    {project.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map(tech => (
                                        <span
                                            key={tech}
                                            className="
                                                px-3 py-1.5
                                                text-sm
                                                bg-gray-50
                                                text-gray-700
                                                rounded-full
                                                border border-gray-100/50
                                                transition-colors duration-300
                                                group-hover:bg-gray-100
                                            "
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                {children}
            </div>
        </motion.section>
    );
};

export default Portfolio;
