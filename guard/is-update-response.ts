
import { UpdateResponse } from "@/interfaces/mongo/update-response";

export function isUpdateResponse(obj: any): obj is UpdateResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.acknowledged === "boolean" &&
    typeof obj.modifiedCount === "number" &&
    typeof obj.upsertedCount === "number" &&
    typeof obj.matchedCount === "number"
  );
}
