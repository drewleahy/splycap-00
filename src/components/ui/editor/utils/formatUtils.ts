
import { RefObject } from "react";

export const formatUtils = (
  editorRef: RefObject<HTMLDivElement>, 
  setContent: React.Dispatch<React.SetStateAction<string>>,
  toast: any
) => {
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
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
      editorRef.current?.focus();
      // Use createLink command which properly creates anchor tags
      handleFormat("createLink", url);
      
      // Add target="_blank" to the created link
      const range = selection.getRangeAt(0);
      const anchorNode = range.commonAncestorContainer;
      
      // Find the nearest anchor tag
      let anchor: HTMLAnchorElement | null = null;
      if (anchorNode.nodeType === Node.ELEMENT_NODE && (anchorNode as HTMLElement).tagName === 'A') {
        anchor = anchorNode as HTMLAnchorElement;
      } else if (anchorNode.parentNode && (anchorNode.parentNode as HTMLElement).tagName === 'A') {
        anchor = anchorNode.parentNode as HTMLAnchorElement;
      }

      // Set attributes on the anchor if found
      if (anchor) {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      }
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
      
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  return {
    handleFormat,
    handleLink,
    handleCodeBlock
  };
};
