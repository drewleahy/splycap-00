
export interface PendingPartner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  email: string;
}

// This interface represents the raw data structure returned from Supabase
// before we transform it in our hook
export interface RawPendingPartner {
  id: string;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  email: Array<{ email: string }> | null;
}
