import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useScrollContainer } from "./ScrollContainer";
import { useMotionMode } from "../../hooks/useMotionMode";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  depth?: number;
  ratio?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  depth = 0.1,
  ratio,
  className,
  imgClassName,
  priority,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { rich } = useMotionMode();
  const container = useScrollContainer();
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-depth * 100}%`, `${depth * 100}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)} style={{ aspectRatio: ratio ?? `${width} / ${height}` }}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("photo absolute inset-0 size-full object-cover", imgClassName)}
        style={rich ? { y, scale: 1 + depth * 2.2 } : undefined}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-top bg-background"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </div>
  );
}
