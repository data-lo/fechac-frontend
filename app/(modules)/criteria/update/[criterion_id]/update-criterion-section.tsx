'use client'

// External libraries
import { Fragment } from "react";

// Domain / Models
import CriterionDocument from "@/models/criteria/criterion-document";

// Local components
import UpdateCriterionForm from "./components/criterion-update-form";

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