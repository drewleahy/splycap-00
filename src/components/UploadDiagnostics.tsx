
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface EndpointStatus {
  name: string;
  url: string;
  status: 'idle' | 'testing' | 'success' | 'error';
  message?: string;
}

export const UploadDiagnostics = () => {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    { name: 'Service Worker Proxy', url: '/api/upload-file', status: 'idle' },
    { name: 'PHP Endpoint', url: '/api/upload-file.php', status: 'idle' },
    { name: 'Direct Supabase', url: 'https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file', status: 'idle' }
  ]);

  const testEndpoint = async (index: number) => {
    const updatedEndpoints = [...endpoints];
    updatedEndpoints[index].status = 'testing';
    setEndpoints(updatedEndpoints);

    try {
      const response = await fetch(endpoints[index].url, {
        method: 'HEAD',
        mode: 'cors',
      });

      updatedEndpoints[index].status = response.ok ? 'success' : 'error';
      updatedEndpoints[index].message = response.ok 
        ? `Ready (${response.status})` 
        : `Error ${response.status}: ${response.statusText}`;
    } catch (error) {
      updatedEndpoints[index].status = 'error';
      updatedEndpoints[index].message = error instanceof Error ? error.message : 'Connection failed';
    }

    setEndpoints(updatedEndpoints);
  };

  const testAllEndpoints = async () => {
    for (let i = 0; i < endpoints.length; i++) {
      await testEndpoint(i);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const getStatusIcon = (status: EndpointStatus['status']) => {
    switch (status) {
      case 'testing': return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Endpoint Diagnostics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={testAllEndpoints} className="w-full">
            Test All Upload Endpoints
          </Button>
          
          <div className="space-y-2">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-2">
                  {getStatusIcon(endpoint.status)}
                  <span className="font-medium">{endpoint.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {endpoint.message && (
                    <span className="text-sm text-gray-600">{endpoint.message}</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testEndpoint(index)}
                    disabled={endpoint.status === 'testing'}
                  >
                    Test
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              <strong>How to interpret results:</strong><br/>
              • ✅ Green = Endpoint is responding and ready for uploads<br/>
              • ❌ Red = Endpoint has issues (check error message)<br/>
              • 🔄 Blue = Testing in progress
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
