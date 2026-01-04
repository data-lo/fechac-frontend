import { Periodicity } from "@/enums/periodicity";

export function getDaysByPeriodicity(periodicity: Periodicity): number {
  switch (periodicity) {
    case Periodicity.DAILY:
      return 1;
    case Periodicity.WEEKLY:
      return 7;
    case Periodicity.BIWEEKLY:
      return 14;
    case Periodicity.MONTHLY:
      return 30;
    default:
      const _exhaustiveCheck: never = periodicity;
      return _exhaustiveCheck;
  }
}