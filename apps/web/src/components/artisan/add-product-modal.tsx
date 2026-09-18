"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fakeApiService } from "@/lib/fake-api";
import { CategoriaArtesanato, PerfilUsuarioAutenticado } from "@/lib/types";

interface PropriedadesAddProductModal {
  aberto: boolean;
  aoFechar: () => void;
  categorias: CategoriaArtesanato[];
  artesaoLogado: PerfilUsuarioAutenticado;
  aoProdutoAdicionado: () => void;
}

export function AddProductModal({
  aberto,
  aoFechar,
  categorias,
  artesaoLogado,
  aoProdutoAdicionado,
}: PropriedadesAddProductModal) {
  const [tituloProduto, setTituloProduto] = useState("");
  const [identificadorCategoria, setIdentificadorCategoria] = useState(
    categorias[0]?.identificadorCategoria || "cat-1"
  );
  const [precoReaisText, setPrecoReaisText] = useState("150,00");
  const [estoqueDisponivel, setEstoqueDisponivel] = useState(5);
  const [urlImagem, setUrlImagem] = useState("");
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [salvando, setSalvando] = useState(false);

  if (!aberto) return null;

  const processarCadastroNovoProduto = async (
    eventoFormulario: React.FormEvent<HTMLFormElement>
  ) => {
    eventoFormulario.preventDefault();

    if (!tituloProduto) {
      toast.error("Informe o título do produto.");
      return;
    }

    setSalvando(true);

    try {
      // Converte valor formatado em reais para centavos inteiros (ex: "150,00" -> 15000)
      const valorLimpo = precoReaisText
        .replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
        .trim();
      const precoEmCentavos = Math.round(parseFloat(valorLimpo) * 100) || 10000;

      await fakeApiService.cadastrarProduto(
        {
          tituloProduto,
          identificadorCategoria,
          precoEmCentavos,
          estoqueDisponivel,
          urlImagem:
            urlImagem ||
            "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
          descricaoCompleta:
            descricaoCompleta ||
            "Obra artesanal confeccionada à mão no ateliê.",
        },
        artesaoLogado
      );

      toast.success("Nova peça cadastrada com sucesso!");
      aoProdutoAdicionado();
      aoFechar();
    } catch (_erroCadastro) {
      toast.error("Erro ao cadastrar peça.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h2 className="font-serif text-xl font-bold text-[#2C221E]">
            Cadastrar Nova Peça no Ateliê
          </h2>
          <button
            type="button"
            onClick={aoFechar}
            className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={processarCadastroNovoProduto} className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="input-titulo-obra" className="text-xs font-semibold text-[#2C221E]">
              Título da Peça / Obra *
            </Label>
            <Input
              id="input-titulo-obra"
              type="text"
              placeholder="Ex: Escultura de Barro Mestre Vitalino"
              value={tituloProduto}
              onChange={(eventoChange) => setTituloProduto(eventoChange.target.value)}
              className="h-10 border-stone-200 focus:border-[#C85A32]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="select-categoria" className="text-xs font-semibold text-[#2C221E]">
                Categoria
              </Label>
              <select
                id="select-categoria"
                value={identificadorCategoria}
                onChange={(eventoChange) => setIdentificadorCategoria(eventoChange.target.value)}
                className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 text-sm text-[#2C221E] focus:border-[#C85A32]"
              >
                {categorias.map((cat) => (
                  <option key={cat.identificadorCategoria} value={cat.identificadorCategoria}>
                    {cat.nomeCategoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="input-preco-obra" className="text-xs font-semibold text-[#2C221E]">
                Preço de Venda (R$) *
              </Label>
              <Input
                id="input-preco-obra"
                type="text"
                placeholder="180,00"
                value={precoReaisText}
                onChange={(eventoChange) => setPrecoReaisText(eventoChange.target.value)}
                className="h-10 border-stone-200 focus:border-[#C85A32]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="input-estoque-obra" className="text-xs font-semibold text-[#2C221E]">
                Estoque Inicial
              </Label>
              <Input
                id="input-estoque-obra"
                type="number"
                min="1"
                value={estoqueDisponivel}
                onChange={(eventoChange) => setEstoqueDisponivel(parseInt(eventoChange.target.value) || 1)}
                className="h-10 border-stone-200 focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="input-url-imagem" className="text-xs font-semibold text-[#2C221E]">
                URL da Imagem da Peça
              </Label>
              <Input
                id="input-url-imagem"
                type="text"
                placeholder="https://..."
                value={urlImagem}
                onChange={(eventoChange) => setUrlImagem(eventoChange.target.value)}
                className="h-10 border-stone-200 focus:border-[#C85A32]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="textarea-descricao-obra" className="text-xs font-semibold text-[#2C221E]">
              Descrição do Produto e História da Produção
            </Label>
            <textarea
              id="textarea-descricao-obra"
              rows={3}
              placeholder="Descreva as técnicas aplicadas, argila/madeira/linha utilizada e o tempo de confecção..."
              value={descricaoCompleta}
              onChange={(eventoChange) => setDescricaoCompleta(eventoChange.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-[#C85A32] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={aoFechar}
              className="rounded-xl border-stone-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={salvando}
              className="rounded-xl bg-[#C85A32] text-white hover:bg-[#B24D28]"
            >
              {salvando ? (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-4 animate-spin" /> Salvando...
                </span>
              ) : (
                "Cadastrar Peça"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
