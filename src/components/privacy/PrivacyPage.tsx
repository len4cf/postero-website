import type { ReactNode } from "react";
import logo from "../../assets/images/postero-logo.webp";
import { contact } from "../../data/content";
import { Footer } from "../layout/Footer";
import { Accent } from "../motion/RevealText";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";
import { Label } from "../ui/Label";
import { ThemeToggle } from "../ui/ThemeToggle";

const UPDATED_AT = "6 de novembro de 2026";

const linkClass = "text-accent underline decoration-accent-line underline-offset-4 transition-colors duration-300 hover:text-accent-hover";

function Mail() {
  return (
    <a href={`mailto:${contact.email}`} className={linkClass}>
      {contact.email}
    </a>
  );
}

function Section({ numeral, title, children }: { numeral: string; title: string; children: ReactNode }) {
  const id = `privacidade-${numeral}`;
  return (
    <section aria-labelledby={id} className="grid grid-cols-1 gap-6 border-t border-line-strong pt-10 md:grid-cols-12 md:gap-10">
      <div className="flex items-baseline gap-4 md:col-span-4">
        <span aria-hidden className="font-display text-xl text-accent tabular-nums">
          {numeral}
        </span>
        <h2 id={id} className="m-0 font-display text-[26px] leading-[1.2] font-light text-heading md:text-[30px]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5 text-base leading-[1.7] text-muted md:col-span-7 md:col-start-6 md:text-[17px] [&_strong]:font-medium [&_strong]:text-heading [&_ul]:m-0 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-5 [&_li]:marker:text-accent [&_p]:m-0">
        {children}
      </div>
    </section>
  );
}

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[60] -translate-y-24 bg-accent px-4 py-3 text-sm font-medium text-background no-underline focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
        <Container className="grid h-[72px] grid-cols-[1fr_auto_1fr] items-center md:h-[88px]">
          <a
            href="/"
            className="group flex min-h-11 items-center gap-3 justify-self-start text-label tracking-label text-muted uppercase no-underline transition-colors duration-300 hover:text-heading"
          >
            <span aria-hidden className="transition-transform duration-500 ease-out-soft group-hover:-translate-x-1">
              ←
            </span>
            Voltar ao site
          </a>
          <a href="/" aria-label="Postero, início" className="flex">
            <img src={logo} alt="Postero" width={272} height={56} className="brand-art block h-5 w-auto md:h-[24px]" />
          </a>
          <div className="justify-self-end">
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main id="conteudo">
        <Container className="flex flex-col gap-16 pt-20 pb-24 md:gap-24 md:pt-32 md:pb-40">
          <div className="flex flex-col gap-10">
            <Eyebrow>Privacidade</Eyebrow>
            <h1 className="display m-0 text-[clamp(44px,11vw,64px)] md:text-[clamp(64px,7vw,104px)]">
              Política de <Accent>privacidade</Accent>
            </h1>
            <p className="m-0 max-w-[620px] font-display text-[22px] leading-[1.4] font-light text-heading md:text-[26px]">
              Como este site trata dados pessoais, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
            <Label className="tabular-nums">Última atualização · {UPDATED_AT}</Label>
          </div>

          <div className="flex flex-col gap-14 md:gap-20">
            <Section numeral="01" title="Responsável">
              <p>
                <strong>Postero Consultoria</strong>, CNPJ {contact.cnpj}. Contato para assuntos de dados pessoais: <Mail />.
              </p>
            </Section>

            <Section numeral="02" title="Dados e finalidade">
              <ul>
                <li>
                  <strong>Contato.</strong> O formulário abre o seu aplicativo de e-mail; recebemos apenas o que você enviar (nome,
                  empresa, contato e mensagem), usado somente para responder e agendar a conversa (art. 7º, V, da LGPD).
                </li>
                <li>
                  <strong>Acesso.</strong> Dados técnicos como endereço IP e navegador, registrados para o funcionamento e a segurança
                  do site (legítimo interesse, art. 7º, IX).
                </li>
              </ul>
              <p>Não usamos cookies de análise, publicidade ou rastreamento.</p>
            </Section>

            <Section numeral="03" title="Compartilhamento">
              <p>
                Apenas com os serviços que fazem o site e o contato funcionarem: Cloudflare (hospedagem), Google Fonts (fontes) e o
                provedor de e-mail. Eles podem processar dados fora do Brasil (art. 33). Os dados não são vendidos nem usados para
                marketing.
              </p>
            </Section>

            <Section numeral="04" title="Retenção">
              <p>As mensagens são guardadas enquanto forem necessárias para o atendimento ou exigidas por lei, e depois excluídas.</p>
            </Section>

            <Section numeral="05" title="Seus direitos">
              <p>
                Você pode pedir acesso, correção, eliminação ou portabilidade dos seus dados, entre outros direitos do art. 18 da
                LGPD, pelo e-mail <Mail />. Também pode recorrer à Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
            </Section>
          </div>
        </Container>
      </main>

      <Footer linkBase="/" />
    </div>
  );
}
