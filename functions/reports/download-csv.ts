export function downloadCSV(csvContent: string): void {
    const BOM = '\uFEFF';

    const blob = new Blob([BOM + csvContent], { 
        type: 'text/csv;charset=utf-8;' 
    });
    
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = "REPORTE_LOTE_1";
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}