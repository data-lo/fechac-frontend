
import getProject from "@/actions/projects/get-project";
import UpdateProjectSection from "./update-project-section";
import getDocumentsByProject from "@/actions/projects/get-documents-by-project";


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

    const documents = await getDocumentsByProject(project.sadap_id)

    // const countDocuments = await countDocumentsPerProject(project.sadap_id);

    return (
        <UpdateProjectSection
            project={project}
            documents={documents}
        />
    );
};


