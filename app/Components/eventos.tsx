export type Evento = {
  id: number;
  nome: string;
  totalEquipes: number;
  status: string;
  data: string;
};

export const eventosMock: Evento[] = [
  {
    id: 1,
    nome: "Hackathon 2024",
    totalEquipes: 10,
    status: "Ativo",
    data: "2024-07-01",
  },
  {
    id: 2,
    nome: "Workshop React",
    totalEquipes: 5,
    status: "Encerrado",
    data: "2024-06-15",
  },
  {
    id: 3,
    nome: "Encontro Dev",
    totalEquipes: 8,
    status: "Ativo",
    data: "2024-08-10",
  },
  {
    id: 4,
    nome: "Bootcamp JS",
    totalEquipes: 12,
    status: "Ativo",
    data: "2024-09-05",
  },
  {
    id: 5,
    nome: "Palestra UX",
    totalEquipes: 4,
    status: "Encerrado",
    data: "2024-05-20",
  },
  {
    id: 6,
    nome: "Code Challenge",
    totalEquipes: 7,
    status: "Ativo",
    data: "2024-10-12",
  },
  {
    id: 7,
    nome: "Meetup Frontend",
    totalEquipes: 6,
    status: "Ativo",
    data: "2024-11-03",
  },
];