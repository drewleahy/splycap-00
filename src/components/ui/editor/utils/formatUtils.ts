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
    if (!selection || selection.rangeCount === 0 || selection.toString().trim() === '') {
      toast({
        title: "Error",
        description: "Please select some text first",
        variant: "destructive",
      });
      return;
    }

    const selectedText = selection.toString();
    const url = prompt("Enter URL:", "https://");
    
    if (url) {
      // Store the selection before focus changes it
      const range = selection.getRangeAt(0);
      
      // Focus the editor
      editorRef.current?.focus();
      
      // Create the link
      document.execCommand('createLink', false, url);
      
      // Find the created link in the selection
      const linkElement = findLinkInRange(range);
      
      // Set attributes on the anchor if found
      if (linkElement) {
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('rel', 'noopener noreferrer');
        
        // Add link styling classes
        linkElement.classList.add('text-blue-600', 'underline', 'hover:text-blue-800');
        
        // Ensure the link has the selected text
        if (linkElement.textContent !== selectedText) {
          linkElement.textContent = selectedText;
        }
      }
      
      // Update content state
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };
  
  const findLinkInRange = (range: Range): HTMLAnchorElement | null => {
    let container = range.commonAncestorContainer;
    
    if (container.nodeType === Node.TEXT_NODE) {
      container = container.parentNode;
    }
    
    if (container && (container as HTMLElement).tagName === 'A') {
      return container as HTMLAnchorElement;
    }
    
    const tempDiv = document.createElement('div');
    tempDiv.appendChild(range.cloneContents());
    const anchor = tempDiv.querySelector('a');
    
    if (anchor) {
      const nodes = document.createTreeWalker(
        editorRef.current as Node,
        NodeFilter.SHOW_ELEMENT,
        {
          acceptNode: (node) => 
            node.nodeName === 'A' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        }
      );
      
      let currentNode;
      while (currentNode = nodes.nextNode()) {
        if ((currentNode as HTMLAnchorElement).href === anchor.href) {
          return currentNode as HTMLAnchorElement;
        }
      }
    }
    
    if (editorRef.current) {
      const newSelection = window.getSelection();
      if (newSelection && newSelection.rangeCount > 0) {
        const newRange = newSelection.getRangeAt(0);
        const nearestAnchor = findNearestAnchor(newRange.startContainer);
        if (nearestAnchor) {
          return nearestAnchor;
        }
      }
    }
    
    return null;
  };
  
  const findNearestAnchor = (node: Node): HTMLAnchorElement | null => {
    let current: Node | null = node;
    
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE && 
          (current as HTMLElement).tagName === 'A') {
        return current as HTMLAnchorElement;
      }
      current = current.parentNode;
    }
    
    return null;
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
