import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactProps {
    className?: string;
    children?: React.ReactNode; // Include children prop of type React.ReactNode
}

const Contact: React.FC<ContactProps> = ({ className, children }) => {
    return (
        <section className={`relative p-8 bg-gray-100 w-full rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row ${className}`}>
            {/* Three.js Background Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[2, 2, 5]} />
                    <Sphere visible args={[1.2, 32, 32]} scale={2}>
                        <MeshDistortMaterial color="#c8cde0" attach="material" distort={0.3} speed={2} />
                    </Sphere>
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </div>

            {/* Contact Content */}
            <div className="relative z-10 flex flex-col justify-between w-full md:w-1/2 p-6">
                {/* Contact Form */}
                <form className="space-y-4">
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
                        <textarea id="message" rows="4" className="w-full p-2 rounded-md border border-gray-300 focus:border-blue-500 outline-none"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Send Message</button>
                </form>
            </div>

            {/* Right Content */}
            <div className="relative z-10 flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-center">
                {/* Section Title */}
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Me</h2>

                {/* Social Icons */}
                <div className="flex justify-center space-x-6 mb-6">
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
            {children}
        </section>
    );
}


export default Contact;

