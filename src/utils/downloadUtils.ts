
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
  console.log('Handling blob URL download directly');
  
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  
  // Force download
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
  }, 100);
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
