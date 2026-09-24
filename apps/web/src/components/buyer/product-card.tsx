"use client";

import { Award, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ItemCatalogoProduto } from "@/lib/types";

interface PropriedadesProductCard {
  produto: ItemCatalogoProduto;
  aoAdicionarAoCarrinho: (produto: ItemCatalogoProduto) => void;
}

export function ProductCard({
  produto,
  aoAdicionarAoCarrinho,
}: PropriedadesProductCard) {
  const [adicionando, setAdicionando] = useState(false);

  // Formata os centavos da API para a moeda brasileira (ex: 18000 -> R$ 180,00)
  const precoFormatadoEmReais = (produto.precoEmCentavos / 100).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );

  const rotaDetalheProduto = `/comprador/produto/${produto.identificadorProduto}`;

  const processarCliqueComprar = () => {
    setAdicionando(true);
    aoAdicionarAoCarrinho(produto);
    toast.success(`"${produto.tituloProduto}" foi adicionado ao seu carrinho!`);
    setTimeout(() => setAdicionando(false), 400);
  };

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-stone-200/80 shadow-md shadow-stone-200/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-300/40">
      {/* Imagem do Produto Artesanal (link para detalhes) */}
      <Link
        href={rotaDetalheProduto}
        className="relative block aspect-4/3 w-full overflow-hidden bg-stone-100"
        aria-label={`Ver detalhes de ${produto.tituloProduto}`}
      >
        <Image
          src={produto.urlImagem}
          alt={produto.tituloProduto}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold tracking-wider text-[#2C221E] shadow-sm uppercase">
            {produto.nomeCategoria}
          </span>
        </div>
      </Link>

      {/* Detalhes da Obra */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
        <div>
          <Link href={rotaDetalheProduto} className="block">
            <h3 className="font-serif text-lg font-bold tracking-tight text-[#2C221E] group-hover:text-[#C85A32] transition-colors line-clamp-1">
              {produto.tituloProduto}
            </h3>
          </Link>

          {/* Nome do Artesão / Ateliê (Conforme Figma) */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#6E6259]">
            <Award className="size-3.5 text-[#C85A32] shrink-0" />
            <span className="line-clamp-1 font-medium">{produto.nomeArtesao}</span>
          </div>
        </div>

        {/* Preço e Botão COMPRAR (Fiel ao Figma) */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block leading-none">
              Valor
            </span>
            <span className="font-serif text-xl font-bold text-[#C85A32]">
              {precoFormatadoEmReais}
            </span>
          </div>

          <Button
            type="button"
            onClick={processarCliqueComprar}
            disabled={adicionando}
            size="sm"
            className="rounded-lg bg-[#FAF0EC] px-4 py-2 text-xs font-bold tracking-wider text-[#C85A32] hover:bg-[#C85A32] hover:text-white transition-all shadow-xs active:scale-95"
          >
            <ShoppingCart className="mr-1 size-3.5" />
            COMPRAR
          </Button>
        </div>
      </div>
    </article>
  );
}