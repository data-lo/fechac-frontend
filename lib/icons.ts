import { Trash, Save, Pencil, Plus, Check, RefreshCcw, Navigation, FolderCog, FileCog, FileUp, CircleStop, Play, Eye, FileSliders, CirclePlus, Clock } from "lucide-react";

export const allowedIcons = {
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
  CirclePlus,
  Clock
} as const;

export type icon = keyof typeof allowedIcons;
