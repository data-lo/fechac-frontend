import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
  currentPage: number;
  totalPages: number;
  limit: number;
  baseUrl: string;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  limit,
  baseUrl
}: Props) => {
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
    <Pagination>
      <PaginationContent>
        {/* Botón Previous */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${baseUrl}?page=${currentPage - 1}&limit=${limit}`} />
          </PaginationItem>
        )}

        {/* Páginas y ellipsis */}
        {pageRange.map((page, index) => {
          if (page === "...") {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={isActive}
                href={`${baseUrl}?page=${pageNum}&limit=${limit}`}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Botón Next */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${baseUrl}?page=${currentPage + 1}&limit=${limit}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;