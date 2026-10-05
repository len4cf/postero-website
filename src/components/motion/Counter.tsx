import { animate, useInView } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { cn } from "../../lib/cn";
import { EASE } from "../../lib/motion";

type Props = {
  value: number;
  prefix?: string;
  suffix?: ReactNode;
  suffixText?: string;
  duration?: number;
  className?: string;
};

export function Counter({ value, prefix, suffix, suffixText, duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced || !digits.current) return;
    const node = digits.current;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => (node.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  const label = `${prefix ?? ""}${value}${suffixText ?? (typeof suffix === "string" ? suffix : "")}`;
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <span className="sr-only">{label}</span>
      <span aria-hidden>
        {prefix}
        <span ref={digits}>{reduced ? value : 0}</span>
        {suffix}
      </span>
    </span>
  );
}
