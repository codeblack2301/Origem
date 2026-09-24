"use client";

import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Menu,
  Package,
  Search,
  Settings,
  Store,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ITENS_NAVEGACAO_ADMIN = [
  { href: "/admin", rotulo: "Início", icone: LayoutDashboard },
  { href: "/admin/vendas", rotulo: "Vendas", icone: TrendingUp },
  { href: "/admin/relatorios?aba=produtos", rotulo: "Produtos", icone: Package },
  { href: "/admin/usuarios", rotulo: "Usuários", icone: Users },
  { href: "/admin/relatorios?aba=artesaos", rotulo: "Artesãos", icone: Store },
  { href: "/admin/relatorios", rotulo: "Relatórios", icone: BarChart3 },
  { href: "/admin/configuracoes", rotulo: "Configurações", icone: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const caminhoAtual = usePathname();
  const parametrosBusca = useSearchParams();
  const abaRelatorios = parametrosBusca.get("aba");
  const [menuLateralAberto, setMenuLateralAberto] = useState(false);
  const [termoBusca, setTermoBusca] = useState("");

  const verificarItemAtivo = (href: string) => {
    const baseRota = href.split("?")[0];

    if (href.includes("aba=produtos")) {
      return caminhoAtual === "/admin/relatorios" && abaRelatorios === "produtos";
    }
    if (href.includes("aba=artesaos")) {
      return caminhoAtual === "/admin/relatorios" && abaRelatorios === "artesaos";
    }
    if (baseRota === "/admin/relatorios") {
      return (
        caminhoAtual === "/admin/relatorios" &&
        abaRelatorios !== "produtos" &&
        abaRelatorios !== "artesaos"
      );
    }
    return baseRota === "/admin"
      ? caminhoAtual === "/admin"
      : caminhoAtual.startsWith(baseRota);
  };

  const conteudoNavegacao = (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {ITENS_NAVEGACAO_ADMIN.map((item) => {
        const IconeItem = item.icone;
        const itemAtivo = verificarItemAtivo(item.href);
        return (
          <Link
            key={item.rotulo}
            href={item.href}
            onClick={() => setMenuLateralAberto(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
              itemAtivo
                ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/30"
                : "text-stone-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <IconeItem className="size-5 shrink-0" />
            {item.rotulo}
          </Link>
        );
      })}
    </nav>
  );

  const marcaManuali = (
    <Link
      href="/admin"
      className="flex items-center gap-2.5"
      onClick={() => setMenuLateralAberto(false)}
    >
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/30">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a6 6 0 0 0-6 6c0 4 6 14 6 14s6-10 6-14a6 6 0 0 0-6-6z" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      </div>
      <div>
        <span className="block font-serif text-lg font-bold leading-none text-white">
          MANUALI
        </span>
        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-widest text-[#C85A32]">
          Administração
        </span>
      </div>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#2C221E]">
      <Toaster position="top-right" richColors />

      {/* Sidebar escura no desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-[#2C221E] lg:flex">
        <div className="border-b border-white/10 px-5 py-4">{marcaManuali}</div>
        {conteudoNavegacao}
        <div className="border-t border-white/10 p-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full rounded-xl border-white/20 bg-transparent text-xs font-semibold text-stone-300 hover:bg-white/10 hover:text-white"
          >
            <Link href="/comprador">Ver Vitrine</Link>
          </Button>
        </div>
      </aside>

      {/* Drawer do menu no mobile */}
      {menuLateralAberto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuLateralAberto(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[#2C221E] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              {marcaManuali}
              <button
                type="button"
                onClick={() => setMenuLateralAberto(false)}
                className="rounded-full p-1.5 text-stone-400 hover:bg-white/10 hover:text-white"
                aria-label="Fechar menu"
              >
                <X className="size-5" />
              </button>
            </div>
            {conteudoNavegacao}
          </aside>
        </div>
      )}

      {/* Coluna principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuLateralAberto(true)}
                className="rounded-lg p-2 text-[#2C221E] transition-colors hover:bg-[#FAF0EC] lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <Input
                  type="search"
                  value={termoBusca}
                  onChange={(eventoChange) => setTermoBusca(eventoChange.target.value)}
                  placeholder="Buscar no painel..."
                  className="w-64 rounded-full border-stone-200 bg-stone-50 pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="relative rounded-full border border-stone-200 bg-[#FAF7F2] p-2 text-[#2C221E] transition-colors hover:bg-stone-100"
                aria-label="Notificações"
              >
                <Bell className="size-4" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-[#C85A32]" />
              </button>

              <div className="flex items-center gap-2 border-l border-stone-200 pl-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#2C221E] text-xs font-bold text-white">
                  A
                </div>
                <div className="hidden leading-tight xl:block">
                  <span className="block text-xs font-bold text-[#2C221E]">Admin</span>
                  <span className="block text-[10px] text-[#6E6259]">Administrador</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}