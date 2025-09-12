import { Cloud, FolderKanban, Lock, SlidersHorizontal, WholeWord, } from "lucide-react";

export const routes = [
    {
        icon: FolderKanban,
        label: "Proyectos",
        href: "/projects"
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
