export interface File {
    uuid: string;
    path: string;
    download_url: string;
    area: string;
    is_multimedia: boolean;
    project_id: string;
    metadata: Object ;
    status: "NO_TRANSFERED" | "TRANSFERED" | "IN_PROCESS";
    item_id: string;
}