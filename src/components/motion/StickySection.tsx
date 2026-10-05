import { useScroll, type MotionValue } from "motion/react";
import { useRef, type ReactNode, type Ref } from "react";
import { cn } from "../../lib/cn";

type Props = {
  id: string;
  length?: number;
  pinned: boolean;
  className?: string;
  panelClassName?: string;
  panelRef?: Ref<HTMLDivElement>;
  "aria-labelledby"?: string;
  children: (progress: MotionValue<number>) => ReactNode;
};

export function StickySection({
  id,
  length = 3,
  pinned,
  className,
  panelClassName,
  panelRef,
  children,
  ...aria
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative", className)}
      style={pinned ? { height: `${length * 100}svh` } : undefined}
      {...aria}
    >
      <div ref={panelRef} className={cn(pinned && "sticky top-0 h-svh overflow-hidden", panelClassName)}>
        {children(scrollYProgress)}
      </div>
    </section>
  );
}
