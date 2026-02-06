import { motion } from "framer-motion";
import { Paperclip, Send, X } from "lucide-react";
import { useCallback } from "react";
import { ToolSelector } from "@/components/tool-selector";
import type { ToolType } from "@/lib/model-config";
import { cn } from "@/lib/utils";
import type { KeyboardEvent } from "react";
import { Button } from "./ui/button";

const formatBytes = (bytes: number) => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${bytes} B`;
};

interface ChatPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  attachments?: { id: string; name: string; size: number }[];
  onRemoveAttachment?: (id: string) => void;
  onAttachClick?: () => void;
  showAttach?: boolean;
}

export function ChatPromptInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder = "Describe the video you want to create...",
  activeTool,
  onToolSelect,
  attachments = [],
  onRemoveAttachment,
  onAttachClick,
  showAttach = true,
}: ChatPromptInputProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!disabled) {
          onSubmit();
        }
      }
    },
    [disabled, onSubmit],
  );

  return (
    <div className="rounded-2xl border border-border/50 bg-background shadow-lg">
      <div className="p-4">
        <label className="space-y-2 text-sm">
          <span className="sr-only">Prompt</span>
          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-[120px] w-full resize-none rounded-xl bg-muted/30 px-4 py-3.5 text-[15px] leading-relaxed text-foreground",
              "placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:bg-background transition-colors",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          />
        </label>

        {attachments.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {attachments.map((file) => (
              <span
                key={file.id}
                className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-muted/40 px-3 py-2 text-xs font-medium"
              >
                <span className="flex flex-col text-left">
                  <span className="font-medium">{file.name}</span>
                  <span className="text-[11px] font-normal text-muted-foreground">
                    {formatBytes(file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveAttachment?.(file.id)}
                  className="rounded-full p-1 text-muted-foreground transition hover:bg-muted/60 hover:text-foreground"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border/40 bg-muted/20 px-4 py-3">
        <div className="flex items-center gap-2">
          {/* <ToolSelector value={activeTool} onChange={onToolSelect} /> */}
          {showAttach && onAttachClick && (
            <Button
              variant="default"
              onClick={onAttachClick}
              aria-label="Attach files"
              className="
    rounded-lg p-2
    text-foreground
    transition-colors
  "
            >
              <span className="flex items-center gap-1.5">
                <Paperclip className="size-4" />
                <span>Upload</span>
              </span>
            </Button>
          )}
        </div>
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            "rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all",
            "hover:bg-primary/90 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:shadow-sm",
          )}
        >
          <span className="flex items-center gap-2">
            <Send className="size-4" />
            Send
          </span>
        </button>
      </div>
    </div>
  );
}
