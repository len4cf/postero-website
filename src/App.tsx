import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Clients } from "./components/chapters/Clients";
import { Closing } from "./components/chapters/Closing";
import { Education } from "./components/chapters/Education";
import { Hero } from "./components/chapters/Hero";
import { Interlude } from "./components/chapters/Interlude";
import { Manifesto } from "./components/chapters/Manifesto";
import { Numbers } from "./components/chapters/Numbers";
import { Practice } from "./components/chapters/Practice";
import { Problem } from "./components/chapters/Problem";
import { Trajectory } from "./components/chapters/Trajectory";
import { ChapterRail } from "./components/layout/ChapterRail";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { chapterIds, type ChapterKey } from "./data/content";
import { useActiveChapter } from "./hooks/useActiveChapter";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { startSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  const reduced = usePrefersReducedMotion();
  const active = useActiveChapter(chapterIds) as ChapterKey | null;

  useEffect(() => (reduced ? undefined : startSmoothScroll()), [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background font-sans text-foreground">
        <a
          href="#conteudo"
          className="fixed top-3 left-3 z-[60] -translate-y-24 bg-accent px-4 py-3 text-sm font-medium text-background no-underline focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <Header active={active} />
        <ChapterRail active={active} />
        <main id="conteudo">
          <Hero />
          <Problem />
          <Interlude phrases={["O que vem depois"]} echo={["Só existe para quem se prepara antes"]} />
          <Trajectory />
          <Numbers />
          <Manifesto />
          <Practice />
          <Education />
          <Clients />
          <Interlude phrases={["Para que exista um depois"]} separator="symbol" />
          <Closing />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
