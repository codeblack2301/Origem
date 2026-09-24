"use client";

import { AlertTriangle, Minus, Plus, PackageX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSessaoArtesao } from "@/components/artisan/artisan-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fakeApiService } from "@/lib/fake-api";
import { formatBRL } from "@/lib/money";
import {
  obterClassesBadgeStatusEstoque,
  obterRotuloStatusEstoque,
  obterStatusEstoque,
  StatusEstoqueProduto,
} from "@/lib/status-produto";
import { ItemCatalogoProduto } from "@/lib/types";

type FiltroEstoque = "todos" | StatusEstoqueProduto;

export default function PaginaEstoqueArtesao() {
  const artesaoLogado = useSessaoArtesao();
  const [produtosAtelie, setProdutosAtelie] = useState<ItemCatalogoProduto[]>([]);
  const [filtroEstoque, setFiltroEstoque] = useState<FiltroEstoque>("todos");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let montado = true;

    async function buscarProdutos() {
      const listaProdutos = await fakeApiService.listarProdutosDoArtesao(
        artesaoLogado.identificadorArtesao || "artesao-1"
      );
      if (montado) {
        setProdutosAtelie(listaProdutos);
        setCarregando(false);
      }
    }

    buscarProdutos();

    return () => {
      montado = false;
    };
  }, [artesaoLogado]);

  const produtosFiltrados =
    filtroEstoque === "todos"
      ? produtosAtelie
      : produtosAtelie.filter(
          (produtoItem) => obterStatusEstoque(produtoItem.estoqueDisponivel) === filtroEstoque
        );

  const filtrosDisponiveis: { valor: FiltroEstoque; rotulo: string }[] = [
    { valor: "todos", rotulo: `Todos (${produtosAtelie.length})` },
    { valor: "disponivel", rotulo: "Disponíveis" },
    { valor: "baixo", rotulo: "Estoque baixo" },
    { valor: "esgotado", rotulo: "Esgotados" },
  ];

  const processarAlteracaoEstoque = async (
    identificadorProduto: string,
    variacaoQuantidade: number
  ) => {
    const produtoAtual = produtosAtelie.find(
      (produtoItem) => produtoItem.identificadorProduto === identificadorProduto
    );
    if (!produtoAtual) return;

    const novoEstoque = Math.max(0, produtoAtual.estoqueDisponivel + variacaoQuantidade);
    try {
      await fakeApiService.atualizarEstoqueProduto(identificadorProduto, novoEstoque);
      setProdutosAtelie((produtosAtuais) =>
        produtosAtuais.map((produtoItem) =>
          produtoItem.identificadorProduto === identificadorProduto
            ? { ...produtoItem, estoqueDisponivel: novoEstoque }
            : produtoItem
        )
      );
      toast.success(`Estoque de "${produtoAtual.tituloProduto}" atualizado para ${novoEstoque}.`);
    } catch {
      toast.error("Erro ao atualizar estoque.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Estoque</h1>
          <p className="text-sm text-[#6E6259]">
            Controle a quantidade disponível de cada peça para a vitrine.
          </p>
        </div>
      </div>

      {/* Filtros por status de estoque */}
      <div className="flex flex-wrap gap-2">
        {filtrosDisponiveis.map((filtroItem) => (
          <button
            key={filtroItem.valor}
            type="button"
            onClick={() => setFiltroEstoque(filtroItem.valor)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filtroEstoque === filtroItem.valor
                ? "bg-[#2C221E] text-white"
                : "border border-stone-200 bg-white text-[#6E6259] hover:border-[#C85A32] hover:text-[#C85A32]"
            }`}
          >
            {filtroItem.rotulo}
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="space-y-3">
          {[1, 2, 3].map((indice) => (
            <div key={indice} className="h-20 animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <PackageX className="mx-auto size-8 text-stone-300" />
          <p className="mt-3 text-base font-semibold text-[#2C221E]">
            Nenhuma peça neste status.
          </p>
          <Button asChild className="mt-4 rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]">
            <Link href="/artesao/produtos/novo">Cadastrar Nova Peça</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="hidden grid-cols-12 gap-4 border-b border-stone-100 bg-stone-50 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 sm:grid">
            <span className="col-span-5">Peça</span>
            <span className="col-span-2">Preço</span>
            <span className="col-span-2">Estoque</span>
            <span className="col-span-3 text-right">Status</span>
          </div>

          <div className="divide-y divide-stone-100">
            {produtosFiltrados.map((produtoItem) => {
              const statusEstoque = obterStatusEstoque(produtoItem.estoqueDisponivel);
              return (
                <div
                  key={produtoItem.identificadorProduto}
                  className="grid grid-cols-12 items-center gap-4 px-4 py-4"
                >
                  <div className="col-span-12 flex items-center gap-3 sm:col-span-5">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                      <Image
                        src={produtoItem.urlImagem}
                        alt={produtoItem.tituloProduto}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-sm font-bold text-[#2C221E]">
                        {produtoItem.tituloProduto}
                      </h3>
                      <p className="truncate text-xs text-[#6E6259]">{produtoItem.nomeCategoria}</p>
                    </div>
                  </div>

                  <span className="col-span-4 text-sm font-bold text-[#2C221E] sm:col-span-2">
                    {formatBRL(produtoItem.precoEmCentavos)}
                  </span>

                  {/* Stepper de quantidade */}
                  <div className="col-span-4 flex items-center gap-1 sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => processarAlteracaoEstoque(produtoItem.identificadorProduto, -1)}
                      disabled={produtoItem.estoqueDisponivel === 0}
                      className="flex size-8 items-center justify-center rounded-lg border border-stone-200 text-[#2C221E] transition-colors hover:border-[#C85A32] hover:text-[#C85A32] disabled:opacity-40"
                      aria-label="Diminuir estoque"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={produtoItem.estoqueDisponivel}
                      readOnly
                      className="h-8 w-12 rounded-lg border border-stone-200 bg-stone-50 text-center text-sm font-bold text-[#2C221E]"
                    />
                    <button
                      type="button"
                      onClick={() => processarAlteracaoEstoque(produtoItem.identificadorProduto, 1)}
                      className="flex size-8 items-center justify-center rounded-lg border border-stone-200 text-[#2C221E] transition-colors hover:border-[#C85A32] hover:text-[#C85A32]"
                      aria-label="Aumentar estoque"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  <div className="col-span-4 flex justify-end sm:col-span-3">
                    <Badge
                      className={`uppercase text-[10px] ${obterClassesBadgeStatusEstoque(statusEstoque)}`}
                    >
                      {statusEstoque === "baixo" && <AlertTriangle className="size-3" />}
                      {obterRotuloStatusEstoque(statusEstoque)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}