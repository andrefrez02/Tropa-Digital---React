"use client";
import { eventosMock } from "../Components/eventos";
import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function getStatusStats(eventos: typeof eventosMock) {
  return eventos.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getEquipesStats(eventos: typeof eventosMock) {
  return eventos.map((e) => ({
    nome: e.nome,
    totalEquipes: e.totalEquipes,
  }));
}

export default function Dashboard() {
  const totalEventos = eventosMock.length;
  const totalEquipes = eventosMock.reduce(
    (acc, curr) => acc + curr.totalEquipes,
    0
  );
  const statusStats = getStatusStats(eventosMock);
  const equipesStats = getEquipesStats(eventosMock);

  const pieData = [
    { name: "Ativos", value: statusStats["Ativo"] || 0 },
    { name: "Encerrados", value: statusStats["Encerrado"] || 0 },
  ];
  const pieColors = ["#cc6237", "#64748b"];

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-start bg-[#f9fbff] p-8">
      <div
        className="bg-white rounded-[30px] w-auto shadow-lg w-full max-w-4xl p-8 mt-8 flex flex-col gap-6"
        style={{
          minWidth: "-webkit-fill-available",
        }}
      >
        <h1 className="text-3xl font-bold text-[#cc6237] mb-4">Dashboard</h1>

        <div
          className="grid grid-cols-2 gap-6 mb-8"
          style={{ gridTemplateColumns: "1fr 0.5fr" }}
        >
          <div>
            <h2 className="text-xl font-semibold text-[#cc6237] mb-2">
              Eventos por status
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-evenly">
            <div className="bg-[#f6f6f6] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-[#cc6237]">
                {totalEventos}
              </span>
              <span className="text-[#657593]">Eventos cadastrados</span>
            </div>
            <div className="bg-[#f6f6f6] rounded-xl p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-[#cc6237]">
                {totalEquipes}
              </span>
              <span className="text-[#657593]">Equipes totais</span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#cc6237] mb-2">
            Equipes por evento
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={equipesStats}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="totalEquipes" fill="#cc6237" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
