import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  primaryText: string;
  accentText: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ primaryText, accentText }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 1 : prev);
    }, 50);

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#2d1b69] flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md space-y-4 p-4">
        <div className="text-cyan-400 font-mono text-2xl mb-2">
          {primaryText}{dots}
        </div>
        
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-sm text-cyan-300 font-mono opacity-70">
          {accentText}
        </div>
        
        <div className="text-right text-cyan-400 font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 