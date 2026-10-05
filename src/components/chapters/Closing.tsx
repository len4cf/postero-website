import { motion } from "motion/react";
import { chapter, closing, contact } from "../../data/content";
import { EASE } from "../../lib/motion";
import { Accent, RevealText } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Label } from "../ui/Label";
import { ContactForm } from "./ContactForm";

const { numeral } = chapter("contato");

const linkClass =
  "self-start border-b border-dashed border-line-dashed text-lg text-heading no-underline transition-colors duration-300 hover:border-accent hover:text-accent";

export function Closing() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="border-t border-line">
      <Container className="flex flex-col gap-16 py-24 md:gap-28 md:py-40">
        <div className="flex flex-col gap-10">
          <Eyebrow numeral={numeral}>{closing.eyebrow}</Eyebrow>
          <RevealText
            id="contato-title"
            by="word"
            stagger={0.08}
            className="display text-[clamp(44px,11.5vw,72px)] md:text-[clamp(72px,8.4vw,136px)]"
            lines={["A próxima geração", "começa na decisão", <Accent key="d">desta.</Accent>]}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex flex-col gap-10 md:col-span-5">
            <p className="m-0 font-display text-[26px] leading-[1.3] font-light text-heading md:text-[32px]">{closing.lead}</p>
            <address className="flex flex-col gap-5 not-italic">
              <Label>Ou fale direto</Label>
              <a href={`mailto:${contact.email}`} className={`${linkClass} [overflow-wrap:anywhere]`}>
                {contact.email}
              </a>
              <a href={`tel:+55${contact.phone.replace(/\D/g, "")}`} className={linkClass}>
                {contact.phone}
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                LinkedIn <span aria-hidden>↗</span>
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </address>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
