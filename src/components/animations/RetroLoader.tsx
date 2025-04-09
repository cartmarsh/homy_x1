import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './RetroLoader.css';
import useRetroParticles from '../../hooks/useRetroParticles';

export interface RetroLoaderProps {
  primaryText?: string;
  accentText?: string;
  duration: number;
  progress: number;
}

const RetroLoader: React.FC<RetroLoaderProps> = ({
  progress
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use the custom hook for Three.js particle animation
  useRetroParticles({
    containerRef,
    progress
  });

  return (
    <div className="retro-loader-container">
      <div ref={containerRef} className="three-container" />
      <div className="retro-loader-content">
        <motion.div
          className="retro-loading-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            color: '#ff61b3',
            textShadow: '0 0 10px #ff61b3',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            letterSpacing: '0.4em'
          }}
        >
          hello world...
        </motion.div>
      </div>
    </div>
  );
};

export default RetroLoader; 