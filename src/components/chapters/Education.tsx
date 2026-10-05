import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import { chapter, education } from "../../data/content";
import { useSheet } from "../../hooks/useSheet";
import { EASE } from "../../lib/motion";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { numeral, label } = chapter("formacao");

const FormacaoPage = lazy(() => import("../formacao/FormacaoPage").then((m) => ({ default: m.FormacaoPage })));

export function Education() {
  const { open, show, onClosed, triggerRef } = useSheet();

  return (
    <section
      id="formacao"
      aria-labelledby="formacao-title"
      className="border-t border-line bg-surface"
    >
      <Container className="flex flex-col gap-14 py-24 md:gap-20 md:py-40">
        <div className="flex flex-col gap-10">
          <Eyebrow numeral={numeral}>{label}</Eyebrow>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <RevealText
              id="formacao-title"
              className="display text-[clamp(40px,10vw,60px)] md:text-[clamp(56px,6vw,96px)]"
              lines={["Formação", <Accent key="f">de conselheiro</Accent>]}
            />
            <button
              ref={triggerRef}
              type="button"
              onClick={show}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="group relative flex min-h-11 shrink-0 cursor-pointer items-center gap-3 self-start border-0 bg-transparent p-0 font-sans text-label tracking-label text-muted uppercase transition-colors duration-300 hover:text-heading md:mb-3 md:self-end"
            >
              Ver formação completa
              <span aria-hidden className="text-accent transition-transform duration-500 ease-out-soft group-hover:translate-x-1">
                →
              </span>
              <span aria-hidden className="absolute inset-x-0 bottom-2 h-px bg-line-strong" />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
              />
            </button>
          </div>
        </div>

        <ul className="m-0 list-none border-b border-line-strong p-0">
          {education.map((item, i) => (
            <motion.li
              key={item.institution}
              className="group relative grid grid-cols-1 gap-4 border-t border-line-strong py-8 md:grid-cols-12 md:gap-10 md:py-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
              />
              <span
                aria-hidden
                className="font-display text-sm text-dim tabular-nums md:col-span-1 md:pt-2"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="m-0 font-display text-[26px] leading-[1.15] font-light text-heading transition-transform duration-700 ease-out-soft group-hover:translate-x-2 md:col-span-6 md:text-[34px]">
                {item.institution}
              </h3>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 md:col-span-5 md:pt-2">
                {item.programs.map((program) => (
                  <li key={program} className="flex gap-3 text-base text-muted">
                    <span
                      aria-hidden
                      className="mt-[11px] h-px w-4 shrink-0 bg-accent"
                    />
                    {program}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </Container>
      {open && (
        <Suspense fallback={null}>
          <FormacaoPage onClosed={onClosed} />
        </Suspense>
      )}
    </section>
  );
}
