import { ProjectLifecycleStatusCodeEnum } from "@/enums/project-lifecycle-status-code-enum";

export function normalizeProjectLifecycleStatus(raw: unknown): { code?: number; closed?: boolean} {
    // Normaliza un string "7 cerrado", "07 cerrado", etc.
    if (raw == null) return {};

    const s = String(raw). trim().toLowerCase();

    const numMatch = s.match(/\d+/)?.[0];
    const code = numMatch ? Number(numMatch) : undefined;

    const closed = s.includes("cerrado");

    return { code, closed }
}

export function isClosedProjectLifecycleStatus(raw: unknown): boolean {
    // True si el estado equivale a "7 cerrado"
    const { code, closed } = normalizeProjectLifecycleStatus(raw);
    return code === ProjectLifecycleStatusCodeEnum.CLOSED && closed === true;
}