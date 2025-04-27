export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      commissions: {
        Row: {
          amount: number
          created_at: string
          deal_id: string | null
          id: string
          lp_id: string | null
          partner_id: string | null
          payout_date: string | null
          percentage: number
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          deal_id?: string | null
          id?: string
          lp_id?: string | null
          partner_id?: string | null
          payout_date?: string | null
          percentage: number
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          deal_id?: string | null
          id?: string
          lp_id?: string | null
          partner_id?: string | null
          payout_date?: string | null
          percentage?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_lp_id_fkey"
            columns: ["lp_id"]
            isOneToOne: false
            referencedRelation: "limited_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      content_sections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          section_id: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          section_id: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          section_id?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cta_sections: {
        Row: {
          button_text: string
          created_at: string
          description: string
          id: string
          section_id: string
          title: string
          updated_at: string
        }
        Insert: {
          button_text: string
          created_at?: string
          description: string
          id?: string
          section_id: string
          title: string
          updated_at?: string
        }
        Update: {
          button_text?: string
          created_at?: string
          description?: string
          id?: string
          section_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          allocation_amount: number
          company_website: string | null
          created_at: string
          created_by: string | null
          deal_name: string
          founder_linkedin_profiles: string[] | null
          founder_names: string[] | null
          funding_round_details: string | null
          id: string
          investment_thesis: string | null
          notes: string | null
          stage: string
          status: string
          tags: string[] | null
          updated_at: string
          valuation: number | null
          visibility: string
        }
        Insert: {
          allocation_amount: number
          company_website?: string | null
          created_at?: string
          created_by?: string | null
          deal_name: string
          founder_linkedin_profiles?: string[] | null
          founder_names?: string[] | null
          funding_round_details?: string | null
          id?: string
          investment_thesis?: string | null
          notes?: string | null
          stage: string
          status?: string
          tags?: string[] | null
          updated_at?: string
          valuation?: number | null
          visibility?: string
        }
        Update: {
          allocation_amount?: number
          company_website?: string | null
          created_at?: string
          created_by?: string | null
          deal_name?: string
          founder_linkedin_profiles?: string[] | null
          founder_names?: string[] | null
          funding_round_details?: string | null
          id?: string
          investment_thesis?: string | null
          notes?: string | null
          stage?: string
          status?: string
          tags?: string[] | null
          updated_at?: string
          valuation?: number | null
          visibility?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          deal_id: string | null
          file_name: string
          file_type: string
          id: string
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          deal_id?: string | null
          file_name: string
          file_type: string
          id?: string
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          deal_id?: string | null
          file_name?: string
          file_type?: string
          id?: string
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_focus_items: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      limited_partners: {
        Row: {
          created_at: string
          created_by: string | null
          entity_name: string
          id: string
          investment_amount: number | null
          relationship_notes: string | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entity_name: string
          id?: string
          investment_amount?: number | null
          relationship_notes?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entity_name?: string
          id?: string
          investment_amount?: number | null
          relationship_notes?: string | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      lp_contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          lp_id: string | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lp_id?: string | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lp_id?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lp_contacts_lp_id_fkey"
            columns: ["lp_id"]
            isOneToOne: false
            referencedRelation: "limited_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          created_at: string
          id: string
          location: string
          name: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          name: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          name?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      past_investments: {
        Row: {
          created_at: string
          id: string
          logo_url: string
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url: string
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
