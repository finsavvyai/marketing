import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-F33P0YTNHJ'; // PipeWarden GA4 tracking ID

// Interface for window with gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const pageview = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: path,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }: { 
  action: string; 
  category: string; 
  label?: string; 
  value?: number; 
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Google Analytics Component that integrates with React Router
export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Load GA script dynamically
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize GA
    initGA();

    return () => {
      // Cleanup - remove the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  // Track page views when location changes
  useEffect(() => {
    pageview(location.pathname + location.search);
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;
