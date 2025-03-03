
import { useToast } from "@/hooks/use-toast";

export const useEditorUtils = () => {
  const { toast } = useToast();

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const handleLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      toast({
        title: "Error",
        description: "Please select some text first",
        variant: "destructive",
      });
      return;
    }

    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  const handleCodeBlock = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      toast({
        title: "Error",
        description: "Please select some text first",
        variant: "destructive",
      });
      return;
    }

    const selectedText = selection.toString();
    const language = prompt("Enter code language (e.g., javascript, typescript, sql, html, css):", "javascript");
    
    if (language) {
      const codeHtml = `<pre class="bg-gray-100 p-3 rounded-md overflow-x-auto my-2"><code class="language-${language}">${selectedText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
      
      document.execCommand('insertHTML', false, codeHtml);
    }
  };

  return {
    handleFormat,
    handleLink,
    handleCodeBlock
  };
};
