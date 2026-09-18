"use client";

import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fakeApiService } from "@/lib/fake-api";
import { PapelUsuario } from "@/lib/types";

interface PropriedadesLoginForm {
  aoAlternarParaCadastro: () => void;
}

export function LoginForm({ aoAlternarParaCadastro }: PropriedadesLoginForm) {
  const router = useRouter();

  // Estado do papel selecionado (Artesão ou Consumidor) para personalizar o login
  const [papelSelecionado, setPapelSelecionado] = useState<PapelUsuario>("ARTESAO");
  const [enderecoEmail, setEnderecoEmail] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [exibirSenha, setExibirSenha] = useState(false);
  const [carregandoProcessamento, setCarregandoProcessamento] = useState(false);

  // Processa o envio do formulário efetuando a autenticação na Fake API
  const processarSubmissaoFormulario = async (
    eventoFormulario: React.FormEvent<HTMLFormElement>
  ) => {
    eventoFormulario.preventDefault();
    setCarregandoProcessamento(true);

    try {
      const perfilAutenticado = await fakeApiService.autenticarUsuario({
        enderecoEmail: enderecoEmail || (papelSelecionado === "ARTESAO" ? "artesao@manuali.com.br" : "comprador@manuali.com.br"),
        senhaAcesso: senhaAcesso || "senha123",
        papelDesejado: papelSelecionado,
      });

      toast.success(
        `Bem-vindo(a) de volta, ${perfilAutenticado.nomeCompleto}!`
      );

      // Redireciona o usuário para a página correspondente ao papel
      if (perfilAutenticado.papelUsuario === "ARTESAO") {
        router.push("/artesao");
      } else {
        router.push("/comprador");
      }
    } catch (_erroAutenticacao) {
      toast.error("Erro ao efetuar login. Verifique suas credenciais.");
    } finally {
      setCarregandoProcessamento(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
      {/* Cabeçalho do Card */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#2C221E]">
          Olá novamente!
        </h2>
        <p className="mt-1 text-sm text-[#6E6259]">
          Escolha como deseja se conectar hoje.
        </p>
      </div>

      {/* Seletor de Papel (Artesão vs Consumidor) - Fiel ao Figma */}
      <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-xl bg-[#F4EFEA] p-1.5">
        <button
          type="button"
          onClick={() => setPapelSelecionado("ARTESAO")}
          className={`flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            papelSelecionado === "ARTESAO"
              ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20"
              : "text-[#6E6259] hover:text-[#2C221E]"
          }`}
        >
          Artesão
        </button>

        <button
          type="button"
          onClick={() => setPapelSelecionado("CONSUMIDOR")}
          className={`flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
            papelSelecionado === "CONSUMIDOR"
              ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/20"
              : "text-[#6E6259] hover:text-[#2C221E]"
          }`}
        >
          Consumidor
        </button>
      </div>

      {/* Formulário de Login */}
      <form onSubmit={processarSubmissaoFormulario} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="input-email" className="text-xs font-semibold text-[#2C221E]">
            E-mail cadastrado
          </Label>
          <Input
            id="input-email"
            type="email"
            placeholder="exemplo@email.com"
            value={enderecoEmail}
            onChange={(eventoChange) => setEnderecoEmail(eventoChange.target.value)}
            className="h-11 rounded-lg border-stone-200 bg-stone-50/50 px-3.5 text-sm transition-colors focus:border-[#C85A32] focus:ring-[#C85A32]/20"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="input-senha" className="text-xs font-semibold text-[#2C221E]">
            Sua senha
          </Label>
          <div className="relative">
            <Input
              id="input-senha"
              type={exibirSenha ? "text" : "password"}
              placeholder="••••••••"
              value={senhaAcesso}
              onChange={(eventoChange) => setSenhaAcesso(eventoChange.target.value)}
              className="h-11 rounded-lg border-stone-200 bg-stone-50/50 pl-3.5 pr-10 text-sm transition-colors focus:border-[#C85A32] focus:ring-[#C85A32]/20"
            />
            <button
              type="button"
              onClick={() => setExibirSenha(!exibirSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-hidden"
              aria-label={exibirSenha ? "Ocultar senha" : "Exibir senha"}
            >
              {exibirSenha ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a
            href="#esqueci-senha"
            onClick={(eventoLink) => {
              eventoLink.preventDefault();
              toast.info("Em breve: recuperação de senha por e-mail!");
            }}
            className="text-xs font-medium text-[#C85A32] hover:underline"
          >
            Esqueceu a senha?
          </a>
        </div>

        <Button
          type="submit"
          disabled={carregandoProcessamento}
          className="mt-2 h-12 w-full rounded-xl bg-[#C85A32] text-sm font-bold tracking-wider text-white transition-all hover:bg-[#B24D28] shadow-md shadow-[#C85A32]/25 active:scale-[0.99]"
        >
          {carregandoProcessamento ? (
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 animate-spin" /> Conectando...
            </span>
          ) : (
            "ENTRAR NO ESPAÇO"
          )}
        </Button>
      </form>

      {/* Link para Cadastro */}
      <div className="mt-6 text-center text-xs text-[#6E6259]">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={aoAlternarParaCadastro}
          className="font-bold text-[#C85A32] hover:underline"
        >
          Criar cadastro
        </button>
      </div>
    </div>
  );
}
