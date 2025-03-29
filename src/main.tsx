import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { GetStarted } from './pages/GetStarted';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/* Google Analytics component to track page views */}
        <GoogleAnalytics />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
