import { AnimatePresence, motion, useMotionValueEvent, type MotionValue } from "motion/react";
import { lazy, Suspense, useState } from "react";
import { chapter } from "../../data/content";
import { teaser } from "../../data/entenda";
import { useMotionMode } from "../../hooks/useMotionMode";
import { useSheet } from "../../hooks/useSheet";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Counter } from "../motion/Counter";
import { StickySection } from "../motion/StickySection";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const EntendaPage = lazy(() => import("../entenda/EntendaPage").then((m) => ({ default: m.EntendaPage })));

const { numeral } = chapter("problema");
const steps = teaser.side;

function SideStat({ item }: { item: (typeof steps)[number] }) {
  return (
    <>
      <span className="font-display text-[56px] leading-none font-light tracking-[-0.02em] text-accent-hover md:text-[clamp(56px,6vw,88px)]">
        {item.value}
        {item.suffix && <span className="text-[0.32em] tracking-normal">{item.suffix}</span>}
      </span>
      <span className="max-w-[340px] text-base text-muted">{item.label}</span>
    </>
  );
}

function SteppedStats({ progress }: { progress: MotionValue<number> }) {
  const [index, setIndex] = useState(0);
  useMotionValueEvent(progress, "change", (p) => {
    setIndex(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length * 0.999))));
  });
  const item = steps[index];

  return (
    <div className="flex flex-col gap-8">
      <dl className="sr-only">
        {steps.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              {s.value}
              {s.suffix}
            </dd>
          </div>
        ))}
      </dl>
      <div aria-hidden className="flex items-center gap-4">
        <span className="font-display text-sm text-accent tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
        </span>
        <div className="flex flex-1 gap-1.5">
          {steps.map((s, i) => (
            <span key={s.label} className="relative h-px flex-1 overflow-hidden bg-line-strong">
              <span
                className={cn(
                  "absolute inset-0 origin-left bg-accent transition-transform duration-700 ease-out-soft",
                  i <= index ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden className="relative min-h-[180px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={item.label}
            className="flex flex-col gap-4"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <SideStat item={item} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatList() {
  return (
    <dl className="m-0 flex flex-col">
      {steps.map((s) => (
        <motion.div
          key={s.label}
          className="flex flex-col-reverse gap-3 border-t border-line-strong py-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <dt className="text-base text-muted">{s.label}</dt>
          <dd className="m-0 font-display text-[48px] leading-none font-light text-accent-hover">
            {s.value}
            {s.suffix && <span className="text-lg">{s.suffix}</span>}
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}

export function Problem() {
  const { rich } = useMotionMode();
  const { open, show, onClosed, triggerRef } = useSheet();

  return (
    <StickySection
      id="problema"
      length={3.2}
      pinned={rich}
      aria-labelledby="problema-title"
      className="border-t border-line"
      panelClassName="bg-background"
    >
      {(progress) => (
        <>
        <Container className={cn("grid grid-cols-1 gap-14 py-24 md:grid-cols-12 md:gap-10", rich && "h-full content-center pt-[120px] pb-16")}>
          <div className="flex flex-col gap-10 md:col-span-7">
            <div className="flex items-center gap-4">
              <span className="font-display text-sm text-accent">
                <span className="sr-only">Capítulo </span>
                {numeral}
              </span>
              <Eyebrow>Entenda · empresas familiares</Eyebrow>
            </div>

            <h2 id="problema-title" className="m-0 flex flex-col gap-6 font-normal">
              <Counter
                value={teaser.stat}
                suffix="%"
                duration={2.2}
                className="display block text-[clamp(150px,44vw,220px)] leading-[0.8] tracking-[-0.04em] text-accent md:text-[clamp(200px,24vw,340px)]"
              />
              <span className="max-w-[460px] font-display text-[26px] leading-[1.25] font-light text-heading md:text-[34px]">
                {teaser.statLabel}
              </span>
            </h2>

            <button
              ref={triggerRef}
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="group flex cursor-pointer self-start border-0 bg-transparent p-0 text-base font-medium text-accent"
            >
              <span className="inline-flex min-h-11 items-center gap-3 border-b border-accent">
                Entenda por quê
                <span aria-hidden className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-2">
                  →
                </span>
              </span>
            </button>
          </div>

          <div className="md:col-span-5 md:col-start-8 md:self-end md:pb-6">
            {rich ? <SteppedStats progress={progress} /> : <StatList />}
          </div>
        </Container>
        {open && (
          <Suspense fallback={null}>
            <EntendaPage onClosed={onClosed} />
          </Suspense>
        )}
        </>
      )}
    </StickySection>
  );
}
