import './App.css';
import NavBar from './components/NavBar/NavBar';
import BackgroundStringsThree from './components/animations/BackgroundStringsThree';
import { lazy, useEffect, useState, useRef } from 'react';
import LoadingWrapper from './components/LoadingWrapper';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Update navbar height on resize
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  // Use our custom smooth scroll hook
  const { isScrolling } = useSmoothScroll(mainRef, {
    scrollThreshold: 400,
    animationDuration: 1000,
    minDeltaY: 10
  });

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#2d1b69]">
      {/* Background animation */}
      <BackgroundStringsThree />
      
      {/* Main content with higher z-index */}
      <LoadingWrapper
        duration={9000}
        primaryText="HELLO WORLD"
        accentText="..."
      >
        {/* NavBar with higher z-index */}
        <div className="relative z-50">
          <NavBar />
        </div>
        <main 
          ref={mainRef}
          className="snap-container w-full h-full overflow-y-auto relative z-10"
          style={{ 
            scrollPaddingTop: `${navbarHeight}px`, // Add padding for snap points
            height: '100vh' // Ensure full viewport height
          }}
        >
          <Hero id="home" />
          <Portfolio id="portfolio" />
          <AboutMe id="about" />
          <Contact id="contact" className="bg-transparent" />
        </main>
      </LoadingWrapper>
    </div>
  );
}

export default App;
