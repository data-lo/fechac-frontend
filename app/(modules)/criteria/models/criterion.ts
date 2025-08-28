export interface Criterion {
  file_name: string;
  form_code: string;
  form_title: string;
  issuer: string;
  revision_number: string;
  revision_date: string;
  url_pattern: string;
  main_sections: string[];
  canonical_fields: string[];
  visual_layout: VisualLayout;
  domain_tags: string[];
  additional_keywords: string[];
  destiny_drive: string[];
  destiny_path: string;
  organization_department: string;
  mimetype: string;
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

