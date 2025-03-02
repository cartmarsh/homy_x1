import React from 'react';
import './App.css';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NavBar from './components/NavBar/NavBar';
import BackgroundStrings from './components/animations/BackgroundStrings';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#2d1b69]">
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
        <Contact id="contact" />
        <Footer />
      </main>  
      
    </div>
  );
}

export default App;
