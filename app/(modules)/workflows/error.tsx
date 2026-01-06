"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (

        <Card className="w-full border-destructive/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <CardTitle className="text-lg">Algo salió mal</CardTitle>
                </div>
                <CardDescription>
                    Ha ocurrido un error inesperado al procesar tu solicitud.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    <p className="text-xs bg-muted py-2 px-4 rounded">
                        {error.message || "Error desconocido"}
                    </p>
                    {error.digest && (
                        <p className="mt-4 text-xs">
                            Digest: <span className="font-mono">{error.digest}</span>
                        </p>
                    )}
                </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
                <Button variant="outline" onClick={() => window.location.reload()}>
                    Recargar página
                </Button>
            </CardFooter>
        </Card>
    )
}