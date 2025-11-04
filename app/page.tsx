"use client";

import { useTheme } from "@/providers/theme-provider";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="h-dvh flex flex-col items-center justify-center gap-6 p-24 text-center">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="text-muted-foreground">
        You are currently browsing in <span className="font-semibold">{theme}</span> mode.
      </p>
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
      >
        Toggle to {theme === "dark" ? "light" : "dark"} mode
      </button>
    </main>
  )
}
