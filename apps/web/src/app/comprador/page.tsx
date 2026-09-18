"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { BuyerHeader } from "@/components/buyer/buyer-header";
import { BuyerHero } from "@/components/buyer/buyer-hero";
import { CartDrawer } from "@/components/buyer/cart-drawer";
import { CategoryFilters } from "@/components/buyer/category-filters";
import { ProductCard } from "@/components/buyer/product-card";
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
      <footer className="mt-16 border-t border-stone-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-[#C85A32] text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 2a6 6 0 0 0-6 6c0 4 6 14 6 14s6-10 6-14a6 6 0 0 0-6-6z" />
                <circle cx="12" cy="8" r="2" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#2C221E] block leading-none">
                MANUALI
              </span>
              <span className="text-[8px] uppercase font-bold tracking-widest text-[#C85A32] block">
                Mãos Pernambucanas
              </span>
            </div>
          </div>

          <p className="text-xs text-[#6E6259]">
            © 2026 Mãos Pernambucanas. Todos os direitos reservados. Fomento da cultura pernambucana.
          </p>

          <div className="flex items-center gap-4 text-stone-500">
            {/* Instagram Icon */}
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#C85A32] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            {/* YouTube Icon */}
            <a href="#youtube" aria-label="YouTube" className="hover:text-[#C85A32] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </a>
            {/* Facebook Icon */}
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#C85A32] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
