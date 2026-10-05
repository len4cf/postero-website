const logos = import.meta.glob<string>("../assets/clients/*.webp", {
  eager: true,
  import: "default",
});

export type Client = { name: string; logo: string };

const clientList: [slug: string, name: string][] = [
  ["grancafe", "Grancafé"],
  ["globalsys", "Globalsys"],
  ["vilfer", "Vilfer"],
  ["diskpan", "Diskpan"],
  ["minerasul", "Minerasul"],
  ["proteinorte", "Proteinorte"],
  ["premobras", "Premobras"],
  ["carbomix", "Carbomix"],
  ["grupo-berger", "Grupo Berger"],
  ["estima", "Estima"],
  ["contrex", "Contrex"],
  ["grupo-sinex", "Grupo Sinex"],
  ["ranking", "Ranking"],
  ["trans-scherrer", "Trans Scherrer"],
  ["biancogres", "Biancogres"],
  ["royal-hospital", "Royal Hospital"],
  ["meo", "Meo Alimentação"],
  ["dellmar", "Dellmar"],
  ["litoral", "Litoral"],
  ["positiva", "Positiva"],
  ["pettrus", "Pettrus"],
  ["capecas", "Capeças"],
  ["linkup", "LinkUp"],
  ["consultre", "Consultre"],
  ["agridrones", "Agridrones"],
];

export const clients: Client[] = clientList.map(([slug, name]) => ({
  name,
  logo: logos[`../assets/clients/${slug}.webp`],
}));
