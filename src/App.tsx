import './App.css';
import NavBar from './components/NavBar/NavBar';
import BackgroundStringsThree from './components/animations/BackgroundStringsThree';
import { lazy, useEffect, useState, useRef, Suspense } from 'react';
import LoadingWrapper from './components/LoadingWrapper';
import { useSmoothScroll } from './hooks/useSmoothScroll';
// Import Hero component directly for faster initial load
import Hero from './components/Hero/Hero';

// Lazy load other components that aren't needed immediately
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
  useSmoothScroll(mainRef, {
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
        duration={5000}
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
          {/* Hero is loaded directly */}
          <Hero id="home" />
          
          {/* Other sections are lazy loaded */}
          <Suspense fallback={null}>
            <Portfolio id="portfolio" />
            <AboutMe id="about" />
            <Contact id="contact" className="bg-transparent" />
          </Suspense>
        </main>
      </LoadingWrapper>
    </div>
  );
}

export default App;
