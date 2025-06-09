
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface VisitorStats {
  totalVisitors: number;
  uniqueVisitors: number;
  totalPageViews: number;
  topDeals: Array<{
    deal_name: string;
    visit_count: number;
    unique_visitors: number;
  }>;
  visitorCountries: Array<{
    country: string;
    visit_count: number;
  }>;
  trafficSources: Array<{
    source: string;
    visit_count: number;
  }>;
}

export const useAnalytics = (dateRange?: { from: string; to: string }) => {
  return useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async (): Promise<VisitorStats> => {
      let query = supabase
        .from('visitor_tracking')
        .select('*');

      if (dateRange) {
        query = query
          .gte('created_at', dateRange.from)
          .lte('created_at', dateRange.to);
      }

      const { data: visits, error } = await query;

      if (error) throw error;

      // Calculate basic stats
      const totalVisitors = visits?.length || 0;
      const uniqueVisitors = new Set(visits?.map(v => v.visitor_ip)).size;
      const totalPageViews = visits?.length || 0;

      // Get deal stats
      const dealVisits = visits?.filter(v => v.deal_id) || [];
      const dealStats = dealVisits.reduce((acc, visit) => {
        const key = visit.deal_id;
        if (!acc[key]) {
          acc[key] = {
            deal_id: visit.deal_id,
            visits: [],
          };
        }
        acc[key].visits.push(visit);
        return acc;
      }, {} as Record<string, any>);

      // Get deal names
      const dealIds = Object.keys(dealStats);
      let topDeals: any[] = [];
      
      if (dealIds.length > 0) {
        const { data: deals } = await supabase
          .from('deals')
          .select('id, deal_name')
          .in('id', dealIds);

        topDeals = Object.entries(dealStats)
          .map(([dealId, stats]: [string, any]) => {
            const deal = deals?.find(d => d.id === dealId);
            return {
              deal_name: deal?.deal_name || 'Unknown Deal',
              visit_count: stats.visits.length,
              unique_visitors: new Set(stats.visits.map((v: any) => v.visitor_ip)).size,
            };
          })
          .sort((a, b) => b.visit_count - a.visit_count)
          .slice(0, 10);
      }

      // Calculate country stats
      const countryStats = visits?.reduce((acc, visit) => {
        const country = visit.visitor_country || 'Unknown';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const visitorCountries = Object.entries(countryStats)
        .map(([country, count]) => ({ country, visit_count: count }))
        .sort((a, b) => b.visit_count - a.visit_count)
        .slice(0, 10);

      // Calculate traffic sources
      const sourceStats = visits?.reduce((acc, visit) => {
        let source = 'Direct';
        if (visit.referrer_url) {
          if (visit.referrer_url.includes('google')) source = 'Google';
          else if (visit.referrer_url.includes('linkedin')) source = 'LinkedIn';
          else if (visit.referrer_url.includes('twitter')) source = 'Twitter';
          else source = 'Other';
        }
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      const trafficSources = Object.entries(sourceStats)
        .map(([source, count]) => ({ source, visit_count: count }))
        .sort((a, b) => b.visit_count - a.visit_count);

      return {
        totalVisitors,
        uniqueVisitors,
        totalPageViews,
        topDeals,
        visitorCountries,
        trafficSources,
      };
    },
  });
};

export const useDailyReports = () => {
  return useQuery({
    queryKey: ['daily-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('daily_reports')
        .select('*')
        .order('report_date', { ascending: false })
        .limit(30);

      if (error) throw error;
      return data;
    },
  });
};
