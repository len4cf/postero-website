import { motion } from "motion/react";
import {
  axes,
  challenges,
  challengesSource,
  declineSource,
  declineStages,
  euShare,
  failureCauses,
  employmentStat,
  myths,
  mythsSource,
  ranking,
  scaleStats,
} from "../../data/entenda";
import { EASE } from "../../lib/motion";
import { Reveal } from "../ui/Reveal";
import { Chapter, Kicker, Rise, SourceNote, Stat } from "./primitives";
import { listVariants, rowVariants } from "./variants";

const inView = { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.3 } } as const;

export function ImpactChapter() {
  return (
    <Chapter
      id="cap1"
      numeral="I"
      first
      title="A empresa familiar é a espinha dorsal da economia."
      lead="No Brasil e na Europa, as maiores empresas, a maior parte dos empregos e boa parte da riqueza estão nas mãos de famílias."
      bridge="E não se trata só de quantidade. Trata-se de tamanho."
    >
      <Rise className="mt-16 border-t border-line-strong pt-10">
        <Stat size="xl" value={employmentStat.value} label={employmentStat.label} />
      </Rise>

      <motion.figure className="m-0 mt-20 flex max-w-[680px] flex-col gap-5" {...inView} variants={listVariants}>
        <figcaption>
          <Kicker>{euShare.caption}</Kicker>
        </figcaption>
        {euShare.rows.map((row) => (
          <motion.div
            key={row.country}
            variants={rowVariants}
            className="grid grid-cols-[96px_minmax(0,1fr)_56px] items-center gap-4"
          >
            <span className="text-sm text-subtle">{row.country}</span>
            <div className="h-0.5" style={{ width: `${row.percent}%` }}>
              <motion.div
                className="h-full origin-left bg-accent-muted"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
              />
            </div>
            <span className="text-right font-display text-xl text-accent">{row.percent}%</span>
          </motion.div>
        ))}
      </motion.figure>
    </Chapter>
  );
}

export function ScaleChapter() {
  return (
    <Chapter
      id="cap2"
      numeral="II"
      title="Quem ainda acha que empresa familiar é pequena está olhando errado."
      bridge="Se são tão grandes, por que tantas desaparecem?"
    >
      <div className="mt-16 grid grid-cols-1 items-start gap-14 md:grid-cols-2">
        <div>
          <div
            aria-hidden
            className="grid grid-cols-[32px_minmax(0,1fr)_56px] gap-4 border-b border-line-strong pb-3 text-label tracking-label text-dim"
          >
            <span />
            <span>RANKING DAS BRASILEIRAS</span>
            <span className="text-right">GLOBAL</span>
          </div>
          <motion.ol
            className="m-0 list-none p-0"
            aria-label="Ranking das empresas familiares brasileiras no índice global"
            {...inView}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {ranking.rows.map((row, i) => (
              <motion.li
                key={row.company}
                variants={rowVariants}
                className="group grid grid-cols-[32px_minmax(0,1fr)_56px] items-baseline gap-4 border-b border-line py-3"
              >
                <span className="font-display text-accent">{i + 1}</span>
                <span className="text-subtle transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5">
                  {row.company} <span className="text-dim">· {row.family}</span>
                </span>
                <span className="text-right font-display text-accent-hover">
                  <span className="sr-only">posição global </span>
                  {row.global}
                </span>
              </motion.li>
            ))}
          </motion.ol>
          <SourceNote className="mt-4">{ranking.source}</SourceNote>
        </div>

        <motion.div className="flex flex-col gap-8" {...inView} variants={listVariants}>
          {scaleStats.map((stat, i) => (
            <motion.div key={stat.label} variants={rowVariants} className={i > 0 ? "border-t border-line pt-7" : undefined}>
              <Stat value={stat.value} label={stat.label} tone={stat.highlight ? "accent" : "soft"} className="gap-1" />
            </motion.div>
          ))}
          <motion.blockquote
            variants={rowVariants}
            className="m-0 mt-2 border-t border-line-strong pt-7 font-display text-2xl leading-[1.35] font-light text-heading"
          >
            A maior vantagem competitiva de uma empresa familiar não é o capital. É o{" "}
            <em className="accent-word">tempo</em> — para decidir melhor, investir com paciência e atravessar ciclos que
            derrubam concorrentes.
          </motion.blockquote>
        </motion.div>
      </div>
    </Chapter>
  );
}

export function SustainabilityChapter() {
  return (
    <Chapter
      id="cap3"
      numeral="III"
      title="Sustentabilidade da empresa familiar"
      lead="A queda tem causas conhecidas. E a continuidade depende de três eixos que precisam avançar juntos."
      bridge="A queda raramente é súbita. Ela segue estágios."
    >
      <div className="mt-16">
        <Kicker className="mb-2">Por que falham</Kicker>
        <motion.ul
          className="m-0 grid list-none grid-cols-1 gap-x-14 border-t border-line-strong p-0 md:grid-cols-2"
          {...inView}
          variants={listVariants}
        >
          {failureCauses.map((cause, i) => (
            <motion.li key={cause} variants={rowVariants} className="flex gap-4 border-b border-line py-5 text-subtle">
              <span aria-hidden className="font-display text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {cause}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-20">
        <Kicker className="mb-2">Os três eixos · avançam juntos</Kicker>
        <div className="border-t border-line-strong">
          {axes.map((axis) => (
            <motion.div
              key={axis.name}
              className="grid grid-cols-1 items-center gap-3 border-b border-line py-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-6"
              {...inView}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.span variants={rowVariants} className="font-display text-[26px] font-light text-heading">
                {axis.name}
              </motion.span>
              <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0">
                {axis.steps.map((step, i) => (
                  <motion.li
                    key={step}
                    className="flex items-center gap-x-3"
                    variants={{
                      hidden: { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
                    }}
                  >
                    <span className="border border-line-strong px-3 py-2 text-[13px] leading-[18px] text-subtle">
                      {step}
                    </span>
                    {i < axis.steps.length - 1 && (
                      <span aria-hidden className="text-xs text-accent">
                        →
                      </span>
                    )}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

export function DeclineChapter() {
  const numerals = ["I", "II", "III", "IV", "V"];
  return (
    <Chapter
      id="cap4"
      numeral="IV"
      title="Os cinco estágios do declínio"
      lead="O declínio é um processo, não um evento. E quase sempre começa no auge."
      bridge="Boa parte desse caminho é pavimentada por crenças."
    >
      <div className="relative mt-16">
        <Reveal>
          <svg
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            aria-hidden
            className="mb-2 hidden h-[140px] w-full text-accent md:block"
          >
            <defs>
              <linearGradient id="entenda-decline" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100 12 L300 22 L500 48 L700 78 L900 110 L900 120 L100 120 Z" fill="url(#entenda-decline)" />
            <path
              d="M100 12 L300 22 L500 48 L700 78 L900 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              className="draw-line"
            />
          </svg>
        </Reveal>
        <motion.ol
          className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 border-t border-line-strong p-0 pt-7 md:grid-cols-5 md:gap-0"
          {...inView}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } } }}
        >
          {declineStages.map((stage, i) => (
            <motion.li
              key={stage}
              variants={{
                hidden: { opacity: 0, y: 0 },
                visible: { opacity: 1, y: i * 6, transition: { duration: 0.9, ease: EASE } },
              }}
              className="flex flex-col gap-3 md:border-l md:border-line-strong md:px-6 md:first:border-l-0 md:first:pl-0"
            >
              <span aria-hidden className="font-display text-[36px] leading-9 font-light text-accent">
                {numerals[i]}
              </span>
              <span className="text-[15px] leading-[22px] text-subtle">{stage}</span>
            </motion.li>
          ))}
        </motion.ol>
        <SourceNote className="mt-10">{declineSource}</SourceNote>
      </div>
    </Chapter>
  );
}

export function MythsChapter() {
  return (
    <Chapter
      id="cap5"
      numeral="V"
      title="Cinco mentiras que ainda acreditam sobre empresas familiares"
      bridge="No mundo todo, os desafios se repetem."
    >
      <ol className="m-0 mt-14 list-none border-t border-line-strong p-0">
        {myths.map((item, i) => (
          <motion.li
            key={item.myth}
            className="grid grid-cols-[32px_minmax(0,1fr)] items-baseline gap-x-4 gap-y-4 border-b border-line py-9 md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
            {...inView}
            viewport={{ once: true, amount: 0.6 }}
          >
            <span className="font-display text-[28px] font-light text-accent">{i + 1}</span>
            <div className="flex flex-col gap-2">
              <span className="text-label tracking-label text-dim">MENTIRA</span>
              <motion.span
                className="font-display text-2xl leading-[1.3] font-light text-subtle"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: [0, 1, 0.55], y: 0, transition: { duration: 1.8, times: [0, 0.4, 1], ease: EASE } },
                }}
              >
                “{item.myth}”
              </motion.span>
            </div>
            <motion.div
              className="col-start-2 flex flex-col gap-2 md:col-start-auto"
              variants={{
                hidden: { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 1, ease: EASE, delay: 0.6 } },
              }}
            >
              <span className="text-label tracking-label text-accent">REALIDADE</span>
              <span className="text-lg text-foreground">{item.reality}</span>
            </motion.div>
          </motion.li>
        ))}
      </ol>
      <SourceNote>{mythsSource}</SourceNote>
    </Chapter>
  );
}

export function ChallengesChapter() {
  return (
    <Chapter
      id="cap6"
      numeral="VI"
      title="Os sete maiores desafios globais das empresas familiares"
      bridge="Todos eles têm uma resposta em comum: governança."
    >
      <motion.ol
        className="m-0 mt-14 list-none border-t border-line-strong p-0"
        {...inView}
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {challenges.map((challenge, i) => (
          <motion.li
            key={challenge}
            variants={rowVariants}
            className="group relative grid grid-cols-[56px_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-6 md:grid-cols-[80px_minmax(0,1fr)]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
            />
            <span className="font-display text-[28px] font-light text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[26px] leading-[1.25] font-light text-heading transition-transform duration-700 ease-out-soft group-hover:translate-x-2 md:text-[32px]">
              {challenge}
            </span>
          </motion.li>
        ))}
      </motion.ol>
      <SourceNote>{challengesSource}</SourceNote>
    </Chapter>
  );
}
