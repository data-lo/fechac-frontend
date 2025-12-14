export interface Criterion {
  id: string; // ObjectId como string

  file_types: string[];
  file_name: string;

  quality_system_code: string | null;
  reference_documents: string[] | null;

  primary_keywords: string[];
  secondary_keywords: string[];

  target_path: string;
  target_drives: string[];

  department: string;

  project_focus: string[];
  project_area: string[];
  project_type: string[];

  created_at: Date;
  version: string;

  is_active: boolean;

  name_variants: string[];
}

export interface VisualLayout {
  pages: number;
  sections: number;
  tables: number;
  images: number;
  forms: number;
  charts?: number;
  footnotes?: number;
  headers?: number;
  paragraphs?: number;
}

