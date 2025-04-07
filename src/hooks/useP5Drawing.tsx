import { RefObject } from 'react';

// Custom hook for p5 drawing functions
const useP5Drawing = () => {
    const drawRetroGrid = (p5: any) => {
        p5.push();
        
        p5.stroke(100, 100, 200, 60);
        p5.strokeWeight(1.2);
        
        const vanishX = p5.width / 2;
        const vanishY = p5.height / 2;
        
        const gridSizeY = 30;
        for (let y = 0; y < p5.height * 2; y += gridSizeY) {
            const y1 = p5.height / 2 - y;
            const y2 = p5.height / 2 + y;
            
            if (y > 0) {
                const perspectiveX1 = p5.map(y, 0, p5.height, vanishX, 0);
                const perspectiveX2 = p5.map(y, 0, p5.height, vanishX, p5.width);
                p5.line(perspectiveX1, y1, perspectiveX2, y1);
            }
            
            if (y > 0) {
                const perspectiveX1 = p5.map(y, 0, p5.height, vanishX, 0);
                const perspectiveX2 = p5.map(y, 0, p5.height, vanishX, p5.width);
                p5.line(perspectiveX1, y2, perspectiveX2, y2);
            }
        }
        
        const gridSizeX = 60;
        for (let x = 0; x < p5.width * 2; x += gridSizeX) {
            if (x > 0) {
                const x1 = vanishX - x;
                const perspectiveY1 = p5.map(x, 0, p5.width, vanishY, 0);
                const perspectiveY2 = p5.map(x, 0, p5.width, vanishY, p5.height);
                p5.line(x1, perspectiveY1, x1, perspectiveY2);
            }
            
            if (x > 0) {
                const x2 = vanishX + x;
                const perspectiveY1 = p5.map(x, 0, p5.width, vanishY, 0);
                const perspectiveY2 = p5.map(x, 0, p5.width, vanishY, p5.height);
                p5.line(x2, perspectiveY1, x2, perspectiveY2);
            }
        }
        
        p5.stroke(120, 80, 255, 80);
        p5.strokeWeight(2.5);
        p5.line(0, vanishY, p5.width, vanishY);
        
        p5.pop();
    };

    const drawScanlines = (p5: any) => {
        p5.push();
        p5.noStroke();
        
        for (let y = 0; y < p5.height; y += 4) {
            p5.fill(0, 0, 0, 8);
            p5.rect(0, y, p5.width, 1);
        }
        
        p5.pop();
    };

    const drawNoise = (p5: any, intensity: number) => {
        p5.push();
        p5.noStroke();
        
        for (let i = 0; i < intensity * 80; i++) {
            const x = p5.random(p5.width);
            const y = p5.random(p5.height);
            const size = p5.random(1, 4);
            p5.fill(255, 255, 255, p5.random(15, 80));
            p5.rect(x, y, size, size);
        }
        
        p5.pop();
    };
    
    const draw = (p5: any, dimensions: { width: number, height: number }, divRef: RefObject<HTMLDivElement>) => {
        p5.clear();
        
        if (divRef.current && (p5.width !== dimensions.width || p5.height !== dimensions.height)) {
            const newWidth = dimensions.width || divRef.current.offsetWidth;
            const newHeight = dimensions.height || divRef.current.offsetHeight;
            
            if (newWidth > 0 && newHeight > 0) {
                p5.resizeCanvas(newWidth, newHeight, true);
            }
        }
        
        drawRetroGrid(p5);
        drawScanlines(p5);
    };

    const drawWithGlitch = (p5: any, dimensions: { width: number, height: number }, divRef: RefObject<HTMLDivElement>, glitchIntensity: number) => {
        draw(p5, dimensions, divRef);
        if (glitchIntensity > 0) {
            drawNoise(p5, glitchIntensity);
        }
    };

    return { drawRetroGrid, drawScanlines, drawNoise, draw, drawWithGlitch };
};

export default useP5Drawing; 