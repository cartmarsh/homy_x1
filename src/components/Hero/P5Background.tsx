import React from 'react';
import Sketch from 'react-p5';

interface P5BackgroundProps {
    setup: (p5: any, canvasParentRef: Element) => void;
    draw: (p5: any) => void;
}

/**
 * A component that renders p5.js sketches with optimized loading
 * This separates the P5 rendering from the main component
 * allowing for better performance and transitions
 */
const P5Background: React.FC<P5BackgroundProps> = ({ setup, draw }) => {
    return <Sketch setup={setup} draw={draw} />;
};

export default P5Background; 