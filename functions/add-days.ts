export function addDays(days: number, fromDate = new Date()): Date {
  const result = new Date(fromDate);
  result.setDate(result.getDate() + days);
  return result;
}
