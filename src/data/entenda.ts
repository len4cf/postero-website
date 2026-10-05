export type ChapterId = "cap1" | "cap2" | "cap3" | "cap4" | "cap5" | "cap6";

export const chapters: { id: ChapterId; numeral: string; label: string }[] = [
  { id: "cap1", numeral: "I", label: "A empresa familiar e seus impactos" },
  { id: "cap2", numeral: "II", label: "Grande, não pequena" },
  { id: "cap3", numeral: "III", label: "Sustentabilidade" },
  { id: "cap4", numeral: "IV", label: "Os cinco estágios do declínio" },
  { id: "cap5", numeral: "V", label: "Cinco mentiras" },
  { id: "cap6", numeral: "VI", label: "Sete desafios globais" },
];

export const teaser = {
  stat: 12,
  statLabel: "das empresas familiares chegam à terceira geração.",
  side: [
    { value: "256", suffix: " de 300", label: "maiores empresas do Brasil têm controle familiar" },
    { value: "US$ 4 tri", label: "em ativos mudam de geração até 2030" },
    { value: "65%", label: "das que desaparecem têm conflitos pessoais e financeiros como causa" },
  ],
};

export const employmentStat = { value: "75%", label: "dos empregos gerados · mais de 50% do PIB" };

export const euShare = {
  caption: "União Europeia · 25 das 100 maiores · participação familiar",
  rows: [
    { country: "Espanha", percent: 85 },
    { country: "França", percent: 85 },
    { country: "Alemanha", percent: 79 },
    { country: "Itália", percent: 73 },
  ],
};

export const ranking = {
  source: "Fonte · EY Global 500 Family Business Index 2025",
  rows: [
    { company: "JBS", family: "Família Batista", global: "16ª" },
    { company: "Itaúsa / Itaú", family: "Setubal e Villela", global: "53ª" },
    { company: "Ultrapar", family: "Família Igel", global: "66ª" },
    { company: "Bradesco", family: "Aguiar", global: "91ª" },
    { company: "Gerdau", family: "Família Gerdau", global: "143ª" },
    { company: "Votorantim", family: "Ermírio de Moraes", global: "198ª" },
    { company: "CSN", family: "Steinbruch", global: "221ª" },
    { company: "Amaggi", family: "Família Maggi", global: "226ª" },
    { company: "Cosan", family: "Família Ometto", global: "256ª" },
    { company: "Magazine Luiza", family: "Família Trajano", global: "267ª" },
  ],
};

export const scaleStats = [
  { value: "13", label: "empresas brasileiras no Top 500 global", highlight: true },
  { value: "US$ 227 bi", label: "em receita combinada" },
  { value: "+750 mil", label: "empregos gerados" },
];

export const failureCauses = [
  "Sucessão sem preparo e ruptura da unidade familiar",
  "Lentidão, indecisão e recusa ao risco",
  "Talento e capital insuficientes",
  "Perda de competitividade e de compromisso",
];

export const axes = [
  {
    name: "Propriedade",
    steps: ["Único proprietário", "Sociedade entre irmãos", "Consórcio de primos", "Dinastia familiar"],
  },
  { name: "Negócio", steps: ["Negócio familiar jovem", "Negócio familiar único", "Diversificado"] },
  {
    name: "Governança",
    steps: [
      "Administrado pelo proprietário",
      "Administrado pela família",
      "Controlado pela família",
      "Família investidora",
    ],
  },
];

export const declineStages = [
  "Excesso de confiança vindo do sucesso",
  "Busca indisciplinada por mais",
  "Negação de riscos e perigos",
  "Luta desesperada pela salvação",
  "Entrega à irrelevância ou à morte",
];

export const declineSource = "Fonte · Jim Collins, How the Mighty Fall · Prado, R. N. (Org.), Saraiva 2013";

export const myths = [
  { myth: "Família unida não tem conflito", reality: "Conflitos existem; o problema é como são tratados." },
  {
    myth: "O sucessor precisa ser da família",
    reality: "O sucessor precisa ser qualificado — e nem sempre será um membro da família.",
  },
  {
    myth: "Governança é só para grandes empresas",
    reality: "Governança é o que organiza decisões, independente do tamanho.",
  },
  { myth: "Herdar é assumir a gestão", reality: "Herdeiros podem ser acionistas sem atuar na gestão." },
  {
    myth: "O tempo resolve os problemas",
    reality: "O tempo, sem intenção e trabalho, tende a agravar os conflitos.",
  },
];

export const mythsSource = "Juliana Costa Gonçalves · Escola da Família Empresária";

export const challenges = [
  "Problemas de transição de liderança",
  "Equilibrar tradição e inovação",
  "Conflitos no planejamento sucessório",
  "Falta de estruturas de governança",
  "Dinâmica destrutiva na família",
  "Fracasso para atrair talentos externos",
  "Valores familiares perdidos na complexidade dos negócios",
];

export const challengesSource = "Fonte · Instituto Empresa de Família";
