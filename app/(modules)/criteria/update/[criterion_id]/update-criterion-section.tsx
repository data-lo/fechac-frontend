'use client'
import { Fragment } from "react";

import NavigationBreadcrumb from "@/components/breadcrumb";
import UpdateCriterionForm from "./components/criterion-update-form";

import CriterionDocument from "@/models/criteria/criterion-document";

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