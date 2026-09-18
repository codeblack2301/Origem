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

interface PropriedadesRegisterForm {
  aoAlternarParaLogin: () => void;
}

export function RegisterForm({ aoAlternarParaLogin }: PropriedadesRegisterForm) {
  const router = useRouter();

  // Tipo de cadastro (Artesão ou Consumidor)
  const [papelCadastro, setPapelCadastro] = useState<PapelUsuario>("ARTESAO");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [enderecoEmail, setEnderecoEmail] = useState("");
  const [senhaAcesso, setSenhaAcesso] = useState("");
  const [documentoCpfCnpj, setDocumentoCpfCnpj] = useState("");
  const [biografiaAtelie, setBiografiaAtelie] = useState("");
  const [exibirSenha, setExibirSenha] = useState(false);
  const [carregandoProcessamento, setCarregandoProcessamento] = useState(false);

  // Processa o cadastro de novo usuário na Fake API conforme o papel
  const processarSubmissaoCadastro = async (
    eventoFormulario: React.FormEvent<HTMLFormElement>
  ) => {
    eventoFormulario.preventDefault();

    if (!nomeCompleto || !enderecoEmail || !senhaAcesso) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setCarregandoProcessamento(true);

    try {
      if (papelCadastro === "ARTESAO") {
        await fakeApiService.registrarArtesao({
          nomeCompleto,
          enderecoEmail,
          senhaAcesso,
          documentoCpfCnpj: documentoCpfCnpj || "00.000.000/0001-00",
          nomeAtelie: `Ateliê ${nomeCompleto.split(" ")[0]}`,
          biografiaAtelie: biografiaAtelie || "História dedicada ao artesanato regional.",
        });
        toast.success("Conta de Artesão criada com sucesso!");
        router.push("/artesao");
      } else {
        await fakeApiService.registrarConsumidor({
          nomeCompleto,
          enderecoEmail,
          senhaAcesso,
        });
        toast.success("Conta de Consumidor criada com sucesso!");
        router.push("/comprador");
      }
    } catch (_erroCadastro) {
      toast.error("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setCarregandoProcessamento(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl shadow-stone-200/50 border border-stone-100">
      {/* Cabeçalho do Card */}
      <div className="mb-6 text-center sm:text-left">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-[#2C221E]">
          Crie sua conta
        </h2>
        <p className="mt-1 text-sm text-[#6E6259]">
          Junte-se à nossa comunidade de fomento à cultura local.
        </p>
      </div>

      <form onSubmit={processarSubmissaoCadastro} className="space-y-4">
        {/* Seletor Tipo de Cadastro - Fiel ao Figma (Imagens de Radio/Pills) */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-[#2C221E]">
            Tipo de Cadastro
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <label
              onClick={() => setPapelCadastro("ARTESAO")}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-all ${
                papelCadastro === "ARTESAO"
                  ? "border-[#C85A32] bg-[#FAF3F0] text-[#C85A32] ring-1 ring-[#C85A32]"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              <div
                className={`flex size-4 items-center justify-center rounded-full border ${
                  papelCadastro === "ARTESAO"
                    ? "border-[#C85A32] bg-[#C85A32]"
                    : "border-stone-300"
                }`}
              >
                {papelCadastro === "ARTESAO" && (
                  <div className="size-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-xs font-semibold">Quero vender (Artesão)</span>
            </label>

            <label
              onClick={() => setPapelCadastro("CONSUMIDOR")}
              className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-all ${
                papelCadastro === "CONSUMIDOR"
                  ? "border-[#C85A32] bg-[#FAF3F0] text-[#C85A32] ring-1 ring-[#C85A32]"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              <div
                className={`flex size-4 items-center justify-center rounded-full border ${
                  papelCadastro === "CONSUMIDOR"
                    ? "border-[#C85A32] bg-[#C85A32]"
                    : "border-stone-300"
                }`}
              >
                {papelCadastro === "CONSUMIDOR" && (
                  <div className="size-1.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-xs font-semibold">Quero comprar</span>
            </label>
          </div>
        </div>

        {/* Nome Completo */}
        <div className="space-y-1.5">
          <Label htmlFor="input-nome" className="text-xs font-semibold text-[#2C221E]">
            Nome Completo
          </Label>
          <Input
            id="input-nome"
            type="text"
            placeholder="Como quer ser chamado"
            value={nomeCompleto}
            onChange={(eventoChange) => setNomeCompleto(eventoChange.target.value)}
            className="h-11 rounded-lg border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-[#C85A32] focus:ring-[#C85A32]/20"
            required
          />
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <Label htmlFor="input-email-cadastro" className="text-xs font-semibold text-[#2C221E]">
            E-mail
          </Label>
          <Input
            id="input-email-cadastro"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={enderecoEmail}
            onChange={(eventoChange) => setEnderecoEmail(eventoChange.target.value)}
            className="h-11 rounded-lg border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-[#C85A32] focus:ring-[#C85A32]/20"
            required
          />
        </div>

        {/* Crie sua senha */}
        <div className="space-y-1.5">
          <Label htmlFor="input-senha-cadastro" className="text-xs font-semibold text-[#2C221E]">
            Crie sua senha
          </Label>
          <div className="relative">
            <Input
              id="input-senha-cadastro"
              type={exibirSenha ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={senhaAcesso}
              onChange={(eventoChange) => setSenhaAcesso(eventoChange.target.value)}
              className="h-11 rounded-lg border-stone-200 bg-stone-50/50 pl-3.5 pr-10 text-sm focus:border-[#C85A32] focus:ring-[#C85A32]/20"
              required
            />
            <button
              type="button"
              onClick={() => setExibirSenha(!exibirSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-hidden"
            >
              {exibirSenha ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Campos adicionais para Artesão */}
        {papelCadastro === "ARTESAO" && (
          <>
            <div className="space-y-1.5">
              <Label htmlFor="input-documento" className="text-xs font-semibold text-[#2C221E]">
                CPF ou CNPJ do Ateliê
              </Label>
              <Input
                id="input-documento"
                type="text"
                placeholder="Apenas números"
                value={documentoCpfCnpj}
                onChange={(eventoChange) => setDocumentoCpfCnpj(eventoChange.target.value)}
                className="h-11 rounded-lg border-stone-200 bg-stone-50/50 px-3.5 text-sm focus:border-[#C85A32] focus:ring-[#C85A32]/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="textarea-biografia" className="text-xs font-semibold text-[#2C221E]">
                Biografia / História do seu Ateliê
              </Label>
              <textarea
                id="textarea-biografia"
                rows={3}
                placeholder="Conte um pouco sobre sua trajetória com o artesanato, materiais que utiliza e sua história..."
                value={biografiaAtelie}
                onChange={(eventoChange) => setBiografiaAtelie(eventoChange.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-[#C85A32] focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          disabled={carregandoProcessamento}
          className="mt-2 h-12 w-full rounded-xl bg-[#C85A32] text-sm font-bold tracking-wider text-white transition-all hover:bg-[#B24D28] shadow-md shadow-[#C85A32]/25 active:scale-[0.99]"
        >
          {carregandoProcessamento ? (
            <span className="flex items-center gap-2">
              <Sparkles className="size-4 animate-spin" /> Concluindo...
            </span>
          ) : (
            "CONCLUIR CADASTRO"
          )}
        </Button>
      </form>

      {/* Link para Login */}
      <div className="mt-6 text-center text-xs text-[#6E6259]">
        Já tem cadastro?{" "}
        <button
          type="button"
          onClick={aoAlternarParaLogin}
          className="font-bold text-[#C85A32] hover:underline"
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
}
