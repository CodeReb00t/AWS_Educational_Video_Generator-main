import { useState, useEffect } from "react";
import { Video, Image, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoGenerator } from "./video-generator";
import { ScriptEditor } from "./script-editor.tsx";

type TabKey = "script" | "video" | "image" | "text";

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: "script", label: "Script", icon: FileText },
  { key: "video", label: "Video", icon: Video },
  { key: "image", label: "Image", icon: Image },
  { key: "text", label: "Chat", icon: MessageSquare },
];

export function ToolManager() {
  const [active, setActive] = useState<TabKey>("video");
  const [script, setScript] = useState<string>("");

  // keyboard shortcuts: 1=>Script, 2=>Video, 3=>Image
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") setActive("script");
      if (e.key === "2") setActive("video");
      if (e.key === "3") setActive("image");
      if (e.key === "4") setActive("text");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-muted/20 p-1.5 flex gap-1">
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  aria-pressed={active === tab.key}
                  aria-label={`${tab.label} (press ${idx + 1})`}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition",
                    active === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted/30"
                  )}
                >
                  <Icon className="size-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground">
              Tip: Press 1/2/3/4 to switch
            </div>
            {/* <details className="relative">
              <summary className="cursor-pointer rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted/30">
                Examples
              </summary>
              <div className="absolute mt-2 rounded-lg border border-border/40 bg-card/90 p-3 shadow-md w-64">
                <button
                  className="block w-full text-left rounded px-2 py-1 text-sm hover:bg-muted/20"
                  onClick={() => {
                    setScript(
                      "Hook: Start with a question.\nMain: Explain with 3 steps.\nWrap up: Quick recap and CTA.",
                    );
                    setActive("video");
                  }}
                >
                  Quick Intro Lesson
                </button>
                <button
                  className="mt-2 block w-full text-left rounded px-2 py-1 text-sm hover:bg-muted/20"
                  onClick={() => {
                    setScript(
                      "Hook: Pose a simple experiment.\nStep 1: Do X.\nStep 2: Do Y.\nObserve: What changed?",
                    );
                    setActive("video");
                  }}
                >
                  Lab Demo
                </button>
              </div>
            </details> */}
          </div>
        </div>

        <div className="mt-6">
          {active === "script" && (
            <ScriptEditor
              value={script}
              onChange={setScript}
              onUseInVideo={(payload: string) => {
                setScript(payload);
                setActive("video");
              }}
            />
          )}

          {active === "video" && (
            <VideoGenerator initialTool={"video"} initialPrompt={script} />
          )}

          {active === "image" && (
            <VideoGenerator initialTool={"image"} initialPrompt={script} />
          )}

          {active === "text" && (
            <VideoGenerator initialTool={"text"} initialPrompt={script} />
          )}
        </div>
      </div>
    </section>
  );
}
