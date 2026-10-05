import { motion, useScroll, useSpring } from "motion/react";
import { chapters, type ChapterKey } from "../../data/content";
import { cn } from "../../lib/cn";

export function ChapterRail({ active }: { active: ChapterKey | null }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <nav
      aria-label="Índice de capítulos"
      className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 min-[1360px]:block"
    >
      <div aria-hidden className="absolute top-0 right-[5px] bottom-0 w-px bg-line-strong">
        <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY: progress }} />
      </div>
      <ol className="relative m-0 flex list-none flex-col gap-1 p-0">
        {chapters.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group flex min-h-8 items-center justify-end gap-3 no-underline"
              >
                <span
                  className={cn(
                    "pointer-events-none bg-background px-2 text-label tracking-label whitespace-nowrap text-heading uppercase opacity-0 transition-[opacity,transform] duration-500 ease-out-soft",
                    "translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  {c.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "w-7 text-right font-display text-xs transition-[opacity,transform] duration-500 ease-out-soft",
                    isActive ? "scale-125 text-accent opacity-100" : "text-muted opacity-60 group-hover:opacity-100",
                  )}
                >
                  {c.numeral}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "size-[11px] rounded-full border transition-transform duration-500 ease-out-soft",
                    isActive ? "scale-100 border-accent bg-accent" : "scale-[0.55] border-line-dashed bg-background",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
