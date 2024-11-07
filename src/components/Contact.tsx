import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactProps {
    className?: string;
    children?: React.ReactNode; // Include children prop of type React.ReactNode
}

const Contact: React.FC<ContactProps> = ({ className, children, id }) => {
    const [navbarHeight, setNavbarHeight] = useState<number>(0);

    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('nav');
            if (navbar) {
                setNavbarHeight(navbar.offsetHeight);
            }
        };

        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);
        window.addEventListener('scroll', updateNavbarHeight);

        return () => {
            window.removeEventListener('resize', updateNavbarHeight);
            window.removeEventListener('scroll', updateNavbarHeight);
        };
    }, []);

    return (
        <section 
            className={`
                relative
                min-h-[calc(100vh-200px)]
                w-full
                bg-peach
                transition-colors duration-300
                scroll-snap-start
                section-base
                ${className}
            `}
            id={id}
            style={{ 
                paddingTop: `${navbarHeight}px`,
                paddingBottom: '20vh'
            }}
        >
            {/* Main content container with improved responsive layout */}
            <div className="flex flex-col md:flex-row w-full h-full gap-[5vw] p-[5vw]">
                {/* Left side - Contact Form */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold mb-[5vh] text-gray-800">
                        Contact Me
                    </h2>
                    
                    {/* Form with improved spacing */}
                    <form className="flex flex-col gap-[3vh] w-full">
                        <div>
                            <label htmlFor="name" className="block text-gray-600">Name</label>
                            <input type="text" id="name" className="w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-600">Email</label>
                            <input type="email" id="email" className="w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-600">Message</label>
                            <textarea 
                                id="message" 
                                rows={4}
                                className="w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                            Send Message
                        </button>
                    </form>

                    {/* Social Icons with responsive sizing */}
                    <div className="flex gap-[3vw] mt-[5vh]">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors duration-300">
                            <FontAwesomeIcon icon={faLinkedin} size="2x" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-700 transition-colors duration-300">
                            <FontAwesomeIcon icon={faGithub} size="2x" />
                        </a>
                        <a href="mailto:dominik@example.com" className="text-gray-800 hover:text-red-600 transition-colors duration-300">
                            <FontAwesomeIcon icon={faEnvelope} size="2x" />
                        </a>
                    </div>
                </div>

                {/* Right side - Three.js Canvas with responsive height */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-[60vh] relative">
                    <div className="absolute inset-0">
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[2, 2, 5]} intensity={0.8} />
                            <Sphere visible args={[1.4, 32, 32]} scale={1.5}>
                                <MeshDistortMaterial 
                                    color="#c8cde0" 
                                    attach="material" 
                                    distort={0.4} 
                                    speed={1.5} 
                                />
                            </Sphere>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                        </Canvas>
                    </div>
                </div>
            </div>
            {children}
        </section>
    );
}

export default Contact;

