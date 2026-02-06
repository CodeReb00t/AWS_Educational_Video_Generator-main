import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useChatHistory } from "@/contexts/chat-history-context";

const TEMPLATES = [
  {
    id: "intro-lesson",
    label: "Intro Lesson",
    text: "Hook: Start with a relatable question or fact.\nMain: Explain the concept with 3 clear steps and examples.\nWrap-up: Quick recap + call to action.",
  },
  {
    id: "lab-demo",
    label: "Lab Demo",
    text: "Hook: Safety and aim.\nStep 1: Setup and materials.\nStep 2: Procedure with checks.\nConclusion: Observations + next steps.",
  },
];

export function ScriptEditor({
  value,
  onChange,
  onUseInVideo,
}: {
  value: string;
  onChange: (v: string) => void;
  onUseInVideo: (v: string) => void;
}) {
  const { activeSessionId } = useChatHistory();
  const [local, setLocal] = useState<string>(value || "");

  useEffect(() => {
    // load draft per session or global
    const key = `script-draft:${activeSessionId ?? "global"}`;
    const raw =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) setLocal(raw);
  }, [activeSessionId]);

  useEffect(() => {
    // persist draft
    const key = `script-draft:${activeSessionId ?? "global"}`;
    try {
      window.localStorage.setItem(key, local);
    } catch (e) {
      /* ignore */
    }
  }, [local, activeSessionId]);

  const applyTemplate = (t: string) => {
    const newText = local ? `${local.trim()}\n\n${t}` : t;
    setLocal(newText);
    onChange(newText);
  };

  const wordCount = local.trim() ? local.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-xl border border-border/40 bg-card/80 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-muted-foreground">
          Script Editor
        </label>
        <div className="text-xs text-muted-foreground">{wordCount} words</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => applyTemplate(t.text)}
            className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-muted/20 px-3 py-1 text-xs text-muted-foreground hover:bg-primary/10 transition"
            title={`Insert ${t.label}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={local}
        onChange={(e) => {
          const v = e.target.value;
          setLocal(v);
          onChange(v);
        }}
        placeholder="Draft your lesson script here (hook, explanation, recap)..."
        className="mt-3 w-full min-h-[200px] resize-vertical rounded-lg bg-muted/20 p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          You can copy this script into Video tab to generate a video.
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setLocal("")}>Clear</Button>
          <Button onClick={() => onUseInVideo(local)} variant="primary">
            Use in Video
          </Button>
        </div>
      </div>
    </div>
  );
}
