import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameIdRef = useRef<number>(0);
    const gridRef = useRef<THREE.Object3D | null>(null);
    const scanlinesRef = useRef<THREE.LineSegments | null>(null);
    const noiseParticlesRef = useRef<THREE.Points | null>(null);

    // Update noise particles - always keep them invisible since we removed glitch effect
    const updateNoiseParticles = useCallback(() => {
        if (!noiseParticlesRef.current || !containerRef.current) return;
        
        const geometry = noiseParticlesRef.current.geometry;
        const sizes = geometry.attributes.size.array as Float32Array;
        const particleCount = sizes.length;
        
        // Hide all particles as we removed glitch effects
        for (let i = 0; i < particleCount; i++) {
            sizes[i] = 0;
        }
        geometry.attributes.size.needsUpdate = true;
    }, []);

    // Setup and animation
    useEffect(() => {
        if (!containerRef.current) return;

        // Store container reference for cleanup
        const container = containerRef.current;

        // Setup scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Setup camera (orthographic for 2D-like rendering)
        const camera = new THREE.OrthographicCamera(
            -1, 1, 1, -1, 0.1, 1000
        );
        camera.position.z = 10;
        cameraRef.current = camera;

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create retro grid
        createRetroGrid();

        // Create scanlines
        createScanlines();

        // Create noise particles but keep them invisible
        createNoiseParticles();

        // Handle resize
        const handleResize = () => {
            if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            
            // Update renderer
            rendererRef.current.setSize(width, height);
            
            // Update camera
            const aspectRatio = width / height;
            cameraRef.current.left = -aspectRatio;
            cameraRef.current.right = aspectRatio;
            cameraRef.current.top = 1;
            cameraRef.current.bottom = -1;
            cameraRef.current.updateProjectionMatrix();
            
            // Update grid
            if (gridRef.current) {
                scene.remove(gridRef.current);
                createRetroGrid();
            }
            
            // Update scanlines
            if (scanlinesRef.current) {
                scene.remove(scanlinesRef.current);
                createScanlines();
            }
        };

        // Initial resize
        handleResize();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            
            // Keep noise particles invisible
            updateNoiseParticles();
            
            // Render
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        
        animate();

        // Clean up
        return () => {
            cancelAnimationFrame(frameIdRef.current);
            window.removeEventListener('resize', handleResize);
            
            if (rendererRef.current && container) {
                container.removeChild(rendererRef.current.domElement);
                rendererRef.current.dispose();
            }
        };
    }, [updateNoiseParticles]);

    // Create retro grid
    const createRetroGrid = () => {
        if (!sceneRef.current || !containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const aspectRatio = width / height;
        
        // Create group for grid lines
        const grid = new THREE.Group();
        gridRef.current = grid;
        
        const gridMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(0x6464C8),
            transparent: true,
            opacity: 0.6
        });
        
        const vanishX = 0;
        const vanishY = 0;
        
        // Horizontal grid lines (y-axis)
        const gridSizeY = 0.05;
        for (let y = 0; y < 2; y += gridSizeY) {
            // Grid lines above vanishing point
            if (y > 0) {
                const y1 = vanishY - y;
                
                const perspectiveX1 = THREE.MathUtils.mapLinear(y, 0, 1, vanishX, -aspectRatio);
                const perspectiveX2 = THREE.MathUtils.mapLinear(y, 0, 1, vanishX, aspectRatio);
                
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(perspectiveX1, y1, 0),
                    new THREE.Vector3(perspectiveX2, y1, 0)
                ]);
                
                const line = new THREE.Line(geometry, gridMaterial);
                grid.add(line);
            }
            
            // Grid lines below vanishing point
            if (y > 0) {
                const y2 = vanishY + y;
                
                const perspectiveX1 = THREE.MathUtils.mapLinear(y, 0, 1, vanishX, -aspectRatio);
                const perspectiveX2 = THREE.MathUtils.mapLinear(y, 0, 1, vanishX, aspectRatio);
                
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(perspectiveX1, y2, 0),
                    new THREE.Vector3(perspectiveX2, y2, 0)
                ]);
                
                const line = new THREE.Line(geometry, gridMaterial);
                grid.add(line);
            }
        }
        
        // Vertical grid lines (x-axis)
        const gridSizeX = 0.1;
        for (let x = 0; x < 2; x += gridSizeX) {
            // Grid lines to the left of vanishing point
            if (x > 0) {
                const x1 = vanishX - x;
                
                const perspectiveY1 = THREE.MathUtils.mapLinear(x, 0, 1, vanishY, -1);
                const perspectiveY2 = THREE.MathUtils.mapLinear(x, 0, 1, vanishY, 1);
                
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x1, perspectiveY1, 0),
                    new THREE.Vector3(x1, perspectiveY2, 0)
                ]);
                
                const line = new THREE.Line(geometry, gridMaterial);
                grid.add(line);
            }
            
            // Grid lines to the right of vanishing point
            if (x > 0) {
                const x2 = vanishX + x;
                
                const perspectiveY1 = THREE.MathUtils.mapLinear(x, 0, 1, vanishY, -1);
                const perspectiveY2 = THREE.MathUtils.mapLinear(x, 0, 1, vanishY, 1);
                
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(x2, perspectiveY1, 0),
                    new THREE.Vector3(x2, perspectiveY2, 0)
                ]);
                
                const line = new THREE.Line(geometry, gridMaterial);
                grid.add(line);
            }
        }
        
        // Horizon line
        const horizonMaterial = new THREE.LineBasicMaterial({
            color: new THREE.Color(0x7850FF),
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        
        const horizonGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-aspectRatio, vanishY, 0),
            new THREE.Vector3(aspectRatio, vanishY, 0)
        ]);
        
        const horizonLine = new THREE.Line(horizonGeometry, horizonMaterial);
        grid.add(horizonLine);
        
        sceneRef.current.add(grid);
    };
    
    // Create scanlines effect
    const createScanlines = () => {
        if (!sceneRef.current || !containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const aspectRatio = width / height;
        
        const scanlineSpacing = 0.01; // Spacing between scanlines
        const scanlineCount = Math.floor(2 / scanlineSpacing);
        
        // Create points for scanlines
        const positions = new Float32Array(scanlineCount * 6); // 2 points per line * 3 values (x,y,z)
        
        for (let i = 0; i < scanlineCount; i++) {
            const y = -1 + i * scanlineSpacing;
            
            // First point (left side)
            positions[i * 6] = -aspectRatio;
            positions[i * 6 + 1] = y;
            positions[i * 6 + 2] = 0;
            
            // Second point (right side)
            positions[i * 6 + 3] = aspectRatio;
            positions[i * 6 + 4] = y;
            positions[i * 6 + 5] = 0;
        }
        
        const scanlineGeometry = new THREE.BufferGeometry();
        scanlineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const scanlineMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.08,
        });
        
        const scanlines = new THREE.LineSegments(scanlineGeometry, scanlineMaterial);
        scanlinesRef.current = scanlines;
        sceneRef.current.add(scanlines);
    };
    
    // Create noise particles but keep them invisible
    const createNoiseParticles = () => {
        if (!sceneRef.current) return;
        
        // Use points for noise effect
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Initialize with zero values
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = 0;
            positions[i * 3 + 1] = 0;
            positions[i * 3 + 2] = 0;
            sizes[i] = 0;
        }
        
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8,
            size: 0.01,
            sizeAttenuation: false,
            blending: THREE.AdditiveBlending
        });
        
        const noiseParticles = new THREE.Points(particleGeometry, particleMaterial);
        noiseParticlesRef.current = noiseParticles;
        sceneRef.current.add(noiseParticles);
    };

    return (
        <div 
            ref={containerRef}
            style={{ 
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0
            }}
        />
    );
};

export default ThreeBackground; 