import ViewDocumentSection from "./view-document-section";

interface Props {
    searchParams?: Promise<{ page?: string, limit?: string, query?: string}>;
}

export default function DocumentsPage({ searchParams }: Props) {
    return (
        <div className="h_screen">
            <ViewDocumentSection searchParams={searchParams} />
        </div>
    )
}