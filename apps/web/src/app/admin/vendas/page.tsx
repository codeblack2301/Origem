"use client";

import { CalendarRange, DollarSign, FlaskConical, Receipt, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { GraficoLinha } from "@/components/admin/charts";
import { MetricCard } from "@/components/admin/metric-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PERIODOS_VENDAS } from "@/lib/admin-data";
import { formatBRL } from "@/lib/money";

export default function PaginaVendasAdmin() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("30");
  const periodoAtual = PERIODOS_VENDAS[periodoSelecionado];

  const periodosDisponiveis = [
    { valor: "7", rotulo: "7 dias" },
    { valor: "30", rotulo: "30 dias" },
    { valor: "90", rotulo: "90 dias" },
    { valor: "custom", rotulo: "Personalizado" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Vendas</h1>
          <p className="text-sm text-[#6E6259]">
            Desempenho comercial da plataforma no período selecionado.
          </p>
        </div>
        <Badge className="w-fit bg-[#FAF0EC] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C85A32] border border-[#C85A32]/20">
          <FlaskConical className="mr-1 size-3" /> Pagamentos 100% simulados
        </Badge>
      </div>

      {/* Seletor de período */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1 rounded-xl border border-stone-200 bg-white p-1">
          {periodosDisponiveis.map((periodoItem) => (
            <button
              key={periodoItem.valor}
              type="button"
              onClick={() => setPeriodoSelecionado(periodoItem.valor)}
              className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-colors ${
                periodoSelecionado === periodoItem.valor
                  ? "bg-[#2C221E] text-white"
                  : "text-[#6E6259] hover:text-[#C85A32]"
              }`}
            >
              {periodoItem.rotulo}
            </button>
          ))}
        </div>

        {periodoSelecionado === "custom" && (
          <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-3 py-1.5">
            <CalendarRange className="size-4 text-[#C85A32]" />
            <Input
              type="date"
              defaultValue="2025-04-12"
              className="h-7 w-36 rounded-md border-stone-200 text-xs"
              aria-label="Data inicial"
            />
            <span className="text-xs text-[#6E6259]">até</span>
            <Input
              type="date"
              defaultValue="2025-05-12"
              className="h-7 w-36 rounded-md border-stone-200 text-xs"
              aria-label="Data final"
            />
          </div>
        )}

        <span className="text-xs text-[#6E6259]">{periodoAtual.intervaloDatas}</span>
      </div>

      {/* Indicadores do período */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          rotulo="GMV (valor bruto)"
          valorFormatado={formatBRL(periodoAtual.gmvCentavos)}
          variacao={periodoAtual.variacaoGmv}
          icone={DollarSign}
          classesCorIcone="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          rotulo="Pedidos finalizados"
          valorFormatado={String(periodoAtual.pedidosFinalizados)}
          variacao={periodoAtual.variacaoPedidos}
          icone={ShoppingBag}
          classesCorIcone="bg-blue-50 text-blue-600"
        />
        <MetricCard
          rotulo="Ticket médio"
          valorFormatado={formatBRL(periodoAtual.ticketMedioCentavos)}
          variacao={periodoAtual.variacaoTicket}
          icone={Receipt}
          classesCorIcone="bg-orange-50 text-orange-600"
        />
      </section>

      {/* Gráfico de evolução */}
      <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2C221E]">
              Evolução das vendas
            </h2>
            <p className="text-xs text-[#6E6259]">
              {periodoAtual.rotulo} • {periodoAtual.intervaloDatas}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <GraficoLinha
            dados={periodoAtual.serieGrafico}
            identificadorId={`vendas-periodo-${periodoSelecionado}`}
          />
        </div>
      </section>

      <p className="text-xs text-[#6E6259]">
        Os valores exibidos são gerados a partir de dados sintéticos e não correspondem a
        transações financeiras reais (ADR-002 • pagamento simulado).
      </p>
    </div>
  );
}