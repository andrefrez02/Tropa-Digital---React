import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "./Components/Sidebar";
import "./sass/main.sass";

export const metadata: Metadata = {
  title: "Tropa Digital",
  description: "Teste prático para desenvolvedor front-end na Tropa Digital",
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
