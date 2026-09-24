"use client";

import { Award, ChevronRight, Minus, Plus, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import { BuyerHeader } from "@/components/buyer/buyer-header";
import { CartDrawer } from "@/components/buyer/cart-drawer";
import { SiteFooter } from "@/components/shared/site-footer";
import { Button } from "@/components/ui/button";
import { fakeApiService, obterSessaoUsuarioLogado } from "@/lib/fake-api";
import { formatBRL } from "@/lib/money";
import { CarrinhoCompraCliente, ItemCatalogoProduto, PerfilUsuarioAutenticado } from "@/lib/types";

export default function PaginaDetalheProduto() {
  const parametrosRota = useParams<{ produtoId: string }>();
  const [produto, setProduto] = useState<ItemCatalogoProduto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemAtivaIndex, setImagemAtivaIndex] = useState(0);
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(1);
  const [carrinho, setCarrinho] = useState<CarrinhoCompraCliente | null>(null);
  const [gavetaCarrinhoAberta, setGavetaCarrinhoAberta] = useState(false);
  const [perfilUsuario, setPerfilUsuario] = useState<PerfilUsuarioAutenticado | null>(null);

  useEffect(() => {
    let montado = true;

    async function buscarDadosProduto() {
      const perfilAtual = obterSessaoUsuarioLogado();
      const produtoEncontrado = await fakeApiService.obterProdutoPorId(
        parametrosRota.produtoId
      );
      const dadosCarrinho = await fakeApiService.obterCarrinho();

      if (montado) {
        setPerfilUsuario(perfilAtual);
        setProduto(produtoEncontrado);
        setCarrinho(dadosCarrinho);
        setCarregando(false);
      }
    }

    buscarDadosProduto();

    return () => {
      montado = false;
    };
  }, [parametrosRota.produtoId]);

  const atualizarCarrinho = async () => {
    const dadosCarrinho = await fakeApiService.obterCarrinho();
    setCarrinho(dadosCarrinho);
  };

  const processarCompraAgora = async () => {
    if (!produto) return;
    const carrinhoAtualizado = await fakeApiService.adicionarAoCarrinho(
      produto,
      quantidadeDesejada
    );
    setCarrinho(carrinhoAtualizado);
    toast.success(`"${produto.tituloProduto}" foi adicionado ao seu carrinho!`);
    setGavetaCarrinhoAberta(true);
  };

  const galeriaImagens = produto
    ? produto.urlImagensGaleria && produto.urlImagensGaleria.length > 0
      ? produto.urlImagensGaleria
      : [produto.urlImagem]
    : [];

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="h-16 animate-pulse bg-stone-200/60" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-3xl bg-stone-200/60" />
          <div className="space-y-4">
            <div className="h-4 w-32 animate-pulse rounded bg-stone-200/60" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-stone-200/60" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-stone-200/60" />
            <div className="h-16 w-40 animate-pulse rounded bg-stone-200/60" />
          </div>
        </div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
          <p className="font-serif text-2xl font-bold text-[#2C221E]">
            Peça não encontrada
          </p>
          <p className="text-sm text-[#6E6259]">
            O produto pode ter sido removido do catálogo.
          </p>
          <Button asChild className="rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]">
            <Link href="/comprador">Voltar ao catálogo</Link>
          </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2] text-[#2C221E]">
      <Toaster position="top-right" richColors />

      <BuyerHeader
        quantidadeItensCarrinho={carrinho?.quantidadeTotalItens || 0}
        termoBusca=""
        aoAlterarTermoBusca={() => {}}
        aoAbrirCarrinho={() => setGavetaCarrinhoAberta(true)}
        perfilUsuario={perfilUsuario}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#6E6259]" aria-label="Trilha de navegação">
          <Link href="/comprador" className="hover:text-[#C85A32] transition-colors">
            Início
          </Link>
          <ChevronRight className="size-3" />
          <span>{produto.nomeCategoria}</span>
          <ChevronRight className="size-3" />
          <span className="font-semibold text-[#2C221E]">{produto.tituloProduto}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Galeria de Imagens */}
          <section>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
              <Image
                src={galeriaImagens[imagemAtivaIndex]}
                alt={produto.tituloProduto}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {galeriaImagens.length > 1 && (
              <div className="mt-3 flex gap-3">
                {galeriaImagens.map((urlImagemGaleria, indice) => (
                  <button
                    key={`${urlImagemGaleria}-${indice}`}
                    type="button"
                    onClick={() => setImagemAtivaIndex(indice)}
                    className={`relative size-20 overflow-hidden rounded-xl border-2 transition-all ${
                      indice === imagemAtivaIndex
                        ? "border-[#C85A32]"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Ver imagem ${indice + 1}`}
                  >
                    <Image
                      src={urlImagemGaleria}
                      alt={`${produto.tituloProduto} - imagem ${indice + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Informações da Peça */}
          <section className="flex flex-col">
            <span className="w-fit rounded-full bg-[#FAF0EC] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
              {produto.nomeCategoria}
            </span>

            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {produto.tituloProduto}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#6E6259]">
              <Award className="size-4 text-[#C85A32]" />
              <span className="font-medium">{produto.nomeArtesao}</span>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, indice) => (
                  <Star
                    key={indice}
                    className={`size-4 ${
                      indice < Math.round(produto.notaAvaliacaoMedia)
                        ? "fill-amber-500"
                        : "text-stone-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#2C221E]">
                {produto.notaAvaliacaoMedia.toFixed(1)}
              </span>
              <span className="text-xs text-[#6E6259]">
                ({produto.totalAvaliacoes} avaliações)
              </span>
            </div>

            <div className="mt-5 border-t border-stone-200 pt-5">
              <span className="font-serif text-4xl font-bold text-[#C85A32]">
                {formatBRL(produto.precoEmCentavos)}
              </span>
              <p className="mt-1 text-xs text-[#6E6259]">
                Pagamento simulado: Pix, cartão de crédito ou boleto à vista.
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[#2C221E]/80">
              {produto.descricaoCompleta}
            </p>

            {/* Quantidade + Compra */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-xl border border-stone-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantidadeDesejada((quantidadeAtual) => Math.max(1, quantidadeAtual - 1))}
                  className="flex size-11 items-center justify-center text-[#2C221E] hover:text-[#C85A32] transition-colors"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold">{quantidadeDesejada}</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantidadeDesejada((quantidadeAtual) =>
                      Math.min(produto.estoqueDisponivel, quantidadeAtual + 1)
                    )
                  }
                  className="flex size-11 items-center justify-center text-[#2C221E] hover:text-[#C85A32] transition-colors"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                type="button"
                onClick={processarCompraAgora}
                disabled={produto.estoqueDisponivel === 0}
                className="h-11 flex-1 rounded-xl bg-[#C85A32] px-6 text-sm font-bold text-white shadow-lg shadow-[#C85A32]/30 hover:bg-[#B24D28]"
              >
                <ShoppingCart className="mr-2 size-4" />
                Comprar agora
              </Button>
            </div>

            <p className="mt-2 text-xs text-[#6E6259]">
              {produto.estoqueDisponivel > 0
                ? `${produto.estoqueDisponivel} disponíveis em estoque`
                : "Peça esgotada no momento"}
            </p>

            {/* Selos de confiança */}
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs text-[#6E6259]">
                <Truck className="size-5 text-[#C85A32] shrink-0" />
                <span>Envio para todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6E6259]">
                <ShieldCheck className="size-5 text-[#C85A32] shrink-0" />
                <span>Garantia de autenticidade</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6E6259]">
                <Award className="size-5 text-[#C85A32] shrink-0" />
                <span>Feita 100% à mão</span>
              </div>
            </div>
          </section>
        </div>

        {/* História da Peça */}
        {produto.historiaPeca && (
          <section className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-[#2C221E]">
              História da Peça
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#2C221E]/80">
              {produto.historiaPeca}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#6E6259]">
              <Award className="size-4 text-[#C85A32]" />
              <span>
                Autoria: <strong className="text-[#2C221E]">{produto.nomeArtesao}</strong> · Técnica preservada da tradição pernambucana
              </span>
            </div>
          </section>
        )}
      </main>

      <CartDrawer
        aberto={gavetaCarrinhoAberta}
        aoFechar={() => setGavetaCarrinhoAberta(false)}
        carrinho={carrinho}
        aoAtualizarCarrinho={atualizarCarrinho}
      />

      <SiteFooter />
    </div>
  );
}