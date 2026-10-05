import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionMode } from "../../hooks/useMotionMode";
import { useScrollContainer } from "./ScrollContainer";

type Props = {
  speed?: number;
  children: ReactNode;
  className?: string;
};

export function Parallax({ speed = 80, children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { rich } = useMotionMode();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed / 2, -speed / 2]);
  return (
    <motion.div ref={ref} className={className} style={rich ? { y } : undefined}>
      {children}
    </motion.div>
  );
}
