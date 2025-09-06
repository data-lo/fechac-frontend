import { Cloud, FolderKanban, Layers2, Lock, SlidersHorizontal, } from "lucide-react";

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
        icon: Layers2,
        label: "Inicio",
        href: "/abbreviation"
    },
    {
        icon: Cloud,
        label: "One Drive",
        href: "/session"
    },
]
