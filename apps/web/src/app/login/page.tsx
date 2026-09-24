"use client";

import { Eye, EyeOff, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";

import { fakeApiService } from "@/lib/fake-api";
import { PapelUsuario } from "@/lib/types";

export default function PaginaLogin() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState<"artesao" | "consumidor" | "admin">(
    "artesao"
  );
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [enderecoEmail, setEnderecoEmail] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const processarEntrada = async (eventoFormulario: React.FormEvent<HTMLFormElement>) => {
    eventoFormulario.preventDefault();
    setCarregando(true);

    const papelDesejado: PapelUsuario =
      tipoUsuario === "artesao" ? "ARTESAO" : tipoUsuario === "admin" ? "ADMIN" : "CONSUMIDOR";

    try {
      const perfilAutenticado = await fakeApiService.autenticarUsuario({
        enderecoEmail:
          enderecoEmail ||
          (tipoUsuario === "artesao"
            ? "artesao@manuali.com.br"
            : tipoUsuario === "admin"
              ? "admin@manuali.com.br"
              : "comprador@manuali.com.br"),
        senhaAcesso: senhaAcesso || "senha123",
        papelDesejado,
      });

      toast.success(`Bem-vindo(a) de volta, ${perfilAutenticado.nomeCompleto}!`);
      router.push(
        perfilAutenticado.papelUsuario === "ADMIN"
          ? "/admin"
          : perfilAutenticado.papelUsuario === "ARTESAO"
            ? "/artesao"
            : "/comprador"
      );
    } catch {
      toast.error("Erro ao efetuar login. Verifique suas credenciais.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex w-full font-sans min-h-screen lg:h-screen lg:overflow-hidden [@media(max-height:700px)]:lg:h-auto [@media(max-height:700px)]:lg:overflow-y-auto">
      <Toaster position="top-right" richColors />
      {/* Metade Esquerda - Painel Visual */}
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 lg:flex h-full">
        {/* Imagem de Fundo (Artesã no torno) */}
        <Image
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"
          alt="Artesã no torno de cerâmica"
          fill
          sizes="50vw"
          priority
          className="object-cover"
        />
        {/* Overlay Marrom Escuro Semitransparente */}
        <div className="absolute inset-0 bg-marrom-escuro/60" />

        {/* Logo Manuali Versão Branca */}
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
            <span className="font-serif text-2xl font-bold text-branco">
              Manuali
            </span>
          </Link>
        </div>

        {/* Textos Inferiores */}
        <div className="relative z-10 max-w-md">
          <h1 className="font-serif text-4xl font-bold leading-tight text-branco sm:text-5xl">
            Onde a alma do Nordeste<br />vira obra de arte.
          </h1>
          <p className="mt-4 text-base text-branco/80">
            Conectamos os mestres do barro, da renda e da madeira diretamente com admiradores da nossa economia criativa.
          </p>
          <p className="mt-12 text-xs text-branco/50">
            © 2026 Manuali. Feito com amor em Recife e Caruaru.
          </p>
        </div>
      </section>

      {/* Metade Direita - Formulário */}
      <section className="flex w-full flex-col items-center justify-center bg-creme p-6 lg:w-1/2 h-full overflow-y-auto">
        <div className="w-full max-w-[400px] rounded-xl bg-branco p-6 sm:p-8 shadow-sm">
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
            <span className="font-serif text-2xl font-bold text-marrom-escuro">
              Manuali
            </span>
          </div>

          <h2 className="font-serif text-3xl font-bold text-marrom-escuro">
            Olá novamente!
          </h2>
          <p className="mt-1 text-sm text-texto-secundario">
            Escolha como deseja se conectar hoje.
          </p>

          {/* Toggle Segmentado */}
          <div className="mt-4 flex w-full rounded-lg bg-black/5 p-1">
            <button
              onClick={() => setTipoUsuario("artesao")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tipoUsuario === "artesao"
                  ? "bg-terracota text-branco shadow"
                  : "text-texto-secundario hover:text-marrom-escuro"
              }`}
            >
              Artesão
            </button>
            <button
              onClick={() => setTipoUsuario("consumidor")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tipoUsuario === "consumidor"
                  ? "bg-terracota text-branco shadow"
                  : "text-texto-secundario hover:text-marrom-escuro"
              }`}
            >
              Consumidor
            </button>
            <button
              onClick={() => setTipoUsuario("admin")}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                tipoUsuario === "admin"
                  ? "bg-terracota text-branco shadow"
                  : "text-texto-secundario hover:text-marrom-escuro"
              }`}
            >
              Adm
            </button>
          </div>

          <form className="mt-5 space-y-3" onSubmit={processarEntrada}>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-marrom-escuro"
              >
                E-mail cadastrado
              </label>
              <input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={enderecoEmail}
                onChange={(eventoChange) => setEnderecoEmail(eventoChange.target.value)}
                className="w-full rounded-lg border border-borda bg-transparent px-3 py-2.5 text-sm text-marrom-escuro placeholder:text-texto-secundario/50 focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-marrom-escuro"
              >
                Sua senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="••••••••"
                  value={senhaAcesso}
                  onChange={(eventoChange) => setSenhaAcesso(eventoChange.target.value)}
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

            <div className="flex justify-end pt-1">
              <a
                href="#"
                className="text-sm text-terracota hover:text-terracota-hover"
              >
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-terracota py-2.5 text-sm font-bold tracking-wide text-branco transition-colors hover:bg-terracota-hover disabled:opacity-60"
            >
              {carregando ? (
                <>
                  <Sparkles className="size-4 animate-spin" />
                  Conectando...
                </>
              ) : (
                "ENTRAR NO ESPAÇO"
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-texto-secundario">
            Não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="font-medium text-terracota hover:text-terracota-hover"
            >
              Criar cadastro
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
