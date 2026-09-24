"use client";

import { Boxes, Percent, ShoppingBag, Star, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

import { GraficoBarras, GraficoLinha, GraficoRosca } from "@/components/admin/charts";
import { MetricCard } from "@/components/admin/metric-card";
import {
  CATEGORIAS_CONVERSAO_ADMIN,
  MAIS_VENDIDOS_ADMIN,
  METRICAS_ARTESAOS_ADMIN,
  METRICAS_CONSUMIDORES_ADMIN,
  METRICAS_GERAIS_ADMIN,
  PERFIL_CONSUMIDORES_ADMIN,
  SERIE_ARTESAOS_CADASTRADOS,
  SERIE_NOVOS_CADASTRADOS,
  STATUS_ARTESAOS_ADMIN,
} from "@/lib/admin-data";

const ABAS_RELATORIOS = [
  { valor: "produtos", rotulo: "Produtos" },
  { valor: "consumidores", rotulo: "Consumidores" },
  { valor: "artesaos", rotulo: "Artesãos" },
];

export default function PaginaRelatoriosAdmin({
  searchParams,
}: {
  searchParams: Promise<{ aba?: string }>;
}) {
  const parametrosBusca = use(searchParams);
  const abaSolicitada = parametrosBusca.aba ?? "produtos";
  const abaAtiva = ABAS_RELATORIOS.some((abaItem) => abaItem.valor === abaSolicitada)
    ? abaSolicitada
    : "produtos";

  const totalUnidadesMaisVendidos = MAIS_VENDIDOS_ADMIN.reduce(
    (acumulado, produtoItem) => acumulado + produtoItem.unidadesVendidas,
    0
  );
  const conversaoMediaCategorias = Math.round(
    CATEGORIAS_CONVERSAO_ADMIN.reduce(
      (acumulado, categoriaItem) => acumulado + categoriaItem.taxaConversao,
      0
    ) / CATEGORIAS_CONVERSAO_ADMIN.length
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Relatórios</h1>
        <p className="text-sm text-[#6E6259]">
          Acompanhe métricas por segmento da plataforma (dados sintéticos).
        </p>
      </div>

      {/* Abas */}
      <div className="flex flex-wrap gap-2">
        {ABAS_RELATORIOS.map((abaItem) => (
          <Link
            key={abaItem.valor}
            href={`/admin/relatorios?aba=${abaItem.valor}`}
            className={`rounded-full px-5 py-2 text-xs font-bold transition-colors ${
              abaAtiva === abaItem.valor
                ? "bg-[#2C221E] text-white shadow-md"
                : "border border-stone-200 bg-white text-[#6E6259] hover:border-[#C85A32] hover:text-[#C85A32]"
            }`}
          >
            {abaItem.rotulo}
          </Link>
        ))}
      </div>

      {/* Aba: Produtos */}
      {abaAtiva === "produtos" && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              rotulo="Produtos ativos"
              valorFormatado={String(METRICAS_GERAIS_ADMIN.produtosAtivos)}
              variacao={METRICAS_GERAIS_ADMIN.variacaoProdutos}
              icone={Boxes}
              classesCorIcone="bg-amber-50 text-amber-600"
            />
            <MetricCard
              rotulo="Unidades vendidas (top 5)"
              valorFormatado={String(totalUnidadesMaisVendidos)}
              icone={ShoppingBag}
              classesCorIcone="bg-blue-50 text-blue-600"
            />
            <MetricCard
              rotulo="Conversão média p/ categoria"
              valorFormatado={`${conversaoMediaCategorias}%`}
              icone={Percent}
              classesCorIcone="bg-purple-50 text-purple-600"
            />
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white shadow-xs xl:col-span-2">
              <div className="border-b border-stone-100 p-5">
                <h2 className="font-serif text-lg font-bold text-[#2C221E]">Mais vendidos</h2>
                <p className="text-xs text-[#6E6259]">Ranking de peças por volume vendido</p>
              </div>
              <div className="divide-y divide-stone-100">
                {MAIS_VENDIDOS_ADMIN.map((produtoVendido) => {
                  const proporcaoUnidades =
                    (produtoVendido.unidadesVendidas / totalUnidadesMaisVendidos) * 100;
                  return (
                    <div key={produtoVendido.posicao} className="flex items-center gap-4 p-4">
                      <span className="w-7 shrink-0 text-center text-xs font-bold text-stone-400">
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
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-[#2C221E]">
                            {produtoVendido.tituloProduto}
                          </p>
                          <p className="shrink-0 text-sm font-bold text-[#2C221E]">
                            {produtoVendido.unidadesVendidas} un.
                          </p>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full bg-[#C85A32]"
                            style={{ width: `${proporcaoUnidades}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">
                Conversão por categoria
              </h2>
              <p className="text-xs text-[#6E6259]">Taxa de conversão em percentual</p>
              <div className="mt-5">
                <GraficoBarras
                  itens={CATEGORIAS_CONVERSAO_ADMIN.map((categoriaItem) => ({
                    rotulo: categoriaItem.nomeCategoria,
                    valor: categoriaItem.taxaConversao,
                  }))}
                  sufixoValor="%"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Aba: Consumidores */}
      {abaAtiva === "consumidores" && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              rotulo="Novos cadastros no mês"
              valorFormatado={String(METRICAS_CONSUMIDORES_ADMIN.novosCadastrosMes)}
              variacao={METRICAS_CONSUMIDORES_ADMIN.variacaoCadastros}
              icone={UserPlus}
              classesCorIcone="bg-emerald-50 text-emerald-600"
            />
            <MetricCard
              rotulo="Taxa de recorrência"
              valorFormatado={METRICAS_CONSUMIDORES_ADMIN.taxaRecorrencia}
              variacao={METRICAS_CONSUMIDORES_ADMIN.variacaoRecorrencia}
              icone={Star}
              classesCorIcone="bg-amber-50 text-amber-600"
            />
            <MetricCard
              rotulo="Consumidores totais"
              valorFormatado={String(METRICAS_GERAIS_ADMIN.totalConsumidores)}
              icone={Users}
              classesCorIcone="bg-blue-50 text-blue-600"
            />
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs xl:col-span-2">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">Novos cadastros</h2>
              <p className="text-xs text-[#6E6259]">Evolução mensal de consumidores</p>
              <div className="mt-4">
                <GraficoLinha dados={SERIE_NOVOS_CADASTRADOS} cor="#16A34A" identificadorId="novos-cadastros" />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">Perfil dos consumidores</h2>
              <p className="text-xs text-[#6E6259]">Distribuição por atividade da conta</p>
              <div className="mt-4">
                <GraficoRosca segmentos={PERFIL_CONSUMIDORES_ADMIN} rotuloCentral="consumidores" />
              </div>
            </div>
          </section>
        </>
      )}

      {/* Aba: Artesãos */}
      {abaAtiva === "artesaos" && (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard
              rotulo="Total de artesãos"
              valorFormatado={String(METRICAS_ARTESAOS_ADMIN.totalArtesaos)}
              variacao={METRICAS_ARTESAOS_ADMIN.variacaoTotal}
              icone={Users}
              classesCorIcone="bg-purple-50 text-purple-600"
            />
            <MetricCard
              rotulo="Artesãos ativos"
              valorFormatado={String(METRICAS_ARTESAOS_ADMIN.ativos)}
              variacao={METRICAS_ARTESAOS_ADMIN.variacaoAtivos}
              icone={Star}
              classesCorIcone="bg-emerald-50 text-emerald-600"
            />
            <MetricCard
              rotulo="Em análise de curadoria"
              valorFormatado="12"
              icone={Boxes}
              classesCorIcone="bg-amber-50 text-amber-600"
            />
          </section>

          <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs xl:col-span-2">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">Cadastros de artesãos</h2>
              <p className="text-xs text-[#6E6259]">Crescimento do número de ateliês</p>
              <div className="mt-4">
                <GraficoLinha dados={SERIE_ARTESAOS_CADASTRADOS} cor="#7C3AED" identificadorId="artesaos-cadastrados" />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
              <h2 className="font-serif text-lg font-bold text-[#2C221E]">Status da curadoria</h2>
              <p className="text-xs text-[#6E6259]">Situação das contas de artesãos</p>
              <div className="mt-4">
                <GraficoRosca segmentos={STATUS_ARTESAOS_ADMIN} rotuloCentral="artesãos" />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}