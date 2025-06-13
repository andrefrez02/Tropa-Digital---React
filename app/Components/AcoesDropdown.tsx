import Image from "next/image";
import { Evento } from "../Components/eventos";
import React from "react";

interface AcoesDropdownProps {
  evento: Evento;
  onEdit: (evento: Evento) => void;
  onDelete: (id: number) => void;
  open: number | null;
  setOpen: (id: number | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export default function AcoesDropdown({
  evento,
  onEdit,
  onDelete,
  open,
  setOpen,
  dropdownRef,
}: AcoesDropdownProps) {
  return (
    <>
      <button
        onClick={() => setOpen(open === evento.id ? null : evento.id)}
        className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
        aria-label="Ações"
      >
        <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
          <circle cy="5" cx="12" r="2" fill="#cc6237" />
          <circle cy="12" cx="12" r="2" fill="#cc6237" />
          <circle cy="19" cx="12" r="2" fill="#cc6237" />
        </svg>
      </button>
      {open === evento.id && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-42 bg-white border border-gray-200 rounded-[25px] shadow-lg flex flex-col mx-10 overflow-hidden"
        >
          <button
            onClick={() =>
              (window.location.href = `/eventos/evento?eventoId=${evento.id}`)
            }
            className="px-4 py-2 text-left hover:bg-[#f6f6f6] cursor-pointer"
          >
            <Image
              width={20}
              height={20}
              alt="Visualizar evento"
              className="inline mr-2"
              src="/olho-aberto.svg"
              priority
            />
            Visualizar
          </button>
          <button
            onClick={() => onEdit(evento)}
            className="px-4 py-2 text-left hover:bg-[#f6f6f6] cursor-pointer"
          >
            <Image
              width={20}
              height={20}
              alt="Editar evento"
              className="inline mr-2"
              src="/lapis.svg"
              priority
            />
            Editar
          </button>
          <button
            onClick={() => onDelete(evento.id)}
            className="px-4 py-2 text-left text-red-600 hover:bg-[#f6f6f6] cursor-pointer"
          >
            <Image
              width={20}
              height={20}
              alt="Remover evento"
              className="inline mr-2"
              src="/lixo.svg"
              priority
            />
            Remover
          </button>
        </div>
      )}
    </>
  );
}
