import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("self-start border-b border-dashed border-line-dashed text-dim", className)}>{children}</span>;
}
