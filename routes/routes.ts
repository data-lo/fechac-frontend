import { Cloud, FileStack, Folder, Lock, SlidersHorizontal, WholeWord, Workflow, } from "lucide-react";

export const routes = [
    {
        icon: Workflow,
        label: "Lotes",
        href: "/workflows"
    },
    {
        icon: Folder,
        label: "Proyectos",
        href: "/projects"
    },
    {
        icon: FileStack,
        label: "Documentos",
        href: "/documents"
    },
    {
        icon: SlidersHorizontal,
        label: "Criterios",
        href: "/criteria"
    },

    {
        icon: Lock,
        label: "Restricciones",
        href: "/restrictions"
    },
    {
        icon: WholeWord,
        label: "Abreviaciones",
        href: "/abbreviations"
    },
    {
        icon: Cloud,
        label: "One Drive",
        href: "/session"
    },
]
