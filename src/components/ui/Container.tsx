import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mx-auto box-border w-full max-w-[1240px] px-5 sm:px-8 md:px-10",
        className,
      )}
      {...props}
    />
  );
}
