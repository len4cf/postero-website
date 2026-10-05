import mark from "../../assets/images/postero-mark.webp";
import symbol from "../../assets/images/postero-symbol.webp";
import { Marquee } from "../motion/Marquee";
import { Parallax } from "../motion/Parallax";
import { Accent, RevealText } from "../motion/RevealText";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { Rise } from "./primitives";

type Props = { onSchedule: () => void; onBack: () => void };

export function EntendaClosing({ onSchedule, onBack }: Props) {
  return (
    <>
      <div className="border-t border-line py-10 md:py-14">
        <Marquee speed={-2.6} className="display text-[clamp(48px,8vw,120px)] leading-[1.05]">
          <span>Governança</span>
          <span aria-hidden className="mx-[0.35em] inline-block size-[0.14em] rotate-45 bg-accent align-middle" />
          <span className="text-outline">Sucessão</span>
          <span aria-hidden className="mx-[0.35em] inline-block size-[0.14em] rotate-45 bg-accent align-middle" />
          <span>Continuidade</span>
          <span aria-hidden className="mx-[0.35em] inline-block size-[0.14em] rotate-45 bg-accent align-middle" />
        </Marquee>
      </div>

      <section id="conversa" aria-labelledby="conversa-title" className="relative overflow-hidden border-y border-line bg-surface">
        <Parallax speed={240} className="pointer-events-none absolute top-16 right-[6%] hidden md:block">
          <img src={symbol} alt="" width={121} height={144} loading="lazy" className="brand-art block h-56 w-auto opacity-[0.1]" />
        </Parallax>
        <Container className="relative py-24 md:py-40">
          <div className="flex max-w-[980px] flex-col gap-12">
            <RevealText
              id="conversa-title"
              by="word"
              stagger={0.05}
              className="font-display text-[34px] leading-[1.15] font-light text-heading md:text-[clamp(44px,4.8vw,68px)]"
              lines={[
                "Nem tudo que parece verdade sustenta uma empresa familiar.",
                "Organização, diálogo e preparo constroem",
                <Accent key="c">continuidade.</Accent>,
              ]}
            />
            <Rise delay={0.3} amount={0.6} className="flex flex-col gap-10">
              <p className="m-0 max-w-[620px] text-lg text-muted">
                A Postero ajuda famílias empresárias a atravessar esses desafios — com governança, sucessão preparada e
                conselhos que funcionam.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button onClick={onSchedule} className="group min-h-14 gap-4 px-8">
                  Agendar uma conversa
                  <span aria-hidden className="inline-block transition-transform duration-500 ease-out-soft group-hover:translate-x-1.5">
                    →
                  </span>
                </Button>
                <Button variant="secondary" onClick={onBack} className="min-h-14 px-8">
                  Conhecer a Postero
                </Button>
              </div>
            </Rise>
          </div>
        </Container>
      </section>

      <footer>
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8">
          <span className="text-xs text-dim">© 2021—{new Date().getFullYear()} Postero · Todos os direitos reservados</span>
          <div className="flex items-center gap-4">
            <span className="text-label tracking-label text-dim">
              PÓSTERO · DO LATIM <i className="tracking-[0.05em]">posterus</i>, O QUE VEM DEPOIS
            </span>
            <img src={mark} alt="" width={40} height={48} loading="lazy" className="brand-art block h-6 w-auto opacity-55" />
          </div>
        </Container>
      </footer>
    </>
  );
}
