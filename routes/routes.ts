import { Cloud, FileStack, Folder, Lock, SlidersHorizontal, WholeWord, Workflow, } from "lucide-react";

export const routes = [
    {
        icon: Workflow,
        title: "Ejecuciones",
        url: "/workflows/view"
    },
    {
        icon: Folder,
        title: "Proyectos",
        url: "/projects/view"
    },
    {
        icon: FileStack,
        title: "Documentos",
        url: "/documents/view"
    },
    {
        icon: SlidersHorizontal,
        title: "Criterios",
        url: "/criteria/view"
    },

    {
        icon: Lock,
        title: "Restricciones",
        url: "/restrictions/view"
    },
    {
        icon: WholeWord,
        title: "Abreviaciones",
        href: "/abbreviations/view"
    },
    {
        icon: Cloud,
        title: "One Drive",
        url: "/session/view"
    },
]
