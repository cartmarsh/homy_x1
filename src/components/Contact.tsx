import React from 'react';
import ContentSection from './layout/ContentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface ContactProps {
    className?: string;
    id?: string;
}

const Contact: React.FC<ContactProps> = ({ className, id }) => {
    return (
        <ContentSection id={id} className={className}>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">Contact Me</h2>

                {/* Social Icons */}
                <div className="flex justify-center space-x-8 mb-8">
                    <a 
                        href="https://linkedin.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faLinkedin} size="3x" />
                    </a>
                    <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-800 hover:text-gray-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faGithub} size="3x" />
                    </a>
                    <a 
                        href="mailto:dominik@example.com" 
                        className="text-gray-800 hover:text-red-600 transition-colors duration-300"
                    >
                        <FontAwesomeIcon icon={faEnvelope} size="3x" />
                    </a>
                </div>

                {/* Contact Info */}
                <div className="text-center">
                    <p className="text-xl text-gray-700 mb-4">
                        Feel free to reach out for collaborations or just a friendly hello
                    </p>
                    <p className="text-gray-600">
                        Email: dominik@example.com
                    </p>
                </div>
            </div>
        </ContentSection>
    );
};

export default Contact;

