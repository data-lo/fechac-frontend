import type { Project } from "../../../../models/projects/project";

export function uniqueProjectsBySadapId(projects: Project[]): Project[] {
    const seen = new Set<string>();
    const out: Project[] = [];

    for (const project of projects) {
        const key = String(project.sadap_id ?? "").trim();
        if (!key) continue;

        if (seen.has(key)) continue;

        seen.add(key);
        out.push({ ...project, sadap_id: key });
    }

    return out;
}
