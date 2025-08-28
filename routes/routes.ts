import { FileLock2, FolderKanban, KeyRound, Layers2, SlidersHorizontal,  } from "lucide-react";

export const routes = [
    {
        icon: SlidersHorizontal,
        label: "Criterios",
        href: "/criteria"
    },
    {
        icon: FolderKanban,
        label: "Proyectos",
        href: "/projects"
    },
    {
        icon: FileLock2,
        label: "Restricciones",
        href: "/restrictions"
    },
    {
        icon: Layers2,
        label: "Inicio",
        href: "/abbreviation"
    },
    {
        icon: KeyRound,
        label: "One Drive",
        href: "/session"
    },
]
