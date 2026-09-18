"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Textura de grão de papel para o fundo creme, subliminar (acabamento xilogravura)
const TEXTURA_PAPEL_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`;

// Motivo de friso repetido nas divisões entre seções (dentes de serra)
const FRISO_MOTIVO = (
  <svg
    viewBox="0 0 192 8"
    aria-hidden
    className="h-2 w-48 text-terracota"
    fill="currentColor"
  >
    <path d="M0 8 8 0 16 8 24 0 32 8 40 0 48 8 56 0 64 8 72 0 80 8 88 0 96 8 104 0 112 8 120 0 128 8 136 0 144 8 152 0 160 8 168 0 176 8 184 0 192 8" />
  </svg>
);

// Contorno irregular de carimbo para o badge "NOVA COLEÇÃO"
const CLIP_CARIMBO =
  "polygon(2% 10%, 9% 2%, 93% 3%, 99% 13%, 97% 85%, 90% 98%, 8% 96%, 1% 87%)";

// Posicionamento dos quatro cantos ornamentados do banner
const CANTOS_HERO = [
  { chave: "canto-superior-esquerdo", classes: "top-0 left-0", rotacao: 0 },
  { chave: "canto-superior-direito", classes: "top-0 right-0", rotacao: 90 },
  { chave: "canto-inferior-esquerdo", classes: "bottom-0 left-0", rotacao: 270 },
  { chave: "canto-inferior-direito", classes: "bottom-0 right-0", rotacao: 180 },
];

const CATEGORIAS = [
  "Todos",
  "Cerâmica e Barro",
  "Renda Renascença",
  "Talhas em Madeira",
  "Palha & Fibra",
  "Metal Trabalhado",
];

const PRODUTOS = [
  {
    id: 1,
    nome: "Bonecos de Barro - Retirantes",
    artesao: "Ateliê Mestre Vitalino Filho",
    preco: "R$ 180,00",
    imagem: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    nome: "Caminho de Mesa Renascença",
    artesao: "Dona Maria de Minha (Poção)",
    preco: "R$ 420,00",
    imagem: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    nome: "Leão de Nice em Madeira",
    artesao: "Mestre Nice (Tracunhaém)",
    preco: "R$ 580,00",
    imagem: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    nome: "Vaso de Barro Esmaltado",
    artesao: "Ateliê Barro Forte",
    preco: "R$ 145,00",
    imagem: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    nome: "Bolsa de Ouricuri Tecida",
    artesao: "Artesãs de Petrolina",
    preco: "R$ 130,00",
    imagem: "https://images.unsplash.com/photo-1590845947376-29177a49aee0?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    nome: "Luminária Rendada em Metal",
    artesao: "Artesanato Alagoinha",
    preco: "R$ 290,00",
    imagem: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
  },
];

export default function HomeMarketplace() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  return (
    <div
      className="flex min-h-screen flex-col bg-creme font-sans"
      style={{ backgroundImage: TEXTURA_PAPEL_SVG, backgroundBlendMode: "multiply" }}
    >
      {/* Header */}
      <header className="w-full bg-branco px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex size-10 items-center justify-center rounded-lg bg-terracota text-branco">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M17.5 4.5V11" />
                <path d="M14 2.8V11" />
                <path d="M10.5 4V11" />
                <path d="M7 5.5V11" />
                <path d="M5 11.5H19" />
                <path d="M12 11.5V16" />
                <path d="M9 14.5 5.5 17" />
              </svg>
            </div>
            <div>
              <span className="block font-serif text-2xl font-bold leading-none text-marrom-escuro">
                Manuali
              </span>
              <span className="mt-1 block text-[9px] font-bold tracking-widest text-marrom-escuro uppercase">
                Pernambuco
              </span>
            </div>
          </Link>

          {/* Busca */}
          <div className="relative hidden flex-1 max-w-2xl lg:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg viewBox="0 0 24 24" className="size-5 text-texto-secundario" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square">
                <circle cx="10.5" cy="10.5" r="6" />
                <path d="M15.2 15.2 21 21" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar cerâmica, bordado, madeira..."
              className="w-full rounded-full border border-borda bg-creme py-3 pl-12 pr-4 text-sm text-marrom-escuro placeholder:text-texto-secundario focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
            />
          </div>

          {/* Links e Ícones */}
          <div className="flex items-center gap-6 shrink-0">
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#" className="text-sm font-medium text-marrom-escuro hover:text-terracota transition-colors">
                Sobre nós
              </Link>
              <Link href="#" className="text-sm font-medium text-marrom-escuro hover:text-terracota transition-colors">
                Histórias dos Mestres
              </Link>
            </nav>
            <div className="h-6 w-px bg-borda hidden md:block" />
            <button className="text-marrom-escuro hover:text-terracota transition-colors">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M4 5h2.4l2 9.7a1.8 1.8 0 0 0 1.8 1.4h6.9a1.8 1.8 0 0 0 1.7-1.3L20 10H7" />
                <path d="M9.7 20.5h.1M16.3 20.5h.1" />
              </svg>
            </button>
            <Link href="/login" className="flex size-10 items-center justify-center rounded-full bg-creme text-marrom-escuro hover:bg-borda transition-colors">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                <circle cx="12" cy="8" r="4.5" />
                <path d="M4.5 20c1.5-3.6 4.2-5.4 7.5-5.4s6 1.8 7.5 5.4" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="mx-auto w-full max-w-[1200px] px-6 pt-4 pb-8">
        
        {/* Categorias */}
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                categoriaAtiva === cat
                  ? "bg-terracota text-branco border border-terracota"
                  : "bg-branco text-marrom-escuro border border-borda hover:border-texto-secundario"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Friso decorativo: categorias → banner */}
        <div className="mt-4 flex justify-center" aria-hidden>
          {FRISO_MOTIVO}
        </div>

        {/* Banner Hero */}
        <section className="relative mt-4 h-[250px] overflow-hidden rounded-2xl bg-black">
          <Image
            src="https://images.unsplash.com/photo-1541315570075-8eb3442eaec4?auto=format&fit=crop&w=1200&q=80"
            alt="Sertão ao pôr do sol"
            fill
            priority
            className="object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-marrom-escuro/40" />
          
          {/* Moldura de cantos em estilo xilogravura */}
          {CANTOS_HERO.map((canto) => (
            <svg
              key={canto.chave}
              viewBox="0 0 64 64"
              className={`pointer-events-none absolute size-16 opacity-70 ${canto.classes}`}
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <g transform={`rotate(${canto.rotacao} 32 32)`}>
                <path d="M4 64V24L24 4H64" />
                <path d="M13 7V14M7 14h14M10 10l6 6M16 10l-6 6" />
                <rect x="12" y="12" width="4" height="4" />
              </g>
            </svg>
          ))}
          
          <div className="relative z-10 flex h-full flex-col justify-center p-8">
            <span
              style={{ clipPath: CLIP_CARIMBO }}
              className="w-fit -rotate-1 bg-terracota px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-branco"
            >
              Nova Coleção
            </span>
            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-branco sm:text-3xl">
              O Legado de Caruaru e<br />Tracunhaém na sua casa
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-snug text-branco/80 md:w-[55%]">
              Conheça as novas telhas esculpidas pelos grandes mestres artesãos do sertão pernambucano. Envio seguro com selo lacrado de autenticidade original.
            </p>
            <button className="mt-4 w-fit rounded-lg bg-terracota px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-branco transition-colors hover:bg-terracota-hover">
              CONHECER OS MESTRES
            </button>
          </div>
        </section>

        {/* Friso decorativo: banner → Obras em Destaque */}
        <div className="mt-5 flex justify-center" aria-hidden>
          {FRISO_MOTIVO}
        </div>

        {/* Obras em Destaque */}
        <section className="mt-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl font-bold text-marrom-escuro">
                Obras em Destaque
              </h2>
              <p className="mt-1 text-sm text-texto-secundario">
                Peças autênticas produzidas à mão no Agreste e na Zona da Mata.
              </p>
            </div>
            <Link href="#" className="shrink-0 text-sm font-bold text-terracota hover:text-terracota-hover transition-colors">
              Ver todo o acervo
            </Link>
          </div>

          {/* Grid de Produtos */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUTOS.map((produto) => (
              <div
                key={produto.id}
                className="group overflow-hidden rounded-xl bg-branco border border-borda shadow-sm transition-shadow hover:shadow-md flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-creme">
                  <Image
                    src={produto.imagem}
                    alt={produto.nome}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Selo de peça autêntica (sol entalhado) */}
                  <div className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-branco/85 shadow-sm">
                    <svg viewBox="0 0 24 24" className="size-6 text-marrom-escuro" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                      <circle cx="12" cy="12" r="8.2" />
                      <path d="M12 6.5V3.5M12 20.5V17.5M6.5 12H3.5M20.5 12H17.5M8.8 8.8l-2.1-2.1M17.3 15.3l-2.1 2.1M15.2 6.7l2.1 2.1M6.7 15.3l2.1 2.1" />
                      <rect x="10.5" y="10.5" width="3" height="3" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-bold text-marrom-escuro line-clamp-1">
                    {produto.nome}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-texto-secundario">
                    <MapPin className="size-3.5 text-terracota shrink-0" />
                    <span className="text-xs truncate">{produto.artesao}</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-lg font-bold text-terracota">
                      {produto.preco}
                    </span>
                    <button className="rounded bg-terracota px-4 py-2 text-xs font-bold uppercase text-branco transition-colors hover:bg-terracota-hover">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full border-t border-borda bg-branco px-6 py-5">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded bg-terracota text-branco">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M17.5 4.5V11" />
                <path d="M14 2.8V11" />
                <path d="M10.5 4V11" />
                <path d="M7 5.5V11" />
                <path d="M5 11.5H19" />
                <path d="M12 11.5V16" />
                <path d="M9 14.5 5.5 17" />
              </svg>
            </div>
            <div>
              <span className="block font-serif text-lg font-bold leading-none text-marrom-escuro">
                Manuali
              </span>
              <span className="block text-[7px] font-bold tracking-widest text-marrom-escuro uppercase mt-0.5">
                Pernambuco
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-texto-secundario">
            © 2026 Manuali. Todos os direitos reservados. Fomentando cultura pernambucana.
          </p>

          <div className="flex items-center gap-4 text-texto-secundario">
            <a href="#" className="hover:text-terracota transition-colors">
              {/* Instagram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter">
                <rect width="17.6" height="17.6" x="3.2" y="3.2" rx="3" />
                <rect width="8.4" height="8.4" x="7.8" y="7.8" rx="1.5" />
                <path d="M16.9 7.1h.1" />
              </svg>
            </a>
            <a href="#" className="hover:text-terracota transition-colors">
              {/* Facebook */}
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M13.2 5H10.6c-1.6 0-2.6 1-2.6 2.6V10H6v3.1h2v7h3.1v-7h2.6l.6-3.1h-3.2V8c0-.6.4-.9 1-.9h1.7z" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className="hover:text-terracota transition-colors">
              {/* YouTube */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter">
                <rect width="18" height="12.8" x="3" y="5.6" rx="2" />
                <path d="m10 9.4 5 2.6-5 2.6z" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}