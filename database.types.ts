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
      notes: {
        Row: {
          content: string | null
          created_at: string | null
          doing_date: string | null
          done_date: string | null
          is_bookmarked: boolean | null
          is_important: boolean | null
          is_pinned: boolean | null
          is_urgent: boolean | null
          note_id: string
          priority: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          doing_date?: string | null
          done_date?: string | null
          is_bookmarked?: boolean | null
          is_important?: boolean | null
          is_pinned?: boolean | null
          is_urgent?: boolean | null
          note_id?: string
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          doing_date?: string | null
          done_date?: string | null
          is_bookmarked?: boolean | null
          is_important?: boolean | null
          is_pinned?: boolean | null
          is_urgent?: boolean | null
          note_id?: string
          priority?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      pgroonga_command:
        | {
            Args: {
              groongacommand: string
            }
            Returns: string
          }
        | {
            Args: {
              groongacommand: string
              arguments: string[]
            }
            Returns: string
          }
      pgroonga_command_escape_value: {
        Args: {
          value: string
        }
        Returns: string
      }
      pgroonga_condition: {
        Args: {
          query?: string
          weights?: number[]
          scorers?: string[]
          schema_name?: string
          index_name?: string
          column_name?: string
          fuzzy_max_distance_ratio?: number
        }
        Returns: Database["public"]["CompositeTypes"]["pgroonga_condition"]
      }
      pgroonga_equal_query_text_array: {
        Args: {
          targets: string[]
          query: string
        }
        Returns: boolean
      }
      pgroonga_equal_query_text_array_condition:
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_equal_query_varchar_array: {
        Args: {
          targets: string[]
          query: string
        }
        Returns: boolean
      }
      pgroonga_equal_query_varchar_array_condition:
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_equal_text: {
        Args: {
          target: string
          other: string
        }
        Returns: boolean
      }
      pgroonga_equal_text_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_equal_varchar: {
        Args: {
          target: string
          other: string
        }
        Returns: boolean
      }
      pgroonga_equal_varchar_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_escape:
        | {
            Args: {
              value: boolean
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: number
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
            }
            Returns: string
          }
        | {
            Args: {
              value: string
              special_characters: string
            }
            Returns: string
          }
      pgroonga_flush: {
        Args: {
          indexname: unknown
        }
        Returns: boolean
      }
      pgroonga_handler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      pgroonga_highlight_html:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: string
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: string
          }
        | {
            Args: {
              targets: string[]
              keywords: string[]
            }
            Returns: string[]
          }
        | {
            Args: {
              targets: string[]
              keywords: string[]
              indexname: unknown
            }
            Returns: string[]
          }
      pgroonga_index_column_name:
        | {
            Args: {
              indexname: unknown
              columnindex: number
            }
            Returns: string
          }
        | {
            Args: {
              indexname: unknown
              columnname: string
            }
            Returns: string
          }
      pgroonga_is_writable: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      pgroonga_list_broken_indexes: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      pgroonga_list_lagged_indexes: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      pgroonga_match_positions_byte:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: number[]
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: number[]
          }
      pgroonga_match_positions_character:
        | {
            Args: {
              target: string
              keywords: string[]
            }
            Returns: number[]
          }
        | {
            Args: {
              target: string
              keywords: string[]
              indexname: unknown
            }
            Returns: number[]
          }
      pgroonga_match_term:
        | {
            Args: {
              target: string[]
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string[]
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              term: string
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              term: string
            }
            Returns: boolean
          }
      pgroonga_match_text_array_condition:
        | {
            Args: {
              target: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_match_text_array_condition_with_scorers: {
        Args: {
          target: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_match_text_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_match_text_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_match_varchar_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_match_varchar_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_normalize:
        | {
            Args: {
              target: string
            }
            Returns: string
          }
        | {
            Args: {
              target: string
              normalizername: string
            }
            Returns: string
          }
      pgroonga_prefix_varchar_condition:
        | {
            Args: {
              target: string
              conditoin: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              conditoin: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_query_escape: {
        Args: {
          query: string
        }
        Returns: string
      }
      pgroonga_query_expand: {
        Args: {
          tablename: unknown
          termcolumnname: string
          synonymscolumnname: string
          query: string
        }
        Returns: string
      }
      pgroonga_query_extract_keywords: {
        Args: {
          query: string
          index_name?: string
        }
        Returns: string[]
      }
      pgroonga_query_text_array_condition:
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              targets: string[]
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_query_text_array_condition_with_scorers: {
        Args: {
          targets: string[]
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_query_text_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_query_text_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_query_varchar_condition:
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_condition"]
            }
            Returns: boolean
          }
        | {
            Args: {
              target: string
              condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition"]
            }
            Returns: boolean
          }
      pgroonga_query_varchar_condition_with_scorers: {
        Args: {
          target: string
          condition: Database["public"]["CompositeTypes"]["pgroonga_full_text_search_condition_with_scorers"]
        }
        Returns: boolean
      }
      pgroonga_regexp_text_array: {
        Args: {
          targets: string[]
          pattern: string
        }
        Returns: boolean
      }
      pgroonga_regexp_text_array_condition: {
        Args: {
          targets: string[]
          pattern: Database["public"]["CompositeTypes"]["pgroonga_condition"]
        }
        Returns: boolean
      }
      pgroonga_result_to_jsonb_objects: {
        Args: {
          result: Json
        }
        Returns: Json
      }
      pgroonga_result_to_recordset: {
        Args: {
          result: Json
        }
        Returns: Record<string, unknown>[]
      }
      pgroonga_score:
        | {
            Args: {
              row: Record<string, unknown>
            }
            Returns: number
          }
        | {
            Args: {
              tableoid: unknown
              ctid: unknown
            }
            Returns: number
          }
      pgroonga_set_writable: {
        Args: {
          newwritable: boolean
        }
        Returns: boolean
      }
      pgroonga_snippet_html: {
        Args: {
          target: string
          keywords: string[]
          width?: number
        }
        Returns: string[]
      }
      pgroonga_table_name: {
        Args: {
          indexname: unknown
        }
        Returns: string
      }
      pgroonga_tokenize: {
        Args: {
          target: string
        }
        Returns: Json[]
      }
      pgroonga_vacuum: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      pgroonga_wal_apply:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: number
          }
      pgroonga_wal_set_applied_position:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              block: number
              offset: number
            }
            Returns: boolean
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              indexname: unknown
              block: number
              offset: number
            }
            Returns: boolean
          }
      pgroonga_wal_status: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          oid: unknown
          current_block: number
          current_offset: number
          current_size: number
          last_block: number
          last_offset: number
          last_size: number
        }[]
      }
      pgroonga_wal_truncate:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              indexname: unknown
            }
            Returns: number
          }
      search_notes: {
        Args: {
          query: string
        }
        Returns: {
          content: string | null
          created_at: string | null
          doing_date: string | null
          done_date: string | null
          is_bookmarked: boolean | null
          is_important: boolean | null
          is_pinned: boolean | null
          is_urgent: boolean | null
          note_id: string
          priority: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      pgroonga_condition: {
        query: string | null
        weigths: number[] | null
        scorers: string[] | null
        schema_name: string | null
        index_name: string | null
        column_name: string | null
        fuzzy_max_distance_ratio: number | null
      }
      pgroonga_full_text_search_condition: {
        query: string | null
        weigths: number[] | null
        indexname: string | null
      }
      pgroonga_full_text_search_condition_with_scorers: {
        query: string | null
        weigths: number[] | null
        scorers: string[] | null
        indexname: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
