/**
 * W3C Digital Network Analytics Manager
 * 
 * Centralized service to handle privacy-friendly telemetry, Google Analytics 4 (GA4),
 * Google Search Console verification, and Microsoft Clarity recordings.
 */

// Extend window interface for third-party scripts
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

// Environment variables with fallback support
const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || '';
const CLARITY_PROJECT_ID = (import.meta.env.VITE_CLARITY_PROJECT_ID as string) || '';
const GSC_VERIFICATION_ID = (import.meta.env.VITE_GSC_VERIFICATION_ID as string) || '';

// Logger helper for development feedback
const logDev = (message: string, ...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(
      `%c[Analytics]%c ${message}`,
      'color: #22c55e; font-weight: bold; background: rgba(34, 197, 94, 0.1); padding: 2px 6px; rounded: 4px;',
      'color: inherit;',
      ...args
    );
  }
};

/**
 * Initializes all tracking scripts programmatically to keep index.html clean and modular.
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  logDev('Initializing telemetry integrations...');

  // 1. Google Search Console Verification Meta Tag
  if (GSC_VERIFICATION_ID) {
    try {
      if (!document.querySelector('meta[name="google-site-verification"]')) {
        const meta = document.createElement('meta');
        meta.name = 'google-site-verification';
        meta.content = GSC_VERIFICATION_ID;
        document.head.appendChild(meta);
        logDev('Google Search Console verification meta-tag injected.');
      }
    } catch (e) {
      console.error('Failed to inject GSC verification meta tag:', e);
    }
  }

  // 2. Google Analytics 4 (gtag.js)
  if (GA_MEASUREMENT_ID) {
    try {
      // Inject script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize global helper functions
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        if (window.dataLayer) {
          window.dataLayer.push(arguments);
        }
      };

      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // Page views are tracked manually below to support SPAs correctly
        cookie_flags: 'SameSite=None;Secure', // Security guidelines
      });

      logDev(`GA4 script initialized with ID: ${GA_MEASUREMENT_ID}`);
    } catch (e) {
      console.error('Failed to initialize Google Analytics 4:', e);
    }
  } else {
    logDev('GA_MEASUREMENT_ID not configured. GA4 tracking is simulated in dev mode.');
  }

  // 3. Microsoft Clarity
  if (CLARITY_PROJECT_ID) {
    try {
      // Injection snippet provided by Microsoft Clarity
      (function (c: any, l: Document, a: string, r: string, i: string, t?: any, y?: any) {
        c[a] = c[a] || function (...args: any[]) { (c[a].q = c[a].q || []).push(args) };
        t = l.createElement(r) as any; t.async = true; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        }
      })(window, document, "clarity", "script", CLARITY_PROJECT_ID);

      logDev(`Microsoft Clarity recording initialized with ID: ${CLARITY_PROJECT_ID}`);
    } catch (e) {
      console.error('Failed to initialize Microsoft Clarity:', e);
    }
  } else {
    logDev('CLARITY_PROJECT_ID not configured. Clarity recording is offline.');
  }
};

/**
 * Tracks SPA-based page navigation.
 * @param path The relative URL path of the page
 */
export const trackPageView = (path: string) => {
  if (typeof window === 'undefined') return;

  logDev(`Page View: ${path}`);

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

/**
 * Sends a custom analytics event.
 */
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window === 'undefined') return;

  logDev(`Event Tracked - Action: "${action}" | Category: "${category}" | Label: "${label || 'N/A'}"`, value !== undefined ? `| Value: ${value}` : '');

  if (window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Track custom contact link clicks
 */
export const trackContactClick = (platform: string, context: string = 'General') => {
  trackEvent('contact_click', 'Engagement', `${platform} - ${context}`);
};

/**
 * Track WhatsApp community join clicks
 */
export const trackCommunityJoin = (location: string = 'Home Page') => {
  trackEvent('community_join_click', 'Engagement', location);
};

/**
 * Track W3C DESK Crypto P2P enquiries and calculator interaction
 */
export const trackDeskEnquiry = (asset: string, actionType: 'buy' | 'sell', amount: number) => {
  trackEvent('p2p_calculator_calculate', 'Desk Operation', `${actionType.toUpperCase()} ${asset}`, amount);
};

/**
 * Track Website project pricing/contact enquiries
 */
export const trackWebsiteProjectEnquiry = (planName: string) => {
  trackEvent('web_development_enquiry', 'Business Service', planName);
};
