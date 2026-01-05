export interface ActionResponse<T> {
  success: boolean;
  message: string;
  error: string | null;
  data: T | null;
}
