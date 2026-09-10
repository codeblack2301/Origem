export function formatBRL(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error("preço deve ser em centavos inteiros");
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}