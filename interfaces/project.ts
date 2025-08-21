import { ObjectId } from "mongodb";

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
    transfer_status: "NOT_TRANSFERRED" | "TRANSFERRED" | 'IN_PROGRESS';
}

export interface ProjectRecord extends Project {
    _id?: ObjectId;
}