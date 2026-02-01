export default function convertRowsToCSV(
  rows: Record<string, any>[]
): string {

  if (!rows || rows.length === 0) {
    return '';
  }

  const headers = Object.keys(rows[0]);

  const escapeValue = (value: any) => {
    if (value === null || value === undefined) return '';
    const str = String(value);

    return `"${str.replace(/"/g, '""')}"`;
  };

  const csv = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => escapeValue(row[h])).join(',')
    ),
  ].join('\n');

  return csv;
}