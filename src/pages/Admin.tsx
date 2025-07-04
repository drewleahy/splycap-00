
import { WealthPerspectiveEditor } from "@/components/admin/WealthPerspectiveEditor";
import { PartnersEditor } from "@/components/admin/PartnersEditor";
import { CTAEditor } from "@/components/admin/CTAEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { LPContentEditor } from "@/components/admin/LPContentEditor";
import { Button } from "@/components/ui/button";
import { RefreshCw, Upload, Clipboard, CheckCircle2, FileText, Users } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFileUpload } from "@/components/AdminFileUpload";
import { useState, useRef, Suspense, useEffect } from "react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminFileSelector } from "@/components/AdminFileSelector";
import { PendingPartnersManager } from "@/components/admin/PendingPartnersManager";
import { VenturePartnerManager } from "@/components/admin/VenturePartnerManager";
import { useAuth } from "@/hooks/use-auth";
import { Navigate } from "react-router-dom";

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  if (hasError) {
    return (
      <div className="p-6 border border-red-300 bg-red-50 rounded-md">
        <h3 className="text-lg font-medium text-red-800 mb-2">Component Error</h3>
        <p className="text-red-600">
          There was an error loading this component. Please refresh the page or try again later.
        </p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => setHasError(false)}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <ErrorCatcher onError={() => {
      setHasError(true);
      toast({
        title: "Component Error",
        description: "There was a problem loading a component. The error has been logged.",
        variant: "destructive"
      });
    }}>
      {children}
    </ErrorCatcher>
  );
};

class ErrorCatcher extends React.Component<{
  children: React.ReactNode;
  onError: () => void;
}> {
  componentDidCatch(error: Error) {
    console.error("Component error caught:", error);
    this.props.onError();
  }

  render() {
    return this.props.children;
  }
}

const Admin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{url: string, name: string}>>([]);
  const [isCopied, setIsCopied] = useState<{[key: string]: boolean}>({});
  const [selectedAdminFiles, setSelectedAdminFiles] = useState<Array<{id: string, name: string, publicUrl: string}>>([]);

  // Show loading while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect non-authenticated users to login
  if (!user) {
    return <Navigate to="/venturepartners/auth" replace />;
  }

  // TODO: Add proper admin role check here
  // For now, we allow all authenticated users to access admin
  // In production, this should check if user has admin role
  // const userRole = await getUserRole(user.id);
  // if (userRole !== 'admin') {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  const handleRefreshAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["wealth-perspective"] }),
      queryClient.invalidateQueries({ queryKey: ["partners"] }),
      queryClient.invalidateQueries({ queryKey: ["cta-sections"] }),
      queryClient.invalidateQueries({ queryKey: ["footer-content"] }),
      queryClient.invalidateQueries({ queryKey: ["philosophy-content"] }),
      queryClient.invalidateQueries({ queryKey: ["lp-content"] }),
      queryClient.invalidateQueries({ queryKey: ["admin-files"] }),
    ]);
    
    toast({
      title: "Data refreshed",
      description: "All content has been updated from the database.",
    });
  };

  const handleFileUploaded = (url: string, name: string) => {
    setUploadedFiles(prev => [...prev, { url, name }]);
    toast({
      title: "Upload Success!",
      description: `${name} was uploaded successfully.`,
    });
    
    queryClient.invalidateQueries({ queryKey: ["admin-files"] });
  };

  const handleCopyUrl = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    setIsCopied({...isCopied, [label]: true});
    toast({
      title: "Copied to clipboard",
      description: `${label} URL has been copied.`
    });
    
    setTimeout(() => {
      setIsCopied({...isCopied, [label]: false});
    }, 2000);
  };

  const handleAdminFileSelection = (files: Array<{id: string, name: string, publicUrl: string}>) => {
    setSelectedAdminFiles(files);
    
    toast({
      title: "Files Selected",
      description: `${files.length} file(s) selected successfully.`,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Logged in as: {user.email}
          </div>
          <Button onClick={handleRefreshAll} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh All
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="website" className="space-y-6">
        <TabsList className="mb-8">
          <TabsTrigger value="website">Website Content</TabsTrigger>
          <TabsTrigger value="lp">LP Data Room</TabsTrigger>
          <TabsTrigger value="partners">Partner Applications</TabsTrigger>
          <TabsTrigger value="venturepartners">Venture Partners</TabsTrigger>
          <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="website" className="space-y-8">
          <div className="space-y-8">
            <ErrorBoundary>
              <WealthPerspectiveEditor />
            </ErrorBoundary>
            <ErrorBoundary>
              <PartnersEditor />
            </ErrorBoundary>
            <ErrorBoundary>
              <CTAEditor />
            </ErrorBoundary>
            <ErrorBoundary>
              <FooterEditor />
            </ErrorBoundary>
          </div>
        </TabsContent>
        
        <TabsContent value="lp" className="mt-6">
          <ErrorBoundary>
            <Suspense fallback={<div className="p-6 border rounded animate-pulse">Loading LP Content Editor...</div>}>
              <LPContentEditor />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="partners">
          <ErrorBoundary>
            <PendingPartnersManager />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="venturepartners">
          <ErrorBoundary>
            <VenturePartnerManager />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  File Uploader
                </CardTitle>
                <CardDescription>
                  Upload files directly to make them available on the website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminFileUpload 
                  onSuccess={handleFileUploaded}
                  allowedFileTypes={[".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif"]}
                  label="Upload a file to the server"
                />
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-sm mb-2">Recently Uploaded Files</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                          <span className="truncate flex-1">{file.name}</span>
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline ml-2"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upload Endpoints</CardTitle>
                <CardDescription>
                  Copy these URLs for use in content or troubleshooting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">PHP Uploader (Primary)</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/api/upload-file.php`} 
                      readOnly
                      className="p-2 bg-gray-50 border text-sm rounded-l-md flex-1"
                    />
                    <button 
                      onClick={() => handleCopyUrl(`${window.location.origin}/api/upload-file.php`, 'PHP')}
                      className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-r-md hover:bg-gray-300 flex items-center gap-1"
                    >
                      {isCopied['PHP'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">JS Proxy (Fallback 1)</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/api/upload-file`} 
                      readOnly
                      className="p-2 bg-gray-50 border text-sm rounded-l-md flex-1"
                    />
                    <button 
                      onClick={() => handleCopyUrl(`${window.location.origin}/api/upload-file`, 'JS')}
                      className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-r-md hover:bg-gray-300 flex items-center gap-1"
                    >
                      {isCopied['JS'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Direct Supabase (Fallback 2)</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      value="https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file" 
                      readOnly
                      className="p-2 bg-gray-50 border text-sm rounded-l-md flex-1"
                    />
                    <button 
                      onClick={() => handleCopyUrl("https://hjjtsbkxxvygpurfhlub.supabase.co/functions/v1/upload-file", 'Supabase')}
                      className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-r-md hover:bg-gray-300 flex items-center gap-1"
                    >
                      {isCopied['Supabase'] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Troubleshooting:</strong> If uploads are failing, try each endpoint directly with 
                    the "Network" tab open in your browser's developer tools to diagnose the issue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
