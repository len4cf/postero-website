import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useLayoutEffect, useRef } from "react";
import logo from "../../assets/images/postero-logo.webp";
import { chapter, timeline, trajectoryIntro, type TimelineEntry } from "../../data/content";
import { useMotionMode } from "../../hooks/useMotionMode";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Label } from "../ui/Label";

gsap.registerPlugin(ScrollTrigger);

const { numeral } = chapter("trajetoria");

function startYear(period: string) {
  return period.slice(0, 4);
}

function Stop({ entry, horizontal }: { entry: TimelineEntry; horizontal: boolean }) {
  const highlight = entry.variant === "origin" || entry.variant === "current";
  const reveal = horizontal
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.9, ease: EASE },
      };
  return (
    <motion.li
      {...reveal}
      className={cn(
        "tl-stop flex shrink-0 flex-col gap-6",
        horizontal ? "w-[min(400px,34vw)] border-l border-line-strong pr-10 pl-8" : "border-t border-line-strong pt-8",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "tl-year font-display text-[88px] leading-[0.85] font-light tracking-[-0.04em] tabular-nums md:text-[clamp(88px,8vw,128px)]",
          highlight ? "text-accent" : "text-heading",
        )}
      >
        {entry.variant === "current" ? "Hoje" : startYear(entry.period)}
      </span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Label className={entry.variant === "origin" ? "text-accent" : "text-muted"}>
          {entry.period}
          {entry.duration && ` · ${entry.duration}`}
        </Label>
      </div>
      <h3 className="display m-0 text-[30px] leading-none md:text-[34px]">
        {entry.variant === "current" ? (
          <img
            src={logo}
            alt={entry.company}
            width={272}
            height={56}
            loading="lazy"
            className="brand-art block h-[26px] w-auto md:h-[30px]"
          />
        ) : (
          entry.company
        )}
      </h3>
      <ul className="roles relative m-0 flex list-none flex-col gap-4 p-0">
        {entry.roles.map((role) => (
          <li key={role.title} className="role relative flex flex-col gap-1 pl-5">
            <span className="text-[15px] leading-[22px] text-subtle">{role.title}</span>
            <span className="text-xs text-dim tabular-nums">{role.period}</span>
          </li>
        ))}
      </ul>
      <p className="m-0 text-[15px] leading-[23px] text-muted">{entry.summary}</p>
    </motion.li>
  );
}

export function Trajectory() {
  const { rich } = useMotionMode();
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rich) return;
    const panel = panelRef.current!;
    const track = trackRef.current!;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - panel.clientWidth);
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          pin: true,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(fillRef.current, { scaleX: self.progress }),
        },
      });
      gsap.utils.toArray<HTMLElement>(".tl-year", track).forEach((year) => {
        gsap.from(year, {
          xPercent: 40,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: year,
            containerAnimation: slide,
            start: "left 100%",
            end: "left 55%",
            scrub: true,
          },
        });
      });
    }, panel);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [rich]);

  return (
    <section id="trajetoria" aria-labelledby="trajetoria-title" className="border-t border-line">
      <Container className="flex flex-col gap-10 pt-24 pb-16 md:pt-40 md:pb-20">
        <Eyebrow numeral={numeral}>{trajectoryIntro.eyebrow}</Eyebrow>
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <RevealText
            id="trajetoria-title"
            className="display text-[clamp(44px,11vw,64px)] md:col-span-8 md:text-[clamp(64px,7vw,112px)]"
            lines={["Uma carreira", "inteira do lado", <Accent key="d">de dentro.</Accent>]}
          />
          <motion.p
            className="m-0 text-lg text-muted md:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            {trajectoryIntro.lead}
          </motion.p>
        </div>
      </Container>

      {rich ? (
        <div ref={panelRef} className="relative flex h-svh flex-col justify-center overflow-hidden pt-[88px]">
          <Container className="mb-10 flex items-center gap-5">
            <Label className="tabular-nums">1986</Label>
            <div aria-hidden className="relative h-px flex-1 bg-line-strong">
              <div ref={fillRef} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
            </div>
            <Label className="tabular-nums">Hoje</Label>
          </Container>
          <ol
            ref={trackRef}
            className="m-0 flex w-max list-none p-0 pr-[10vw] pl-[max(40px,calc((100vw-1160px)/2))] will-change-transform"
          >
            {timeline.map((entry) => (
              <Stop key={`${entry.company}-${entry.period}`} entry={entry} horizontal />
            ))}
          </ol>
        </div>
      ) : (
        <Container className="pb-24">
          <ol className="m-0 flex list-none flex-col gap-14 p-0">
            {timeline.map((entry) => (
              <Stop key={`${entry.company}-${entry.period}`} entry={entry} horizontal={false} />
            ))}
          </ol>
        </Container>
      )}
    </section>
  );
}
