
import { useEffect } from 'react';

interface AnalyticsEvent {
  event: string;
  landingPageId: string;
  timestamp: number;
  data?: any;
}

export const useLandingAnalytics = (landingPageId: string) => {
  useEffect(() => {
    // Track page view
    trackEvent('page_view', landingPageId);

    // Track time on page
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      trackEvent('time_on_page', landingPageId, { duration: timeOnPage });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [landingPageId]);

  const trackEvent = (event: string, landingPageId: string, data?: any) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      landingPageId,
      timestamp: Date.now(),
      data
    };

    // Log to console for now (replace with actual analytics service)
    console.log('Analytics Event:', analyticsEvent);

    // Store in localStorage for basic tracking
    const existingEvents = JSON.parse(localStorage.getItem('landing_analytics') || '[]');
    existingEvents.push(analyticsEvent);
    localStorage.setItem('landing_analytics', JSON.stringify(existingEvents));
  };

  const trackCTAClick = (ctaName: string, destination: string) => {
    trackEvent('cta_click', landingPageId, { ctaName, destination });
  };

  const trackScroll = (scrollDepth: number) => {
    trackEvent('scroll_depth', landingPageId, { scrollDepth });
  };

  return {
    trackEvent,
    trackCTAClick,
    trackScroll
  };
};
