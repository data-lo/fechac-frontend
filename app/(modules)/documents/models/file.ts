export interface File {
    uuid: string;
    path: string;
    download_url: string;
    area: string;
    is_multimedia: boolean;
    project_id: string;
    metadata: Object;
    status: "NOT_TRANSFERRED" | "TRANSFERRED" | "IN_PROGRESS";
    item_id: string;
}