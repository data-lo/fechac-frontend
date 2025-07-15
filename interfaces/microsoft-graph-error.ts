import { code } from "@/types/code-error";

export interface MicrosoftGraphError {
  error: {
    code: code;
    message: string;
    innerError?: {
      date: string;
      "request-id": string;
      "client-request-id": string;
    };
  };
}
