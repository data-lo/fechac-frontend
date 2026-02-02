import { Link2 } from "lucide-react";

interface Props {
  path?: string;
  webUrl?: string;
}

const DocumentLocationCard = ({ path, webUrl }: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="space-y-6 divide-y divide-gray-100">

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Ruta
          </span>
          <p className="rounded-md bg-gray-50 p-2 text-sm font-mono text-gray-800 break-words">
            {path ?? "-"}
          </p>
        </div>

        <div className="space-y-2 pt-4 flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            URL
          </span>

          {webUrl && (
            <a

              href={webUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border-1 border-gray-100 px-4 py-2.5 text-black font-medium transition-colors"
            >
              <Link2 className="w-4 h-4" />
              Abrir
            </a>
          )}

        </div>

      </div>
    </div>
  );
};

export default DocumentLocationCard;
