import { MicrosoftGraphError } from "@/interfaces/microsoft-graph-error";

export function isMicrosoftGraphError(obj: any): obj is MicrosoftGraphError {
  return (
    obj &&
    typeof obj === "object" &&
    "error" in obj &&
    typeof obj.error.code === "string" &&
    typeof obj.error.message === "string"
  );
}
