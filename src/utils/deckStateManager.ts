
// Simple state manager for deck URLs
class DeckStateManager {
  private deckUrls: Map<string, string> = new Map();

  setDeckUrl(dealId: string, url: string): void {
    this.deckUrls.set(dealId, url);
    // Also store in localStorage for persistence
    localStorage.setItem(`deck-url-${dealId}`, url);
    console.log(`Deck URL set for ${dealId}:`, url);
  }

  getDeckUrl(dealId: string): string | null {
    // First check memory
    let url = this.deckUrls.get(dealId);
    
    // If not in memory, check localStorage
    if (!url) {
      url = localStorage.getItem(`deck-url-${dealId}`) || null;
      if (url) {
        this.deckUrls.set(dealId, url);
      }
    }
    
    return url;
  }

  clearDeckUrl(dealId: string): void {
    this.deckUrls.delete(dealId);
    localStorage.removeItem(`deck-url-${dealId}`);
  }
}

export const deckStateManager = new DeckStateManager();
