// components/Pagination.tsx
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  baseUrl?: string;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  limit, 
  baseUrl = "/projects" 
}: PaginationProps) => {
  const getPageRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Calcular el rango de páginas
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Agregar primera página
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    // Agregar páginas del rango
    rangeWithDots.push(...range);

    // Agregar última página
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  const pageRange = getPageRange();

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      {/* Botón Anterior */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}&limit=${limit}`}
          className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm font-medium"
        >
          Anterior
        </Link>
      )}

      {/* Números de página */}
      {pageRange.map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-2 py-2 text-gray-500">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isActive = pageNum === currentPage;

        return (
          <Link
            key={pageNum}
            href={`${baseUrl}?page=${pageNum}&limit=${limit}`}
            className={`px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Botón Siguiente */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}&limit=${limit}`}
          className="px-3 py-2 border rounded-md hover:bg-gray-50 text-sm font-medium"
        >
          Siguiente
        </Link>
      )}
    </div>
  );
};

export default Pagination;