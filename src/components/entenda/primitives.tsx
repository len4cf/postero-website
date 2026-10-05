import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Counter } from "../motion/Counter";
import { Parallax } from "../motion/Parallax";
import { RevealText } from "../motion/RevealText";
import { ScrubText } from "../motion/ScrubText";

export function Rise({
  delay = 0,
  amount = 0.3,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; amount?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...props}
    />
  );
}

type ChapterProps = {
  id: string;
  numeral: string;
  title: string;
  lead?: ReactNode;
  bridge?: string;
  first?: boolean;
  children: ReactNode;
};

export function Chapter({ id, numeral, title, lead, bridge, first, children }: ChapterProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative scroll-mt-24 py-24 md:py-36", !first && "border-t border-line")}
    >
      <Parallax speed={220} className="pointer-events-none absolute top-10 right-0 select-none md:top-16">
        <span aria-hidden className="text-outline block font-display text-[clamp(140px,22vw,300px)] leading-none font-light opacity-40">
          {numeral}
        </span>
      </Parallax>

      <div className="relative flex max-w-[820px] flex-col gap-7">
        <span aria-hidden className="font-display text-sm tracking-[0.2em] text-accent">
          CAPÍTULO {numeral}
        </span>
        <RevealText
          id={`${id}-title`}
          by="word"
          stagger={0.045}
          className="font-display text-[34px] leading-[1.12] font-light text-heading md:text-[clamp(40px,4.2vw,60px)]"
          lines={[title]}
        />
        {lead && (
          <Rise delay={0.2} amount={0.8}>
            <p className="m-0 max-w-[640px] text-lg text-muted">{lead}</p>
          </Rise>
        )}
      </div>

      <div className="relative">{children}</div>

      {bridge && (
        <div className="relative mt-24 flex items-start gap-6 md:mt-32">
          <span aria-hidden className="mt-[0.7em] h-px w-12 shrink-0 bg-accent" />
          <ScrubText
            text={bridge}
            className="m-0 max-w-[760px] font-display text-[28px] leading-[1.25] font-light text-heading italic md:text-[40px]"
          />
        </div>
      )}
    </section>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-label tracking-label text-dim uppercase", className)}>{children}</div>;
}

export function SourceNote({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-6 text-xs text-dim uppercase", className)}>{children}</div>;
}

type StatProps = { value: string; label: ReactNode; tone?: "accent" | "soft"; size?: "md" | "xl"; className?: string };

function parseFigure(value: string) {
  const match = value.match(/^(\D*?)([\d.]+)(.*)$/);
  if (!match) return null;
  const number = Number(match[2].replace(/\./g, ""));
  return Number.isFinite(number) ? { prefix: match[1], number, suffix: match[3] } : null;
}

export function Stat({ value, label, tone = "accent", size = "md", className }: StatProps) {
  const figure = parseFigure(value);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        className={cn(
          "font-display leading-none font-light tracking-[-0.03em]",
          size === "xl" ? "text-[clamp(96px,22vw,200px)]" : "text-5xl md:text-[64px]",
          tone === "accent" ? "text-accent" : "text-accent-hover",
        )}
      >
        {figure ? <Counter prefix={figure.prefix} value={figure.number} suffix={figure.suffix} /> : value}
      </span>
      <span className="text-base text-muted">{label}</span>
    </div>
  );
}
