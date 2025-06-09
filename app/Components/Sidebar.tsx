"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Eventos", icon: "eventos" },
  { label: "Equipes", icon: "equipes" },
  { label: "Inscrições", icon: "inscricoes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { loggedUser, logout } = useAuth();

  if (loggedUser === null) {
    return null;
  }
  if (pathname === "/") {
    return null;
  }

  return (
    <aside className="w-[210px] h-screen flex flex-col justify-between bg-white text-zinc-900 transition-colors duration-200 ease-in-out">
      <div>
        <div className="py-8 text-center font-bold text-2xl tracking-wider border-b border-zinc-800">
          <Image
            width={64}
            height={64}
            className="w-64 h-16 mx-auto object-contain"
            src="/logo.svg"
            alt="Tropa Digital Logo"
            priority
          />
        </div>

        <nav className="mt-8">
          <span>MENU</span>
          {tabs.map((tab) => (
            <a
              href={`/${tab.label.toLowerCase()}`}
              key={tab.label}
              className={`${
                pathname === `/${tab.label.toLowerCase()}`
                  ? "rounded-lg bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors btn-lg cursor-pointer"
                  : ""
              } flex items-center px-8 py-[14px] cursor-pointer transition-colors duration-200 text-lg focus:outline-none`}
              tabIndex={0}
              role="button"
            >
              <span className="mr-4">
                <Image
                  width={24}
                  height={24}
                  src={`/${tab.icon}.svg`}
                  alt={`${tab.label} icon`}
                  style={{
                    filter:
                      "brightness(0) grayscale(100%) invert(14%) sepia(0%) saturate(0%) hue-rotate(81deg) brightness(100%) contrast(98%)",
                  }}
                  className="w-6 h-6"
                />
              </span>
              {tab.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-zinc-800 px-8 py-6 flex items-center gap-3">
        <Image
          width={40}
          height={40}
          src="\olho-aberto.svg"
          alt={loggedUser?.username || "Usuário"}
          className="w-10 h-10 rounded-full object-cover border-2 border-zinc-800"
          priority
        />
        <div>
          <div className="font-semibold">{loggedUser?.username}</div>
          <div className="text-xs text-zinc-400">Administrador</div>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-8 py-6 flex flex-col items-center gap-3">
        <Link href="/editar" className="font-semibold">
          <span>
            <Image width={16} height={16} src="/editar.svg" alt="Editar" />
          </span>
          Alterar dados
        </Link>
        <Link
          href="/"
          onClick={() => {
            logout();
          }}
          className="font-semibold"
        >
          <span>
            <Image width={16} height={16} src="/sair.svg" alt="Sair" />
          </span>
          Sair
        </Link>
      </div>
    </aside>
  );
}
