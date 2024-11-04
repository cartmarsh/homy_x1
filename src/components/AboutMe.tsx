import React from 'react'

interface AboutMeProps {
    className?: string;
    children?: React.ReactNode; // Include children prop of type React.ReactNode
}

const AboutMe: React.FC<AboutMeProps> = ({ className, children }) => {
    return (
        <section className={`p-6 sm:p-8 bg-skyBlue rounded-lg shadow-md max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto ${className}`}>

            {/* Section Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">About Me</h2>

            {/* Background Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Background</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    With a strong passion for technology and design, Dominik has been developing and refining his skills in web development and UX design. With hands-on experience across various projects, he’s focused on crafting meaningful digital experiences.
                </p>
            </div>

            {/* Education Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Education</h3>
                <ul className="space-y-4">
                    <li className="text-gray-600 text-sm sm:text-base">
                        <strong>Bachelor of Science in Computer Science</strong> - University of Technology, 2018
                    </li>
                    <li className="text-gray-600 text-sm sm:text-base">
                        <strong>Certified UX Designer</strong> - UX Design Institute, 2020
                    </li>
                </ul>
            </div>

            {/* Notable Achievements Section */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Notable Achievements</h3>
                <ul className="space-y-4 pl-4 list-disc text-gray-600 text-sm sm:text-base">
                    <li>Led the design and development of a high-traffic e-commerce site, improving user engagement by 30%.</li>
                    <li>Published an article in a renowned tech magazine on the importance of accessibility in web design.</li>
                    <li>Awarded “Developer of the Year” at XYZ Company for exceptional contributions to product development.</li>
                </ul>
            </div>

            {/* Timeline Layout for Achievements (Optional Enhancement) */}
            <div className="relative border-l-2 border-blue-500 ml-4 pl-4">
                {/* Timeline Entry 1 */}
                <div className="mb-6 relative">
                    {/* Circular Marker */}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-5 top-1"></div>
                    <p className="text-sm sm:text-base font-semibold">2020 - Published in Tech Magazine</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Featured article on accessibility in design.
                    </p>
                </div>

                {/* Timeline Entry 2 */}
                <div className="mb-6 relative">
                    {/* Circular Marker */}
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-5 top-1"></div>
                    <p className="text-sm sm:text-base font-semibold">2018 - Graduated from University of Technology</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Completed B.Sc. in Computer Science with honors.
                    </p>
                </div>
            </div>
            {children}
        </section>
    )
}


export default AboutMe;

