export interface Evento {
  id: number;
  nome: string;
  totalEquipes: number;
  status: string;
  dataInicial: Date;
  dataFinal: Date;
}

export const eventosMock: Evento[] = [
  {
    id: 1,
    nome: "Hackathon 2024",
    totalEquipes: 10,
    status: "Ativo",
    dataInicial: new Date(2025, 2, 28),
    dataFinal: new Date(2025, 3, 2),
  },
  {
    id: 2,
    nome: "Workshop React",
    totalEquipes: 5,
    status: "Inativo",
    dataInicial: new Date(2025, 3, 29),
    dataFinal: new Date(2025, 4, 2),
  },
  {
    id: 3,
    nome: "Encontro Dev",
    totalEquipes: 8,
    status: "Inativo",
    dataInicial: new Date(2025, 4, 30),
    dataFinal: new Date(2025, 5, 3),
  },
  {
    id: 4,
    nome: "Bootcamp JS",
    totalEquipes: 12,
    status: "Inativo",
    dataInicial: new Date(2025, 5, 14),
    dataFinal: new Date(2025, 5, 28),
  },
  {
    id: 5,
    nome: "Palestra UX",
    totalEquipes: 4,
    status: "Inativo",
    dataInicial: new Date(2025, 6, 16),
    dataFinal: new Date(2025, 6, 22),
  },
  {
    id: 6,
    nome: "Code Challenge",
    totalEquipes: 7,
    status: "Ativo",
    dataInicial: new Date(2025, 7, 31),
    dataFinal: new Date(2025, 8, 2),
  },
  {
    id: 7,
    nome: "Meetup Frontend",
    totalEquipes: 6,
    status: "Inativo",
    dataInicial: new Date(2025, 8, 18),
    dataFinal: new Date(2025, 8, 24),
  },
  {
    id: 8,
    nome: "Seminário Cloud",
    totalEquipes: 9,
    status: "Ativo",
    dataInicial: new Date(2025, 9, 19),
    dataFinal: new Date(2025, 9, 25),
  },
  {
    id: 9,
    nome: "Oficina Python",
    totalEquipes: 5,
    status: "Inativo",
    dataInicial: new Date(2025, 10, 30),
    dataFinal: new Date(2025, 11, 2),
  },
  {
    id: 10,
    nome: "Congresso Tech",
    totalEquipes: 15,
    status: "Ativo",
    dataInicial: new Date(2025, 11, 21),
    dataFinal: new Date(2025, 11, 27),
  },
  {
    id: 11,
    nome: "Painel IA",
    totalEquipes: 7,
    status: "Ativo",
    dataInicial: new Date(2025, 0, 22),
    dataFinal: new Date(2025, 0, 28),
  },
  {
    id: 12,
    nome: "Maratona Dados",
    totalEquipes: 11,
    status: "Inativo",
    dataInicial: new Date(2025, 1, 23),
    dataFinal: new Date(2025, 1, 29),
  },
  {
    id: 13,
    nome: "Workshop Mobile",
    totalEquipes: 6,
    status: "Ativo",
    dataInicial: new Date(2025, 2, 24),
    dataFinal: new Date(2025, 2, 30),
  },
  {
    id: 14,
    nome: "Encontro QA",
    totalEquipes: 8,
    status: "Inativo",
    dataInicial: new Date(2025, 3, 25),
    dataFinal: new Date(2025, 4, 1),
  },
  {
    id: 15,
    nome: "Palestra Segurança",
    totalEquipes: 4,
    status: "Inativo",
    dataInicial: new Date(2025, 4, 27),
    dataFinal: new Date(2025, 5, 3),
  },
];
