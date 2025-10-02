import type { Project } from "../models/project";

export function dedupeBySadapID<T extends Pick<Project, "sadap_id">>(records: T[]): T[] {
    const seen = new Set<String>();
    const out: T[] = [];

    for (const r of records) {
        const key = String(r.sadap_id ?? "").trim();

        if (!key) continue;

        if (seen.has(key)) continue;

        seen.add(key);
        out.push({...r, sadap_id: key});
    }

    return out;
}