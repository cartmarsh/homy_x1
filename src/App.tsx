import React from 'react';
import './App.css';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar />
        <div className="snap-container">
          <Hero className="hero" />
          <Portfolio className="portfolio" />
          <AboutMe className="aboutMe" id="aboutMe" />
          <Contact className="contact" id="contact" />
          <Footer className="footer" />
        </div>
    </>
  );
}

export default App;
