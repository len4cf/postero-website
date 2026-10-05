import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

const pillClass =
  "group relative isolate inline-flex min-h-10 cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-accent-line bg-transparent px-5 font-sans text-label tracking-label text-heading uppercase no-underline transition-colors duration-500 ease-out-soft hover:border-accent hover:text-background focus-visible:border-accent md:min-h-11 md:px-6";

function PillContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
      />
      <span aria-hidden className="size-1.5 rounded-full bg-accent transition-colors duration-500 group-hover:bg-background" />
      {children}
      <span aria-hidden className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
        →
      </span>
    </>
  );
}

export function PillLink({ className, children, ...props }: ComponentProps<"a">) {
  return (
    <a className={cn(pillClass, className)} {...props}>
      <PillContent>{children}</PillContent>
    </a>
  );
}

export function PillButton({ className, children, type = "button", ...props }: ComponentProps<"button">) {
  return (
    <button type={type} className={cn(pillClass, className)} {...props}>
      <PillContent>{children}</PillContent>
    </button>
  );
}
