"use client";

import {
  Bell,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Store,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSyncExternalStore, useState } from "react";
import { Toaster, toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fakeApiService, obterSessaoUsuarioLogado } from "@/lib/fake-api";
import { PerfilUsuarioAutenticado } from "@/lib/types";

// Perfil de demonstração usado quando não há sessão de artesão gravada
export const PERFIL_ARTESAO_DEMO: PerfilUsuarioAutenticado = {
  identificadorUsuario: "artesao-1",
  nomeCompleto: "Mestre Vitalino Filho",
  enderecoEmail: "vitalino@manuali.com.br",
  papelUsuario: "ARTESAO",
  identificadorArtesao: "artesao-1",
  nomeAtelie: "Ateliê Vitalino (Alto do Moura)",
  documentoCpfCnpj: "12.345.678/0001-90",
  biografiaAtelie:
    "Moldando o barro com a alma do Agreste Pernambucano há mais de três gerações.",
  statusCuradoria: "aprovado",
  tokenAcessoJwt: "fake_jwt_token_artesao_demo",
};

// Snapshot cacheado para o useSyncExternalStore: obterSessaoUsuarioLogado()
// reconstrói o objeto a cada chamada, então guardamos a última serialização e
// devolvemos a MESMA referência enquanto o armazenamento não mudar (evita loop).
let ultimaSerializacaoSessao: string | null = null;
let ultimoSnapshotSessao: PerfilUsuarioAutenticado = PERFIL_ARTESAO_DEMO;

function obterSnapshotSessaoArtesao(): PerfilUsuarioAutenticado {
  if (typeof window === "undefined") return PERFIL_ARTESAO_DEMO;
  const sessaoAtual = obterSessaoUsuarioLogado();
  const perfilAtual =
    sessaoAtual?.papelUsuario === "ARTESAO" ? sessaoAtual : PERFIL_ARTESAO_DEMO;
  const serializacaoAtual = JSON.stringify(perfilAtual);
  if (serializacaoAtual !== ultimaSerializacaoSessao) {
    ultimaSerializacaoSessao = serializacaoAtual;
    ultimoSnapshotSessao = perfilAtual;
  }
  return ultimoSnapshotSessao;
}

export function useSessaoArtesao(): PerfilUsuarioAutenticado {
  // Lê a sessão persistida via useSyncExternalStore: na hidratação o React usa
  // o snapshot do servidor (demo) e só depois aplica o do cliente, sem mismatch.
  return useSyncExternalStore(
    (eventoCallback) => {
      window.addEventListener("storage", eventoCallback);
      return () => window.removeEventListener("storage", eventoCallback);
    },
    obterSnapshotSessaoArtesao,
    () => PERFIL_ARTESAO_DEMO
  );
}

const ITENS_NAVEGACAO_ARTESAO = [
  { href: "/artesao", rotulo: "Dashboard", icone: LayoutDashboard },
  { href: "/artesao/produtos", rotulo: "Meus produtos", icone: Package },
  { href: "/artesao/estoque", rotulo: "Estoque", icone: Boxes },
  { href: "/artesao/pedidos", rotulo: "Pedidos", icone: ClipboardList },
  { href: "/artesao/perfil", rotulo: "Perfil", icone: User },
  { href: "/artesao/configuracoes", rotulo: "Configurações", icone: Settings },
];

export function ArtisanShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const caminhoAtual = usePathname();
  const perfilArtesao = useSessaoArtesao();
  const [menuLateralAberto, setMenuLateralAberto] = useState(false);

  const estaItemAtivo = (href: string) =>
    href === "/artesao"
      ? caminhoAtual === "/artesao"
      : caminhoAtual.startsWith(href);

  const processarLogout = async () => {
    await fakeApiService.efetuarLogout();
    toast.info("Você saiu da sessão.");
    router.push("/login");
  };

  const conteudoNavegacao = (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {ITENS_NAVEGACAO_ARTESAO.map((item) => {
        const IconeItem = item.icone;
        const itemAtivo = estaItemAtivo(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuLateralAberto(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
              itemAtivo
                ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/25"
                : "text-[#6E6259] hover:bg-[#FAF0EC] hover:text-[#C85A32]"
            }`}
          >
            <IconeItem className="size-5 shrink-0" />
            {item.rotulo}
          </Link>
        );
      })}

      <button
        type="button"
        onClick={processarLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#6E6259] transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="size-5 shrink-0" />
        Sair
      </button>
    </nav>
  );

  const marcaManuali = (
    <Link
      href="/artesao"
      className="flex items-center gap-2.5"
      onClick={() => setMenuLateralAberto(false)}
    >
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/30">
        <Store className="size-5" />
      </div>
      <div>
        <span className="block font-serif text-lg font-bold leading-none text-[#2C221E]">
          MANUALI
        </span>
        <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-widest text-[#C85A32]">
          Painel do Artesão
        </span>
      </div>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-[#FAF7F2] text-[#2C221E]">
      <Toaster position="top-right" richColors />

      {/* Sidebar fixa no desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-stone-200 bg-white lg:flex">
        <div className="border-b border-stone-100 px-5 py-4">{marcaManuali}</div>
        {conteudoNavegacao}
        <div className="border-t border-stone-100 px-4 py-4">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Curadoria: Aprovado
          </Badge>
        </div>
      </aside>

      {/* Drawer do menu no mobile */}
      {menuLateralAberto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuLateralAberto(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
              {marcaManuali}
              <button
                type="button"
                onClick={() => setMenuLateralAberto(false)}
                className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
                aria-label="Fechar menu"
              >
                <X className="size-5" />
              </button>
            </div>
            {conteudoNavegacao}
            <div className="border-t border-stone-100 px-4 py-4">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                Curadoria: Aprovado
              </Badge>
            </div>
          </aside>
        </div>
      )}

      {/* Coluna principal (header + conteúdo) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuLateralAberto(true)}
                className="rounded-lg p-2 text-[#2C221E] hover:bg-[#FAF0EC] transition-colors lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="size-5" />
              </button>
              <div className="lg:hidden">{marcaManuali}</div>
              <nav className="hidden items-center gap-6 lg:flex">
                {ITENS_NAVEGACAO_ARTESAO.slice(1, 4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs font-semibold transition-colors ${
                      estaItemAtivo(item.href)
                        ? "text-[#C85A32]"
                        : "text-[#6E6259] hover:text-[#C85A32]"
                    }`}
                  >
                    {item.rotulo}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden h-9 rounded-full border-stone-300 text-xs font-semibold sm:flex"
              >
                <Link href="/comprador">Ver Vitrine de Compras</Link>
              </Button>

              <button
                type="button"
                className="relative rounded-full border border-stone-200 bg-[#FAF7F2] p-2 text-[#2C221E] hover:bg-stone-100 transition-colors"
                aria-label="Notificações"
              >
                <Bell className="size-4" />
                <span className="absolute right-1 top-1 size-2 rounded-full bg-[#C85A32]" />
              </button>

              <div className="flex items-center gap-2 border-l border-stone-200 pl-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#FAF3F0] text-xs font-bold text-[#C85A32] ring-1 ring-[#C85A32]/20">
                  {perfilArtesao.nomeCompleto.charAt(0).toUpperCase()}
                </div>
                <div className="hidden xl:block leading-tight">
                  <span className="block text-xs font-bold text-[#2C221E]">
                    {perfilArtesao.nomeAtelie}
                  </span>
                  <span className="block text-[10px] text-[#6E6259]">
                    {perfilArtesao.enderecoEmail}
                  </span>
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