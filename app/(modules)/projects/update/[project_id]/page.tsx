// App actions
import getProject from "@/actions/projects/get-project";
import getDocumentsByProject from "@/actions/projects/get-documents-by-project";

// Local components
import UpdateProjectSection from "./update-project-section";

interface PageProps {
  params: Promise<{ project_id: string }>
}

export default async function Page({ params }: PageProps) {

  const { project_id } = await params;

  const project = await getProject(project_id);

  if (!project) {
    return (
      <section className="p-4 text-center text-red-600">
        El proyecto solicitado no existe.
      </section>
    );
  }

  const documents = await getDocumentsByProject(project.sadap_id);

  return (
    <UpdateProjectSection
      project={project}
      documents={documents}
    />
  );
}