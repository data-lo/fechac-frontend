import { Cloud, FileStack, Folder, Lock, SlidersHorizontal, WholeWord, Workflow, } from "lucide-react";

export const routes = [
    {
        icon: Workflow,
        title: "Lotes",
        url: "/workflows"
    },
    {
        icon: Folder,
        title: "Proyectos",
        url: "/projects"
    },
    {
        icon: FileStack,
        title: "Documentos",
        url: "/documents"
    },
    {
        icon: SlidersHorizontal,
        title: "Criterios",
        url: "/criteria"
    },

    {
        icon: Lock,
        title: "Restricciones",
        url: "/restrictions"
    },
    // {
    //     icon: WholeWord,
    //     title: "Abreviaciones",
    //     href: "/abbreviations"
    // },
    {
        icon: Cloud,
        title: "One Drive",
        url: "/session"
    },
]
