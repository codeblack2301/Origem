"use client";

import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PaginaCadastro() {
  const [tipoCadastro, setTipoCadastro] = useState<"artesao" | "comprador">("artesao");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <main className="flex w-full font-sans min-h-screen lg:h-screen lg:overflow-hidden [@media(max-height:700px)]:lg:h-auto [@media(max-height:700px)]:lg:overflow-y-auto">
      {/* Metade Esquerda - Painel Visual */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex h-full">
        {/* Imagem de Fundo (Entalhador de madeira) */}
        <Image
          src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80"
          alt="Artesão entalhando madeira"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay Marrom Escuro Semitransparente */}
        <div className="absolute inset-0 bg-marrom-escuro/60" />

        {/* Logo MÃOS Versão Branca */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg border-2 border-branco text-branco">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-branco uppercase tracking-widest">
              MÃOS
            </span>
          </Link>
        </div>

        {/* Textos Inferiores */}
        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-4xl font-bold leading-tight text-branco sm:text-5xl">
            Valorize o fazer manual.
          </h1>
          <p className="mt-4 text-base text-branco/80">
            Seja expondo suas obras para o mundo ou adquirindo peças únicas com história e identidade cultural.
          </p>
          <p className="mt-12 text-xs text-branco/50">
            © 2026 Manuali. Feito com amor em Recife e Caruaru.
          </p>
        </div>
      </section>

      {/* Metade Direita - Formulário */}
      <section className="flex w-full flex-col items-center justify-center bg-creme p-6 lg:w-1/2 h-full overflow-y-auto">
        <div className="w-full max-w-[440px] rounded-xl bg-branco p-6 sm:p-8 shadow-sm">
          {/* Logo Mobile */}
          <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-lg bg-terracota text-branco">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-marrom-escuro uppercase tracking-widest">
              MÃOS
            </span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-marrom-escuro">
            Crie sua conta
          </h2>
          <p className="mt-1 text-sm text-texto-secundario">
            Junte-se à nossa comunidade de fomento à cultura local.
          </p>

          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-3">
              <label className="text-sm font-medium text-marrom-escuro">
                Tipo de Cadastro
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setTipoCadastro("artesao")}
                  className={`flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                    tipoCadastro === "artesao"
                      ? "border-terracota bg-terracota/5 text-terracota"
                      : "border-borda text-texto-secundario"
                  }`}
                >
                  <div
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      tipoCadastro === "artesao"
                        ? "border-terracota"
                        : "border-texto-secundario/40"
                    }`}
                  >
                    {tipoCadastro === "artesao" && (
                      <div className="size-2 rounded-full bg-terracota" />
                    )}
                  </div>
                  Quero vender (Artesão)
                </button>
                <button
                  type="button"
                  onClick={() => setTipoCadastro("comprador")}
                  className={`flex flex-1 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                    tipoCadastro === "comprador"
                      ? "border-terracota bg-terracota/5 text-terracota"
                      : "border-borda text-texto-secundario"
                  }`}
                >
                  <div
                    className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                      tipoCadastro === "comprador"
                        ? "border-terracota"
                        : "border-texto-secundario/40"
                    }`}
                  >
                    {tipoCadastro === "comprador" && (
                      <div className="size-2 rounded-full bg-terracota" />
                    )}
                  </div>
                  Quero comprar
                </button>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <label
                htmlFor="nome"
                className="text-sm font-medium text-marrom-escuro"
              >
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Como quer ser chamado"
                className="w-full rounded-lg border border-borda bg-transparent px-3 py-2.5 text-sm text-marrom-escuro placeholder:text-texto-secundario/50 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-marrom-escuro"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className="w-full rounded-lg border border-borda bg-transparent px-3 py-2.5 text-sm text-marrom-escuro placeholder:text-texto-secundario/50 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-marrom-escuro"
              >
                Crie sua senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-lg border border-borda bg-transparent px-3 py-2.5 pr-10 text-sm text-marrom-escuro placeholder:text-texto-secundario/50 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-texto-secundario hover:text-marrom-escuro"
                >
                  {mostrarSenha ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {tipoCadastro === "artesao" && (
              <>
                <div className="space-y-1.5">
                  <label
                    htmlFor="documento"
                    className="text-sm font-medium text-marrom-escuro"
                  >
                    CPF ou CNPJ do Ateliê
                  </label>
                  <input
                    id="documento"
                    type="text"
                    placeholder="Apenas números"
                    className="w-full rounded-lg border border-borda bg-transparent px-3 py-2.5 text-sm text-marrom-escuro placeholder:text-texto-secundario/50 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
                  />
                </div>

              </>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-terracota py-2.5 text-sm font-bold tracking-wide text-branco transition-colors hover:bg-terracota-hover"
            >
              CONCLUIR CADASTRO
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-texto-secundario">
            Já tem cadastro?{" "}
            <Link
              href="/login"
              className="font-medium text-terracota hover:text-terracota-hover"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
