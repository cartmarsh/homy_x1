import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './RetroLoader.css';
import useTimeout from '../../hooks/useTimeout';
import useByteElementsLoaderMemo from '../../hooks/useByteElementsLoaderMemo';
import Whirlwind from './Whirlwind';

interface RetroLoaderProps {
  duration?: number; // Duration in milliseconds
  primaryText?: string; // Text to display as the main loading text
  accentText?: string; // Text to display as the secondary loading text
  logoSrc?: string; // Optional logo to display above the loading text
}

const RetroLoader: React.FC<RetroLoaderProps> = ({
  duration = 3000,
  primaryText = "HELLO WORLD",
  accentText = "...",
  logoSrc
}) => {
  const { isVisible } = useTimeout({ duration });
  const byteElements = useByteElementsLoaderMemo(accentText);
  const [isImploding, setIsImploding] = useState(false);

  // Start implosion effect when timeout is about to end
  useEffect(() => {
    const implodeTimer = setTimeout(() => {
      setIsImploding(true);
    }, Math.max(0, duration - 1000)); // Start implosion 1 second before the end

    return () => clearTimeout(implodeTimer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="retro-loader-container">
      <div className="three-container">
        <Canvas camera={{ position: [0, 0, 2], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <Whirlwind duration={duration} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      <div className={`retro-loader-content ${isImploding ? 'imploding' : ''}`}>
        {logoSrc && (
          <div className="retro-loader-logo">
            <img src={logoSrc} alt="Logo" />
          </div>
        )}
        <div className="retro-loading-text">{primaryText}</div>
        <div className="retro-loading-bytes">{byteElements}</div>
      </div>
    </div>
  );
};

export default RetroLoader; 