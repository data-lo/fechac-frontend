import { ObjectId } from "mongodb";

export function toPlain(input: any): any {
  if (input == null) return input;

  if (Array.isArray(input)) return input.map(toPlain);

  if (input instanceof ObjectId) return input.toString();
  if (input instanceof Date) return input.toISOString();
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(input)) return input.toString("base64");

  if (typeof input === "object") {
    const out: any = {};
    for (const [k, v] of Object.entries(input)) out[k] = toPlain(v);
    return out;
  }
  return input;
}
