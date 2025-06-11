"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

const tabs = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Eventos", icon: "eventos" },
  { label: "Equipes", icon: "equipes" },
  { label: "Inscrições", icon: "inscricoes" },
];

function clearUrl(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

export default function Sidebar() {
  const pathname = usePathname();
  const { loggedUser, logout } = useAuth();

  if (loggedUser === null) {
    return null;
  }

  return (
    <aside className="w-[280px] h-screen flex flex-col justify-between bg-white text-zinc-900 transition-colors duration-200 ease-in-out px-8">
      <div>
        <div className="py-8 font-bold text-2xl tracking-wider">
          <Image
            width={64}
            height={64}
            className="w-48 h-16 mx-auto object-contain"
            src="/logo.svg"
            alt="Tropa Digital Logo"
            priority
          />
        </div>

        <nav className="mt-8">
          <span>MENU</span>
          {tabs.map((tab) => {
            const isActive =
              pathname === `/${clearUrl(tab.label).toLowerCase()}`;
            return (
              <Link
                href={`/${clearUrl(tab.label).toLowerCase()}`}
                key={tab.label}
                className={`${
                  isActive
                    ? "rounded-lg bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors btn-lg"
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
                      filter: isActive
                        ? "grayscale(1) brightness(0) invert(1)"
                        : "brightness(0) grayscale(100%) invert(14%) sepia(0%) saturate(0%) hue-rotate(81deg) brightness(100%) contrast(98%)",
                    }}
                    className="w-6 h-6"
                  />
                </span>
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-8 py-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src="/user.png"
            alt={loggedUser?.username || "Usuário"}
            className="w-10 h-10 rounded-[16px] object-cover shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_4px_rgba(204,98,55,1)]"
            priority
          />
          <div>
            <div className="font-semibold">{loggedUser?.username}</div>
            <div className="text-xs text-zinc-400">Administrador</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href="/editar"
            className="font-semibold flex items-center gap-4 cursor-pointer"
          >
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
            className="font-semibold flex items-center gap-4 cursor-pointer"
          >
            <span>
              <Image width={16} height={16} src="/sair.svg" alt="Sair" />
            </span>
            Sair
          </Link>
        </div>
      </div>
    </aside>
  );
}
