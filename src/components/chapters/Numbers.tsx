import { motion } from "motion/react";
import { chapter, stats } from "../../data/content";
import { EASE } from "../../lib/motion";
import { cn } from "../../lib/cn";
import { Counter } from "../motion/Counter";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { numeral, label } = chapter("numeros");

function Suffix({ text }: { text: string }) {
  const plus = text.startsWith("+");
  const unit = text.replace("+", "").trim();
  return (
    <>
      {plus && "+"}
      {unit && <span className="ml-[0.1em] text-[0.26em] tracking-normal normal-case italic">{unit}</span>}
    </>
  );
}

export function Numbers() {
  return (
    <section id="numeros" aria-labelledby="numeros-title" className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-12 py-24 md:gap-16 md:py-40">
        <Eyebrow numeral={numeral}>
          <span id="numeros-title">{label}</span>
        </Eyebrow>
        <dl className="m-0 flex flex-col">
          {stats.map((stat, i) => (
            <div key={stat.label} className="relative grid grid-cols-1 items-end gap-x-10 gap-y-3 py-8 md:grid-cols-12 md:py-10">
              <motion.dt
                className="order-2 max-w-[340px] text-lg text-muted md:col-span-4 md:col-start-9 md:pb-6 md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              >
                {stat.label}
              </motion.dt>
              <dd className="order-1 m-0 md:col-span-7">
                <motion.span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 1.2, ease: EASE, delay: i * 0.1 }}
                />
                <Counter
                  value={stat.value}
                  suffix={stat.suffix && <Suffix text={stat.suffix} />}
                  suffixText={stat.suffix}
                  className={cn(
                    "display block text-[clamp(112px,32vw,160px)] leading-[0.85] tracking-[-0.04em] md:text-[clamp(160px,17vw,240px)]",
                    stat.highlight ? "text-accent" : "text-heading",
                  )}
                />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
