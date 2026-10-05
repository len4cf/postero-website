import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mark from "../../assets/images/postero-mark.webp";
import {
  courseGroups,
  isPlaceholder,
  type Course,
  type CourseGroup,
} from "../../data/formacao";
import { useActiveChapter } from "../../hooks/useActiveChapter";
import { useDialogLock } from "../../hooks/useDialogLock";
import { useMotionMode } from "../../hooks/useMotionMode";
import { useOwnScroll } from "../../hooks/useOwnScroll";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Accent, RevealText } from "../motion/RevealText";
import { ScrollContainerContext } from "../motion/ScrollContainer";
import type { CloseIntent } from "../sheet/sheetContext";
import { Container } from "../ui/Container";
import { Label } from "../ui/Label";
import { PillButton } from "../ui/PillButton";

const SLATS = 6;
const SLAT_EASE = "cubic-bezier(0.76, 0, 0.24, 1)";
const SLAT_DURATION = 800;
const SLAT_STAGGER = 70;
const OPEN_TIME = SLAT_DURATION + SLAT_STAGGER * (SLATS - 1);

const groupIds = courseGroups.map((g) => `area-${g.id}`);
const total = courseGroups.reduce((n, g) => n + g.courses.length, 0);

function slatFrames(i: number, show: boolean) {
  const origin = `50% ${i % 2 ? "100%" : "0%"}`;
  const frames = [
    { transform: "scaleY(0)", transformOrigin: origin },
    { transform: "scaleY(1)", transformOrigin: origin },
  ];
  return show ? frames : frames.reverse();
}

function sinkSite(show: boolean) {
  const behind = document.querySelector<HTMLElement>("main");
  if (!behind) return null;
  behind.style.transformOrigin = `50% ${window.scrollY + window.innerHeight / 2}px`;
  const frames = [{ transform: "none" }, { transform: "scale(0.94)" }];
  return behind.animate(show ? frames : frames.reverse(), {
    duration: OPEN_TIME,
    easing: SLAT_EASE,
    fill: "both",
  });
}

function Text({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>;
  return (
    <span
      className={cn(
        className,
        "border-b border-dashed border-line-dashed text-dim",
      )}
    >
      {value}
    </span>
  );
}

function CourseCard({ course }: { course: Course }) {
  const empty = isPlaceholder(course.title);
  return (
    <motion.li
      className={cn(
        "group relative flex flex-col gap-6 border p-7 md:p-9",
        empty
          ? "border-dashed border-line-dashed"
          : "border-line-strong bg-surface",
      )}
      style={{ transformPerspective: 1200, transformOrigin: "50% 0%" }}
      initial={{ opacity: 0, rotateX: -18, y: 48 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
      />
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-lg text-accent tabular-nums">
          {course.year ? <Text value={course.year} /> : "—"}
        </span>
      </div>
      <h3 className="m-0 font-display text-[24px] leading-[1.22] font-light text-heading md:text-[30px]">
        <Text value={course.title} />
      </h3>
      <div className="flex flex-col gap-1.5 border-t border-line pt-5">
        <Text
          value={course.institution}
          className="self-start text-base text-subtle"
        />
        {course.detail && (
          <Text
            value={course.detail}
            className="self-start text-sm text-muted"
          />
        )}
      </div>
    </motion.li>
  );
}

function Area({ group }: { group: CourseGroup }) {
  return (
    <section
      id={`area-${group.id}`}
      aria-labelledby={`area-${group.id}-title`}
      className="flex flex-col gap-8 pt-24 md:pt-40"
    >
      <div className="flex items-baseline gap-4 border-b border-line-strong pb-4">
        <span aria-hidden className="font-display text-xl text-accent">
          {group.numeral}
        </span>
        <h2
          id={`area-${group.id}-title`}
          className="m-0 text-label tracking-label text-muted uppercase"
        >
          {group.label}
        </h2>
        <span className="ml-auto text-label tracking-label text-dim tabular-nums">
          {group.courses.length} {group.courses.length === 1 ? "item" : "itens"}
        </span>
      </div>
      <ol className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:gap-6">
        {group.courses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </ol>
    </section>
  );
}

const swap = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 },
  transition: { duration: 0.6, ease: EASE },
};

function StickyPanel({
  active,
  onNavigate,
}: {
  active: string | null;
  onNavigate: (id: string) => void;
}) {
  const group = courseGroups.find((g) => `area-${g.id}` === active);

  return (
    <aside className="sticky top-0 hidden h-svh flex-col justify-between pt-32 pb-14 md:flex">
      <Label className="text-accent">Formação · completa</Label>

      <div aria-hidden className="relative min-h-[46vh]">
        <AnimatePresence mode="wait" initial={false}>
          {group ? (
            <motion.div
              key={group.id}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-6"
              {...swap}
            >
              <span className="text-outline block font-display text-[clamp(160px,17vw,260px)] leading-[0.8] font-light">
                {group.numeral}
              </span>
              <span className="display text-[clamp(40px,4.2vw,64px)]">
                {group.label}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="intro"
              className="absolute inset-x-0 bottom-0"
              {...swap}
            >
              <span className="display block text-[clamp(64px,7vw,112px)]">
                Formação
                <br />
                <Accent>de conselheiro.</Accent>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav aria-label="Áreas">
        <ol className="m-0 flex list-none flex-col p-0">
          {courseGroups.map((g) => {
            const isActive = `area-${g.id}` === active;
            return (
              <li key={g.id} className="border-t border-line">
                <a
                  href={`#area-${g.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`area-${g.id}`);
                  }}
                  className={cn(
                    "group grid min-h-11 grid-cols-[40px_1fr_auto] items-center text-sm no-underline transition-colors duration-300 hover:text-heading",
                    isActive ? "text-heading" : "text-dim",
                  )}
                >
                  <span className="font-display text-accent">{g.numeral}</span>
                  <span className="transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                    {g.label}
                  </span>
                  <span className="tabular-nums">{g.courses.length}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}

type Props = { onClosed: (intent: CloseIntent) => void };

export function FormacaoPage({ onClosed }: Props) {
  const slatsRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const { reduced } = useMotionMode();
  const active = useActiveChapter(groupIds);

  useDialogLock(closeRef);
  const { scrollToId } = useOwnScroll(scrollerRef, contentRef, 112);

  useLayoutEffect(() => {
    if (reduced) return;
    const slats = [...slatsRef.current!.children] as HTMLElement[];
    const animations = [
      ...slats.map((slat, i) =>
        slat.animate(slatFrames(i, true), {
          duration: SLAT_DURATION,
          delay: i * SLAT_STAGGER,
          easing: SLAT_EASE,
          fill: "both",
        }),
      ),
      shadeRef.current!.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: OPEN_TIME,
        fill: "both",
      }),
      contentRef.current!.animate(
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 900,
          delay: OPEN_TIME - 150,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      ),
    ];
    const behind = sinkSite(true);
    return () => {
      animations.forEach((a) => a.cancel());
      behind?.cancel();
      document
        .querySelector<HTMLElement>("main")
        ?.style.removeProperty("transform-origin");
    };
  }, [reduced]);

  const close = useCallback(
    async (intent: CloseIntent = "back") => {
      if (closing.current) return;
      closing.current = true;
      if (!reduced) {
        await contentRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 260,
          easing: "ease-out",
          fill: "both",
        }).finished;
        const slats = [...slatsRef.current!.children] as HTMLElement[];
        const layers = [
          ...slats.map((slat, i) =>
            slat.animate(slatFrames(i, false), {
              duration: SLAT_DURATION,
              delay: (SLATS - 1 - i) * SLAT_STAGGER,
              easing: SLAT_EASE,
              fill: "both",
            }),
          ),
          shadeRef.current!.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: OPEN_TIME,
            fill: "both",
          }),
        ];
        const behind = sinkSite(false);
        await Promise.all(
          [...layers, ...(behind ? [behind] : [])].map((a) => a.finished),
        );
      }
      onClosed(intent);
    },
    [reduced, onClosed],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return createPortal(
    <>
      <div
        ref={shadeRef}
        aria-hidden
        className="fixed inset-0 z-50 bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="formacao-page-title"
        className="fixed inset-0 z-50 text-foreground"
      >
        <div ref={slatsRef} aria-hidden className="absolute inset-0 flex">
          {Array.from({ length: SLATS }, (_, i) => (
            <div key={i} className="-mr-px h-full flex-1 bg-background" />
          ))}
        </div>

        <ScrollContainerContext.Provider value={scrollerRef}>
          <div
            ref={scrollerRef}
            data-own-scroll
            className="absolute inset-0 overflow-y-auto overscroll-contain"
          >
            <div ref={contentRef}>
              <div className="pointer-events-none sticky top-0 z-10 h-0">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/85 to-transparent md:h-32"
                />
                <Container className="relative flex items-center justify-between pt-6 md:pt-8">
                  <img
                    src={mark}
                    alt=""
                    width={40}
                    height={48}
                    className="brand-art block h-8 w-auto"
                  />
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => close()}
                    className="group pointer-events-auto flex cursor-pointer items-center gap-4 border-0 bg-transparent p-0 font-sans text-label tracking-label text-muted uppercase transition-colors duration-300 hover:text-heading"
                  >
                    Fechar
                    <span className="flex size-12 items-center justify-center rounded-full border border-line-strong bg-background/80 backdrop-blur-md transition-[transform,border-color] duration-500 ease-out-soft group-hover:rotate-90 group-hover:border-accent">
                      <svg
                        aria-hidden
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <path d="M1 1l12 12M13 1L1 13" />
                      </svg>
                    </span>
                  </button>
                </Container>
              </div>

              <Container className="grid grid-cols-1 md:grid-cols-12 md:gap-x-10">
                <div className="md:col-span-5">
                  <StickyPanel active={active} onNavigate={scrollToId} />
                </div>

                <div className="md:col-span-6 md:col-start-7">
                  <header className="flex min-h-[78svh] flex-col justify-end gap-8 pt-32 md:min-h-svh md:pb-10">
                    <RevealText
                      as="h1"
                      id="formacao-page-title"
                      immediate
                      delay={reduced ? 0 : OPEN_TIME / 1000}
                      className="display text-[clamp(44px,12vw,72px)] md:sr-only"
                      lines={[
                        "Formação",
                        <Accent key="c">de conselheiro.</Accent>,
                      ]}
                    />
                    <p className="m-0 font-display text-[26px] leading-[1.3] font-light text-heading md:text-[34px]">
                      Certificações, cursos e programas, organizados por área.
                    </p>
                    <Label className="tabular-nums">
                      {courseGroups.length} áreas · {total} itens
                    </Label>
                    <span
                      aria-hidden
                      className="hidden h-16 w-px bg-accent md:block"
                    />
                  </header>

                  {courseGroups.map((group) => (
                    <Area key={group.id} group={group} />
                  ))}

                  <section
                    aria-label="Próximo passo"
                    className="flex flex-col gap-8 py-32 md:py-48"
                  >
                    <RevealText
                      by="word"
                      className="font-display text-[32px] leading-[1.15] font-light text-heading md:text-[44px]"
                      lines={[
                        "A prática encontra método.",
                        <Accent key="c">Vamos conversar?</Accent>,
                      ]}
                    />
                    <div className="flex flex-wrap items-center gap-6">
                      <PillButton onClick={() => close("schedule")}>
                        Agendar conversa
                      </PillButton>
                      <button
                        type="button"
                        onClick={() => close()}
                        className="min-h-11 cursor-pointer border-0 bg-transparent p-0 font-sans text-label tracking-label text-muted uppercase transition-colors duration-300 hover:text-heading"
                      >
                        Voltar ao site
                      </button>
                    </div>
                  </section>
                </div>
              </Container>
            </div>
          </div>
        </ScrollContainerContext.Provider>
      </div>
    </>,
    document.body,
  );
}
