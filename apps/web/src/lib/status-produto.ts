import { ItemCatalogoProduto, StatusPublicacaoProduto } from "./types";

// Limiar que define quando o estoque é considerado baixo no painel (RN do Figma)
export const LIMIAR_ESTOQUE_BAIXO = 3;

export type StatusEstoqueProduto = "disponivel" | "baixo" | "esgotado";

export function obterStatusPublicacao(
  produto: ItemCatalogoProduto
): StatusPublicacaoProduto {
  return produto.statusPublicacao ?? (produto.estatutoAtivo ? "ativo" : "pausado");
}

export function obterStatusEstoque(estoque: number): StatusEstoqueProduto {
  if (estoque <= 0) return "esgotado";
  if (estoque <= LIMIAR_ESTOQUE_BAIXO) return "baixo";
  return "disponivel";
}

export function obterRotuloStatusEstoque(status: StatusEstoqueProduto): string {
  if (status === "baixo") return "Estoque baixo";
  if (status === "esgotado") return "Indisponível";
  return "Disponível";
}

export function obterRotuloStatusPublicacao(status: StatusPublicacaoProduto): string {
  if (status === "rascunho") return "Rascunho";
  if (status === "pausado") return "Pausado";
  return "Publicado";
}

export function obterClassesBadgeStatusPublicacao(
  status: StatusPublicacaoProduto
): string {
  if (status === "ativo") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (status === "rascunho") return "bg-stone-100 text-stone-600 border-stone-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

export function obterClassesBadgeStatusEstoque(
  status: StatusEstoqueProduto
): string {
  if (status === "baixo") return "bg-amber-50 text-amber-700 border-amber-200";
  if (status === "esgotado") return "bg-red-50 text-red-700 border-red-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}