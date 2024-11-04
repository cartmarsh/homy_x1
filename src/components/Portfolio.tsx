import React from 'react'
import SoundRoomImage from '../assets/SoundRoom1.jpg';

interface PortfolioProps {
    className?: string;
    children?: React.ReactNode; // Include children prop of type React.ReactNode
}

const Portfolio: React.FC<PortfolioProps> = ({ className, children }) => {
  return (
    <div className={`p-4 sm:p-6 md:p-8 bg-peach max-w-4xl mx-auto ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">Portfolio</h2>
      
      {/* Grid Layout for Projects */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Placeholder Project Item 1 */}
        <article className="bg-white shadow-md sm:shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
          <img 
            src={SoundRoomImage} 
            alt="Project 1" 
            className="w-full h-40 sm:h-48 md:h-56 object-cover"
          />
          <div className="p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">SoundRoom</h3>
            <p className="text-sm sm:text-base text-gray-600">Brief description of the project goes here.</p>
          </div>
        </article>

        {/* Placeholder Project Item 2 */}
        <article className="bg-white shadow-md sm:shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Project 2" 
            className="w-full h-40 sm:h-48 md:h-56 object-cover"
          />
          <div className="p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Project Title 2</h3>
            <p className="text-sm sm:text-base text-gray-600">Brief description of the project goes here.</p>
          </div>
        </article>

        {/* Placeholder Project Item 3 */}
        <article className="bg-white shadow-md sm:shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Project 3" 
            className="w-full h-40 sm:h-48 md:h-56 object-cover"
          />
          <div className="p-3 sm:p-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Project Title 3</h3>
            <p className="text-sm sm:text-base text-gray-600">Brief description of the project goes here.</p>
          </div>
        </article>

        {/* Additional project items can be added here following the same structure */}
      </div>
      {children}
    </div>
  )
}

export default Portfolio;
