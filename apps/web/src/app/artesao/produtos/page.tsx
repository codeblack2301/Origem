"use client";

import { Edit3, Pause, Play, Plus, Trash2 } from "lucide-react";
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
  obterClassesBadgeStatusPublicacao,
  obterRotuloStatusPublicacao,
  obterStatusPublicacao,
} from "@/lib/status-produto";
import { ItemCatalogoProduto, StatusPublicacaoProduto } from "@/lib/types";

type FiltroPublicacao = "todos" | StatusPublicacaoProduto;

export default function PaginaMeusProdutosArtesao() {
  const artesaoLogado = useSessaoArtesao();
  const [produtosAtelie, setProdutosAtelie] = useState<ItemCatalogoProduto[]>([]);
  const [filtroPublicacao, setFiltroPublicacao] = useState<FiltroPublicacao>("todos");
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
    filtroPublicacao === "todos"
      ? produtosAtelie
      : produtosAtelie.filter(
          (produtoItem) => obterStatusPublicacao(produtoItem) === filtroPublicacao
        );

  const filtrosDisponiveis: { valor: FiltroPublicacao; rotulo: string }[] = [
    { valor: "todos", rotulo: `Todos (${produtosAtelie.length})` },
    { valor: "ativo", rotulo: "Publicados" },
    { valor: "rascunho", rotulo: "Rascunhos" },
    { valor: "pausado", rotulo: "Pausados" },
  ];

  const processarExclusao = async (identificadorProduto: string) => {
    if (!confirm("Tem certeza que deseja remover esta peça do catálogo?")) return;
    await fakeApiService.removerProduto(identificadorProduto);
    toast.info("Peça removida do catálogo.");
    setProdutosAtelie(
      await fakeApiService.listarProdutosDoArtesao(
        artesaoLogado.identificadorArtesao || "artesao-1"
      )
    );
  };

  const processarTrocaPublicacao = async (
    produtoItem: ItemCatalogoProduto,
    novoStatus: StatusPublicacaoProduto
  ) => {
    await fakeApiService.atualizarProduto(produtoItem.identificadorProduto, {
      tituloProduto: produtoItem.tituloProduto,
      identificadorCategoria: produtoItem.identificadorCategoria,
      precoEmCentavos: produtoItem.precoEmCentavos,
      estoqueDisponivel: produtoItem.estoqueDisponivel,
      urlImagem: produtoItem.urlImagem,
      descricaoCompleta: produtoItem.descricaoCompleta,
      historiaPeca: produtoItem.historiaPeca,
      urlImagensGaleria: produtoItem.urlImagensGaleria,
      statusPublicacao: novoStatus,
    });
    toast.success(
      novoStatus === "ativo"
        ? `"${produtoItem.tituloProduto}" está publicado na vitrine.`
        : `"${produtoItem.tituloProduto}" foi pausado.`
    );
    setProdutosAtelie(
      await fakeApiService.listarProdutosDoArtesao(
        artesaoLogado.identificadorArtesao || "artesao-1"
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">
            Meus Produtos
          </h1>
          <p className="text-sm text-[#6E6259]">
            Gerencie o acervo do seu ateliê na vitrine Manuali.
          </p>
        </div>
        <Button
          asChild
          className="h-10 shrink-0 rounded-xl bg-[#C85A32] px-4 text-xs font-bold text-white shadow-md shadow-[#C85A32]/25 hover:bg-[#B24D28]"
        >
          <Link href="/artesao/produtos/novo">
            <Plus className="mr-1.5 size-4" /> Cadastrar Nova Peça
          </Link>
        </Button>
      </div>

      {/* Filtros por status de publicação */}
      <div className="flex flex-wrap gap-2">
        {filtrosDisponiveis.map((filtroItem) => (
          <button
            key={filtroItem.valor}
            type="button"
            onClick={() => setFiltroPublicacao(filtroItem.valor)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              filtroPublicacao === filtroItem.valor
                ? "bg-[#2C221E] text-white"
                : "border border-stone-200 bg-white text-[#6E6259] hover:border-[#C85A32] hover:text-[#C85A32]"
            }`}
          >
            {filtroItem.rotulo}
          </button>
        ))}
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((indice) => (
            <div key={indice} className="h-28 animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <p className="text-base font-semibold text-[#2C221E]">
            {produtosAtelie.length === 0
              ? "Nenhuma peça cadastrada ainda."
              : "Nenhuma peça neste status."}
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Cadastre sua primeira obra para começar a vender.
          </p>
          <Button
            asChild
            className="mt-4 rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]"
          >
            <Link href="/artesao/produtos/novo">
              <Plus className="mr-1.5 size-4" /> Cadastrar Primeira Peça
            </Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
          <div className="divide-y divide-stone-100">
            {produtosFiltrados.map((produtoItem) => {
              const statusPublicacao = obterStatusPublicacao(produtoItem);
              return (
                <div
                  key={produtoItem.identificadorProduto}
                  className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-1 items-center gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                      <Image
                        src={produtoItem.urlImagem}
                        alt={produtoItem.tituloProduto}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-base font-bold text-[#2C221E]">
                        {produtoItem.tituloProduto}
                      </h3>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-[#6E6259]">
                        <span>{produtoItem.nomeCategoria}</span>
                        <span>•</span>
                        <span className="font-bold text-[#C85A32]">
                          {formatBRL(produtoItem.precoEmCentavos)}
                        </span>
                        <span>•</span>
                        <span>Estoque: {produtoItem.estoqueDisponivel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <Badge
                      className={`uppercase text-[10px] ${obterClassesBadgeStatusPublicacao(statusPublicacao)}`}
                    >
                      {obterRotuloStatusPublicacao(statusPublicacao)}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold text-[#2C221E] hover:bg-[#FAF0EC]"
                      >
                        <Link
                          href={`/artesao/produtos/novo?editar=${produtoItem.identificadorProduto}`}
                        >
                          <Edit3 className="mr-1 size-3.5" /> Editar
                        </Link>
                      </Button>

                      {statusPublicacao === "ativo" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => processarTrocaPublicacao(produtoItem, "pausado")}
                          className="text-xs font-semibold text-[#6E6259] hover:bg-amber-50 hover:text-amber-700"
                        >
                          <Pause className="mr-1 size-3.5" /> Pausar
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => processarTrocaPublicacao(produtoItem, "ativo")}
                          className="text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                        >
                          <Play className="mr-1 size-3.5" /> Publicar
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => processarExclusao(produtoItem.identificadorProduto)}
                        className="text-xs font-semibold text-stone-400 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
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