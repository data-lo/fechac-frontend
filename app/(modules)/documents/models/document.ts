import { DocumentStatusEnum } from "@/enums/document-status-enum";

export interface Metadata {
    web_url: string;
    mime_type: string;
}

interface SimilarityDetail {
    similar: boolean;
    score: number;
    reason: string;
}

export interface Similarity {
    criterion_id: string;
    path: SimilarityDetail;
    name: SimilarityDetail;
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
    matches?: Similarity[] | null;
    selected_criterion_id?: string | null;
}