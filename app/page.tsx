"use client";

import Link from "next/link";
import { useTheme } from "@/providers/theme-provider";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <div className="flex max-w-3xl flex-col items-center gap-6 p-24 text-center">
        <h1 className="typ-display">Welcome to my Next.js template!</h1>
        <p className="typ-paragraph">
          You are currently browsing in <span className="font-semibold">{theme}</span> mode.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
          >
            Toggle to {theme === "dark" ? "light" : "dark"} mode
          </button>
          <Link
            href="/preview"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
          >
            Preview Typography
          </Link>
        </div>
      </div>
    </main>
  );
}
