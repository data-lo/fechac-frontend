import { DocumentStatusEnum } from "@/enums/document-status-enum";

export interface Metadata {
    web_url: string;
    mime_type: string;
}

export interface Similarity {
    criterion_id?: string | null;
    similar: boolean;
    score: number;
    reason: string;
}

export interface File {
    uuid: string;

    one_drive_id: string;
    one_drive_item_id: string;

    download_url: string;
    file_name: string;
    department: string;
    is_multimedia: boolean;
    metadata: Metadata;

    path?: string | null;
    project_area?: string[] | null;
    project_focus?: string[] | null;
    sadap_id?: string | null;
    text_extracted?: string | null;
    weight?: number | null;

    status: DocumentStatusEnum;

    file_name_matches?: Similarity[] | null;
    path_matches?: Similarity[] | null;
    selected_criterion_id?: string | null;
}