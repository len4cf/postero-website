import apresentacao from "../assets/photos/sala-apresentacao.webp";
import conversa from "../assets/photos/sala-conversa.webp";
import plateia from "../assets/photos/sala-plateia.webp";
import humberto from "../assets/photos/detalhe-humberto.webp";
import mesa from "../assets/photos/detalhe-mesa.webp";
import trilhas from "../assets/photos/detalhe-trilhas.webp";

export type Photo = { src: string; alt: string; width: number; height: number };

export const photos = {
  apresentacao: {
    src: apresentacao,
    alt: "Humberto apresenta um minicaso de governança corporativa e familiar para uma sala de executivos",
    width: 1600,
    height: 1600,
  },
  conversa: {
    src: conversa,
    alt: "Humberto, de pé, conversa com executivos e herdeiros sentados à mesa",
    width: 1600,
    height: 1600,
  },
  plateia: {
    src: plateia,
    alt: "Sala com cerca de trinta participantes acompanhando a fala de Humberto",
    width: 1600,
    height: 1600,
  },
  humberto: { src: humberto, alt: "Humberto, apoiado em uma cadeira, ouve a turma", width: 520, height: 760 },
  mesa: { src: mesa, alt: "Participantes atentos à mesa durante o encontro", width: 720, height: 720 },
  trilhas: {
    src: trilhas,
    alt: "Slide “Evolução permanente, em duas trilhas”, com as linhas do tempo da governança corporativa e familiar",
    width: 760,
    height: 560,
  },
} satisfies Record<string, Photo>;
