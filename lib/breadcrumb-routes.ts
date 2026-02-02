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
    label: "Actualizar Proyecto",
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
    label: "Actualizar Flujo",
    href: null,
  },

  // Documents
  'documents': {
    label: "Documentos",
    href: "/documents/view",
  },
  'documents/view': {
    label: "Listado",
    href: "/documents/view",
  },
  'documents/update': {
    label: "Actualizar Documento",
    href: "/documents/update",
  },

  
  // Criterios
  'criteria': {
    label: "Criterios",
    href: "/criteria/view",
  },

  'criteria/create': {
    label: "Crear",
    href: "/criteria/create",
  },
  'criteria/view': {
    label: "Listado",
    href: "/criteria/view",
  },
  'criteria/update': {
    label: "Actualizar Criterio",
    href: null,
  },

  'session': {
    label: "Sesiones",
    href: "/session/view",
  },

  'session/view': {
    label: "Panel",
    href: "/session/view",
  },
  'session/authentication': {
    label: "Panel",
    href: "/session/view",
  },

  // Restricciones
  'restrictions': {
    label: "Restricciones",
    href: "/restrictions/view",
  },

  'restrictions/view': {
    label: "Listado",
    href: "/restrictions/view",
  },

}