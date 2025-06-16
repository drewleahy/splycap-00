
export async function downloadFile(url: string, filename = "Neurable-Deck.pdf") {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch file");
    const blob = await res.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 1000);

    return true;
  } catch (err) {
    console.error("Deck download error:", err);
    throw err;
  }
}

export function handleDirectDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function handleBlobDownload(blobUrl: string, filename = "Neurable-Deck.pdf") {
  console.log('Handling blob URL download directly with improved method');
  
  try {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    
    // Ensure the link is not visible
    link.style.display = 'none';
    link.style.position = 'absolute';
    link.style.left = '-9999px';
    
    // Add to DOM
    document.body.appendChild(link);
    
    // Trigger download with multiple methods for better compatibility
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    
    link.dispatchEvent(clickEvent);
    
    // Fallback: direct click
    link.click();
    
    // Clean up immediately
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Blob download error:', error);
    throw error;
  }
}

export function extractFilenameFromUrl(url: string, defaultFilename = "Neurable-Deck.pdf"): string {
  try {
    const urlParts = url.split("?");
    const lastSlash = urlParts[0].lastIndexOf("/");
    if (lastSlash !== -1) {
      const candidate = urlParts[0].substr(lastSlash + 1);
      if (candidate.endsWith('.pdf')) return candidate;
    }
  } catch {}
  return defaultFilename;
}
