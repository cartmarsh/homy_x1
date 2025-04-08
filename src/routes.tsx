import { lazy, Suspense } from 'react';
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

export function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <Suspense fallback={
            <RetroLoader 
              duration={2670} 
              {...routeLoaders.home} 
            />
          }>
            <HomePage />
          </Suspense>
        } 
      />
      <Route 
        path="/portfolio" 
        element={
          <Suspense fallback={
            <RetroLoader 
              duration={2670} 
              {...routeLoaders.portfolio} 
            />
          }>
            <PortfolioPage />
          </Suspense>
        } 
      />
      <Route 
        path="/about" 
        element={
          <Suspense fallback={
            <RetroLoader 
              duration={2670} 
              {...routeLoaders.about} 
            />
          }>
            <AboutPage />
          </Suspense>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <Suspense fallback={
            <RetroLoader 
              duration={2670} 
              {...routeLoaders.contact} 
            />
          }>
            <ContactPage />
          </Suspense>
        } 
      />
      <Route 
        path="/404" 
        element={
          <Suspense fallback={<RetroLoader duration={2670} />}>
            <NotFoundPage />
          </Suspense>
        } 
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes; 