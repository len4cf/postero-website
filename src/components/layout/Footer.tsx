import type { ReactNode } from "react";
import logo from "../../assets/images/postero-logo.webp";
import mark from "../../assets/images/postero-mark.webp";
import { contact, footerLinks } from "../../data/content";
import { Container } from "../ui/Container";
import { Label } from "../ui/Label";
import { Placeholder } from "../ui/Placeholder";

const linkClass =
  "text-sm text-muted no-underline transition-colors duration-300 hover:text-heading";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <Label>{title}</Label>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <Container className="flex flex-col gap-20 pt-24 pb-10 md:gap-28 md:pt-32">
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex max-w-[380px] flex-col gap-7 sm:col-span-2 lg:col-span-5">
            <a
              href="#topo"
              aria-label="Postero, início"
              className="flex self-start"
            >
              <img
                src={logo}
                alt="Postero"
                width={272}
                height={56}
                loading="lazy"
                className="brand-art block h-7 w-auto"
              />
            </a>
            <p className="m-0 font-display text-xl leading-7 text-heading">
              O que vem depois só existe para quem se prepara antes.
            </p>
            <Label>Governança · sucessão · conselhos</Label>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-4 lg:col-start-6">
            <Column title="Navegação">
              <ul className="m-0 grid list-none grid-cols-2 gap-x-8 gap-y-3.5 p-0">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Column>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <Column title="Contato">
              <div className="flex flex-col gap-3.5">
                <span className="text-sm text-heading">{contact.name}</span>
                <Placeholder className="text-sm [overflow-wrap:anywhere]">
                  {contact.email}
                </Placeholder>
                <Placeholder className="text-sm">{contact.phone}</Placeholder>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  LinkedIn ↗
                </a>
              </div>
            </Column>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line pt-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-dim">
            <span>
              © 2021—{new Date().getFullYear()} Postero · Todos os direitos
              reservados
            </span>
            <span>
              CNPJ <Placeholder>{contact.cnpj}</Placeholder>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-label tracking-label text-dim">
              PÓSTERO · DO LATIM{" "}
              <i className="tracking-[0.05em] normal-case">posterus</i>, O QUE
              VEM DEPOIS
            </span>
            <img
              src={mark}
              alt=""
              width={40}
              height={48}
              loading="lazy"
              className="brand-art block h-6 w-auto opacity-55"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
