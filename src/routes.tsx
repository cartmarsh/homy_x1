import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RetroLoader from './components/animations/RetroLoader';

// Lazy load route components
const HomePage = lazy(() => import('./components/Hero/Hero'));
const PortfolioPage = lazy(() => import('./components/Portfolio'));
const AboutPage = lazy(() => import('./components/AboutMe'));
const ContactPage = lazy(() => import('./components/Contact'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

// RetroLoader with different messages for different routes
const routeLoaders = {
  home: {
    primaryText: "LOADING HOME",
    accentText: "INITIALIZING MAIN INTERFACE..."
  },
  portfolio: {
    primaryText: "LOADING PORTFOLIO",
    accentText: "RETRIEVING PROJECT DATA..."
  },
  about: {
    primaryText: "LOADING ABOUT",
    accentText: "FETCHING PERSONAL DATA..."
  },
  contact: {
    primaryText: "LOADING CONTACT",
    accentText: "ESTABLISHING CONNECTION..."
  }
};

const AppRoutes = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={
          <RetroLoader
            primaryText={routeLoaders.home.primaryText}
            accentText={routeLoaders.home.accentText}
            duration={2670}
            progress={progress}
          />
        }>
          <HomePage />
        </Suspense>
      } />
      <Route path="/portfolio" element={
        <Suspense fallback={
          <RetroLoader
            primaryText={routeLoaders.portfolio.primaryText}
            accentText={routeLoaders.portfolio.accentText}
            duration={2670}
            progress={progress}
          />
        }>
          <PortfolioPage />
        </Suspense>
      } />
      <Route path="/about" element={
        <Suspense fallback={
          <RetroLoader
            primaryText={routeLoaders.about.primaryText}
            accentText={routeLoaders.about.accentText}
            duration={2670}
            progress={progress}
          />
        }>
          <AboutPage />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={
          <RetroLoader
            primaryText={routeLoaders.contact.primaryText}
            accentText={routeLoaders.contact.accentText}
            duration={2670}
            progress={progress}
          />
        }>
          <ContactPage />
        </Suspense>
      } />
      <Route path="/404" element={
        <Suspense fallback={<RetroLoader duration={2670} progress={progress} />}>
          <NotFoundPage />
        </Suspense>
      } />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes; 