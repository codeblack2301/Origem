"use client";

import { LogOut, Search, ShoppingBag, Store, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fakeApiService } from "@/lib/fake-api";
import { PerfilUsuarioAutenticado } from "@/lib/types";

interface PropriedadesBuyerHeader {
  quantidadeItensCarrinho: number;
  termoBusca: string;
  aoAlterarTermoBusca: (novoTermo: string) => void;
  aoAbrirCarrinho: () => void;
  perfilUsuario: PerfilUsuarioAutenticado | null;
}

export function BuyerHeader({
  quantidadeItensCarrinho,
  termoBusca,
  aoAlterarTermoBusca,
  aoAbrirCarrinho,
  perfilUsuario,
}: PropriedadesBuyerHeader) {
  const router = useRouter();

  const processarLogout = async () => {
    await fakeApiService.efetuarLogout();
    toast.info("Você saiu da sessão.");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand Logo - Fiel ao Figma */}
        <Link href="/comprador" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/30 group-hover:scale-105 transition-transform">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a6 6 0 0 0-6 6c0 4 6 14 6 14s6-10 6-14a6 6 0 0 0-6-6z" />
              <circle cx="12" cy="8" r="2" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-xl font-bold tracking-tight text-[#2C221E] block leading-none">
              MANUALI
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-[#C85A32] block mt-0.5">
              Pernambuco
            </span>
          </div>
        </Link>

        {/* Input de Busca Integrada (Figma) */}
        <div className="relative flex-1 max-w-md mx-2 sm:mx-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-stone-400" />
          <Input
            type="text"
            placeholder="Buscar cerâmicas, rendas, ateliês..."
            value={termoBusca}
            onChange={(eventoChange) => aoAlterarTermoBusca(eventoChange.target.value)}
            className="h-10 rounded-full border-stone-200 bg-[#F7F4EF] pl-10 pr-4 text-sm text-[#2C221E] placeholder:text-stone-400 focus:bg-white focus:border-[#C85A32] focus:ring-[#C85A32]/20"
          />
        </div>

        {/* Links de Navegação e Ações */}
        <div className="flex items-center gap-3 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#6E6259]">
            <a href="#sobre" className="hover:text-[#C85A32] transition-colors">
              Sobre nós
            </a>
            <a href="#mestres" className="hover:text-[#C85A32] transition-colors">
              Histórias dos Mestres
            </a>
          </nav>

          {/* Botão de Alternar Visão (Para facilidade do usuário) */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:flex h-9 rounded-full border-amber-800/20 bg-amber-50 text-xs font-semibold text-[#C85A32] hover:bg-amber-100"
          >
            <Link href="/artesao">
              <Store className="mr-1.5 size-3.5" />
              Espaço Artesão
            </Link>
          </Button>

          {/* Botão do Carrinho com Badge */}
          <button
            type="button"
            onClick={aoAbrirCarrinho}
            className="relative flex size-10 items-center justify-center rounded-full bg-[#FAF7F2] text-[#2C221E] hover:bg-stone-100 transition-colors border border-stone-200"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="size-5 text-[#2C221E]" />
            {quantidadeItensCarrinho > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#C85A32] text-[10px] font-bold text-white shadow-sm">
                {quantidadeItensCarrinho}
              </span>
            )}
          </button>

          {/* Perfil / Logout */}
          <div className="flex items-center gap-2 border-l border-stone-200 pl-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#FAF3F0] text-[#C85A32] font-semibold text-xs border border-[#C85A32]/20">
              {perfilUsuario?.nomeCompleto
                ? perfilUsuario.nomeCompleto.charAt(0).toUpperCase()
                : <User className="size-4" />}
            </div>
            <button
              type="button"
              onClick={processarLogout}
              className="text-stone-400 hover:text-red-600 transition-colors p-1"
              title="Sair da conta"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
