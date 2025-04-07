import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#2d1b69] text-cyan-400 p-4">
      <div className="glitch-text text-6xl md:text-8xl font-mono mb-8">404</div>
      
      <div className="text-xl md:text-2xl font-mono mb-8 text-center">
        <div className="mb-2">SYSTEM ERROR:</div>
        <div className="text-red-500">PAGE_NOT_FOUND</div>
      </div>

      <div className="font-mono text-sm md:text-base text-center max-w-md mb-8">
        The requested directory could not be located in the system. 
        Please verify the path and try again.
      </div>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-transparent border-2 border-cyan-400 
                 text-cyan-400 hover:bg-cyan-400 hover:text-[#2d1b69] 
                 transition-all duration-300 font-mono"
      >
        RETURN_TO_HOME
      </button>
    </div>
  );
};

export default NotFoundPage; 