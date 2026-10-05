export type Course = {
  year?: string;
  title: string;
  institution: string;
  detail?: string;
};

export type CourseGroup = {
  id: string;
  numeral: string;
  label: string;
  courses: Course[];
};

export const courseGroups: CourseGroup[] = [
  {
    id: "governanca",
    numeral: "I",
    label: "Governança e conselhos",
    courses: [
      {
        year: "2026",
        title: "Gestao de Empresas Familiares",
        institution: "Insper",
        detail: "Certificação",
      },
      {
        year: "2025",
        title: "Governança Corporativa em Empresas Familiares",
        institution: "Fundação Dom Cabral",
        detail: "Certificação",
      },
      {
        year: "2022",
        title: "Conselheiro de Administração IBGC (CCA IBGC)",
        institution: "IBGC · Instituto Brasileiro de Governança Corporativa",
        detail: "Certificação",
      },
      {
        year: "2020 - 2021",
        title: "Programa de Formação de Conselheiros/C-Level - Board Member",
        institution: "Digital on Board · HSM University",
      },
      {
        year: "2014",
        title: "Programa de Formação de Conselheiros de Administração",
        institution: "Fundação Dom Cabral",
      },
    ],
  },
  {
    id: "gestao",
    numeral: "II",
    label: "Gestão e finanças",
    courses: [
      {
        year: "2012",
        title: "POS MBA / STC Gestao",
        institution: "Kellogg Executive Education",
      },
      {
        year: "2008 - 2009",
        title: "PDA - Programa Desenvolvimento Acionistas",
        institution: "Fundação Dom Cabral",
      },
      {
        year: "2003 - 2005",
        title: "MBA - Gestão Executiva",
        institution: "Fundação Dom Cabral",
      },
      {
        year: "1994 - 1995",
        title: "Master of Business Administration (MBA) - Finanças",
        institution: "Ibmec",
      },
    ],
  },
  {
    id: "academica",
    numeral: "III",
    label: "Formação acadêmica",
    courses: [
      {
        year: "2001 - 2002",
        title: "Mestrado em Gestão Contábil",
        institution: "FACULDADE HUMANAS VITORIA",
      },
      {
        year: "1992 - 1993",
        title: "Pós-graduação em Administração Estratégica",
        institution: "FAESA",
      },
      {
        year: "1987 - 1990",
        title: "Bacharelado em Ciências Contábeis",
        institution: "Faculdade Ciencias Contabeis e Administrativas",
      },
    ],
  },
  {
    id: "complementar",
    numeral: "IV",
    label: "Cursos complementares",
    courses: [
      {
        year: "2018",
        title:
          "Media X, innovation and Training for Brazil’s Transportation Infraestruture",
        institution: "Stanford University",
      },
      {
        year: "1998 - 1999",
        title: "Psicodrama",
        institution: "Faculdade Humanas Vitória",
      },
    ],
  },
];

export function isPlaceholder(text: string) {
  return /^\[.*\]$/.test(text.trim());
}
