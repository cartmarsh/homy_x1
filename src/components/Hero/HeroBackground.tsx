import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Transparent background to allow strings to show through */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'transparent',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Grid pattern overlay - subtle version that doesn't compete with strings */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 30, 80, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 30, 80, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.2,
          borderRadius: 'inherit'
        }}
      />
    </>
  );
};

export default HeroBackground; 