"use client";

import { useState } from "react";
import { Toaster } from "sonner";

import { ArtisanDashboard } from "@/components/artisan/artisan-dashboard";
import { obterSessaoUsuarioLogado } from "@/lib/fake-api";
import { PerfilUsuarioAutenticado } from "@/lib/types";

export default function PaginaHomeArtesao() {
  const [artesaoLogado] = useState<PerfilUsuarioAutenticado | null>(() => {
    if (typeof window === "undefined") return null;
    const sessaoAtual = obterSessaoUsuarioLogado();
    if (sessaoAtual && sessaoAtual.papelUsuario === "ARTESAO") {
      return sessaoAtual;
    }
    return {
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
  });

  if (!artesaoLogado) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      <ArtisanDashboard artesaoLogado={artesaoLogado} />
    </>
  );
}
