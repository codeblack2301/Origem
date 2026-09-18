"use client";

import {
  Award,
  CheckCircle,
  DollarSign,
  LogOut,
  Package,
  Plus,
  ShoppingBag,
  Star,
  Store,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AddProductModal } from "@/components/artisan/add-product-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fakeApiService } from "@/lib/fake-api";
import {
  CategoriaArtesanato,
  ItemCatalogoProduto,
  PedidoCliente,
  PerfilUsuarioAutenticado,
  StatusPedido,
} from "@/lib/types";

interface PropriedadesArtisanDashboard {
  artesaoLogado: PerfilUsuarioAutenticado;
}

export function ArtisanDashboard({
  artesaoLogado,
}: PropriedadesArtisanDashboard) {
  const router = useRouter();

  const [abaAtiva, setAbaAtiva] = useState<"pecas" | "pedidos">("pecas");
  const [produtosAtelie, setProdutosAtelie] = useState<ItemCatalogoProduto[]>([]);
  const [pedidosAtelie, setPedidosAtelie] = useState<PedidoCliente[]>([]);
  const [categorias, setCategorias] = useState<CategoriaArtesanato[]>([]);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);

  // Carrega os dados do ateliê de forma assíncrona sem setState síncrono no efeito
  useEffect(() => {
    let montado = true;

    async function buscarDadosDashboard() {
      const idArtesao = artesaoLogado.identificadorArtesao || "artesao-1";
      const listaProdutos = await fakeApiService.listarProdutos();
      const produtosFiltrados = listaProdutos.filter(
        (p) => p.identificadorArtesao === idArtesao
      );
      const listaPedidos = await fakeApiService.listarPedidosArtesao(idArtesao);
      const listaCategorias = await fakeApiService.listarCategorias();

      if (montado) {
        setProdutosAtelie(produtosFiltrados);
        setPedidosAtelie(listaPedidos);
        setCategorias(listaCategorias);
        setCarregandoDados(false);
      }
    }

    buscarDadosDashboard();

    return () => {
      montado = false;
    };
  }, [artesaoLogado]);

  const recarregarDados = async () => {
    const idArtesao = artesaoLogado.identificadorArtesao || "artesao-1";
    const listaProdutos = await fakeApiService.listarProdutos();
    setProdutosAtelie(
      listaProdutos.filter((p) => p.identificadorArtesao === idArtesao)
    );
    const listaPedidos = await fakeApiService.listarPedidosArtesao(idArtesao);
    setPedidosAtelie(listaPedidos);
  };

  const processarAtualizacaoEstoque = async (
    identificadorProduto: string,
    novoEstoque: number
  ) => {
    try {
      await fakeApiService.atualizarEstoqueProduto(
        identificadorProduto,
        novoEstoque
      );
      toast.success("Estoque atualizado!");
      recarregarDados();
    } catch (_erro) {
      toast.error("Erro ao atualizar estoque.");
    }
  };

  const processarExclusaoProduto = async (identificadorProduto: string) => {
    if (confirm("Tem certeza que deseja remover esta peça do catálogo?")) {
      await fakeApiService.removerProduto(identificadorProduto);
      toast.info("Peça removida do catálogo.");
      recarregarDados();
    }
  };

  const processarTrocaStatusPedido = async (
    identificadorPedido: string,
    novoStatus: StatusPedido
  ) => {
    try {
      await fakeApiService.atualizarStatusPedido(
        identificadorPedido,
        novoStatus
      );
      toast.success(`Status do pedido #${identificadorPedido} atualizado!`);
      recarregarDados();
    } catch (_erro) {
      toast.error("Erro ao alterar status do pedido.");
    }
  };

  const processarLogout = async () => {
    await fakeApiService.efetuarLogout();
    router.push("/login");
  };

  // Cálculo de KPIs acumulados
  const totalVendasEmCentavos = pedidosAtelie.reduce(
    (acumulado, pedido) => acumulado + pedido.valorTotalEmCentavos,
    0
  );

  const totalVendasFormatado = (totalVendasEmCentavos / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C221E]">
      {/* Topo / Header do Ateliê */}
      <header className="sticky top-0 z-30 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/artesao" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-md">
              <Store className="size-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-[#2C221E] block leading-none">
                MANUALI
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#C85A32] block mt-0.5">
                Painel do Artesão
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Status da Curadoria */}
            <Badge className="hidden sm:inline-flex bg-emerald-50 text-emerald-700 border-emerald-200">
              <CheckCircle className="mr-1 size-3 text-emerald-600" /> Curadoria: Aprovado
            </Badge>

            {/* Alternar Visão Comprador */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-stone-300 text-xs font-semibold"
            >
              <Link href="/comprador">Ver Vitrine de Compras</Link>
            </Button>

            <button
              type="button"
              onClick={processarLogout}
              className="text-stone-400 hover:text-red-600 transition-colors p-1"
              title="Sair"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-8">
        {/* Banner do Ateliê */}
        <section className="rounded-3xl bg-[#2C221E] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-1">
                <Award className="size-4" />
                {artesaoLogado.nomeAtelie || "Ateliê Vitalino (Alto do Moura)"}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-50">
                {artesaoLogado.nomeCompleto}
              </h1>
              <p className="mt-1 text-sm text-stone-300 max-w-2xl font-light">
                {artesaoLogado.biografiaAtelie ||
                  "Moldando a argila e perpetuando a identidade cultural do agreste pernambucano para o mundo."}
              </p>
            </div>

            <Button
              onClick={() => setModalNovoProdutoAberto(true)}
              className="h-11 rounded-xl bg-[#C85A32] px-5 text-xs font-bold text-white hover:bg-[#B24D28] shadow-lg shadow-[#C85A32]/30 shrink-0"
            >
              <Plus className="mr-1.5 size-4" /> Cadastrar Nova Peça
            </Button>
          </div>
        </section>

        {/* Indicadores / KPIs em Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-[#C85A32]">
              <DollarSign className="size-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#6E6259]">Total em Vendas</span>
              <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                {totalVendasFormatado}
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="size-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#6E6259]">Pedidos Recebidos</span>
              <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                {pedidosAtelie.length}
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Package className="size-6" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#6E6259]">Peças no Catálogo</span>
              <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                {produtosAtelie.length}
              </h3>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Star className="size-6 fill-purple-600" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#6E6259]">Avaliação do Ateliê</span>
              <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
                4.9 / 5.0
              </h3>
            </div>
          </div>
        </section>

        {/* Seleção de Abas (Peças vs Pedidos) */}
        <section className="space-y-6">
          <div className="flex border-b border-stone-200">
            <button
              type="button"
              onClick={() => setAbaAtiva("pecas")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 px-4 ${
                abaAtiva === "pecas"
                  ? "border-[#C85A32] text-[#C85A32]"
                  : "border-transparent text-stone-500 hover:text-[#2C221E]"
              }`}
            >
              Peças do Catálogo ({produtosAtelie.length})
            </button>
            <button
              type="button"
              onClick={() => setAbaAtiva("pedidos")}
              className={`pb-3 text-sm font-bold transition-all border-b-2 px-4 ${
                abaAtiva === "pedidos"
                  ? "border-[#C85A32] text-[#C85A32]"
                  : "border-transparent text-stone-500 hover:text-[#2C221E]"
              }`}
            >
              Pedidos Recebidos ({pedidosAtelie.length})
            </button>
          </div>

          {/* Conteúdo Aba Peças */}
          {abaAtiva === "pecas" && (
            <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
              <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                <h3 className="font-serif font-bold text-[#2C221E]">
                  Gestão de Acervo e Estoque
                </h3>
                <span className="text-xs text-stone-500">
                  Edite a quantidade disponível para sincronizar com a vitrine.
                </span>
              </div>

              {carregandoDados ? (
                <div className="p-8 text-center text-stone-400">Carregando catálogo...</div>
              ) : produtosAtelie.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm font-semibold text-stone-600">Nenhuma peça cadastrada ainda.</p>
                  <Button
                    onClick={() => setModalNovoProdutoAberto(true)}
                    className="mt-3 bg-[#C85A32] text-white"
                  >
                    Cadastrar Primeira Peça
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {produtosAtelie.map((produtoItem) => {
                    const precoFormatado = (
                      produtoItem.precoEmCentavos / 100
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    });

                    return (
                      <div
                        key={produtoItem.identificadorProduto}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 hover:bg-stone-50/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 overflow-hidden rounded-xl bg-stone-100 border border-stone-200 shrink-0">
                            <Image
                              src={produtoItem.urlImagem}
                              alt={produtoItem.tituloProduto}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-bold text-[#2C221E]">
                              {produtoItem.tituloProduto}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                              <span>{produtoItem.nomeCategoria}</span> •{" "}
                              <span className="font-semibold text-[#C85A32]">
                                {precoFormatado}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 justify-between sm:justify-end">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#6E6259]">
                              Estoque:
                            </span>
                            <Input
                              type="number"
                              min="0"
                              defaultValue={produtoItem.estoqueDisponivel}
                              onBlur={(e) =>
                                processarAtualizacaoEstoque(
                                  produtoItem.identificadorProduto,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="h-8 w-20 text-center font-bold border-stone-200"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              processarExclusaoProduto(
                                produtoItem.identificadorProduto
                              )
                            }
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                            title="Remover peça"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Conteúdo Aba Pedidos */}
          {abaAtiva === "pedidos" && (
            <div className="space-y-4">
              {pedidosAtelie.length === 0 ? (
                <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center text-stone-500">
                  Nenhum pedido recebido até o momento.
                </div>
              ) : (
                pedidosAtelie.map((pedidoItem) => {
                  const valorTotalFormatado = (
                    pedidoItem.valorTotalEmCentavos / 100
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });

                  return (
                    <div
                      key={pedidoItem.identificadorPedido}
                      className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-3 gap-2">
                        <div>
                          <span className="text-xs font-bold text-[#C85A32]">
                            PEDIDO #{pedidoItem.identificadorPedido}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-[#2C221E]">
                            Cliente: {pedidoItem.nomeComprador}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-stone-500">Status atual:</span>
                          <Badge className="bg-amber-100 text-amber-900 border-amber-300 uppercase text-[10px]">
                            {pedidoItem.statusPedido}
                          </Badge>
                        </div>
                      </div>

                      {/* Itens do Pedido */}
                      <div className="space-y-2">
                        {pedidoItem.itensPedido.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-xs text-[#2C221E]"
                          >
                            <span>
                              {item.quantidadeComprada}x {item.tituloProduto}
                            </span>
                            <span className="font-semibold">
                              {(
                                (item.precoUnitarioEmCentavos *
                                  item.quantidadeComprada) /
                                100
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className="text-sm font-bold text-[#2C221E]">
                          Total: {valorTotalFormatado}
                        </span>

                        {/* Botões de Ação para o Artesão atualizar status */}
                        <div className="flex gap-2">
                          {pedidoItem.statusPedido === "pago" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                processarTrocaStatusPedido(
                                  pedidoItem.identificadorPedido,
                                  "enviado"
                                )
                              }
                              className="bg-[#C85A32] text-white hover:bg-[#B24D28] text-xs"
                            >
                              Marcar como Enviado
                            </Button>
                          )}
                          {pedidoItem.statusPedido === "enviado" && (
                            <Button
                              size="sm"
                              onClick={() =>
                                processarTrocaStatusPedido(
                                  pedidoItem.identificadorPedido,
                                  "entregue"
                                )
                              }
                              className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                            >
                              Confirmar Entrega
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Cadastro de Produto */}
      <AddProductModal
        aberto={modalNovoProdutoAberto}
        aoFechar={() => setModalNovoProdutoAberto(false)}
        categorias={categorias}
        artesaoLogado={artesaoLogado}
        aoProdutoAdicionado={recarregarDados}
      />
    </div>
  );
}
