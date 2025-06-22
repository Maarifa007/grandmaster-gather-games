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
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          details: Json | null
          id: string
          target_user_id: string | null
          timestamp: string | null
        }
        Insert: {
          action: string
          admin_id: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
          timestamp?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          details?: Json | null
          id?: string
          target_user_id?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_logs_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          date: string
          id: string
          location: string
          name: string
          setup_instructions: string | null
          time_control: string
          tornelo_link: string | null
          zoom_link: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          location: string
          name: string
          setup_instructions?: string | null
          time_control: string
          tornelo_link?: string | null
          zoom_link?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          location?: string
          name?: string
          setup_instructions?: string | null
          time_control?: string
          tornelo_link?: string | null
          zoom_link?: string | null
        }
        Relationships: []
      }
      Events: {
        Row: {
          date: string | null
          id: string | null
          location: string | null
          name: string | null
          time_control: string | null
        }
        Insert: {
          date?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          time_control?: string | null
        }
        Update: {
          date?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          time_control?: string | null
        }
        Relationships: []
      }
      games: {
        Row: {
          event_id: string
          id: string
          opponent_name: string
          rating_after: number
          rating_before: number
          result: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          opponent_name: string
          rating_after: number
          rating_before: number
          result: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          opponent_name?: string
          rating_after?: number
          rating_before?: number
          result?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      Games: {
        Row: {
          event_id: string | null
          id: string | null
          opponent_name: string | null
          rating_after: number | null
          rating_before: number | null
          result: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string | null
          opponent_name?: string | null
          rating_after?: number | null
          rating_before?: number | null
          result?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string | null
          opponent_name?: string | null
          rating_after?: number | null
          rating_before?: number | null
          result?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tournament_registrations: {
        Row: {
          camera_overlay_confirmed: boolean | null
          current_rating: number | null
          email: string
          id: string
          platform: string
          platform_username: string
          registered_at: string
          setup_completed: boolean | null
          tournament_id: string
          uscf_id: string | null
          user_id: string
          zoom_joined: boolean | null
          zoom_ready: boolean | null
        }
        Insert: {
          camera_overlay_confirmed?: boolean | null
          current_rating?: number | null
          email: string
          id?: string
          platform: string
          platform_username: string
          registered_at?: string
          setup_completed?: boolean | null
          tournament_id: string
          uscf_id?: string | null
          user_id: string
          zoom_joined?: boolean | null
          zoom_ready?: boolean | null
        }
        Update: {
          camera_overlay_confirmed?: boolean | null
          current_rating?: number | null
          email?: string
          id?: string
          platform?: string
          platform_username?: string
          registered_at?: string
          setup_completed?: boolean | null
          tournament_id?: string
          uscf_id?: string | null
          user_id?: string
          zoom_joined?: boolean | null
          zoom_ready?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "tournament_registrations_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          gscr: number | null
          id: string
          is_admin: boolean | null
          name: string
          stripe_customer_id: string | null
          updated_at: string | null
          uscf_id: number | null
        }
        Insert: {
          created_at?: string | null
          email: string
          gscr?: number | null
          id?: string
          is_admin?: boolean | null
          name: string
          stripe_customer_id?: string | null
          updated_at?: string | null
          uscf_id?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string
          gscr?: number | null
          id?: string
          is_admin?: boolean | null
          name?: string
          stripe_customer_id?: string | null
          updated_at?: string | null
          uscf_id?: number | null
        }
        Relationships: []
      }
      Users: {
        Row: {
          created_at: string | null
          email: string | null
          gscr: number | null
          id: string | null
          name: string | null
          stripe_id: string | null
          uscf_id: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          gscr?: number | null
          id?: string | null
          name?: string | null
          stripe_id?: string | null
          uscf_id?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          gscr?: number | null
          id?: string | null
          name?: string | null
          stripe_id?: string | null
          uscf_id?: number | null
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
