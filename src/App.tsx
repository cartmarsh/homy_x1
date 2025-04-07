import './App.css';
import NavBar from './components/NavBar/NavBar';
import BackgroundStringsThree from './components/animations/BackgroundStringsThree';
import { lazy } from 'react';
import LoadingWrapper from './components/LoadingWrapper';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#2d1b69]">
      
      
      {/* Main content with higher z-index */}
      <LoadingWrapper
        duration={9000}
        primaryText="HELLO WORLD"
        accentText="..."
      >
          {/* Background animation */}
        <BackgroundStringsThree />
        
        {/* NavBar with higher z-index */}
        <div className="relative z-50">
          <NavBar />
        </div>
        <main className="snap-container w-full h-full overflow-y-auto relative z-10">
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
