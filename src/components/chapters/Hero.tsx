import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import portrait from "../../assets/images/portrait.webp";
import symbol from "../../assets/images/postero-symbol.webp";
import { hero } from "../../data/content";
import { useMotionMode } from "../../hooks/useMotionMode";
import { EASE } from "../../lib/motion";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Label } from "../ui/Label";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { rich } = useMotionMode();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="topo" aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid min-h-svh grid-cols-1 content-center gap-x-10 gap-y-10 pt-[104px] pb-12 md:grid-cols-12 md:items-center md:pt-[120px] md:pb-[56px]">
        <motion.figure
          className="m-0 flex flex-col gap-4 md:order-2 md:col-span-4 md:col-start-9 md:self-center"
          style={rich ? { y: portraitY } : undefined}
        >
          <div className="relative mx-auto w-[min(62vw,280px)] overflow-hidden md:w-full">
            <motion.img
              src={portrait}
              alt="Retrato de Humberto Gomes Ferreira, fundador da Postero"
              width={988}
              height={1000}
              fetchPriority="high"
              className="photo block aspect-[4/5] w-full object-cover object-top"
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 origin-top bg-background"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </div>
          <motion.figcaption className="flex items-center justify-center gap-4 md:justify-start" {...rise(1)}>
            <span aria-hidden className="h-px w-10 bg-accent" />
            <Label className="text-muted">{hero.caption}</Label>
          </motion.figcaption>
        </motion.figure>

        <motion.div
          className="flex flex-col gap-8 md:order-1 md:col-span-8 md:gap-10"
          style={rich ? { y: titleY, opacity: fade } : undefined}
        >
          <motion.div className="flex items-center gap-4" {...rise(0.1)}>
            <img src={symbol} alt="Símbolo da Postero" width={121} height={144} className="brand-art block h-9 w-auto" />
            <Label>
              Do latim <i className="font-display text-[15px] tracking-[0.02em] text-accent normal-case">posterus</i> ·{" "}
              {hero.origin}
            </Label>
          </motion.div>

          <RevealText
            as="h1"
            id="hero-title"
            immediate
            delay={0.25}
            className="display text-[clamp(52px,13.5vw,84px)] md:text-[clamp(72px,9vw,140px)]"
            lines={["Para que", "exista um", <Accent key="d">depois.</Accent>]}
          />

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <motion.p className="m-0 max-w-[520px] text-lg text-foreground" {...rise(0.9)}>
              {hero.intro}
            </motion.p>
            <motion.a
              href="#problema"
              className="group hidden shrink-0 items-center gap-3 text-label tracking-label text-dim uppercase no-underline transition-colors duration-300 hover:text-heading md:flex"
              {...rise(1.2)}
            >
              Comece a ler
              <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-line-strong">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.4s_var(--ease-out-soft)_infinite] bg-accent motion-reduce:hidden" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
