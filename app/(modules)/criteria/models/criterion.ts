export interface Criterion {
  file_name: string;
  form_code: string;
  form_title: string;
  issuing_organization: string;
  revision_number: string;
  access_url: string;
  main_sections?: string[] | undefined;
  standard_fields?: string[] | undefined;
  visual_layout?: VisualLayout | undefined;
  domain_tags?: string[] | undefined;
  additional_keywords?: string[] | undefined;
  destination_drive: string;
  destination_path: string;
  department: string;
  file_type: string;
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

