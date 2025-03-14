
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, FileText } from "lucide-react";
import { fetchLPContent } from "@/utils/contentUtils";
import { useToast } from "@/hooks/use-toast";
import { SimpleFileUpload } from "@/components/SimpleFileUpload";
import { AdminFileSelector } from "@/components/AdminFileSelector";
import { useState } from "react";

const IRA = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string, name: string }>>([]);
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  // Updated to use the modern approach without the onError property
  const { data: content, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp-content", "ira"],
    queryFn: () => fetchLPContent("ira"),
    staleTime: 0, // Always fetch fresh data
    retry: 2,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error("Error loading IRA content:", error);
          toast({
            title: "Error",
            description: "Failed to load content. Please try refreshing.",
            variant: "destructive",
          });
        }
      }
    }
  });

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching the latest content...",
    });
    refetch();
  };

  const handleFileUploadSuccess = (fileUrl: string, fileName: string) => {
    console.log("File upload success:", fileUrl, fileName);
    setUploadedFiles(prev => [...prev, { url: fileUrl, name: fileName }]);
    setIsUploadingFile(false);
    
    toast({
      title: "Document Added",
      description: `${fileName} has been successfully uploaded.`,
    });
  };

  const handleFileUploadStart = () => {
    setIsUploadingFile(true);
  };

  const handleFileUploadError = (error: string) => {
    console.error("File upload error:", error);
    setIsUploadingFile(false);
    
    toast({
      title: "Upload Failed",
      description: error,
      variant: "destructive",
    });
  };

  // Handle selection of admin-uploaded files
  const handleAdminFileSelection = (files: Array<{ id: string, name: string, publicUrl: string }>) => {
    console.log("Selected admin files:", files);
    
    // Add selected files to the uploadedFiles state
    const newFiles = files.map(file => ({
      url: file.publicUrl,
      name: file.name
    }));
    
    setUploadedFiles(prev => {
      // Filter out any duplicates based on URL
      const existingUrls = prev.map(file => file.url);
      const uniqueNewFiles = newFiles.filter(file => !existingUrls.includes(file.url));
      
      if (uniqueNewFiles.length === 0) {
        toast({
          title: "No new files",
          description: "All selected files are already in your list.",
        });
        return prev;
      }
      
      toast({
        title: "Files Added",
        description: `${uniqueNewFiles.length} file(s) have been added to your documents.`,
      });
      
      return [...prev, ...uniqueNewFiles];
    });
  };

  // Function to render the documents section
  const renderDocuments = () => {
    if (uploadedFiles.length === 0) {
      return <p className="text-gray-500 italic">No documents have been uploaded yet.</p>;
    }

    return (
      <div className="space-y-3">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <FileText className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-700 mb-1">{file.name}</p>
              <a 
                href={file.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline block truncate"
              >
                View Document
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link to="/LP-Splash">
            <Button variant="ghost" className="mb-4">
              ← Back to Data Room
            </Button>
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-sply-dark mb-6">Direct IRA Investment Information</h1>
            <Button variant="outline" onClick={handleRefresh} size="sm">
              Refresh Content
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : isError ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Error loading content.</p>
                <Button onClick={handleRefresh}>
                  Try Again
                </Button>
              </div>
            ) : content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} className="prose max-w-none" />
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">No IRA information content has been added yet.</p>
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium text-gray-800 mb-3">Available IRA Documents</h3>
                    {renderDocuments()}
                  </div>
                )}
              </div>
            )}
            
            {/* Always show uploaded documents below the content */}
            {content && uploadedFiles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">Available IRA Documents</h3>
                {renderDocuments()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Document Management</h2>
            
            <div className="space-y-6">
              {/* Admin File Selector Section */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3">Select Admin-Uploaded Files</h3>
                <p className="text-gray-600 mb-4">
                  Browse and select files that have been uploaded by administrators.
                </p>
                
                <AdminFileSelector 
                  onSelect={handleAdminFileSelection}
                  multiple={true}
                  buttonText="Browse Admin Files"
                  fileTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx']}
                />
              </div>
              
              {/* User File Upload Section */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-3">Upload Your Own Files</h3>
                <p className="text-gray-600 mb-4">
                  Upload your IRA application forms, transfer documents, or other relevant files here.
                  We accept PDF files and other document formats.
                </p>
                
                <SimpleFileUpload 
                  onSuccess={handleFileUploadSuccess}
                  onError={handleFileUploadError}
                  onStart={handleFileUploadStart}
                  isUploading={isUploadingFile}
                  allowedFileTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx']}
                  forcePhpUpload={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IRA;
