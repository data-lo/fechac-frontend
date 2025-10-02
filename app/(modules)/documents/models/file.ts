export interface File {
    path: string;
    download_url: string;
    file_name: string;
    area: string;
    is_multimedia: boolean;
    status: "NOT_TRANSFERRED" | "TRANSFERRED" | "IN_PROCESS";
    project_id: string;
    uuid: string;
    metadata: {
        web_url: string
        mime_type: string
    };
    one_drive_item_id: string;
    one_drive_id: string;

}