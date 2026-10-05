import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import symbol from "../../assets/images/postero-symbol.webp";
import { chapter, manifesto } from "../../data/content";
import { useMotionMode } from "../../hooks/useMotionMode";
import { Accent, RevealText } from "../motion/RevealText";
import { ScrubText } from "../motion/ScrubText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { numeral } = chapter("postero");

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { rich } = useMotionMode();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const symbolY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section
      ref={ref}
      id="postero"
      aria-labelledby="postero-title"
      className="relative overflow-hidden border-t border-line"
    >
      <Container className="relative flex flex-col gap-16 py-24 md:gap-24 md:py-40">
        <motion.img
          src={symbol}
          alt=""
          width={121}
          height={144}
          loading="lazy"
          className="brand-art pointer-events-none absolute top-32 right-10 hidden h-48 w-auto opacity-[0.12] md:block"
          style={rich ? { y: symbolY } : undefined}
        />

        <div className="flex flex-col gap-10">
          <Eyebrow numeral={numeral}>{manifesto.eyebrow}</Eyebrow>
          <RevealText
            id="postero-title"
            className="display text-[clamp(44px,11.5vw,64px)] md:text-[clamp(64px,7.4vw,116px)]"
            lines={[
              "Do latim",
              <span key="p">
                <Accent>posterus</Accent>:
              </span>,
              "o que vem depois.",
            ]}
          />
        </div>

        <ScrubText
          text={manifesto.body}
          className="m-0 max-w-[1000px] font-display text-[26px] leading-[1.3] font-light text-heading md:text-[clamp(32px,3.4vw,48px)] md:leading-[1.22]"
        />
      </Container>
    </section>
  );
}
