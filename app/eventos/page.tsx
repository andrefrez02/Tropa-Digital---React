"use client";
import React, { useState } from "react";
import { Evento, eventosMock } from "../Components/eventos";

const PAGE_SIZE = 9;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

export default function Eventos() {
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [eventos, setEventos] = useState<Evento[]>(eventosMock);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Evento>>({});

  const eventosFiltrados = eventos.filter((e) =>
    e.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPaginas = Math.ceil(eventosFiltrados.length / PAGE_SIZE);
  const eventosPaginados = eventosFiltrados.slice(
    (pagina - 1) * PAGE_SIZE,
    pagina * PAGE_SIZE
  );

  const [novoEventoId, setNovoEventoId] = useState<number | null>(null);
  const novoEventoInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (novoEventoId !== null && novoEventoInputRef.current) {
      novoEventoInputRef.current.focus();
      setNovoEventoId(null);
    }
  }, [novoEventoId, eventosPaginados]);

  function adicionarEvento() {
    const novoId =
      eventos.length > 0 ? Math.max(...eventos.map((e) => e.id)) + 1 : 1;
    const novosEventos = [
      ...eventos,
      {
        id: novoId,
        nome: `Novo Evento ${novoId}`,
        totalEquipes: 0,
        status: "Ativo",
        data: new Date().toISOString().slice(0, 10),
      },
    ];
    setEventos(novosEventos);
    const novasPaginas = Math.ceil(
      novosEventos.filter((e) =>
        e.nome.toLowerCase().includes(filtro.toLowerCase())
      ).length / PAGE_SIZE
    );
    setPagina(novasPaginas);
    setEditId(novoId);
    setEditData({
      nome: `Novo Evento ${novoId}`,
      totalEquipes: 0,
      status: "Ativo",
      data: new Date().toISOString().slice(0, 10),
    });
    setNovoEventoId(novoId);
  }

  function handleFiltroChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFiltro(e.target.value);
    setPagina(1);
  }

  function handleEditClick(evento: Evento) {
    setEditId(evento.id);
    setEditData({ ...evento });
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "totalEquipes" ? Number(value) : value,
    }));
  }

  function handleSave() {
    setEventos((prev) =>
      prev.map((ev) =>
        ev.id === editId ? { ...ev, ...editData, id: ev.id } : ev
      )
    );
    setEditId(null);
    setEditData({});
  }

  function handleDelete() {
    setEventos((prev) => prev.filter((ev) => ev.id !== editId));
    setEditId(null);
    setEditData({});
  }

  function handleCancel() {
    setEditId(null);
    setEditData({});
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start bg-[#f9fbff] p-8">
      <div
        className="bg-white rounded-[30px] w-auto shadow-lg w-full max-w-4xl p-8 mt-8 flex flex-col gap-6"
        style={{
          minWidth: "-webkit-fill-available",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
              className="px-6 py-2 rounded-full bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors cursor-pointer"
            >
              Adicionar Evento
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg h-[100%]">
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
                <th className="py-3 px-4 text-left font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {eventosPaginados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum evento encontrado
                  </td>
                </tr>
              ) : (
                eventosPaginados.map((evento) =>
                  editId === evento.id ? (
                    <tr key={evento.id} className="bg-[#f9fbff]">
                      <td className="py-3 px-4">
                        <input
                          name="nome"
                          value={editData.nome}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          name="totalEquipes"
                          type="number"
                          value={editData.totalEquipes}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border w-20"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        >
                          <option value="Ativo">Ativo</option>
                          <option value="Inativo">Inativo</option>
                          <option value="Encerrado">Encerrado</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          name="data"
                          type="date"
                          value={editData.data}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        />
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600 cursor-pointer"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={handleDelete}
                          className="px-3 py-1 rounded bg-red-500 text-white font-semibold hover:bg-red-600 cursor-pointer"
                        >
                          Excluir
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ) : (
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
                              : evento.status === "Inativo"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {evento.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatDate(evento.data)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleEditClick(evento)}
                          className="px-3 py-1 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  )
                )
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
                : "bg-[#cc6237] text-white hover:bg-[#b0552f] transition-colors cursor-pointer"
            }`}
          >
            Anterior
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPaginas }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setPagina(idx + 1)}
                className={`px-3 py-1 rounded-full font-semibold ${
                  pagina === idx + 1
                    ? "bg-[#cc6237] text-white"
                    : "bg-gray-200 text-[#cc6237] hover:bg-[#f6e7e1] cursor-pointer"
                }`}
                disabled={pagina === idx + 1}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas || totalPaginas === 0}
            className={`px-4 py-2 rounded-full font-semibold ${
              pagina === totalPaginas || totalPaginas === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#cc6237] text-white hover:bg-[#b0552f] transition-colors cursor-pointer"
            }`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
