import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const THEME_COLORS: Record<Theme, string> = { dark: "#0c0c0d", light: "#f5f1e9" };

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const reducedMotion = usePrefersReducedMotion();

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const commit = () => {
        applyTheme(next);
        flushSync(() => setTheme(next));
      };

      if (!document.startViewTransition || reducedMotion) return commit();

      if (origin) {
        const { x, y } = origin;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const style = document.documentElement.style;
        style.setProperty("--vt-x", `${x}px`);
        style.setProperty("--vt-y", `${y}px`);
        style.setProperty("--vt-r", `${radius}px`);
      }
      document.startViewTransition(commit);
    },
    [theme, reducedMotion],
  );

  return { theme, toggle };
}
