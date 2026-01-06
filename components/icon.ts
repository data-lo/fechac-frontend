import { Trash, Save, Pencil, Plus, Check, RefreshCcw, Navigation, FolderCog, FileCog, FileUp, CircleStop, Play, Eye, FileSliders, Settings } from "lucide-react";

export const icons = {
  Trash,
  Save,
  Pencil,
  Plus,
  Check,
  RefreshCcw,
  Navigation,
  FolderCog,
  FileCog,
  FileUp,
  CircleStop,
  Play,
  Eye,
  FileSliders,
  Settings
} as const;

export type IconName = keyof typeof icons;
