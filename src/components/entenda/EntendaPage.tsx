import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { chapters, type ChapterId } from "../../data/entenda";
import { useActiveChapter } from "../../hooks/useActiveChapter";
import { useMotionMode } from "../../hooks/useMotionMode";
import { Accent, RevealText } from "../motion/RevealText";
import { useScrollContainer } from "../motion/ScrollContainer";
import { SheetPage } from "../sheet/SheetPage";
import { useSheetApi, type CloseIntent } from "../sheet/sheetContext";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { ChapterNav } from "./ChapterNav";
import {
  ChallengesChapter,
  DeclineChapter,
  ImpactChapter,
  MythsChapter,
  ScaleChapter,
  SustainabilityChapter,
} from "./Chapters";
import { EntendaClosing } from "./EntendaClosing";

const chapterIds = chapters.map((c) => c.id);

type Props = { onClosed: (intent: CloseIntent) => void };

function EntendaHero() {
  const ref = useRef<HTMLElement>(null);
  const { rich } = useMotionMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    container: useScrollContainer(),
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="entenda-title"
      className="overflow-hidden"
    >
      <Container className="flex min-h-[calc(100svh-88px)] flex-col justify-end pt-20 pb-16 md:pb-24">
        <motion.div
          className="flex flex-col gap-10"
          style={rich ? { y, opacity } : undefined}
        >
          <Eyebrow>Entenda · empresas familiares</Eyebrow>
          <RevealText
            as="h1"
            id="entenda-title"
            immediate
            delay={0.75}
            className="display text-[clamp(40px,10.5vw,60px)] md:text-[clamp(64px,7.2vw,116px)]"
            lines={[
              "Empresas familiares",
              "movem a economia.",
              <Accent key="t">Poucas chegam à terceira geração.</Accent>,
            ]}
          />
          <motion.div
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          >
            <p className="m-0 max-w-[560px] text-lg text-muted">
              Seis capítulos sobre o tamanho, os riscos e as crenças que decidem
              se uma empresa familiar terá um depois.
            </p>
            <ol
              aria-hidden
              className="m-0 flex list-none gap-5 p-0 font-display text-sm text-dim"
            >
              {chapters.map((c) => (
                <li key={c.id}>{c.numeral}</li>
              ))}
            </ol>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function EntendaBody() {
  const { close, scrollToId } = useSheetApi();
  const active = useActiveChapter(chapterIds) as ChapterId | null;

  return (
    <>
      <EntendaHero />
      <Container className="grid grid-cols-1 min-[1000px]:grid-cols-[200px_minmax(0,1fr)] min-[1000px]:gap-x-[88px]">
        <ChapterNav active={active} onNavigate={scrollToId} />
        <article>
          <ImpactChapter />
          <ScaleChapter />
          <SustainabilityChapter />
          <DeclineChapter />
          <MythsChapter />
          <ChallengesChapter />
        </article>
      </Container>
      <EntendaClosing onSchedule={() => close("schedule")} onBack={() => close()} />
    </>
  );
}

export function EntendaPage({ onClosed }: Props) {
  return (
    <SheetPage labelledBy="entenda-title" onClosed={onClosed}>
      <EntendaBody />
    </SheetPage>
  );
}
