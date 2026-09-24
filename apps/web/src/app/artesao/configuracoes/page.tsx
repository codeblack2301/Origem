"use client";

import { Bell, Eye, Lock, Shield, Store } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AlternanciaConfiguracao({
  ativo,
  aoAlternar,
  icone: IconeItem,
  titulo,
  descricao,
}: {
  ativo: boolean;
  aoAlternar: () => void;
  icone: typeof Bell;
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF0EC] text-[#C85A32]">
          <IconeItem className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2C221E]">{titulo}</p>
          <p className="text-xs text-[#6E6259]">{descricao}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={ativo}
        onClick={aoAlternar}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          ativo ? "bg-[#C85A32]" : "bg-stone-200"
        }`}
        aria-label={titulo}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
            ativo ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function PaginaConfiguracoesArtesao() {
  const [notificacaoNovoPedido, setNotificacaoNovoPedido] = useState(true);
  const [notificacaoEstoque, setNotificacaoEstoque] = useState(true);
  const [visibilidadePublica, setVisibilidadePublica] = useState(true);
  const [resumoMensal, setResumoMensal] = useState(false);

  const processarSalvar = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Configurações</h1>
        <p className="text-sm text-[#6E6259]">
          Preferências de notificação, visibilidade e segurança do seu ateliê.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-stone-200 shadow-xs">
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-2 font-serif text-lg font-bold text-[#2C221E]">
              <Bell className="size-5 text-[#C85A32]" /> Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-stone-100 p-6 pt-0">
            <AlternanciaConfiguracao
              ativo={notificacaoNovoPedido}
              aoAlternar={() => setNotificacaoNovoPedido((valorAtual) => !valorAtual)}
              icone={Bell}
              titulo="Novos pedidos"
              descricao="Avise por e-mail quando um novo pedido chegar."
            />
            <AlternanciaConfiguracao
              ativo={notificacaoEstoque}
              aoAlternar={() => setNotificacaoEstoque((valorAtual) => !valorAtual)}
              icone={Shield}
              titulo="Estoque baixo"
              descricao="Alerta quando uma peça estiver com estoque baixo."
            />
            <AlternanciaConfiguracao
              ativo={resumoMensal}
              aoAlternar={() => setResumoMensal((valorAtual) => !valorAtual)}
              icone={Store}
              titulo="Resumo mensal de vendas"
              descricao="Receba um relatório com o desempenho do mês."
            />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-stone-200 shadow-xs">
          <CardHeader className="p-6">
            <CardTitle className="flex items-center gap-2 font-serif text-lg font-bold text-[#2C221E]">
              <Eye className="size-5 text-[#C85A32]" /> Visibilidade & Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-stone-100 p-6 pt-0">
            <AlternanciaConfiguracao
              ativo={visibilidadePublica}
              aoAlternar={() => setVisibilidadePublica((valorAtual) => !valorAtual)}
              icone={Eye}
              titulo="Ateliê público na vitrine"
              descricao="Exibe seu ateliê e peças publicadas para consumidores."
            />
            <div className="flex items-start gap-3 py-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#FAF0EC] text-[#C85A32]">
                <Lock className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2C221E]">Trocar senha</p>
                <p className="text-xs text-[#6E6259]">Atualize sua senha de acesso periodicamente.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={processarSalvar}
          className="rounded-xl bg-[#C85A32] px-6 text-xs font-bold text-white shadow-md shadow-[#C85A32]/25 hover:bg-[#B24D28]"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}