
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnalytics } from '@/hooks/use-analytics';
import { Eye, Users, Globe, TrendingUp } from 'lucide-react';

export const AnalyticsDashboard = () => {
  const { data: analytics, isLoading, error } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading analytics data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalVisitors || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.uniqueVisitors || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.totalPageViews || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Deal Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.topDeals?.[0]?.visit_count || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics?.topDeals?.[0]?.deal_name || 'No deals'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Deals</CardTitle>
            <CardDescription>Most visited investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.topDeals?.slice(0, 5).map((deal, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{deal.deal_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {deal.unique_visitors} unique visitors
                    </p>
                  </div>
                  <div className="text-sm font-bold">{deal.visit_count}</div>
                </div>
              ))}
              {(!analytics?.topDeals || analytics.topDeals.length === 0) && (
                <p className="text-sm text-muted-foreground">No deal visits yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Visitor Countries</CardTitle>
            <CardDescription>Geographic distribution of visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.visitorCountries?.slice(0, 5).map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{country.country}</span>
                  <span className="text-sm font-bold">{country.visit_count}</span>
                </div>
              ))}
              {(!analytics?.visitorCountries || analytics.visitorCountries.length === 0) && (
                <p className="text-sm text-muted-foreground">No location data yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>How visitors found your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.trafficSources?.map((source, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{source.source}</span>
                  <span className="text-sm font-bold">{source.visit_count}</span>
                </div>
              ))}
              {(!analytics?.trafficSources || analytics.trafficSources.length === 0) && (
                <p className="text-sm text-muted-foreground">No traffic data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
