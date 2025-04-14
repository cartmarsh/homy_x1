import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Transparent background base layer */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'transparent',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Scanlines effect */}
      <div 
        className="w-4/5 mx-auto absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(255, 140, 0, 0.15) 0px,
            rgba(255, 140, 0, 0.15) 2px,
            transparent 2px,
            transparent 60px
          )`,
          opacity: 0.4,
          borderRadius: 'inherit'
        }}
      />
      
      {/* Grid pattern overlay */}
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