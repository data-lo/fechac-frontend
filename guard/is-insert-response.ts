import { InsertResponse } from "@/interfaces/mongo/insert-response";

export function isInsertResponse(obj: any): obj is InsertResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.acknowledged === "boolean" &&
    typeof obj.insertedId === "string"
  );
}
