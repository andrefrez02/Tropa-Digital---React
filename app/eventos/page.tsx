"use client";
import React, { useState, useRef } from "react";
import { Evento, eventosMock } from "../Components/eventos";
import DataCell from "../Components/DataCell";
import AcoesDropdown from "../Components/AcoesDropdown";

const PAGE_SIZE = 9;

export default function Eventos() {
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const [eventos, setEventos] = useState<Evento[]>(eventosMock);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Evento>>({});
  const [dropdownId, setDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const eventosFiltrados = eventos.filter((e) =>
    e.nome.toLowerCase().includes(filtro.toLowerCase())
  );
  const totalPaginas = Math.ceil(eventosFiltrados.length / PAGE_SIZE);
  const eventosPaginados = eventosFiltrados.slice(
    (pagina - 1) * PAGE_SIZE,
    pagina * PAGE_SIZE
  );

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownId(null);
      }
    }
    if (dropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownId]);

  function adicionarEvento() {
    const novoId =
      eventos.length > 0 ? Math.max(...eventos.map((e) => e.id)) + 1 : 1;
    const hoje = new Date().toISOString().slice(0, 10);
    const novosEventos = [
      ...eventos,
      {
        id: novoId,
        nome: `Novo Evento ${novoId}`,
        totalEquipes: 0,
        status: "Ativo",
        dataInicial: new Date(hoje),
        dataFinal: new Date(hoje),
      },
    ];
    setEventos(novosEventos);
    setPagina(Math.ceil(novosEventos.length / PAGE_SIZE));
    setEditId(novoId);
    setEditData({
      nome: `Novo Evento ${novoId}`,
      totalEquipes: 0,
      status: "Ativo",
      dataInicial: new Date(hoje),
      dataFinal: new Date(hoje),
    });
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
        ev.id === editId
          ? {
              ...ev,
              ...editData,
              id: ev.id,
            }
          : ev
      )
    );
    setEditId(null);
    setEditData({});
  }

  function handleDeleteEvento(id: number) {
    setEventos((prev) => prev.filter((ev) => ev.id !== id));
    setEditId(null);
    setEditData({});
    setDropdownId(null);
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start bg-[#f9fbff] p-8">
      <div
        className="bg-white rounded-[30px] w-auto shadow-lg w-full max-w-4xl p-8 mt-8 flex flex-col gap-6"
        style={{ minWidth: "-webkit-fill-available" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-[#cc6237]">Eventos</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar eventos"
              value={filtro}
              onChange={(e) => {
                setFiltro(e.target.value);
                setPagina(1);
              }}
              className="px-4 py-2 rounded-full bg-[#f6f6f6] focus:outline-none focus:ring-2 focus:ring-[#cc6237] placeholder:text-[#d1d1d1] font-semibold"
            />
            <button
              onClick={adicionarEvento}
              className="px-6 py-2 rounded-full bg-[#cc6237] text-white font-semibold hover:bg-[#b0552f] transition-colors cursor-pointer"
            >
              <span>Inserir novo</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg h-[100%]">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="eventos-table__header">
              <tr className="bg-[#f6f6f6] text-[#cc6237] eventos-table__header-row">
                <th className="py-3 px-4 text-left font-bold">
                  Nome do evento
                </th>
                <th className="py-3 px-4 text-left font-bold">
                  Total de equipes
                </th>
                <th className="py-3 px-4 text-left font-bold">Status</th>
                <th className="py-3 px-4 text-left font-bold">Data</th>
                <th className="py-3 px-4 text-left font-bold">&nbsp;</th>
              </tr>
            </thead>
            <tbody className="eventos-table__body">
              {eventosPaginados.length === 0 ? (
                <tr className="eventos-table__body-row">
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    Nenhum evento encontrado
                  </td>
                </tr>
              ) : (
                eventosPaginados.map((evento) =>
                  editId === evento.id ? (
                    <tr
                      key={evento.id}
                      className="bg-[#f9fbff] eventos-table__body-row edicao"
                    >
                      <td className="py-3 px-4 w-fit flex">
                        <input
                          name="nome"
                          value={editData.nome}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        />
                      </td>
                      <td className="py-3 px-4 w-fit flex">
                        <input
                          name="totalEquipes"
                          type="number"
                          value={editData.totalEquipes}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border w-20"
                        />
                      </td>
                      <td className="py-3 px-4 w-fit flex">
                        <select
                          name="status"
                          value={editData.status}
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        >
                          <option value="Ativo">Ativo</option>
                          <option value="Inativo">Inativo</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 flex gap-2 w-fit flex">
                        <input
                          name="dataInicial"
                          type="date"
                          value={
                            editData.dataInicial
                              ? typeof editData.dataInicial === "string"
                                ? editData.dataInicial
                                : (editData.dataInicial as Date)
                                    .toISOString()
                                    .slice(0, 10)
                              : ""
                          }
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        />
                        <span className="mx-1">a</span>
                        <input
                          name="dataFinal"
                          type="date"
                          value={
                            editData.dataFinal
                              ? typeof editData.dataFinal === "string"
                                ? editData.dataFinal
                                : (editData.dataFinal as Date)
                                    .toISOString()
                                    .slice(0, 10)
                              : ""
                          }
                          onChange={handleEditChange}
                          className="px-2 py-1 rounded border"
                        />
                      </td>
                      <td className="py-3 px-4 flex gap-2 w-fit flex">
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600 cursor-pointer"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditData({});
                          }}
                          className="px-3 py-1 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={evento.id}
                      className="hover:bg-[#f9fbff] transition-colors eventos-table__body-row"
                    >
                      <td className="py-3 px-4 w-fit flex">{evento.nome}</td>
                      <td className="py-3 px-4 w-fit flex">
                        {evento.totalEquipes}
                      </td>
                      <td className="py-3 px-4 w-fit flex gap-2 items-center">
                        <span
                          className={`rounded-full text-[0px] h-[10px] w-[10px] ${
                            evento.status === "Ativo"
                              ? "bg-[#4cef00]"
                              : "bg-[#ff3b3b]"
                          }`}
                        >
                          &nbsp;
                        </span>
                        <span className="font-semibold text-[#657593]">
                          {evento.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 w-fit flex">
                        <DataCell
                          dataInicial={
                            evento.dataInicial instanceof Date
                              ? evento.dataInicial.toISOString().slice(0, 10)
                              : evento.dataInicial
                          }
                          dataFinal={
                            evento.dataFinal instanceof Date
                              ? evento.dataFinal.toISOString().slice(0, 10)
                              : evento.dataFinal
                          }
                        />
                      </td>
                      <td className="py-3 px-4 relative w-fit flex">
                        <AcoesDropdown
                          evento={evento}
                          onEdit={(e) => {
                            setEditId(e.id);
                            setEditData({ ...e });
                            setDropdownId(null);
                          }}
                          onDelete={handleDeleteEvento}
                          open={dropdownId}
                          setOpen={setDropdownId}
                          dropdownRef={dropdownRef}
                        />
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
