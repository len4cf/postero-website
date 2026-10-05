import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useScrollContainer } from "./ScrollContainer";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

type Props = { text: string; className?: string };

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export function ScrubText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start 0.85", "end 0.55"] });

  if (reduced) return <p className={className}>{text}</p>;

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        </span>
      ))}
    </p>
  );
}
