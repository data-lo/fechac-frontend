"use client";

import { Card, CardContent } from "@/components/ui/card";

import { Link2, Tag, Check, X } from "lucide-react";

import { DocumentEntity } from "../../../models/document-entity";
import { Similarity } from "../../../models/document";
import { DocumentStatusEnum } from "@/enums/document-status-enum";
import { getStatusInfo } from "../../../functions/get-status-translation";

interface Props {
  document: DocumentEntity;
}

export default function DocumentCard({ document }: Props) {
  const statusInfo = getStatusInfo(document.status as DocumentStatusEnum);

  return (
    <Card className="shadow-none rounded-none border-none">
      <CardContent className="space-y-4 text-xs">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 font-medium mb-2">ESTATUS</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${statusInfo.className}`}>
              {statusInfo.text}
            </span>
          </div>

          <div>
            <p className="text-gray-500 font-medium mb-2">DEPARTAMENTO</p>
            <p className="font-semibold">{document.department}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium mb-2">URL DEL ARCHIVO</p>
            <a
              href={document.metadata?.web_url}
              target="_blank"
              className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              <Link2 className="w-4 h-4" />
              ABRIR EN NEVEGADOR
            </a>
          </div>

          {document.path && (
            <div>
              <p className="text-gray-500 font-medium mb-2">RUTA</p>
              <p
                className="font-semibold truncate max-w-full"
                title={document.path}
              >
                {document.path}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 font-medium mb-2">ÁREA DEL PROYECTO</p>
            <p className="font-semibold">
              {document.project_area?.join(", ") || "—"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">ENFOQUE DEL PROYECTO</p>
            <p className="font-semibold">
              {document.project_focus?.join(", ") || "—"}
            </p>
          </div>
        </div>

        {document.matches && document.matches.length > 0 && (
          <div className="pt-2">
            <p className="text-gray-700 font-semibold mb-2">
              COINCIDENCIAS (Similarity)
            </p>

            <ul className="space-y-3">
              {document.matches.map((match: Similarity) => (
                <li
                  key={match.criterion_id}
                  className="border p-3 rounded-lg bg-gray-50 space-y-2"
                >
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Criterio: {match.criterion_id}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Path similar:</p>
                      <p className="font-semibold flex items-center gap-1">
                        {match.path.similar ? (
                          <Check className="text-green-600 h-4 w-4" />
                        ) : (
                          <X className="text-red-600 h-4 w-4" />
                        )}
                        {match.path.similar ? "Sí" : "No"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Score</p>
                      <p className="font-semibold">{match.path.score}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Motivo</p>
                      <p className="font-semibold">
                        {match.path.reason}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Nombre similar:</p>
                      <p className="font-semibold flex items-center gap-1">
                        {match.name.similar ? (
                          <Check className="text-green-600 h-4 w-4" />
                        ) : (
                          <X className="text-red-600 h-4 w-4" />
                        )}
                        {match.name.similar ? "Sí" : "No"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Score</p>
                      <p className="font-semibold">{match.name.score}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">Motivo</p>
                      <p className="font-semibold">
                        {match.name.reason}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
