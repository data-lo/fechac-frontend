import { Fragment } from "react";
import { ProjectDocument } from "../../models/project-document";

interface Props {
    project: ProjectDocument

}
export default async function UpdateProjectSection({
    project
}: Props) {
    console.log(project)

    return (
        <Fragment>
            

        </Fragment>
    );
}