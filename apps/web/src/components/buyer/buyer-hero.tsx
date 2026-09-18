"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function BuyerHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-stone-950 text-white shadow-2xl">
      {/* Imagem de Fundo com Alta Resolução Artesanal */}
      <div className="absolute inset-0 z-0 opacity-55">
        <Image
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1600&q=80"
          alt="Esculturas em madeira e ateliê pernambucano"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradiente Warm Terracota */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#2C221E] via-[#2C221E]/80 to-transparent" />

      {/* Conteúdo do Hero (Fiel à Imagem 3 do Figma) */}
      <div className="relative z-20 flex flex-col items-start gap-4 p-8 sm:p-12 lg:p-16 max-w-2xl">
        <span className="inline-block rounded-full bg-[#C85A32] px-3.5 py-1 text-[11px] font-bold tracking-widest text-white uppercase shadow-md shadow-[#C85A32]/40">
          Nova Coleção
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-amber-50">
          O Legado de Caruaru e Tracunhaém na sua casa
        </h1>

        <p className="text-sm sm:text-base font-light text-stone-200 leading-relaxed">
          Conheça as novas talhas esculpidas pelos grandes mestres artesãos do
          sertão e agreste pernambucano. Envio seguro com certificado de
          autenticidade original.
        </p>

        <Button
          size="lg"
          className="mt-2 rounded-xl bg-white px-6 py-6 text-xs font-bold tracking-wider text-[#C85A32] hover:bg-stone-100 shadow-lg shadow-white/10 active:scale-[0.98] transition-all"
        >
          CONHECER OS MESTRES
        </Button>
      </div>
    </section>
  );
}
