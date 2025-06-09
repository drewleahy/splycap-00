
-- Create visitor tracking table
CREATE TABLE public.visitor_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
  visitor_ip TEXT,
  visitor_country TEXT,
  visitor_city TEXT,
  visitor_device TEXT,
  visitor_browser TEXT,
  visitor_os TEXT,
  referrer_url TEXT,
  page_url TEXT NOT NULL,
  session_id TEXT,
  visit_duration INTEGER DEFAULT 0, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_visitor_tracking_deal_id ON public.visitor_tracking(deal_id);
CREATE INDEX idx_visitor_tracking_created_at ON public.visitor_tracking(created_at);
CREATE INDEX idx_visitor_tracking_session_id ON public.visitor_tracking(session_id);

-- Enable Row Level Security
ALTER TABLE public.visitor_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Authenticated users can view visitor tracking" 
  ON public.visitor_tracking 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Anyone can insert visitor tracking" 
  ON public.visitor_tracking 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update visitor tracking" 
  ON public.visitor_tracking 
  FOR UPDATE 
  TO authenticated 
  USING (true);

-- Create daily reports table
CREATE TABLE public.daily_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_visitors INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  total_page_views INTEGER DEFAULT 0,
  top_deals JSONB,
  visitor_countries JSONB,
  traffic_sources JSONB,
  report_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(report_date)
);

-- Enable RLS for daily reports
ALTER TABLE public.daily_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view daily reports" 
  ON public.daily_reports 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create function to generate daily report data
CREATE OR REPLACE FUNCTION public.generate_daily_report(report_date DATE DEFAULT CURRENT_DATE - INTERVAL '1 day')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  report_data JSONB;
  total_visitors INTEGER;
  unique_visitors INTEGER;
  total_page_views INTEGER;
  top_deals JSONB;
  visitor_countries JSONB;
  traffic_sources JSONB;
BEGIN
  -- Calculate metrics for the specified date
  SELECT 
    COUNT(*) as total_views,
    COUNT(DISTINCT visitor_ip) as unique_ips,
    COUNT(*) as page_views
  INTO total_visitors, unique_visitors, total_page_views
  FROM public.visitor_tracking 
  WHERE DATE(created_at) = report_date;

  -- Get top deals by visits
  SELECT COALESCE(json_agg(deal_stats), '[]'::jsonb)
  INTO top_deals
  FROM (
    SELECT 
      d.deal_name,
      COUNT(vt.id) as visit_count,
      COUNT(DISTINCT vt.visitor_ip) as unique_visitors
    FROM public.visitor_tracking vt
    JOIN public.deals d ON vt.deal_id = d.id
    WHERE DATE(vt.created_at) = report_date
    GROUP BY d.id, d.deal_name
    ORDER BY visit_count DESC
    LIMIT 10
  ) deal_stats;

  -- Get visitor countries
  SELECT COALESCE(json_agg(country_stats), '[]'::jsonb)
  INTO visitor_countries
  FROM (
    SELECT 
      COALESCE(visitor_country, 'Unknown') as country,
      COUNT(*) as visit_count
    FROM public.visitor_tracking
    WHERE DATE(created_at) = report_date
    GROUP BY visitor_country
    ORDER BY visit_count DESC
    LIMIT 10
  ) country_stats;

  -- Get traffic sources
  SELECT COALESCE(json_agg(source_stats), '[]'::jsonb)
  INTO traffic_sources
  FROM (
    SELECT 
      CASE 
        WHEN referrer_url IS NULL OR referrer_url = '' THEN 'Direct'
        WHEN referrer_url LIKE '%google%' THEN 'Google'
        WHEN referrer_url LIKE '%linkedin%' THEN 'LinkedIn'
        WHEN referrer_url LIKE '%twitter%' THEN 'Twitter'
        ELSE 'Other'
      END as source,
      COUNT(*) as visit_count
    FROM public.visitor_tracking
    WHERE DATE(created_at) = report_date
    GROUP BY source
    ORDER BY visit_count DESC
  ) source_stats;

  -- Build comprehensive report data
  report_data := jsonb_build_object(
    'date', report_date,
    'total_visitors', total_visitors,
    'unique_visitors', unique_visitors,
    'total_page_views', total_page_views,
    'top_deals', top_deals,
    'visitor_countries', visitor_countries,
    'traffic_sources', traffic_sources
  );

  -- Insert or update the daily report
  INSERT INTO public.daily_reports (
    report_date, 
    total_visitors, 
    unique_visitors, 
    total_page_views, 
    top_deals, 
    visitor_countries, 
    traffic_sources, 
    report_data
  )
  VALUES (
    report_date,
    total_visitors,
    unique_visitors,
    total_page_views,
    top_deals,
    visitor_countries,
    traffic_sources,
    report_data
  )
  ON CONFLICT (report_date) 
  DO UPDATE SET
    total_visitors = EXCLUDED.total_visitors,
    unique_visitors = EXCLUDED.unique_visitors,
    total_page_views = EXCLUDED.total_page_views,
    top_deals = EXCLUDED.top_deals,
    visitor_countries = EXCLUDED.visitor_countries,
    traffic_sources = EXCLUDED.traffic_sources,
    report_data = EXCLUDED.report_data;

  RETURN report_data;
END;
$$;
