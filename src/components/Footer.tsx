'use client';

import React from 'react';
import ContentSection from './layout/ContentSection';

interface FooterProps {
  className?: string;
  children?: React.ReactNode;
  isLastSection?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  className,
  children,
  isLastSection = false
}) => {
  return (
    <ContentSection 
      className={`relative min-h-[150px] overflow-hidden ${className}`}
      isLastSection={isLastSection}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-300/20 to-pink-300/20">
        {/* Moving gradient overlay */}
        <div className="absolute inset-0 animate-gradient-xy opacity-80">
          <div className="absolute inset-0 bg-[size:400%_400%] bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300" />
        </div>
        
        {/* Pulsating blobs with moving gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[500px] h-[500px] scale-150">
            {/* Primary blob with moving gradient */}
            <div className="absolute inset-0 animate-blob-pulse-intense 
              mix-blend-multiply filter blur-md bg-[size:200%_200%]
              bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 rounded-full 
              border border-white/10 animate-gradient-shift" 
            />
            {/* Secondary blob with different gradient */}
            <div className="absolute inset-0 animate-blob-pulse-intense animation-delay-1000 
              mix-blend-multiply filter blur-md bg-[size:200%_200%]
              bg-gradient-to-r from-rose-300 via-pink-300 to-purple-400 rounded-full 
              border border-white/10 animate-gradient-shift-reverse" 
            />
            {/* Tertiary blob */}
            <div className="absolute inset-0 animate-blob-pulse-intense animation-delay-2000 
              mix-blend-multiply filter blur-md bg-[size:200%_200%]
              bg-gradient-to-r from-blue-300 via-teal-300 to-emerald-400 rounded-full 
              border border-white/10 animate-gradient-shift" 
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col min-h-[150px]">
          {children}
          
          {/* Footer Links - Positioned bottom right */}
          <div className="mt-auto ml-auto text-right pb-3 pr-3">
            <p className="text-xs mb-1 text-neutral-700 font-medium">
              © {new Date().getFullYear()} Dominik. All rights reserved.
            </p>
            <div className="flex justify-end space-x-3 text-neutral-700">
              <a
                href="/privacy-policy"
                className="text-xs hover:text-neutral-900 transition duration-300"
              >
                Privacy Policy
              </a>
              <span className="text-xs">|</span>
              <a
                href="/terms-of-service"
                className="text-xs hover:text-neutral-900 transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </ContentSection>
  );
};

export default Footer;

