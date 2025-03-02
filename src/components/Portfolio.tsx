import React from 'react';
import ContentSection from './layout/ContentSection';
import SoundRoomImage from './../assets/SoundRoom1.jpg';

interface PortfolioProps {
    className?: string;
    id?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({ className, id }) => {
    return (
        <ContentSection id={id} bgColor='bg-lemon' className={className}>
            <div className="w-full h-full flex flex-col items-center justify-start py-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Portfolio</h2>
                
                {/* Grid Layout for Projects */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto px-4">
                    {/* Project Item 1 */}
                    <article className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                        <img 
                            src={SoundRoomImage} 
                            alt="SoundRoom Project" 
                            className="w-full h-36 object-cover"
                        />
                        <div className="p-3">
                            <h3 className="text-lg font-semibold text-gray-800">SoundRoom</h3>
                            <p className="text-sm text-gray-600">A collaborative music sharing platform.</p>
                        </div>
                    </article>
                </div>
            </div>
        </ContentSection>
    );
};

export default Portfolio;
