import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { cn } from "../../lib/cn";
import { useScrollContainer } from "./ScrollContainer";

const COPIES = 4;

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Marquee({ children, speed = -4, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref);
  const base = useMotionValue(0);
  const { scrollY } = useScroll({ container: useScrollContainer() });
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [4, 0, 4], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced || !inView) return;
    const step = (speed / COPIES) * (delta / 1000);
    base.set(base.get() + step * (1 + Math.abs(boost.get())));
  });

  return (
    <div ref={ref} aria-hidden className={cn("overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        {Array.from({ length: COPIES }, (_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
