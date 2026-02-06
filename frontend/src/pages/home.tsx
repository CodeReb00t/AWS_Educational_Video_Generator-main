import { ToolManager } from "@/components/tool-manager";

export function HomePage() {
  return (
    <section className="space-y-8">
      <header className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Create
        </p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">AI Studio</h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          Draft a script, switch tools, and generate videos or images.
        </p>
      </header>
      <ToolManager />
    </section>
  );
}
