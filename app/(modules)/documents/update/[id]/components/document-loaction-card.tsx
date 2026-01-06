"use client";

import { Link2 } from "lucide-react";

interface Props {
  path?: string | null;
  webUrl?: string | null;
}

const DocumentLocationCard = ({ path, webUrl }: Props) => {
  return (
    <div className="p-5 bg-white">
      <div className="grid grid-cols-1 gap-6 text-sm">

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">RUTA</p>

          {path && (
            <p
              className="text-base font-normal break-all leading-relaxed 
                         md:max-w-[90%] lg:max-w-[95%]"
            >
              {path.toLowerCase()}
            </p>
          )}

          {!path && <p>-</p>}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">URL</p>

          {webUrl && (
            <a
              href={webUrl}
              target="_blank"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              <Link2 className="w-4 h-4" />
              ABRIR EN NAVEGADOR
            </a>
          )}

          {!webUrl && <p>-</p>}
        </div>

      </div>
    </div>
  );
};

export default DocumentLocationCard;
