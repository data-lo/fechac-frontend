import { RULE_TYPE_ENUM } from "@/enums/rule-type-enum";

export interface Restriction {
  id: string;
  character: string;
  isActive: boolean;
}
