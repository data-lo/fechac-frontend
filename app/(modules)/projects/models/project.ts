import { ProjectStatusEnum } from "@/enums/project-status";

export interface Project {
    sadap_id: string;
    project_status: string;
    approval_date: string;
    council: string;
    municipality: string;
    area: string;
    category: string;
    project_type: string;
    support_area: string;
    applicant_institution: string;
    authorized_donor: string;
    regulatory_institution: string;
    project_name: string;
    address: string;
    authorized_amount: string;
    authorized_contract_amount: string;
    percentage: string;
    total_investment: string;
    status: ProjectStatusEnum;
}

