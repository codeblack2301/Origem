"use client";

import { Award, CheckCircle, Mail, MapPin, Store, User, Wallet } from "lucide-react";
import Link from "next/link";

import { useSessaoArtesao } from "@/components/artisan/artisan-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaginaPerfilArtesao() {
  const artesaoLogado = useSessaoArtesao();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Meu Perfil</h1>
        <p className="text-sm text-[#6E6259]">
          Dados públicos do seu ateliê na plataforma Manuali.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cartão de identidade */}
        <Card className="rounded-2xl border-stone-200 shadow-xs lg:col-span-1">
          <CardHeader className="items-center p-6 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#FAF3F0] text-3xl font-bold text-[#C85A32] ring-2 ring-[#C85A32]/20">
              {artesaoLogado.nomeCompleto.charAt(0).toUpperCase()}
            </div>
            <CardTitle className="mt-3 font-serif text-xl font-bold text-[#2C221E]">
              {artesaoLogado.nomeCompleto}
            </CardTitle>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <CheckCircle className="mr-1 size-3 text-emerald-600" />
              Curadoria {artesaoLogado.statusCuradoria === "aprovado" ? "Aprovada" : "Pendente"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-stone-100 p-6 text-sm">
            <div className="flex items-center gap-2 text-[#6E6259]">
              <Store className="size-4 shrink-0 text-[#C85A32]" />
              <span className="truncate font-semibold">{artesaoLogado.nomeAtelie}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6E6259]">
              <Mail className="size-4 shrink-0 text-[#C85A32]" />
              <span className="truncate">{artesaoLogado.enderecoEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6E6259]">
              <Wallet className="size-4 shrink-0 text-[#C85A32]" />
              <span>{artesaoLogado.documentoCpfCnpj}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6E6259]">
              <MapPin className="size-4 shrink-0 text-[#C85A32]" />
              <span>Alto do Moura, Caruaru - PE</span>
            </div>
          </CardContent>
        </Card>

        {/* Biografia e extrato */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-2xl border-stone-200 shadow-xs">
            <CardHeader className="p-6">
              <CardTitle className="flex items-center gap-2 font-serif text-lg font-bold text-[#2C221E]">
                <Award className="size-5 text-[#C85A32]" /> Sobre o Ateliê
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 text-sm leading-relaxed text-[#2C221E]/80">
              {artesaoLogado.biografiaAtelie ||
                "Ateliê artesanal dedicado a preservar as técnicas tradicionais do artesanato pernambucano."}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-stone-200 shadow-xs">
            <CardHeader className="flex items-center justify-between p-6">
              <CardTitle className="font-serif text-lg font-bold text-[#2C221E]">
                Minha Vitrine
              </CardTitle>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-stone-300 text-xs font-semibold"
              >
                <Link href="/comprador">Ver como comprador</Link>
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 p-6 pt-0 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-[#FAF7F2] p-4">
                <User className="size-4 text-[#C85A32]" />
                <p className="mt-2 text-xs text-[#6E6259]">Nome do artesão</p>
                <p className="font-bold text-[#2C221E]">{artesaoLogado.nomeCompleto}</p>
              </div>
              <div className="rounded-xl bg-[#FAF7F2] p-4">
                <Store className="size-4 text-[#C85A32]" />
                <p className="mt-2 text-xs text-[#6E6259]">Ateliê exibido</p>
                <p className="font-bold text-[#2C221E]">{artesaoLogado.nomeAtelie}</p>
              </div>
              <div className="rounded-xl bg-[#FAF7F2] p-4">
                <Award className="size-4 text-[#C85A32]" />
                <p className="mt-2 text-xs text-[#6E6259]">Técnica principal</p>
                <p className="font-bold text-[#2C221E]">Cerâmica e Barro</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}