import type { ReactNode } from "react";

export function Eyebrow({ children, numeral }: { children: ReactNode; numeral?: string }) {
  return (
    <div className="flex items-center gap-4 text-xs leading-4 tracking-eyebrow text-accent uppercase">
      {numeral && (
        <span className="font-display text-sm tracking-normal normal-case">
          <span className="sr-only">Capítulo </span>
          {numeral}
        </span>
      )}
      <span aria-hidden className="h-px w-16 shrink-0 bg-accent" />
      <span>{children}</span>
    </div>
  );
}
