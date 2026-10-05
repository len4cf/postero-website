import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("text-label tracking-label text-dim uppercase", className)}>{children}</span>;
}
