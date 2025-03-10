import './App.css';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import NavBar from './components/NavBar/NavBar';
import BackgroundStrings from './components/animations/BackgroundStrings';
import RetroLoader from './components/animations/RetroLoader';

function App() {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#2d1b69]">
      {/* Retro Loader */}
      <RetroLoader 
        duration={1500} 
        primaryText="WELCOME" 
        accentText="LOADING PORTFOLIO..." 
      />
      
      {/* Background animation */}
      <BackgroundStrings />
      
      {/* NavBar with higher z-index */}
      <div className="relative z-50">
        <NavBar />
      </div>
      
      {/* Main content with higher z-index */}
      <main className="snap-container w-full h-full overflow-y-auto relative z-10">
        <Hero id="home" />
        <Portfolio id="portfolio" />
        <AboutMe id="about" />
        <Contact id="contact" className="bg-transparent" isLastSection={true} />
      </main>  
      
    </div>
  );
}

export default App;
