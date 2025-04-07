import { RefObject, useRef, useEffect } from 'react';
import useP5Drawing from './useP5Drawing';

// Custom hook for p5 sketch
const useP5Sketch = (divRef: RefObject<HTMLDivElement>, dimensions: { width: number, height: number }) => {
    const p5InstanceRef = useRef<any>(null);
    const { drawWithGlitch } = useP5Drawing();

    const setup = (p5: any, canvasParentRef: Element) => {
        p5InstanceRef.current = p5;
        const width = dimensions.width || (divRef.current?.offsetWidth || window.innerWidth);
        const height = dimensions.height || (divRef.current?.offsetHeight || window.innerHeight);
        const canvas = p5.createCanvas(width, height);
        canvas.parent(canvasParentRef);
        p5.pixelDensity(window.devicePixelRatio);
        canvas.style('display', 'block');
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
    };

    // Use the extracted drawing hooks
    const handleDrawWithGlitch = (p5: any, glitchIntensity: number) => {
        drawWithGlitch(p5, dimensions, divRef, glitchIntensity);
    };

    useEffect(() => {
        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
            }
        };
    }, []);

    return { setup, drawWithGlitch: handleDrawWithGlitch };
};

export default useP5Sketch; 