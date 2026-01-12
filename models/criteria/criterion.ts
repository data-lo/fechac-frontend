export interface Criterion {
  file_types: string[];
  file_name: string;

  quality_system_code: string | null ;

  name_variants: string[] | null;
  primary_keywords: string[] | null;
  secondary_keywords: string[] | null;

  target_path: string | null;
  target_drives: string[];

  department: string;

  project_focus: string[];
  project_area: string[];
  project_type: string[];

  is_active: boolean;
}
