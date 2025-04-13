import React, { CSSProperties } from 'react';
import { SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from 'react-icons/si';
import useImageLoad from '../../hooks/useImageLoad';

interface PortfolioItemImageProps {
  image: string;
  title: string;
  tags?: string[];
  className?: string;
  style?: CSSProperties;
}

// Map of common tags to their corresponding icon components
const TECH_ICONS: Record<string, JSX.Element> = {
  'React': <SiReact className="text-[#61DAFB]" />,
  'Node.js': <SiNodedotjs className="text-[#339933]" />,
  'TypeScript': <SiTypescript className="text-[#3178C6]" />,
  'JavaScript': <SiJavascript className="text-[#F7DF1E]" />,
  'Next.js': <SiNextdotjs className="text-[#000000]" />,
  'Tailwind': <SiTailwindcss className="text-[#06B6D4]" />,
  'TailwindCSS': <SiTailwindcss className="text-[#06B6D4]" />,
  'HTML': <SiHtml5 className="text-[#E34F26]" />,
  'CSS': <SiCss3 className="text-[#1572B6]" />,
};

const PortfolioItemImage: React.FC<PortfolioItemImageProps> = ({
  image,
  title,
  tags = [],
  className = '',
  style = {}
}) => {
  // Use our custom image loading hook
  const { isLoading, hasError, handleImageLoad, handleImageError, optimizedSrc } = useImageLoad({
    src: image,
    preload: true,
    maxWidth: 2400,  // Increased for higher resolution
    maxHeight: 1600  // Increased for higher resolution
  });

  // Filter tags to only show those with icons
  const knownTags = tags.filter(tag => TECH_ICONS[tag]);
  
  return (
    <div className="relative overflow-hidden">
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          style={{
            minHeight: '55vh',
          }}
        >
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
            <div className="mt-3 text-sm text-white font-semibold">Loading...</div>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100"
          style={{
            minHeight: '55vh',
          }}
        >
          <div className="text-center text-red-500 p-4">
            <svg className="w-12 h-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-2">Failed to load image</p>
          </div>
        </div>
      )}
      
      {/* Main image - using onLoad event */}
      <img 
        src={optimizedSrc} 
        alt={`${title} project screenshot`}
        className={`${className} w-full h-auto object-cover transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          minHeight: '55vh',
          objectFit: 'cover',
          objectPosition: 'center top',
          ...style
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Technology icons overlay moved to top-right corner */}
      {knownTags.length > 0 && (
        <div className="absolute top-2 right-2 flex gap-2 z-30">
          {knownTags.map((tag, index) => (
            <div 
              key={index} 
              className="bg-black/60 p-2 rounded-full text-xl sm:text-2xl backdrop-blur-sm"
              title={tag}
            >
              {TECH_ICONS[tag]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioItemImage; 