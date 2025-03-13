
import { WealthPerspectiveEditor } from "@/components/admin/WealthPerspectiveEditor";
import { PartnersEditor } from "@/components/admin/PartnersEditor";
import { CTAEditor } from "@/components/admin/CTAEditor";
import { FooterEditor } from "@/components/admin/FooterEditor";
import { LPContentEditor } from "@/components/admin/LPContentEditor";
import { Button } from "@/components/ui/button";
import { RefreshCw, Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminFileUpload } from "@/components/AdminFileUpload";
import { useState } from "react";

const Admin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{url: string, name: string}>>([]);

  const handleRefreshAll = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["wealth-perspective"] }),
      queryClient.invalidateQueries({ queryKey: ["partners"] }),
      queryClient.invalidateQueries({ queryKey: ["cta-sections"] }),
      queryClient.invalidateQueries({ queryKey: ["footer-content"] }),
      queryClient.invalidateQueries({ queryKey: ["philosophy-content"] }),
      queryClient.invalidateQueries({ queryKey: ["lp-content"] }),
    ]);
    
    toast({
      title: "Data refreshed",
      description: "All content has been updated from the database.",
    });
  };

  const handleFileUploaded = (url: string, name: string) => {
    setUploadedFiles(prev => [...prev, { url, name }]);
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button onClick={handleRefreshAll} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh All
        </Button>
      </div>
      
      <Tabs defaultValue="website" className="space-y-6">
        <TabsList className="mb-8">
          <TabsTrigger value="website">Website Content</TabsTrigger>
          <TabsTrigger value="lp">LP Data Room</TabsTrigger>
          <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="website" className="space-y-8">
          <div className="space-y-8">
            <WealthPerspectiveEditor />
            <PartnersEditor />
            <CTAEditor />
            <FooterEditor />
          </div>
        </TabsContent>
        
        <TabsContent value="lp" className="mt-6">
          <LPContentEditor />
        </TabsContent>
        
        <TabsContent value="tools" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                File Uploader
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Upload files directly to make them available on the website. This tool bypasses the rich text editor for direct uploads.
              </p>
              
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
            </div>
            
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Upload URLs</h2>
              <p className="text-sm text-gray-600 mb-4">
                Copy these URLs for use in content or sharing with others.
              </p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium mb-1">PHP Uploader</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/api/upload-file.php`} 
                      readOnly
                      className="p-2 bg-gray-50 border text-sm rounded-l-md flex-1"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/api/upload-file.php`);
                        toast({ title: "Copied to clipboard" });
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-r-md hover:bg-gray-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Edge Function Uploader</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={`${window.location.origin}/api/upload-file`} 
                      readOnly
                      className="p-2 bg-gray-50 border text-sm rounded-l-md flex-1"
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/api/upload-file`);
                        toast({ title: "Copied to clipboard" });
                      }}
                      className="px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-r-md hover:bg-gray-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
