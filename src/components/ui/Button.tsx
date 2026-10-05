import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary";
type Size = "default" | "compact";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-[2px] font-sans font-medium no-underline transition-colors duration-300";

const sizes: Record<Size, string> = {
  default: "min-h-11 px-6 py-3 text-sm",
  compact: "min-h-9 px-4 py-2 text-[13px] sm:min-h-11 sm:px-6 sm:py-3 sm:text-sm",
};

const variants: Record<Variant, string> = {
  primary: "bg-accent text-background hover:bg-accent-hover hover:text-background",
  secondary: "border border-dim text-heading hover:border-heading hover:text-heading",
};

type StyleProps = { variant?: Variant; size?: Size };

function buttonClasses({ variant = "primary", size = "default" }: StyleProps, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

type ButtonLinkProps = ComponentProps<"a"> & StyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(
        { variant, size },
        cn("cursor-pointer", variant === "secondary" ? "bg-transparent" : "border-0", className),
      )} {...props} />
  );
}
