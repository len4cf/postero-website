import { motion, type Variants } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { EASE } from "../../lib/motion";
import { nodeText } from "../../lib/nodeText";
import { cn } from "../../lib/cn";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "blockquote";

type Props = {
  as?: Tag;
  lines: ReactNode[];
  by?: "line" | "word";
  delay?: number;
  stagger?: number;
  immediate?: boolean;
  className?: string;
  lineClassName?: string;
  id?: string;
};

const item: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

function Mask({ children, block }: { children: ReactNode; block?: boolean }) {
  return (
    <span
      className={cn(
        "overflow-hidden pr-[0.06em] pb-[0.1em] -mb-[0.1em] align-top",
        block ? "block" : "inline-block",
      )}
    >
      <motion.span
        variants={item}
        className={cn(
          block ? "block" : "inline-block",
          "will-change-transform",
        )}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function RevealText({
  as = "h2",
  lines,
  by = "line",
  delay = 0,
  stagger,
  immediate,
  className,
  lineClassName,
  id,
}: Props) {
  const Component = motion[as];
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ?? (by === "word" ? 0.06 : 0.12),
        delayChildren: delay,
      },
    },
  };
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, amount: 0.5 } };

  return (
    <Component
      id={id}
      className={cn("m-0", className)}
      variants={container}
      initial="hidden"
      {...trigger}
    >
      <span className="sr-only">{lines.map(nodeText).join(" ")}</span>
      <span aria-hidden className="block">
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {by === "line" ? (
              <Mask block>{line}</Mask>
            ) : typeof line === "string" ? (
              line.split(" ").map((word, w) => (
                <Fragment key={w}>
                  {w > 0 && " "}
                  <Mask>{word}</Mask>
                </Fragment>
              ))
            ) : (
              <Mask>{line}</Mask>
            )}
          </span>
        ))}
      </span>
    </Component>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <em className="accent-word">{children}</em>;
}
