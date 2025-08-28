import { Trash, Save, Pencil, Plus, Check, RefreshCcw } from "lucide-react";

export const icons = {
  Trash,
  Save,
  Pencil,
  Plus,
  Check,
  RefreshCcw,
} as const;

export type IconName = keyof typeof icons;
