import React, { useCallback, useState } from "react";
import { Trash2, Image } from "lucide-react";

export function AssetManager({
  files,
  onAdd,
  onRemove,
}: {
  files: { id: string; file: File }[];
  onAdd: (file: File) => void;
  onRemove: (id: string) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const dt = e.dataTransfer;
      if (!dt) return;
      const list = Array.from(dt.files || []);
      list.forEach((f) => onAdd(f));
    },
    [onAdd],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded-lg border border-border/40 bg-muted/20 p-3 text-sm text-muted-foreground ${
          dragging ? "ring-2 ring-primary/40" : ""
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {files.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/50 px-2 py-1"
            >
              {item.file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(item.file)}
                  alt={item.file.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center rounded bg-muted/30 text-muted-foreground">
                  <Image className="size-4" />
                </div>
              )}
              <div className="text-xs">
                <div className="font-medium">{item.file.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {formatSize(item.file.size)}
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="ml-2 rounded p-1 text-muted-foreground hover:bg-muted/30"
                title={`Remove ${item.file.name}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}
