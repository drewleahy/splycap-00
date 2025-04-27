
export type Deal = {
  id: string;
  deal_name: string;
  allocation_amount: number;
  valuation: number | null;
  stage: string;
  created_at: string;
  status: string;
  pitch_deck_url?: string;
  pitch_deck_name?: string;
};
