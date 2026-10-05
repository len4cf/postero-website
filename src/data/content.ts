type NavLink = { label: string; href: `#${string}` };

export const chapters = [
  { id: "problema", numeral: "I", label: "O problema" },
  { id: "trajetoria", numeral: "II", label: "Trajetória" },
  { id: "numeros", numeral: "III", label: "Em números" },
  { id: "postero", numeral: "IV", label: "A Postero" },
  { id: "atuacao", numeral: "V", label: "Atuação" },
  { id: "formacao", numeral: "VI", label: "Formação" },
  { id: "clientes", numeral: "VII", label: "Clientes" },
  { id: "contato", numeral: "VIII", label: "Contato" },
] as const;

export type ChapterKey = (typeof chapters)[number]["id"];

export const chapterIds = chapters.map((c) => c.id);

export function chapter(id: ChapterKey) {
  return chapters.find((c) => c.id === id)!;
}

export const footerLinks: NavLink[] = chapters.map((c) => ({ label: c.label, href: `#${c.id}` }));

export const hero = {
  origin: "o que vem depois",
  intro:
    "Fui executivo dentro de empresas familiares. Hoje sou conselheiro independente e conduzo governança e sucessão em empresas de controle familiar.",
  caption: "Humberto Gomes Ferreira · Fundador",
};

export const trajectoryIntro = {
  eyebrow: "Trajetória · 1986—hoje",
  lead: "Antes de aconselhar famílias empresárias, vivi o dia a dia delas: a mesa de decisão, as transições de geração e o peso de escolher quem vem depois.",
};

export const manifesto = {
  eyebrow: "Por que Postero",
  body: "Em 35 anos, vi empresas sólidas se fragilizarem aos poucos no silêncio, na ausência de conversa. Quase nunca por falta de capital. Quase sempre por falta de preparo para o que vem depois.",
  quote: "O que vem depois só existe para quem se prepara antes.",
  author: "Humberto Gomes Ferreira",
};

export const servicesIntro = {
  eyebrow: "Como atuo",
  lead: "Cada trabalho da Postero é conduzido pessoalmente, do diagnóstico ao conselho.",
};

export const clientsIntro = {
  eyebrow: "Clientes · 2021—2026",
  sectors: "de indústria, agronegócio, varejo, saúde, logística, tecnologia e serviços.",
};

export const closing = {
  eyebrow: "Próximo passo",
  lead: "Vamos conversar sobre o momento da sua empresa e da sua família.",
};

export type Stat = { value: number; suffix?: string; label: string; highlight?: boolean };

export const stats: Stat[] = [
  { value: 35, suffix: " anos", label: "como executivo em empresas familiares", highlight: true },
  { value: 5, suffix: "+ anos", label: "como conselheiro independente" },
  { value: 25, label: "empresas atendidas pela Postero" },
];

type TimelineVariant = "default" | "origin" | "current";

export type TimelineEntry = {
  period: string;
  duration?: string;
  company: string;
  roles: { title: string; period: string }[];
  summary: string;
  variant?: TimelineVariant;
};

export const timeline: TimelineEntry[] = [
  {
    period: "1986—1995",
    duration: "9 anos",
    company: "Itapuã",
    roles: [
      { title: "Coordenador de Orçamentos e Custos", period: "1986—1990" },
      { title: "Gerente Administrativo Financeiro · Varejo", period: "1990—1993" },
      { title: "Gerente Comercial Regional", period: "1994—1995" },
    ],
    summary: "O início da carreira executiva em empresa de controle familiar.",
  },
  {
    period: "1996—2013",
    duration: "17 anos",
    company: "Grupo Águia Branca",
    roles: [
      { title: "Diretor de Administração e Finanças · Divisão Comércio", period: "1996—2000" },
      {
        title: "Diretor Adjunto de Administração e Finanças · Águia Branca Participações",
        period: "2001—2013",
      },
    ],
    summary:
      "A maior parte da carreira, em um dos grupos familiares mais tradicionais do Espírito Santo.",
  },
  {
    period: "2012",
    duration: "Onde tudo começou",
    company: "Autovix",
    roles: [
      {
        title: "Conselheiro consultivo independente · mentor da geração de herdeiros",
        period: "2012",
      },
    ],
    summary: "O primeiro contato com governança na prática — a semente do que viria a ser a Postero.",
    variant: "origin",
  },
  {
    period: "2013—2014",
    duration: "1 ano",
    company: "Imetame",
    roles: [{ title: "Diretor Executivo Corporativo · Cavallieri Participações", period: "2013—2014" }],
    summary: "Outra empresa familiar capixaba, outro momento de decisão.",
  },
  {
    period: "2015—2021",
    duration: "6 anos",
    company: "Grupo Águia Branca",
    roles: [{ title: "Diretor de Administração e Finanças · Divisão Passageiros", period: "2015—2021" }],
    summary:
      "A volta ao grupo onde construiu a maior parte da carreira — e de onde saiu para fundar a Postero.",
  },
  {
    period: "2021—",
    company: "Postero",
    roles: [{ title: "Fundador · conselheiro independente", period: "2021—" }],
    summary:
      "Toda essa vivência organizada em um método, a serviço de outras famílias empresárias. 25 empresas atendidas em cinco anos.",
    variant: "current",
  },
];

export const services = [
  {
    numeral: "I",
    title: "Conselheiro independente",
    description:
      "Assento em conselhos de administração e consultivos de empresas de controle familiar.",
  },
  {
    numeral: "II",
    title: "Reestruturação e governança",
    description: "Desenho organizacional e implantação do sistema de governança corporativa.",
  },
  {
    numeral: "III",
    title: "Mentoria",
    description: "Formação da geração de herdeiros e desenvolvimento de executivos.",
  },
];

export const education = [
  {
    institution: "IBGC · Instituto Brasileiro de Governança Corporativa",
    programs: ["Certificação para Conselheiro de Administração IBGC (CCA IBGC)"],
  },
  {
    institution: "Fundação Dom Cabral",
    programs: [
      "Certificação - Governança Corporativa em Empresas Familiares",
      "MBA - Gestão Executiva",
    ],
  },
  {
    institution: "Digital on Board · HSM University",
    programs: ["Programa de Formação de Conselheiros/C-Level - Board Member"],
  },
  {
    institution: "Ibmec",
    programs: ["Master of Business Administration (MBA) - Finanças"],
  },
];

export const contact = {
  name: "Humberto Gomes Ferreira",
  email: "humbferr@hotmail.com",
  phone: "(27) 99960-0899",
  linkedin: "https://www.linkedin.com/in/humberto-gomes-ferreira/",
  location: "Espirito Santo, Brasil",
  cnpj: "[00.000.000/0000-00]",
};
