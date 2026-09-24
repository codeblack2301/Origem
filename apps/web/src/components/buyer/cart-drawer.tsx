"use client";

import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { fakeApiService } from "@/lib/fake-api";
import { CarrinhoCompraCliente } from "@/lib/types";

interface PropriedadesCartDrawer {
  aberto: boolean;
  aoFechar: () => void;
  carrinho: CarrinhoCompraCliente | null;
  aoAtualizarCarrinho: () => void;
}

export function CartDrawer({
  aberto,
  aoFechar,
  carrinho,
  aoAtualizarCarrinho,
}: PropriedadesCartDrawer) {
  const [processandoCheckout, setProcessandoCheckout] = useState(false);
  const [pedidoConcluidoId, setPedidoConcluidoId] = useState<string | null>(null);

  if (!aberto) return null;

  const processarAlteracaoQuantidade = async (
    identificadorItem: string,
    novaQuantidade: number
  ) => {
    await fakeApiService.alterarQuantidadeItemCarrinho(
      identificadorItem,
      novaQuantidade
    );
    aoAtualizarCarrinho();
  };

  const processarRemocaoItem = async (identificadorItem: string) => {
    await fakeApiService.removerItemCarrinho(identificadorItem);
    toast.info("Item removido do carrinho.");
    aoAtualizarCarrinho();
  };

  const processarCheckoutSimulado = async () => {
    setProcessandoCheckout(true);
    try {
      const pedidoRealizado = await fakeApiService.finalizarCheckout();
      setPedidoConcluidoId(pedidoRealizado.identificadorPedido);
      toast.success(
        `Pedido #${pedidoRealizado.identificadorPedido} confirmado com sucesso!`
      );
      aoAtualizarCarrinho();
    } catch (_erroCheckout) {
      toast.error("Erro ao concluir pedido. Tente novamente.");
    } finally {
      setProcessandoCheckout(false);
    }
  };

  const valorTotalFormatado = ((carrinho?.valorTotalEmCentavos || 0) / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="flex h-full w-full max-w-md flex-col justify-between bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Topo da Gaveta */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-[#C85A32]" />
            <h2 className="font-serif text-xl font-bold text-[#2C221E]">
              Seu Carrinho Manuali
            </h2>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modalidade Checkout Concluído */}
        {pedidoConcluidoId ? (
          <div className="my-auto text-center space-y-4 py-8">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
              Pedido Confirmado!
            </h3>
            <p className="text-sm text-[#6E6259]">
              Seu pedido <span className="font-mono font-bold text-[#C85A32]">#{pedidoConcluidoId}</span> foi recebido e já está em preparação pelo artesão.
            </p>
            <Button
              onClick={() => {
                setPedidoConcluidoId(null);
                aoFechar();
              }}
              className="mt-4 rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]"
            >
              CONTINUAR COMPRANDO
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de Itens no Carrinho */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 divide-y divide-stone-100">
              {!carrinho || carrinho.itensCarrinho.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-stone-400">
                  <ShoppingBag className="size-12 stroke-1 mb-2" />
                  <p className="text-sm font-medium">Seu carrinho está vazio.</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Explore as obras em destaque e apoie os mestres locais!
                  </p>
                </div>
              ) : (
                carrinho.itensCarrinho.map((itemAtual) => {
                  const precoFormatado = (
                    itemAtual.subtotalEmCentavos / 100
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  });

                  return (
                    <div
                      key={itemAtual.identificadorItemCarrinho}
                      className="flex items-center gap-4 pt-4 first:pt-0"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                        <Image
                          src={itemAtual.produtoItem.urlImagem}
                          alt={itemAtual.produtoItem.tituloProduto}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#2C221E] line-clamp-1">
                            {itemAtual.produtoItem.tituloProduto}
                          </h4>
                          <p className="text-[11px] text-[#6E6259]">
                            {itemAtual.produtoItem.nomeArtesao}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                processarAlteracaoQuantidade(
                                  itemAtual.identificadorItemCarrinho,
                                  itemAtual.quantidadeSolicitada - 1
                                )
                              }
                              className="text-stone-500 hover:text-[#C85A32]"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="text-xs font-bold text-[#2C221E]">
                              {itemAtual.quantidadeSolicitada}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                processarAlteracaoQuantidade(
                                  itemAtual.identificadorItemCarrinho,
                                  itemAtual.quantidadeSolicitada + 1
                                )
                              }
                              className="text-stone-500 hover:text-[#C85A32]"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          <span className="font-serif text-sm font-bold text-[#C85A32]">
                            {precoFormatado}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          processarRemocaoItem(
                            itemAtual.identificadorItemCarrinho
                          )
                        }
                        className="text-stone-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Rodapé do Carrinho e Finalizar Checkout */}
            {carrinho && carrinho.itensCarrinho.length > 0 && (
              <div className="border-t border-stone-200 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6E6259]">
                    Subtotal do Pedido
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#2C221E]">
                    {valorTotalFormatado}
                  </span>
                </div>

                <p className="text-[11px] text-stone-400 text-center">
                  * Frete e taxa de envio inclusos para todo o território nacional.
                </p>

                <Button
                  onClick={processarCheckoutSimulado}
                  disabled={processandoCheckout}
                  className="h-12 w-full rounded-xl bg-[#C85A32] text-sm font-bold text-white hover:bg-[#B24D28] shadow-lg shadow-[#C85A32]/25"
                >
                  {processandoCheckout
                    ? "PROCESSANDO PEDIDO..."
                    : "FINALIZAR COMPRA (PIX / CARTÃO)"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
