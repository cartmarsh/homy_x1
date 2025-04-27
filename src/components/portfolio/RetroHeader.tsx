import React, { useRef, useState, memo } from 'react';
import useGlitchEffect from '../../hooks/useGlitchEffect';
import RetroCanvas from '../three/RetroCanvas';
import RetroGrid from '../three/RetroGrid';
import GridParticles from '../three/GridParticles';

interface RetroHeaderProps {
  title: string;
  className?: string;
}

/**
 * RetroHeader component with a retro grid effect, particles, and text glitch effect
 */
const RetroHeader: React.FC<RetroHeaderProps> = ({ title, className = '' }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use our custom glitch effect hook
  const { glitchStyle } = useGlitchEffect({
    probability: 0.3,
    duration: 150,
    interval: 2000
  });

  // Handler functions
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      ref={headerRef}
      className="w-full relative mb-0 cursor-pointer flex justify-center" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Canvas for retro grid and particles */}
      <RetroCanvas height="3.75rem">
        <RetroGrid />
        <GridParticles 
          count={15}
          speedRange={[0.005, 0.015]}
          sizeRange={[0.03, 0.1]}
        />
      </RetroCanvas>
      
      {/* Title Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[3.125rem] sm:h-[3.75rem] md:h-[4.375rem] lg:h-[5.625rem] w-auto">
        {/* Scanline effect */}
        <ScanLines isHovered={isHovered} />
        
        {/* Title with glitch effect */}
        <h1 
          className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-wider uppercase text-center text-gray-800 ${className}`}
          style={{
            fontFamily: className.includes('font-mono') ? 'monospace' : "'Press Start 2P', 'VT323', monospace",
            WebkitTextStroke: "0.04375rem rgba(0,0,0,0.3)",
            ...glitchStyle
          }}
        >
          {title}
        </h1>
        
        {/* Decorative line */}
        <div className="w-28 sm:w-36 md:w-44 h-[0.125rem] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mt-1"></div>
      </div>
    </div>
  );
};

/**
 * ScanLines component for the retro effect
 */
const ScanLines = memo(({ isHovered }: { isHovered: boolean }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isHovered ? 'opacity-20' : 'opacity-10'}`}>
    {Array.from({ length: 2 }).map((_, i) => (
      <div 
        key={i} 
        className="h-[0.1875rem] w-full bg-black opacity-30"
        style={{ marginTop: `${i * 0.625}rem` }}
      />
    ))}
  </div>
));

ScanLines.displayName = 'ScanLines';

export default memo(RetroHeader); 