
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, FileText } from "lucide-react";
import { fetchLPContent } from "@/utils/contentUtils";
import { useToast } from "@/hooks/use-toast";
import { SimpleFileUpload } from "@/components/SimpleFileUpload";
import { useState } from "react";

const IRA = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string, name: string }>>([]);

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
    
    toast({
      title: "Document Added",
      description: `${fileName} has been successfully uploaded.`,
    });
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
              <p className="text-gray-600">Content coming soon.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload IRA Documents</h2>
            <p className="text-gray-600 mb-4">
              Upload your IRA application forms, transfer documents, or other relevant files here.
              We accept PDF files and other document formats.
            </p>
            
            <SimpleFileUpload 
              onSuccess={handleFileUploadSuccess} 
              allowedFileTypes={['.pdf', '.doc', '.docx', '.xls', '.xlsx']}
            />
            
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-3">Your Uploaded Documents</h3>
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IRA;
