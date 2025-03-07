import type p5 from 'p5';

export function setupCanvas(p5: p5, canvas: p5.Renderer, canvasParentRef: Element) {
    // Set pixel density to device pixel ratio for consistent rendering
    p5.pixelDensity(window.devicePixelRatio);
    
    // Apply hardware acceleration and improve canvas rendering
    const canvasElt = canvas.elt;
    canvasElt.style.transform = 'translateZ(0)';
    canvasElt.style.backfaceVisibility = 'hidden';
    canvasElt.style.perspective = '1000px';
    
    // Ensure canvas is positioned correctly
    canvas.style('display', 'block');
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
}

export function prepareDrawing(p5: p5) {
    p5.clear(0, 0, 0, 0);
    p5.push();
    p5.noFill();
    p5.smooth();
}

export function drawAnimatedBorder(p5: p5, time: number, scale: number, color: [number, number, number, number], strokeWeight: number) {
    const padding = 20 * scale * window.devicePixelRatio;
    const numPoints = 50;
    const amplitude = 5 * window.devicePixelRatio;
    
    p5.strokeWeight(strokeWeight * window.devicePixelRatio);
    p5.stroke(...color);
    
    p5.beginShape();
    
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        let x, y;
        
        if (t < 0.25) {
            // Top edge
            x = p5.lerp(padding, p5.width - padding, t * 4);
            y = padding + Math.sin(time + t * 10) * amplitude;
        } else if (t < 0.5) {
            // Right edge
            x = p5.width - padding + Math.sin(time + t * 10) * amplitude;
            y = p5.lerp(padding, p5.height - padding, (t - 0.25) * 4);
        } else if (t < 0.75) {
            // Bottom edge
            x = p5.lerp(p5.width - padding, padding, (t - 0.5) * 4);
            y = p5.height - padding + Math.sin(time + t * 10) * amplitude;
        } else {
            // Left edge
            x = padding + Math.sin(time + t * 10) * amplitude;
            y = p5.lerp(p5.height - padding, padding, (t - 0.75) * 4);
        }
        
        // Add extra vertices at corners for smoother curves
        if (i === 0 || i === numPoints) {
            p5.curveVertex(x, y);
        }
        p5.curveVertex(x, y);
    }
    
    p5.endShape();
}

export function drawMultipleBorders(p5: p5, time: number) {
    // Draw outer border in deeper purple
    drawAnimatedBorder(p5, time, 0.8, [126, 34, 206, 100], 2);
    
    // Draw middle border with different timing and more transparency
    drawAnimatedBorder(p5, time * 1.5, 0.5, [126, 34, 206, 60], 1.5);
    
    // Draw inner border with different timing and most transparency
    drawAnimatedBorder(p5, time * 0.8, 0.25, [126, 34, 206, 30], 1);
} 