
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, FileText } from "lucide-react";
import { fetchLPContent } from "@/utils/contentUtils";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/FileUpload";
import { useState } from "react";

const IRA = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const { data: content, isLoading, isError, refetch } = useQuery({
    queryKey: ["lp-content", "ira"],
    queryFn: () => fetchLPContent("ira"),
    staleTime: 0, // Always fetch fresh data
    retry: 2,
    meta: {
      onError: (error: Error) => {
        console.error("Error loading IRA content:", error);
        toast({
          title: "Error",
          description: "Failed to load content. Please try refreshing.",
          variant: "destructive",
        });
      }
    }
  });

  const handleRefresh = () => {
    toast({
      title: "Refreshing",
      description: "Fetching the latest content...",
    });
    queryClient.invalidateQueries({ queryKey: ["lp-content", "ira"] });
    refetch();
  };

  const handleFileUploadSuccess = (fileUrl: string) => {
    setUploadedFile(fileUrl);
    toast({
      title: "File Uploaded",
      description: "The file has been successfully uploaded and is available for viewing.",
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
            </p>
            
            <FileUpload onSuccess={handleFileUploadSuccess} />
            
            {uploadedFile && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-medium text-green-800 mb-2">File Successfully Uploaded</h3>
                <div className="flex items-start gap-2">
                  <FileText className="w-5 h-5 text-green-700 mt-0.5" />
                  <div>
                    <p className="text-green-700 mb-2">Your file is available at:</p>
                    <a 
                      href={uploadedFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline block truncate"
                    >
                      {uploadedFile}
                    </a>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setUploadedFile(null)}
                  >
                    Upload Another File
                  </Button>
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
