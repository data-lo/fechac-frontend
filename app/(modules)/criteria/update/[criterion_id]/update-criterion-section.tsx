'use client'

// 1. React
import { Fragment } from "react";

// 2. Domain models
import CriterionDocument from "@/models/criteria/criterion-document";

// 3. Local components
import UpdateCriterionForm from "./criterion-update-form";

interface Props {
    data: {
        criterion: CriterionDocument
    }
}

const UpdateCriterionSection = ({ data }: Props) => {

    return (
        <Fragment>
            <UpdateCriterionForm
                data={{ criterion: data.criterion }}
            />
        </Fragment>
    );
};
export default UpdateCriterionSection;