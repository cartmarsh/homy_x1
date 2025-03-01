import React from 'react';
import { motion } from 'framer-motion';
import ContentSection from './layout/ContentSection';
import profileImage from '../assets/Profilbild.jpg';

interface AboutMeProps {
    className?: string;
    children?: React.ReactNode;
    id?: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ className, children, id }) => {
    return (
        <ContentSection id={id} className={className}>
            <motion.div 
                className="w-full h-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Left Content */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                        Cześć!
                    </h1>
                    
                    <div className="space-y-6 text-gray-600">
                        <p className="text-lg sm:text-xl">
                            My name is Dominik and I'm a bilingual Web Developer located in Germany, originally from Poland.
                        </p>
                        
                        <p className="text-lg sm:text-xl">
                            With a combined decade of experience in web development, I always focus on creating products with the end user in mind. My unique background helped me develop a mindset of empathy and reflexivity.
                        </p>
                        
                        <p className="text-lg sm:text-xl">
                            I have a knack for creating and improving processes, simplifying the complex, solving problems and crafting seamless and enjoyable web experiences.
                        </p>
                        
                        <p className="text-lg sm:text-xl">
                            After hours, I'm an artist, surfer, and a concert enthusiast always on the lookout for new favorite music albums.
                        </p>
                    </div>
                </div>

                {/* Right Content - Image */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="aspect-square relative rounded-full overflow-hidden bg-pink-300 max-w-[50vh] mx-auto">
                        <img 
                            src={profileImage}
                            alt="Profile picture"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        
                        {/* Decorative Shapes */}
                        <div className="absolute -z-10 w-[75%] aspect-square rounded-full bg-pink-200 -top-[10%] -right-[10%]"/>
                        <div className="absolute -z-10 w-[50%] aspect-square rounded-full bg-blue-200 bottom-[10%] -left-[10%]"/>
                    </div>
                </div>
            </motion.div>
            {children}
        </ContentSection>
    );
};

export default AboutMe;

