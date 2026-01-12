'use client'

// 1. Componentes globales
import NavigationBreadcrumb from "@/components/breadcrumb";

// 2. Componentes locales de la ruta
import CreateCriterionForm from "./components/create-criterion-form";
import { Fragment } from "react";


const CreateCriterionSection = () => {
    return (

        <CreateCriterionForm />

    );
};
export default CreateCriterionSection;