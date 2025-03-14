
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from "@/components/ui/search";
import { Loader2, FileText, File, Image, X } from "lucide-react";
import { fetchFilesFromBucket } from "@/utils/fileUtils";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  publicUrl: string;
  metadata?: any;
  size?: number;
  type?: string;
}

interface AdminFileSelectorProps {
  onSelect: (files: FileItem[]) => void;
  multiple?: boolean;
  buttonText?: string;
  fileTypes?: string[];
  editorRef?: React.RefObject<HTMLDivElement>;
  setContent?: React.Dispatch<React.SetStateAction<string>>;
}

export const AdminFileSelector = ({ 
  onSelect, 
  multiple = false, 
  buttonText = "Select Files", 
  fileTypes,
  editorRef,
  setContent
}: AdminFileSelectorProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  
  // Fetch files from the bucket using React Query
  const { data: files, isLoading, error, refetch } = useQuery({
    queryKey: ["admin-files"],
    queryFn: () => fetchFilesFromBucket(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Handle file selection
  const toggleFileSelection = (file: FileItem) => {
    if (multiple) {
      const isSelected = selectedFiles.some(f => f.id === file.id);
      if (isSelected) {
        setSelectedFiles(selectedFiles.filter(f => f.id !== file.id));
      } else {
        setSelectedFiles([...selectedFiles, file]);
      }
    } else {
      setSelectedFiles([file]);
    }
  };
  
  // Filter files based on search query and file types
  const filteredFiles = files?.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = fileTypes ? 
      fileTypes.some(type => file.name.toLowerCase().endsWith(type.toLowerCase())) : 
      true;
    return matchesSearch && matchesType;
  }) || [];
  
  // Determine icon based on file extension
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <Image className="w-5 h-5 text-blue-500" />;
    } else if (['pdf'].includes(ext || '')) {
      return <FileText className="w-5 h-5 text-red-500" />;
    } else if (['doc', 'docx'].includes(ext || '')) {
      return <FileText className="w-5 h-5 text-blue-600" />;
    } else if (['xls', 'xlsx'].includes(ext || '')) {
      return <FileText className="w-5 h-5 text-green-600" />;
    }
    return <File className="w-5 h-5 text-gray-500" />;
  };
  
  // Handle confirm selection with direct insertion into the editor
  const handleConfirm = () => {
    // Check if we should insert into editor directly
    if (editorRef?.current && setContent) {
      // First focus the editor to ensure cursor position is available
      editorRef.current.focus();
      
      // Create HTML for selected files
      let insertedContent = '';
      
      selectedFiles.forEach(file => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        
        // For images, create image tag
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
          insertedContent += `<img src="${file.publicUrl}" alt="${file.name}" class="max-w-full h-auto my-4" />`;
        } 
        // For other files, create a link
        else {
          insertedContent += `<p><a href="${file.publicUrl}" target="_blank" class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 my-2">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            ${file.name}
          </a></p>`;
        }
      });
      
      console.log("Content to insert:", insertedContent);
      
      // Direct insertion into editor content
      document.execCommand('insertHTML', false, insertedContent);
      
      // Update content state with new HTML
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      console.log("Updated editor content:", newContent);
      
      toast({
        title: "Files Inserted",
        description: `${selectedFiles.length} file(s) inserted into the editor.`,
      });
    } else {
      // Regular file selection callback
      onSelect(selectedFiles);
    }
    
    setIsOpen(false);
  };
  
  // Reset selection when dialog is opened
  useEffect(() => {
    if (isOpen) {
      setSelectedFiles([]);
    }
  }, [isOpen]);
  
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        {buttonText}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Available Files</DialogTitle>
          </DialogHeader>
          
          <div className="py-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-full max-w-sm">
                <Search 
                  placeholder="Search files..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
              >
                Refresh
              </Button>
            </div>
            
            {error ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-500 mb-2">Failed to load files</p>
                <Button onClick={() => refetch()}>Try Again</Button>
              </div>
            ) : isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No files found</p>
                {searchQuery && <p className="mt-2 text-sm">Try adjusting your search</p>}
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <Badge>{filteredFiles.length} files available</Badge>
                  {selectedFiles.length > 0 && (
                    <Badge variant="outline" className="ml-2">
                      {selectedFiles.length} selected
                    </Badge>
                  )}
                </div>
                
                <ScrollArea className="h-[350px] border rounded-md">
                  <div className="p-2 grid grid-cols-1 gap-2">
                    {filteredFiles.map((file) => {
                      const isSelected = selectedFiles.some(f => f.id === file.id);
                      return (
                        <div 
                          key={file.id}
                          className={`p-3 border rounded-md flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
                          onClick={() => toggleFileSelection(file)}
                        >
                          <div className="mr-3">{getFileIcon(file.name)}</div>
                          <div className="flex-1 overflow-hidden">
                            <p className="font-medium text-sm truncate">{file.name}</p>
                            <a 
                              href={file.publicUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:underline truncate block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Preview
                            </a>
                          </div>
                          {isSelected && (
                            <Badge variant="secondary" className="ml-2">
                              Selected
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedFiles.length === 0}
            >
              Confirm Selection ({selectedFiles.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
