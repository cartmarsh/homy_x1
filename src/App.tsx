import './App.css';
import NavBar from './components/NavBar/NavBar';
import BackgroundStringsThree from './components/animations/BackgroundStringsThree';
import { lazy, useEffect, useState, useRef } from 'react';
import LoadingWrapper from './components/LoadingWrapper';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scrollTimeout = useRef<number | null>(null);
  
  // Calculate and set navbar height for CSS variables
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height);
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
      }
    };
    
    // Initial calculation
    updateNavbarHeight();
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  // Enhanced wheel event handler for smoother scrolling
  useEffect(() => {
    if (!mainRef.current) return;
    
    const mainElement = mainRef.current;
    let lastScrollTime = 0;
    const scrollThreshold = 400; // Reduced from 500ms to match faster transitions
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Ignore rapid scrolling
      if (now - lastScrollTime < scrollThreshold) {
        e.preventDefault();
        return;
      }
      
      // If already in a scroll animation, prevent new scrolls
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 10) return; // Ignore small scrolls
      
      // Find all sections
      const sections = document.querySelectorAll('section[id]');
      if (!sections.length) return;
      
      // Determine which section is currently in view
      const viewportMiddle = window.innerHeight / 2;
      let activeSection = null;
      let closestDistance = Infinity;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(sectionMiddle - viewportMiddle);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          activeSection = section;
        }
      });
      
      if (!activeSection) return;
      
      // Find next/previous section
      const sectionArray = Array.from(sections);
      const currentIndex = sectionArray.indexOf(activeSection);
      const direction = deltaY > 0 ? 1 : -1;
      const targetIndex = currentIndex + direction;
      
      // Don't scroll beyond first or last section
      if (targetIndex < 0 || targetIndex >= sections.length) {
        return;
      }
      
      e.preventDefault();
      setIsScrolling(true);
      
      // Add smooth scrolling class
      mainElement.classList.add('smooth-scrolling');
      
      // Get target section and scroll to it
      const targetSection = sections[targetIndex];
      
      // Scroll using both methods for better compatibility
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      
      // Set a new timeout for the current scroll
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
        mainElement.classList.remove('smooth-scrolling');
        lastScrollTime = Date.now();
      }, 1000); // Reduced from 1500ms to match CSS animation duration and work with our faster transitions
    };
    
    // Add the wheel event listener with passive: false to allow preventDefault
    mainElement.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      mainElement.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, [mainRef, isScrolling]);

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
          <Contact id="contact" className="bg-transparent" isLastSection={true} />
        </main>
      </LoadingWrapper>
    </div>
  );
}

export default App;
