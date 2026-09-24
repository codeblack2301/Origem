"use client";

import { ArrowRight, DollarSign, FlaskConical, ShoppingBag, Sparkles, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GraficoLinha, GraficoRosca } from "@/components/admin/charts";
import { MetricCard } from "@/components/admin/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DATA_PAINEL_ADMIN,
  MAIS_VENDIDOS_ADMIN,
  METRICAS_GERAIS_ADMIN,
  SERIE_VENDAS_ANDAMENTO,
  STATUS_PEDIDOS_ADMIN,
} from "@/lib/admin-data";
import { formatBRL } from "@/lib/money";

export default function PaginaInicioAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">
            Visão geral
          </h1>
          <p className="text-sm text-[#6E6259]">Atualizado em {DATA_PAINEL_ADMIN}</p>
        </div>
        <Badge className="w-fit bg-[#FAF0EC] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C85A32] border border-[#C85A32]/20">
          <FlaskConical className="mr-1 size-3" /> Dados sintéticos de demonstração
        </Badge>
      </div>

      {/* Indicadores principais */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          rotulo="Total em vendas"
          valorFormatado={formatBRL(METRICAS_GERAIS_ADMIN.totalVendasCentavos)}
          variacao={METRICAS_GERAIS_ADMIN.variacaoVendas}
          icone={DollarSign}
          classesCorIcone="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          rotulo="Pedidos do período"
          valorFormatado={String(METRICAS_GERAIS_ADMIN.totalPedidos)}
          variacao={METRICAS_GERAIS_ADMIN.variacaoPedidos}
          icone={ShoppingBag}
          classesCorIcone="bg-blue-50 text-blue-600"
        />
        <MetricCard
          rotulo="Usuários na plataforma"
          valorFormatado={String(METRICAS_GERAIS_ADMIN.totalUsuarios)}
          variacao="+11%"
          icone={Users}
          classesCorIcone="bg-purple-50 text-purple-600"
        />
        <MetricCard
          rotulo="Produtos ativos"
          valorFormatado={String(METRICAS_GERAIS_ADMIN.produtosAtivos)}
          variacao={METRICAS_GERAIS_ADMIN.variacaoProdutos}
          icone={Sparkles}
          classesCorIcone="bg-amber-50 text-amber-600"
        />
      </section>

      {/* Gráficos */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">
                Vendas em andamento
              </h2>
              <p className="text-xs text-[#6E6259]">Últimos 30 dias (valores em R$ mil)</p>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-[#C85A32] hover:bg-[#FAF0EC]"
            >
              <Link href="/admin/vendas">
                Ver vendas <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="mt-4">
            <GraficoLinha dados={SERIE_VENDAS_ANDAMENTO} identificadorId="vendas-andamento" />
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-[#2C221E]">Status dos pedidos</h2>
          <p className="text-xs text-[#6E6259]">Distribuição do período atual</p>
          <div className="mt-4">
            <GraficoRosca segmentos={STATUS_PEDIDOS_ADMIN} rotuloCentral="pedidos" />
          </div>
        </div>
      </section>

      {/* Mais vendidos */}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 p-5">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#2C221E]">Mais vendidos</h2>
            <p className="text-xs text-[#6E6259]">Peças com maior volume no período</p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-[#C85A32] hover:bg-[#FAF0EC]"
          >
            <Link href="/admin/relatorios?aba=produtos">
              Ver relatório <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>
        <div className="divide-y divide-stone-100">
          {MAIS_VENDIDOS_ADMIN.map((produtoVendido) => (
            <div
              key={produtoVendido.posicao}
              className="flex items-center gap-4 p-4 sm:py-3"
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  produtoVendido.posicao === 1
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {produtoVendido.posicao}º
              </span>
              <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                <Image
                  src={produtoVendido.urlImagem}
                  alt={produtoVendido.tituloProduto}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#2C221E]">
                  {produtoVendido.tituloProduto}
                </p>
                <p className="text-xs text-[#6E6259]">{produtoVendido.nomeCategoria}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#2C221E]">
                  {produtoVendido.unidadesVendidas} un.
                </p>
                <p className="flex items-center justify-end gap-1 text-xs text-emerald-600">
                  <TrendingUp className="size-3" /> vendidos
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}