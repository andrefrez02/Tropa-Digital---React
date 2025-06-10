"use client";
import React, { useState } from "react";
import { eventosMock } from "../Components/eventos";

const PAGE_SIZE = 5;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export default function Eventos() {
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [eventos, setEventos] = useState(eventosMock);

  const eventosFiltrados = eventos.filter((e) =>
    e.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPaginas = Math.ceil(eventosFiltrados.length / PAGE_SIZE);
  const eventosPaginados = eventosFiltrados.slice(
    (pagina - 1) * PAGE_SIZE,
    pagina * PAGE_SIZE
  );

  function adicionarEvento() {
    const novoId = eventos.length + 1;
    setEventos([
      ...eventos,
      {
        id: novoId,
        nome: `Novo Evento ${novoId}`,
        totalEquipes: 0,
        status: "Ativo",
        data: new Date().toISOString().slice(0, 10),
      },
    ]);
  }

  function handleFiltroChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltro(e.target.value);
    setPagina(1);
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start bg-[#f9fbff] p-8">
      <div className="bg-white rounded-[30px] shadow-lg w-full max-w-4xl p-8 mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-[#cc6237]">Eventos</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por nome"
              value={filtro}
              onChange={handleFiltroChange}
              className="px-4 py-2 rounded-full bg-[#f6f6f6] focus:outline-none focus:ring-2 focus:ring-[#cc6237] placeholder:text-[#657593] font-semibold"
            />
            <button
              onClick={adicionarEvento}
              className="px-6 py-2 rounded-full bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors"
            >
              Adicionar Evento
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-[#f6f6f6] text-[#cc6237]">
                <th className="py-3 px-4 text-left font-bold">
                  Nome do evento
                </th>
                <th className="py-3 px-4 text-left font-bold">
                  Total de equipes
                </th>
                <th className="py-3 px-4 text-left font-bold">Status</th>
                <th className="py-3 px-4 text-left font-bold">Data</th>
              </tr>
            </thead>
            <tbody>
              {eventosPaginados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    Nenhum evento encontrado
                  </td>
                </tr>
              ) : (
                eventosPaginados.map((evento) => (
                  <tr
                    key={evento.id}
                    className="hover:bg-[#f9fbff] transition-colors"
                  >
                    <td className="py-3 px-4">{evento.nome}</td>
                    <td className="py-3 px-4">{evento.totalEquipes}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          evento.status === "Ativo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {evento.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{formatDate(evento.data)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className={`px-4 py-2 rounded-full font-semibold ${
              pagina === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#cc6237] text-white hover:bg-[#b0552f] transition-colors"
            }`}
          >
            Anterior
          </button>
          <span className="text-[#cc6237] font-semibold">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas || totalPaginas === 0}
            className={`px-4 py-2 rounded-full font-semibold ${
              pagina === totalPaginas || totalPaginas === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#cc6237] text-white hover:bg-[#b0552f] transition-colors"
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
