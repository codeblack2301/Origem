import { describe, expect, it } from "vitest";
import { formatBRL } from "./money";

describe("formatBRL", () => {
  it("formata centavos como moeda real", () => {
    expect(formatBRL(1250)).toBe("R$ 12,50");
  });

  it("rejeita valores não inteiros", () => {
    expect(() => formatBRL(12.5)).toThrow("centavos");
  });

  it("aceita zero", () => {
    expect(formatBRL(0)).toBe("R$ 0,00");
  });
});