import { motion } from "motion/react";
import { chapter, clientsIntro } from "../../data/content";
import { clients, type Client } from "../../data/clients";
import { EASE } from "../../lib/motion";
import { Counter } from "../motion/Counter";
import { Marquee } from "../motion/Marquee";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

const { numeral } = chapter("clientes");

const rows: Client[][] = [0, 1, 2].map((r) => clients.filter((_, i) => i % 3 === r));

function Logo({ client }: { client: Client }) {
  return (
    <span className="flex h-24 w-[200px] shrink-0 items-center justify-center border-r border-line px-8 md:h-32 md:w-[260px] md:px-10">
      <img src={client.logo} alt="" loading="lazy" className="client-logo block max-h-10 max-w-full object-contain opacity-80 md:max-h-12" />
    </span>
  );
}

export function Clients() {
  return (
    <section id="clientes" aria-labelledby="clientes-title" className="border-t border-line">
      <Container className="flex flex-col gap-10 pt-24 pb-14 md:pt-40 md:pb-20">
        <Eyebrow numeral={numeral}>{clientsIntro.eyebrow}</Eyebrow>
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <RevealText
            id="clientes-title"
            className="display text-[clamp(40px,10vw,60px)] md:col-span-8 md:text-[clamp(56px,6vw,96px)]"
            lines={["Famílias que confiaram", "a governança", <Accent key="p">à Postero.</Accent>]}
          />
          <motion.p
            className="m-0 text-lg text-muted md:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            <Counter value={clients.length} suffix=" empresas" className="font-display text-[1.6em] text-accent" />{" "}
            {clientsIntro.sectors}
          </motion.p>
        </div>
      </Container>

      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="flex flex-col border-y border-line">
        {rows.map((row, i) => (
          <Marquee key={i} speed={i % 2 ? 2.2 : -2.6} className={i > 0 ? "border-t border-line" : undefined}>
            {row.map((client) => (
              <Logo key={client.name} client={client} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
