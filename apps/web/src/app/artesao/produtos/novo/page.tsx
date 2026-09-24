"use client";

import { ArrowLeft, ImagePlus, Loader2, Save, Sparkles, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

import { useSessaoArtesao } from "@/components/artisan/artisan-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fakeApiService } from "@/lib/fake-api";
import { formatBRL } from "@/lib/money";
import {
  CategoriaArtesanato,
  RequisicaoNovoProduto,
  StatusPublicacaoProduto,
} from "@/lib/types";

const URL_IMAGEM_PADRAO =
  "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80";

const LADO_MAXIMO_IMAGEM = 1024;

// Redimensiona a imagem local para no máximo 1024px e converte para JPEG
function redimensionarImagemParaUpload(arquivo: File): Promise<string> {
  return new Promise((resolverPromessa) => {
    const leitorArquivo = new FileReader();
    leitorArquivo.onload = () => {
      const imagemOrigem = new window.Image();
      imagemOrigem.onload = () => {
        const escala = Math.min(
          1,
          LADO_MAXIMO_IMAGEM / Math.max(imagemOrigem.width, imagemOrigem.height)
        );
        const canvasRedimensionado = document.createElement("canvas");
        canvasRedimensionado.width = Math.round(imagemOrigem.width * escala);
        canvasRedimensionado.height = Math.round(imagemOrigem.height * escala);
        const contextoDesenho = canvasRedimensionado.getContext("2d");
        if (!contextoDesenho) {
          resolverPromessa(leitorArquivo.result as string);
          return;
        }
        contextoDesenho.drawImage(
          imagemOrigem,
          0,
          0,
          canvasRedimensionado.width,
          canvasRedimensionado.height
        );
        resolverPromessa(canvasRedimensionado.toDataURL("image/jpeg", 0.85));
      };
      imagemOrigem.src = leitorArquivo.result as string;
    };
    leitorArquivo.readAsDataURL(arquivo);
  });
}

export default function PaginaCadastroProdutoArtesao({
  searchParams,
}: {
  searchParams: Promise<{ editar?: string }>;
}) {
  const router = useRouter();
  const artesaoLogado = useSessaoArtesao();
  const parametrosBusca = use(searchParams);
  const identificadorProdutoEdicao = parametrosBusca.editar ?? null;

  const [categorias, setCategorias] = useState<CategoriaArtesanato[]>([]);
  const [tituloProduto, setTituloProduto] = useState("");
  const [identificadorCategoria, setIdentificadorCategoria] = useState("cat-1");
  const [precoReaisTexto, setPrecoReaisTexto] = useState("150,00");
  const [estoqueDisponivel, setEstoqueDisponivel] = useState(5);
  const [descricaoCompleta, setDescricaoCompleta] = useState("");
  const [historiaPeca, setHistoriaPeca] = useState("");
  const [galeriaImagens, setGaleriaImagens] = useState<string[]>([]);
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(Boolean(identificadorProdutoEdicao));

  // Carrega categorias e, no modo edição, os dados atuais da peça
  useEffect(() => {
    let montado = true;

    async function buscarDadosFormulario() {
      const listaCategorias = await fakeApiService.listarCategorias();
      setCategorias(listaCategorias);

      if (identificadorProdutoEdicao) {
        const produtoEncontrado = await fakeApiService.obterProdutoPorId(
          identificadorProdutoEdicao
        );
        if (montado && produtoEncontrado) {
          setTituloProduto(produtoEncontrado.tituloProduto);
          setIdentificadorCategoria(produtoEncontrado.identificadorCategoria);
          setPrecoReaisTexto(
            (produtoEncontrado.precoEmCentavos / 100).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })
          );
          setEstoqueDisponivel(produtoEncontrado.estoqueDisponivel);
          setDescricaoCompleta(produtoEncontrado.descricaoCompleta);
          setHistoriaPeca(produtoEncontrado.historiaPeca || "");
          setGaleriaImagens(
            produtoEncontrado.urlImagensGaleria?.length
              ? produtoEncontrado.urlImagensGaleria
              : [produtoEncontrado.urlImagem]
          );
        }
      }

      if (montado) setCarregando(false);
    }

    buscarDadosFormulario();

    return () => {
      montado = false;
    };
  }, [identificadorProdutoEdicao]);

  const processarSelecaoImagens = async (
    eventoChange: React.ChangeEvent<HTMLInputElement>
  ) => {
    const arquivosSelecionados = Array.from(eventoChange.target.files || []);
    if (!arquivosSelecionados.length) return;

    const novasImagens = await Promise.all(
      arquivosSelecionados.map(redimensionarImagemParaUpload)
    );
    setGaleriaImagens((imagensAtuais) =>
      [...imagensAtuais, ...novasImagens].slice(0, 6)
    );
    eventoChange.target.value = "";
  };

  const salvarProdutoComStatus = async (
    statusPublicacao: StatusPublicacaoProduto
  ) => {
    if (!tituloProduto.trim()) {
      toast.error("Informe o título da peça.");
      return;
    }

    const valorLimpo = precoReaisTexto
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();
    const precoEmCentavos = Math.round(parseFloat(valorLimpo) * 100) || 10000;

    setSalvando(true);

    try {
      const requisicaoProduto: RequisicaoNovoProduto = {
        tituloProduto: tituloProduto.trim(),
        identificadorCategoria,
        precoEmCentavos,
        estoqueDisponivel,
        urlImagem: galeriaImagens[0] || URL_IMAGEM_PADRAO,
        descricaoCompleta:
          descricaoCompleta.trim() || "Obra artesanal confeccionada à mão no ateliê.",
        historiaPeca: historiaPeca.trim() || undefined,
        urlImagensGaleria: galeriaImagens.length ? galeriaImagens : undefined,
        statusPublicacao,
      };

      if (identificadorProdutoEdicao) {
        await fakeApiService.atualizarProduto(
          identificadorProdutoEdicao,
          requisicaoProduto
        );
        toast.success("Alterações salvas com sucesso!");
      } else {
        await fakeApiService.cadastrarProduto(requisicaoProduto, artesaoLogado);
        toast.success(
          statusPublicacao === "rascunho"
            ? "Rascunho salvo! Você pode publicar depois."
            : "Peça publicada na vitrine com sucesso!"
        );
      }

      router.push("/artesao/produtos");
    } catch {
      toast.error("Erro ao salvar a peça. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const nomeCategoriaSelecionada =
    categorias.find(
      (categoriaItem) => categoriaItem.identificadorCategoria === identificadorCategoria
    )?.nomeCategoria || "Artesanato Geral";

  const imagemPreview = galeriaImagens[0] || URL_IMAGEM_PADRAO;
  const precoPreviewCentavos =
    Math.round(parseFloat(precoReaisTexto.replace(/\./g, "").replace(",", ".")) * 100) || 0;

  if (carregando) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#6E6259]">
        <Loader2 className="size-6 animate-spin text-[#C85A32]" />
        <p className="text-sm">Carregando peça...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/artesao/produtos"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#6E6259] hover:text-[#C85A32] transition-colors"
        >
          <ArrowLeft className="size-3.5" /> Voltar para Meus Produtos
        </Link>
        <h1 className="mt-2 font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">
          {identificadorProdutoEdicao ? "Editar Peça" : "Cadastro de Nova Peça"}
        </h1>
        <p className="text-sm text-[#6E6259]">
          {identificadorProdutoEdicao
            ? "Atualize as informações da obra do seu ateliê."
            : "Adicione uma nova obra artesanal à sua vitrine."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Formulário */}
        <div className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs lg:col-span-2">
          <div className="space-y-1.5">
            <Label htmlFor="input-titulo-peca" className="text-xs font-semibold text-[#2C221E]">
              Título da Peça / Obra *
            </Label>
            <Input
              id="input-titulo-peca"
              type="text"
              placeholder="Ex: Bonecos de Barro - Retirantes"
              value={tituloProduto}
              onChange={(eventoChange) => setTituloProduto(eventoChange.target.value)}
              className="h-10 border-stone-200 focus:border-[#C85A32]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="select-categoria" className="text-xs font-semibold text-[#2C221E]">
                Categoria
              </Label>
              <select
                id="select-categoria"
                value={identificadorCategoria}
                onChange={(eventoChange) =>
                  setIdentificadorCategoria(eventoChange.target.value)
                }
                className="h-10 w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 text-sm text-[#2C221E] focus:border-[#C85A32]"
              >
                {categorias.map((categoriaItem) => (
                  <option
                    key={categoriaItem.identificadorCategoria}
                    value={categoriaItem.identificadorCategoria}
                  >
                    {categoriaItem.nomeCategoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="input-preco-peca" className="text-xs font-semibold text-[#2C221E]">
                Preço de Venda (R$) *
              </Label>
              <Input
                id="input-preco-peca"
                type="text"
                inputMode="decimal"
                placeholder="180,00"
                value={precoReaisTexto}
                onChange={(eventoChange) => setPrecoReaisTexto(eventoChange.target.value)}
                className="h-10 border-stone-200 focus:border-[#C85A32]"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="input-estoque-peca" className="text-xs font-semibold text-[#2C221E]">
                Estoque Disponível
              </Label>
              <Input
                id="input-estoque-peca"
                type="number"
                min="0"
                value={estoqueDisponivel}
                onChange={(eventoChange) =>
                  setEstoqueDisponivel(Math.max(0, parseInt(eventoChange.target.value) || 0))
                }
                className="h-10 border-stone-200 focus:border-[#C85A32]"
              />
            </div>
          </div>

          {/* Upload de Imagens */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-[#2C221E]">
              Fotos da Peça
            </Label>
            <label
              htmlFor="input-imagens-peca"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-6 text-center transition-colors hover:border-[#C85A32] hover:bg-[#FAF0EC]/40"
            >
              <Upload className="size-5 text-[#C85A32]" />
              <span className="text-sm font-semibold text-[#2C221E]">
                Clique para enviar imagens
              </span>
              <span className="text-xs text-[#6E6259]">
                JPG ou PNG, redimensionadas automaticamente (máx. 1024px)
              </span>
              <input
                id="input-imagens-peca"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={processarSelecaoImagens}
                className="hidden"
              />
            </label>

            {galeriaImagens.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {galeriaImagens.map((urlImagemGaleria, indice) => (
                  <div
                    key={`${urlImagemGaleria.slice(0, 40)}-${indice}`}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-stone-200"
                  >
                    <Image
                      src={urlImagemGaleria}
                      alt={`Imagem ${indice + 1} da peça`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setGaleriaImagens((imagensAtuais) =>
                          imagensAtuais.filter((_, indiceAtual) => indiceAtual !== indice)
                        )
                      }
                      className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
                      aria-label="Remover imagem"
                    >
                      <Trash2 className="size-3" />
                    </button>
                    {indice === 0 && (
                      <span className="absolute bottom-1 left-1 rounded bg-[#C85A32] px-1.5 py-0.5 text-[9px] font-bold text-white">
                        Capa
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="textarea-descricao" className="text-xs font-semibold text-[#2C221E]">
              Descrição do Produto
            </Label>
            <textarea
              id="textarea-descricao"
              rows={4}
              placeholder="Descreva as técnicas aplicadas, matérias-primas utilizadas e o acabamento..."
              value={descricaoCompleta}
              onChange={(eventoChange) => setDescricaoCompleta(eventoChange.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-[#C85A32] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="textarea-historia" className="text-xs font-semibold text-[#2C221E]">
              História da Peça
            </Label>
            <textarea
              id="textarea-historia"
              rows={3}
              placeholder="Conte a origem, inspiração e tradição por trás desta obra..."
              value={historiaPeca}
              onChange={(eventoChange) => setHistoriaPeca(eventoChange.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-[#C85A32] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t border-stone-100 pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={salvando}
              onClick={() => salvarProdutoComStatus("rascunho")}
              className="rounded-xl border-stone-300 text-xs font-bold"
            >
              <Save className="mr-1.5 size-3.5" /> Salvar Rascunho
            </Button>
            <Button
              type="button"
              disabled={salvando}
              onClick={() => salvarProdutoComStatus("ativo")}
              className="rounded-xl bg-[#C85A32] px-5 text-xs font-bold text-white shadow-md shadow-[#C85A32]/25 hover:bg-[#B24D28]"
            >
              {salvando ? (
                <>
                  <Loader2 className="mr-1.5 size-4 animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-1.5 size-4" />
                  {identificadorProdutoEdicao ? "Salvar Alterações" : "Publicar na Vitrine"}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Preview ao vivo */}
        <aside className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
            Preview da Peça
          </h2>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md">
            <div className="relative aspect-4/3 w-full bg-stone-100">
              <Image
                src={imagemPreview}
                alt={tituloProduto || "Preview da peça"}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <span className="rounded-full bg-[#FAF0EC] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
                {nomeCategoriaSelecionada}
              </span>
              <h3 className="mt-2 line-clamp-1 font-serif text-lg font-bold text-[#2C221E]">
                {tituloProduto || "Título da peça"}
              </h3>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6E6259]">
                <ImagePlus className="size-3.5 text-[#C85A32]" />
                <span className="truncate font-medium">{artesaoLogado.nomeCompleto}</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3">
                <span className="font-serif text-xl font-bold text-[#C85A32]">
                  {precoPreviewCentavos ? formatBRL(precoPreviewCentavos) : "R$ —"}
                </span>
                <span className="text-xs text-[#6E6259]">
                  {galeriaImagens.length} foto{galeriaImagens.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#6E6259]">
            O preview reflete como a peça aparecerá no catálogo. A imagem principal é usada
            como capa na vitrine.
          </p>
        </aside>
      </div>
    </div>
  );
}