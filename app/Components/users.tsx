export type User = {
  username: string;
  email: string;
  password: string;
};

export const users: User[] = [
  { username: "André", email: "andre02@gmail.com", password: "senha123" },
  { username: "Maria", email: "maria@email.com", password: "segredo456" },
  { username: "João", email: "joao@email.com", password: "tropa789" },
  { username: "Ana", email: "ana@email.com", password: "minhasenha" },
  { username: "Carlos", email: "carlos@email.com", password: "abc12345" },
];
