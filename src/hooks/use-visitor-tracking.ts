
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitorTrackingData {
  dealId?: string;
  pageUrl: string;
  referrerUrl?: string;
}

export const useVisitorTracking = ({ dealId, pageUrl, referrerUrl }: VisitorTrackingData) => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Generate a session ID if not exists
        let sessionId = sessionStorage.getItem('visitor_session_id');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          sessionStorage.setItem('visitor_session_id', sessionId);
        }

        // Get basic device/browser info
        const userAgent = navigator.userAgent;
        const getDeviceType = () => {
          if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'Mobile';
          if (/Tablet|iPad/.test(userAgent)) return 'Tablet';
          return 'Desktop';
        };

        const getBrowser = () => {
          if (userAgent.includes('Chrome')) return 'Chrome';
          if (userAgent.includes('Firefox')) return 'Firefox';
          if (userAgent.includes('Safari')) return 'Safari';
          if (userAgent.includes('Edge')) return 'Edge';
          return 'Other';
        };

        const getOS = () => {
          if (userAgent.includes('Windows')) return 'Windows';
          if (userAgent.includes('Mac')) return 'macOS';
          if (userAgent.includes('Linux')) return 'Linux';
          if (userAgent.includes('Android')) return 'Android';
          if (userAgent.includes('iOS')) return 'iOS';
          return 'Other';
        };

        // Track the visit
        const { error } = await supabase
          .from('visitor_tracking')
          .insert({
            deal_id: dealId || null,
            page_url: pageUrl,
            referrer_url: referrerUrl || document.referrer || null,
            session_id: sessionId,
            visitor_device: getDeviceType(),
            visitor_browser: getBrowser(),
            visitor_os: getOS(),
          });

        if (error) {
          console.error('Error tracking visit:', error);
        } else {
          console.log('Visit tracked successfully');
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    trackVisit();
  }, [dealId, pageUrl, referrerUrl]);
};
