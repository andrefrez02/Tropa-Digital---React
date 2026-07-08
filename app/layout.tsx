import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "./Components/Sidebar";
import "./sass/main.sass";

export const metadata: Metadata = {
  title: "Nova Digital",
  description: "Teste prático para desenvolvedor front-end na Nova Digital",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`antialiased flex transition ease-in-out duration-200`}>
        <AuthProvider>
          <Sidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
