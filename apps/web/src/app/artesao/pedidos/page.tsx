"use client";

import { ClipboardList, PackageOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useSessaoArtesao } from "@/components/artisan/artisan-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fakeApiService } from "@/lib/fake-api";
import { formatBRL } from "@/lib/money";
import { PedidoCliente, StatusPedido } from "@/lib/types";

const ROTULO_STATUS_PEDIDO: Record<StatusPedido, string> = {
  aguardando_pagamento: "Aguardando pagamento",
  pago: "Pago",
  preparando: "Em preparação",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

const STATUS_PEDIDO_RELEVANTES: StatusPedido[] = [
  "pago",
  "enviado",
  "entregue",
  "aguardando_pagamento",
  "preparando",
];

export default function PaginaPedidosArtesao() {
  const artesaoLogado = useSessaoArtesao();
  const [pedidosAtelie, setPedidosAtelie] = useState<PedidoCliente[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let montado = true;

    async function buscarPedidos() {
      const listaPedidos = await fakeApiService.listarPedidosArtesao(
        artesaoLogado.identificadorArtesao || "artesao-1"
      );
      if (montado) {
        setPedidosAtelie(listaPedidos);
        setCarregando(false);
      }
    }

    buscarPedidos();

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Pedidos</h1>
          <p className="text-sm text-[#6E6259]">
            Acompanhe os pedidos recebidos e atualize o status de entrega.
          </p>
        </div>
        <Badge className="bg-amber-50 text-amber-800 border-amber-200 px-3 py-1">
          {pedidosAtelie.length} pedido{pedidosAtelie.length === 1 ? "" : "s"}
        </Badge>
      </div>

      {carregando ? (
        <div className="space-y-4">
          {[1, 2].map((indice) => (
            <div key={indice} className="h-40 animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      ) : pedidosAtelie.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
          <PackageOpen className="mx-auto size-8 text-stone-300" />
          <p className="mt-3 text-base font-semibold text-[#2C221E]">
            Nenhum pedido recebido até o momento.
          </p>
          <Button asChild className="mt-4 rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]">
            <Link href="/artesao/produtos">Ver minhas peças no catálogo</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidosAtelie.map((pedidoItem) => {
            const statusAtual = ROTULO_STATUS_PEDIDO[pedidoItem.statusPedido];
            const podeAvancar = STATUS_PEDIDO_RELEVANTES.includes(pedidoItem.statusPedido);

            return (
              <div
                key={pedidoItem.identificadorPedido}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-stone-100 pb-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#FAF0EC] text-[#C85A32]">
                      <ClipboardList className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#C85A32]">
                        Pedido #{pedidoItem.identificadorPedido}
                      </p>
                      <h3 className="text-sm font-bold text-[#2C221E]">
                        {pedidoItem.nomeComprador}
                      </h3>
                      <p className="text-[11px] text-[#6E6259]">
                        {new Date(pedidoItem.dataCriacaoIso).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge className="w-fit bg-amber-100 text-amber-900 border-amber-300 uppercase text-[10px]">
                    {statusAtual}
                  </Badge>
                </div>

                {/* Itens do pedido */}
                <div className="space-y-2 py-4">
                  {pedidoItem.itensPedido.map((itemPedido) => (
                    <div
                      key={`${pedidoItem.identificadorPedido}-${itemPedido.identificadorProduto}`}
                      className="flex items-center gap-3 text-sm text-[#2C221E]"
                    >
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-100">
                        <Image
                          src={itemPedido.urlImagem}
                          alt={itemPedido.tituloProduto}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="flex-1 truncate">
                        {itemPedido.quantidadeComprada}x {itemPedido.tituloProduto}
                      </span>
                      <span className="font-bold">
                        {formatBRL(itemPedido.precoUnitarioEmCentavos * itemPedido.quantidadeComprada)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-3 border-t border-stone-100 pt-4 sm:flex-row sm:items-center">
                  <span className="text-sm font-bold text-[#2C221E]">
                    Total: {formatBRL(pedidoItem.valorTotalEmCentavos)}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {pedidoItem.statusPedido === "pago" && (
                      <Button
                        size="sm"
                        onClick={() => processarTrocaStatus(pedidoItem.identificadorPedido, "enviado")}
                        className="bg-[#C85A32] text-white hover:bg-[#B24D28] text-xs"
                      >
                        Marcar como Enviado
                      </Button>
                    )}
                    {pedidoItem.statusPedido === "enviado" && (
                      <Button
                        size="sm"
                        onClick={() => processarTrocaStatus(pedidoItem.identificadorPedido, "entregue")}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs"
                      >
                        Confirmar Entrega
                      </Button>
                    )}
                    {podeAvancar && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => processarTrocaStatus(pedidoItem.identificadorPedido, "cancelado")}
                        className="text-xs text-red-600 hover:bg-red-50"
                      >
                        Cancelar Pedido
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}