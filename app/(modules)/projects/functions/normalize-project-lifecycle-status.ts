import { FechacStatusEnum } from "@/enums/project-lifecycle-status-code-enum";

export function normalizeProjectStatus(status: string | null): string {
  if (status == null) return "";

  const s = String(status).trim().toUpperCase();

  const numMatch = s.match(/\d+/)?.[0];
  const code = numMatch ? Number(numMatch) : undefined;

  if (!code) return s;

  return `${code} CERRADO`;
}

export function isClosedProject(status: string | null): boolean {
  return normalizeProjectStatus(status) === FechacStatusEnum.CLOSED;
}
