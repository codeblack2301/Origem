"use client";

import {
  ArrowRight,
  Award,
  DollarSign,
  Package,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSessaoArtesao } from "@/components/artisan/artisan-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fakeApiService } from "@/lib/fake-api";
import { formatBRL } from "@/lib/money";
import { ItemCatalogoProduto, PedidoCliente, StatusPedido } from "@/lib/types";

const ROTULO_STATUS_PEDIDO: Record<StatusPedido, string> = {
  aguardando_pagamento: "Aguardando pagamento",
  pago: "Pago",
  preparando: "Em preparação",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export default function PaginaDashboardArtesao() {
  const artesaoLogado = useSessaoArtesao();
  const [produtosAtelie, setProdutosAtelie] = useState<ItemCatalogoProduto[]>([]);
  const [pedidosAtelie, setPedidosAtelie] = useState<PedidoCliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let montado = true;

    async function buscarDados() {
      const idArtesao = artesaoLogado.identificadorArtesao || "artesao-1";
      const listaProdutos = await fakeApiService.listarProdutosDoArtesao(idArtesao);
      const listaPedidos = await fakeApiService.listarPedidosArtesao(idArtesao);

      if (montado) {
        setProdutosAtelie(listaProdutos);
        setPedidosAtelie(listaPedidos);
        setCarregando(false);
      }
    }

    buscarDados();

    return () => {
      montado = false;
    };
  }, [artesaoLogado]);

  const processarTrocaStatus = async (
    identificadorPedido: string,
    novoStatus: StatusPedido
  ) => {
    try {
      await fakeApiService.atualizarStatusPedido(identificadorPedido, novoStatus);
      toast.success(`Status do pedido #${identificadorPedido} atualizado!`);
      setPedidosAtelie(
        await fakeApiService.listarPedidosArtesao(
          artesaoLogado.identificadorArtesao || "artesao-1"
        )
      );
    } catch {
      toast.error("Erro ao alterar status do pedido.");
    }
  };

  const totalVendasEmCentavos = pedidosAtelie.reduce(
    (acumulado, pedidoItem) => acumulado + pedidoItem.valorTotalEmCentavos,
    0
  );

  const valorAvaliacaoMedia = produtosAtelie.length
    ? (
        produtosAtelie.reduce(
          (acumulado, produtoItem) => acumulado + produtoItem.notaAvaliacaoMedia,
          0
        ) / produtosAtelie.length
      ).toFixed(1)
    : "5.0";

  return (
    <div className="space-y-6">
      {/* Banner do Ateliê */}
      <section className="relative overflow-hidden rounded-3xl bg-[#2C221E] p-6 text-white shadow-xl sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-200">
              <Award className="size-4" />
              {artesaoLogado.nomeAtelie || "Ateliê Vitalino (Alto do Moura)"}
            </div>
            <h1 className="mt-1 font-serif text-3xl font-bold text-amber-50 sm:text-4xl">
              Olá, {artesaoLogado.nomeCompleto}!
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-light text-stone-300">
              {artesaoLogado.biografiaAtelie ||
                "Gerencie suas peças, estoque e pedidos em um só lugar."}
            </p>
          </div>
          <Button
            asChild
            className="h-11 shrink-0 rounded-xl bg-[#C85A32] px-5 text-xs font-bold text-white shadow-lg shadow-[#C85A32]/30 hover:bg-[#B24D28]"
          >
            <Link href="/artesao/produtos/novo">
              <Plus className="mr-1.5 size-4" /> Cadastrar Nova Peça
            </Link>
          </Button>
        </div>
      </section>

      {/* Indicadores */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-[#C85A32]">
            <DollarSign className="size-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6E6259]">Total em Vendas</span>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
              {formatBRL(totalVendasEmCentavos)}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShoppingBag className="size-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6E6259]">Pedidos Recebidos</span>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
              {carregando ? "..." : pedidosAtelie.length}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Package className="size-6" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6E6259]">Peças no Catálogo</span>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
              {carregando ? "..." : produtosAtelie.length}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex size-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Star className="size-6 fill-purple-600" />
          </div>
          <div>
            <span className="text-xs font-medium text-[#6E6259]">Avaliação do Ateliê</span>
            <h3 className="font-serif text-2xl font-bold text-[#2C221E]">
              {valorAvaliacaoMedia} / 5.0
            </h3>
          </div>
        </div>
      </section>

      {/* Últimos Pedidos */}
      <section className="rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-100 p-5">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2C221E]">Últimos Pedidos</h2>
            <p className="text-xs text-[#6E6259]">Acompanhe e atualize o status de entrega.</p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-[#C85A32] hover:bg-[#FAF0EC]"
          >
            <Link href="/artesao/pedidos">
              Ver todos <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>

        {carregando ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((indice) => (
              <div key={indice} className="h-24 animate-pulse rounded-xl bg-stone-100" />
            ))}
          </div>
        ) : pedidosAtelie.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6E6259]">
            Nenhum pedido recebido até o momento.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {pedidosAtelie.slice(0, 4).map((pedidoItem) => (
              <div
                key={pedidoItem.identificadorPedido}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                    <Image
                      src={pedidoItem.itensPedido[0]?.urlImagem || ""}
                      alt={pedidoItem.itensPedido[0]?.tituloProduto || "Item do pedido"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#C85A32]">
                      Pedido #{pedidoItem.identificadorPedido}
                    </p>
                    <p className="text-sm font-bold text-[#2C221E]">
                      {pedidoItem.nomeComprador}
                    </p>
                    <p className="text-xs text-[#6E6259]">
                      {pedidoItem.itensPedido
                        .map(
                          (itemPedido) =>
                            `${itemPedido.quantidadeComprada}x ${itemPedido.tituloProduto}`
                        )
                        .join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 sm:flex-col sm:items-end">
                  <span className="text-sm font-bold text-[#2C221E]">
                    {formatBRL(pedidoItem.valorTotalEmCentavos)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-900 border-amber-300 uppercase text-[10px]">
                      {ROTULO_STATUS_PEDIDO[pedidoItem.statusPedido]}
                    </Badge>
                    {pedidoItem.statusPedido === "pago" && (
                      <Button
                        size="xs"
                        onClick={() =>
                          processarTrocaStatus(pedidoItem.identificadorPedido, "enviado")
                        }
                        className="bg-[#C85A32] text-white hover:bg-[#B24D28]"
                      >
                        Marcar como Enviado
                      </Button>
                    )}
                    {pedidoItem.statusPedido === "enviado" && (
                      <Button
                        size="xs"
                        onClick={() =>
                          processarTrocaStatus(pedidoItem.identificadorPedido, "entregue")
                        }
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        Confirmar Entrega
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}