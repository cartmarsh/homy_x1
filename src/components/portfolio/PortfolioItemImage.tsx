import React, { CSSProperties } from 'react';
import { SiReact, SiNodedotjs, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3 } from 'react-icons/si';

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
  // Filter tags to only show those with icons
  const knownTags = tags.filter(tag => TECH_ICONS[tag]);
  
  return (
    <div className="relative overflow-hidden">
      {/* Main image */}
      <img 
        src={image} 
        alt={`${title} project screenshot`}
        className={`${className} w-full h-auto object-cover`}
        style={{
          minHeight: '55vh', // Use relative units with increased height
          objectFit: 'cover',
          objectPosition: 'center top',
          ...style
        }}
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