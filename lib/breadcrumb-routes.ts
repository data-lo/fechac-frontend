export const BREADCRUMB_ROUTES: Record<string, { label: string; href: string | null }> = {
  // Projects
  'projects': {
    label: "Proyectos",
    href: "/projects/view",
  },
  'projects/view': {
    label: "Listado",
    href: "/projects/view",
  },
  'projects/update': {
    label: "Editar Proyecto",
    href: null,
  },

  // Workflows
  'workflows': {
    label: "Ejecuciones",
    href: "/workflows/view",
  },
  'workflows/view': {
    label: "Listado",
    href: "/workflows/view",
  },
  'workflows/update': {
    label: "Editar Documento",
    href: null,
  },

  // Workflows
  'documents': {
    label: "Documentos",
    href: "/documents/view",
  },
  'documents/view': {
    label: "Listado",
    href: "/workflows/view",
  },
  'documents/update': {
    label: "Editar Documento",
    href: null,
  },
};
