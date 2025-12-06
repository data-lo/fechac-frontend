import { Trash, Save, Pencil, Plus, Check, RefreshCcw, Navigation, FolderCog } from "lucide-react";

export const icons = {
  Trash,
  Save,
  Pencil,
  Plus,
  Check,
  RefreshCcw,
  Navigation,
  FolderCog
} as const;

export type IconName = keyof typeof icons;
