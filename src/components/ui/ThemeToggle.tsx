import type { MouseEvent } from "react";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";

const iconBase =
  "absolute inset-0 m-auto transition-[transform,opacity] duration-500 ease-out-soft motion-reduce:transition-none";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      className="relative flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-muted transition-colors duration-300 hover:text-accent"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden
        className={cn(iconBase, isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0")}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
      </svg>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn(iconBase, isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100")}
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
    </button>
  );
}
