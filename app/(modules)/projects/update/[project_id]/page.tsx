import { Fragment } from "react";
import getProject from "./actions/get-project";
import UpdateProjectSection from "./update-project-section";

interface Props {
    params: {
        project_id: string;
    };
}

export default async function UpdateProjectPage({ params }: Props) {
    const { project_id } = await params;

    const project = await getProject(project_id)

    if (!project) {
        return (
            <section className="p-4 text-center text-red-600">
                El proyecto solicitado no existe.
            </section>
        );
    }


    return (
        <Fragment>
            <UpdateProjectSection project={project} />
        </Fragment>
    );
};


