import React from 'react';

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Background gradient that covers entire card */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #1a0f3c 100%)',
          borderRadius: 'inherit'
        }}
      />
      
      {/* Grid pattern overlay - subtle version that doesn't compete with P5 animation */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30, 30, 80, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 30, 80, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
          borderRadius: 'inherit'
        }}
      />
    </>
  );
};

export default HeroBackground; 