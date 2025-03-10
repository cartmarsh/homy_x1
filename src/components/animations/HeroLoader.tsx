import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroLoader.css';

interface HeroLoaderProps {
  onComplete?: () => void;
  duration?: number;
  profileImage?: string;
}

const HeroLoader: React.FC<HeroLoaderProps> = ({ 
  onComplete, 
  duration = 2.5,
  profileImage
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [assemblyStage, setAssemblyStage] = useState(0);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // Update progress and assembly stages
  useEffect(() => {
    const totalSteps = 5; // Number of assembly stages
    const interval = (duration * 1000) / 100; // Time for each 1% progress
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        
        // Update assembly stage based on progress
        if (newProgress >= 20 && assemblyStage < 1) setAssemblyStage(1);
        if (newProgress >= 40 && assemblyStage < 2) setAssemblyStage(2);
        if (newProgress >= 60 && assemblyStage < 3) setAssemblyStage(3);
        if (newProgress >= 80 && assemblyStage < 4) setAssemblyStage(4);
        if (newProgress >= 95 && assemblyStage < 5) setAssemblyStage(5);
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          
          // Show the final animation for 0.5s before completing
          setShowFinalAnimation(true);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 800);

          // Hide the loading state after 1.5 seconds
          setTimeout(() => {
            setShowLoading(false);
          }, 1500);
        }
        
        return newProgress;
      });
    }, interval);

    return () => {
      clearInterval(progressTimer);
    };
  }, [duration, onComplete, assemblyStage]);

  // Assembly messages based on stage
  const stageMessages = [
    "Initializing...",
    "Generating grid system...",
    "Building profile section...",
    "Calibrating visual effects...",
    "Finalizing hero assembly...",
    "Complete!"
  ];

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.08,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const gridVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      opacity: 0.6,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const profileVariants = {
    hidden: { 
      opacity: 0,
      x: -50,
      rotateY: -30
    },
    visible: { 
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    complete: {
      scale: showFinalAnimation ? [1, 1.05, 1] : 1,
      boxShadow: showFinalAnimation ? "0 0 30px rgba(6, 182, 212, 0.8)" : "0 0 15px rgba(6, 182, 212, 0.5)",
      transition: {
        scale: { duration: 0.8, times: [0, 0.5, 1] },
        boxShadow: { duration: 0.8 }
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const scanlineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 0.15,
      transition: { 
        delay: 0.7,
        duration: 0.3
      }
    }
  };

  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [0, 0.7, 0.3, 0.5, 0.7, 0.2],
      transition: { 
        delay: 0.9,
        duration: 0.5,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    },
    complete: {
      opacity: showFinalAnimation ? [0.05, 0.2, 0.05, 0.3, 0.05] : [0.05, 0.08, 0.03],
      x: showFinalAnimation ? [-3, 3, -2, 4, 0] : [0, -2, 2, -1, 0],
      transition: {
        opacity: { duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] },
        x: { duration: 0.8, times: [0, 0.25, 0.5, 0.75, 1] }
      }
    }
  };

  // Random "code" elements for the assembly animation
  const codeElements = [
    'init.sequence()',
    'await canvas.render()',
    'profile.connect()',
    'grid.optimize()',
    'effects.calibrate()',
    'hero.compile()',
  ];

  return (
    <AnimatePresence>
      {!isComplete && showLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Grid background */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            variants={gridVariants}
            animate={{ 
              opacity: assemblyStage >= 1 ? (showFinalAnimation ? [0.6, 0.8, 0.6] : 0.6) : 0,
              scale: assemblyStage >= 1 ? (showFinalAnimation ? [1, 1.05, 1] : 1) : 0.8,
              transition: {
                opacity: showFinalAnimation ? { duration: 0.8, times: [0, 0.5, 1] } : {},
                scale: showFinalAnimation ? { duration: 0.8, times: [0, 0.5, 1] } : {}
              }
            }}
          >
            <div className="grid-background w-full h-full opacity-60" />
          </motion.div>

          {/* Scanlines */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            variants={scanlineVariants}
            animate={{ 
              opacity: assemblyStage >= 3 ? 0.15 : 0
            }}
          >
            <div className="scanlines w-full h-full" />
          </motion.div>

          {/* Glitch effect overlay */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            variants={glitchVariants}
            animate={
              assemblyStage >= 5 && showFinalAnimation 
                ? "complete" 
                : { 
                    opacity: assemblyStage >= 3 ? [0.05, 0.08, 0.03] : 0,
                    x: assemblyStage >= 3 ? [0, -2, 2, -1, 0] : 0,
                    transition: {
                      opacity: { duration: 0.3, repeat: Infinity, repeatType: "reverse" },
                      x: { duration: 0.2, repeat: Infinity, repeatType: "mirror" }
                    }
                  }
            }
          >
            <div className="noise w-full h-full" />
          </motion.div>

          {/* Assembly animation */}
          <motion.div 
            className="absolute top-6 right-6 text-xs text-cyan-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
          >
            {codeElements.slice(0, assemblyStage + 1).map((code, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  color: index === 5 && showFinalAnimation ? "#4ade80" : "#22d3ee"
                }}
                transition={{ delay: index * 0.2 }}
              >
                &gt; {code}
                {index === assemblyStage && !showFinalAnimation && (
                  <span className="ml-1 animate-pulse">_</span>
                )}
                {index === 5 && showFinalAnimation && (
                  <span className="ml-1 text-green-400"> ✓</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Content container with fixed dimensions */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 h-56 md:h-64">
              {/* Profile picture - with fixed height/width/position */}
              <div className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0">
                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden border-4 border-cyan-400"
                  variants={profileVariants}
                  animate={{ 
                    opacity: assemblyStage >= 2 ? 1 : 0,
                    x: assemblyStage >= 2 ? 0 : -50,
                    rotateY: assemblyStage >= 2 ? 0 : -30,
                    boxShadow: showFinalAnimation ? "0 0 30px rgba(6, 182, 212, 0.8)" : "0 0 15px rgba(6, 182, 212, 0.5)",
                    scale: showFinalAnimation ? [1, 1.05, 1] : 1,
                    transition: showFinalAnimation ? {
                      scale: { duration: 0.8, times: [0, 0.5, 1] },
                      boxShadow: { duration: 0.8 }
                    } : {}
                  }}
                  style={{
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.5)'
                  }}
                >
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-700" />
                  )}
                </motion.div>
              </div>

              {/* Text content - with fixed dimensions */}
              <div className="w-full md:w-auto flex-grow">
                <motion.div 
                  className="text-center md:text-left"
                  variants={textVariants}
                >
                  <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-white mb-2 min-h-[3rem]"
                    animate={{ 
                      opacity: assemblyStage >= 2 ? 1 : 0.3,
                      filter: assemblyStage >= 4 ? "none" : "blur(2px)",
                      scale: showFinalAnimation ? [1, 1.05, 1] : 1,
                      transition: showFinalAnimation ? {
                        scale: { duration: 0.8, times: [0, 0.5, 1] }
                      } : {}
                    }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      {assemblyStage >= 4 
                        ? (showFinalAnimation ? "Launch" : "Hero Ready") 
                        : "Assembling..."}
                    </span>
                  </motion.h1>
                  
                  <motion.div 
                    className="h-1 w-32 md:w-48 bg-gradient-to-r from-cyan-400 to-purple-600 mb-4"
                    animate={{
                      width: showFinalAnimation 
                        ? "100%" 
                        : [
                            "0%", 
                            assemblyStage >= 1 ? "30%" : "0%",
                            assemblyStage >= 2 ? "60%" : "30%",
                            assemblyStage >= 3 ? "80%" : "60%",
                            assemblyStage >= 4 ? "100%" : "80%"
                          ],
                      opacity: showFinalAnimation ? [1, 1.5, 1] : 1,
                      transition: showFinalAnimation ? {
                        opacity: { duration: 0.8, times: [0, 0.5, 1] }
                      } : { duration: 0.3, ease: "easeOut" }
                    }}
                  />
                  
                  <motion.p 
                    className="text-gray-300 min-h-[1.5rem]"
                    animate={{
                      opacity: showFinalAnimation ? [0.7, 1, 0.7] : [0.7, 1, 0.7],
                      color: showFinalAnimation ? "#4ade80" : "#d1d5db",
                      transition: { 
                        repeat: showFinalAnimation ? 1 : Infinity, 
                        duration: showFinalAnimation ? 0.8 : 2,
                        repeatType: "mirror"
                      }
                    }}
                  >
                    {showFinalAnimation ? "Loading complete!" : stageMessages[assemblyStage]}
                  </motion.p>
                  
                  <motion.div 
                    className="mt-4 flex items-center gap-2 h-6"
                  >
                    <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          showFinalAnimation 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                            : "bg-gradient-to-r from-cyan-500 to-purple-500"
                        }`}
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: `${progress}%`,
                          boxShadow: showFinalAnimation ? "0 0 10px rgba(74, 222, 128, 0.7)" : "none"
                        }}
                        transition={{ ease: "easeOut" }}
                      />
                    </div>
                    <div className={`font-mono loading-percentage min-w-[3rem] ${
                      showFinalAnimation ? "text-green-400" : "text-cyan-400"
                    }`}>
                      {progress}%
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroLoader; 