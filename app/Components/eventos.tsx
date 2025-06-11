export interface Evento {
  id: number;
  nome: string;
  totalEquipes: number;
  status: string;
  data: string;
}

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
    status: "Inativo",
    data: "2024-08-10",
  },
  {
    id: 4,
    nome: "Bootcamp JS",
    totalEquipes: 12,
    status: "Inativo",
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
    status: "Inativo",
    data: "2024-11-03",
  },
  {
    id: 8,
    nome: "Seminário Cloud",
    totalEquipes: 9,
    status: "Ativo",
    data: "2024-12-01",
  },
  {
    id: 9,
    nome: "Oficina Python",
    totalEquipes: 5,
    status: "Encerrado",
    data: "2024-04-18",
  },
  {
    id: 10,
    nome: "Congresso Tech",
    totalEquipes: 15,
    status: "Ativo",
    data: "2024-12-15",
  },
  {
    id: 11,
    nome: "Painel IA",
    totalEquipes: 7,
    status: "Ativo",
    data: "2024-08-25",
  },
  {
    id: 12,
    nome: "Maratona Dados",
    totalEquipes: 11,
    status: "Encerrado",
    data: "2024-03-30",
  },
  {
    id: 13,
    nome: "Workshop Mobile",
    totalEquipes: 6,
    status: "Ativo",
    data: "2024-09-20",
  },
  {
    id: 14,
    nome: "Encontro QA",
    totalEquipes: 8,
    status: "Inativo",
    data: "2024-10-05",
  },
  {
    id: 15,
    nome: "Palestra Segurança",
    totalEquipes: 4,
    status: "Encerrado",
    data: "2024-05-10",
  },
];
