"use client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const prefersDark = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyThemeClass = (next: Theme) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  const opposite = next === "dark" ? "light" : "dark";

  root.classList.remove(opposite);
  root.classList.add(next);
  root.dataset.theme = next;
  root.style.colorScheme = next === "dark" ? "dark" : "light";
};

const THEME_OPTIONS = new Set<Theme>(["light", "dark"]);

const isStoredTheme = (value: unknown): value is Theme =>
  typeof value === "string" && THEME_OPTIONS.has(value as Theme);

export interface ThemeProviderProps {
  children: ReactNode;
  storageKey?: string;
  defaultTheme?: Theme | "system";
}

export function ThemeProvider({
  children,
  storageKey = "theme",
  defaultTheme = "system",
}: ThemeProviderProps) {
  const fallbackTheme = defaultTheme === "dark" ? "dark" : "light";

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return fallbackTheme;
    }

    const stored = window.localStorage.getItem(storageKey);

    if (isStoredTheme(stored)) {
      return stored;
    }

    if (defaultTheme === "system") {
      return prefersDark() ? "dark" : "light";
    }

    return defaultTheme;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(storageKey, theme);
    applyThemeClass(theme);
  }, [storageKey, theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      const value = event.newValue;

      if (isStoredTheme(value)) {
        setThemeState(value);
        return;
      }

      setThemeState(
        defaultTheme === "system" ? (prefersDark() ? "dark" : "light") : fallbackTheme,
      );
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [defaultTheme, fallbackTheme, storageKey]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export interface ThemeScriptProps {
  storageKey?: string;
  defaultTheme?: Theme | "system";
}

export function ThemeScript({
  storageKey = "theme",
  defaultTheme = "system",
}: ThemeScriptProps) {
  const bootstrapScript = `
(() => {
  try {
    var storageKey = ${JSON.stringify(storageKey)};
    var storedTheme = window.localStorage.getItem(storageKey);
    var isValidTheme = storedTheme === "light" || storedTheme === "dark";
    var theme = isValidTheme ? storedTheme : null;

    if (!theme) {
      var defaultTheme = ${JSON.stringify(defaultTheme)};
      if (defaultTheme === "system") {
        var media = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        theme = media && media.matches ? "dark" : "light";
      } else {
        theme = defaultTheme;
      }
    }

    var root = document.documentElement;
    var opposite = theme === "dark" ? "light" : "dark";

    root.classList.remove(opposite);
    root.classList.add(theme);
    root.dataset.theme = theme;
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  } catch (error) {
    console.warn("Theme bootstrap failed", error);
  }
})();`;

  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: bootstrapScript }}
    />
  );
}
