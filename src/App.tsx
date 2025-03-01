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
    <div className="h-screen w-screen overflow-hidden bg-[#2d1b69]">
      <NavBar className="fixed top-0 left-0 right-0 z-50" />
      <main className="snap-container w-full bg-[#2d1b69]">
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
