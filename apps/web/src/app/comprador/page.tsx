"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { BuyerHeader } from "@/components/buyer/buyer-header";
import { BuyerHero } from "@/components/buyer/buyer-hero";
import { CartDrawer } from "@/components/buyer/cart-drawer";
import { CategoryFilters } from "@/components/buyer/category-filters";
import { ProductCard } from "@/components/buyer/product-card";
import { SiteFooter } from "@/components/shared/site-footer";
import { fakeApiService, obterSessaoUsuarioLogado } from "@/lib/fake-api";
import {
  CarrinhoCompraCliente,
  CategoriaArtesanato,
  ItemCatalogoProduto,
  PerfilUsuarioAutenticado,
} from "@/lib/types";

export default function PaginaHomeComprador() {
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuarioAutenticado | null>(null);
  const [categorias, setCategorias] = useState<CategoriaArtesanato[]>([]);
  const [produtos, setProdutos] = useState<ItemCatalogoProduto[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoCompraCliente | null>(null);

  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState<string>("todos");
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [gavetaCarrinhoAberta, setGavetaCarrinhoAberta] = useState<boolean>(false);
  const [carregandoDados, setCarregandoDados] = useState<boolean>(true);

  // Carrega os dados de forma assíncrona evitando renderizações em cascata
  useEffect(() => {
    let montado = true;

    async function buscarDadosAsync() {
      const usuarioLogado = obterSessaoUsuarioLogado();
      const listaCategorias = await fakeApiService.listarCategorias();
      const dadosCarrinho = await fakeApiService.obterCarrinho();
      const listaProdutos = await fakeApiService.listarProdutos(
        categoriaSelecionadaId,
        termoBusca
      );

      if (montado) {
        setPerfilUsuario(usuarioLogado);
        setCategorias(listaCategorias);
        setCarrinho(dadosCarrinho);
        setProdutos(listaProdutos);
        setCarregandoDados(false);
      }
    }

    buscarDadosAsync();

    return () => {
      montado = false;
    };
  }, [categoriaSelecionadaId, termoBusca]);

  const processarAdicaoAoCarrinho = async (produto: ItemCatalogoProduto) => {
    const carrinhoAtualizado = await fakeApiService.adicionarAoCarrinho(produto, 1);
    setCarrinho(carrinhoAtualizado);
  };

  const atualizarCarrinho = async () => {
    const dadosCarrinho = await fakeApiService.obterCarrinho();
    setCarrinho(dadosCarrinho);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C221E]">
      <Toaster position="top-right" richColors />

      {/* Header Fiel ao Figma (Logo, Busca, Links, Carrinho, Avatar) */}
      <BuyerHeader
        quantidadeItensCarrinho={carrinho?.quantidadeTotalItens || 0}
        termoBusca={termoBusca}
        aoAlterarTermoBusca={(novoTermo) => setTermoBusca(novoTermo)}
        aoAbrirCarrinho={() => setGavetaCarrinhoAberta(true)}
        perfilUsuario={perfilUsuario}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-8">
        {/* Barra de Filtros por Categoria (Pills Scrolláveis) */}
        <CategoryFilters
          categorias={categorias}
          categoriaSelecionadaId={categoriaSelecionadaId}
          aoSelecionarCategoria={(categoriaId) => setCategoriaSelecionadaId(categoriaId)}
        />

        {/* Hero Banner em Destaque Fiel à Imagem 3 do Figma */}
        <BuyerHero />

        {/* Seção Obras em Destaque */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200/60 pb-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2C221E]">
                Obras em Destaque
              </h2>
              <p className="text-xs sm:text-sm text-[#6E6259] mt-1 font-light">
                Peças autênticas e produzidas à mão no agreste e zona da mata.
              </p>
            </div>

            <a
              href="#acervo"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C85A32] hover:underline shrink-0"
            >
              Ver todo o acervo <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Grade de Produtos (3 Colunas no Desktop - Figma) */}
          {carregandoDados ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-80 w-full animate-pulse rounded-2xl bg-stone-200/60"
                />
              ))}
            </div>
          ) : produtos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <p className="text-base font-semibold text-[#2C221E]">
                Nenhuma peça encontrada para sua busca.
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Tente selecionar outra categoria ou buscar por termos mais genéricos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {produtos.map((produtoItem) => (
                <ProductCard
                  key={produtoItem.identificadorProduto}
                  produto={produtoItem}
                  aoAdicionarAoCarrinho={processarAdicaoAoCarrinho}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Gaveta de Carrinho */}
      <CartDrawer
        aberto={gavetaCarrinhoAberta}
        aoFechar={() => setGavetaCarrinhoAberta(false)}
        carrinho={carrinho}
        aoAtualizarCarrinho={atualizarCarrinho}
      />

      {/* Rodapé Fiel à Imagem 3 do Figma */}
      <SiteFooter />
    </div>
  );
}
