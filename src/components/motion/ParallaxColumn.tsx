import { motion, useTransform, type MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useMotionMode } from "../../hooks/useMotionMode";

type Props = {
  progress: MotionValue<number>;
  distance: number;
  children: ReactNode;
  className?: string;
};

export function ParallaxColumn({ progress, distance, children, className }: Props) {
  const { rich } = useMotionMode();
  const y = useTransform(progress, [0, 1], [distance / 2, -distance / 2]);
  return (
    <motion.div className={className} style={rich ? { y } : undefined}>
      {children}
    </motion.div>
  );
}
