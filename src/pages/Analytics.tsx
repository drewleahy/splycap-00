
import React from 'react';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

const Analytics = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track visitor engagement and deal performance
        </p>
      </div>
      
      <AnalyticsDashboard />
    </div>
  );
};

export default Analytics;
