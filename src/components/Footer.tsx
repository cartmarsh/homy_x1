// implement Footer component

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

interface FooterProps {
    className?: string;
    children?: React.ReactNode; // Include children prop of type React.ReactNode
  }

const Footer: React.FC<FooterProps> = ({ className, children }) => {
  return (
    <footer className={`relative h-10 bg-gray-100 text-white p-8 ${className}`}>
      {/* Canvas as Background */}
      <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere visible args={[1, 32, 32]} scale={1}>
          <MeshDistortMaterial
            color="#0077ff"
            attach="material"
            distort={0.1}
            speed={2}
          />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center">
        {children}
        <p className="text-sm mb-4 text-neutral-400">
          © {new Date().getFullYear()} Dominik. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 text-neutral-400">
          <a
            href="/privacy-policy"
            className="hover:underline transition duration-300 text-neutral-400" // Changed color to match "All rights reserved"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="/terms-of-service"
            className="hover:underline transition duration-300 text-neutral-400" // Changed color to match "All rights reserved"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}


export default Footer;

