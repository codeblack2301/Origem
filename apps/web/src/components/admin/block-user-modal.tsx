"use client";

import { Ban, Loader2, ShieldAlert, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UsuarioPainelAdmin } from "@/lib/types";

interface PropriedadesBlockUserModal {
  usuario: UsuarioPainelAdmin | null;
  aoFechar: () => void;
  aoConfirmar: (usuario: UsuarioPainelAdmin, motivoBloqueio: string) => void;
}

export function BlockUserModal({
  usuario,
  aoFechar,
  aoConfirmar,
}: PropriedadesBlockUserModal) {
  const [motivoBloqueio, setMotivoBloqueio] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  if (!usuario) return null;

  const processarConfirmacao = () => {
    if (!motivoBloqueio.trim()) {
      toast.error("Informe o motivo do bloqueio.");
      return;
    }
    setConfirmando(true);
    // Pequena pausa para dar feedback visual de confirmação
    setTimeout(() => {
      aoConfirmar(usuario, motivoBloqueio.trim());
      setConfirmando(false);
      setMotivoBloqueio("");
      aoFechar();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Ban className="size-5" />
          </div>
          <button
            type="button"
            onClick={aoFechar}
            className="rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>

        <h2 className="mt-4 font-serif text-xl font-bold text-[#2C221E]">
          Bloquear acesso do usuário
        </h2>
        <p className="mt-1 text-sm text-[#6E6259]">
          Você está bloqueando{" "}
          <strong className="text-[#2C221E]">{usuario.nomeCompleto}</strong> (
          {usuario.enderecoEmail}). O usuário não poderá mais usar a plataforma até
          ser reativado.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
          <ShieldAlert className="size-4 shrink-0" />
          <span>
            Ação registrada no histórico de moderação. O bloqueio pode ser revertido a
            qualquer momento.
          </span>
        </div>

        <div className="mt-4 space-y-1.5">
          <Label htmlFor="textarea-motivo-bloqueio" className="text-xs font-semibold text-[#2C221E]">
            Motivo do bloqueio *
          </Label>
          <textarea
            id="textarea-motivo-bloqueio"
            rows={3}
            value={motivoBloqueio}
            onChange={(eventoChange) => setMotivoBloqueio(eventoChange.target.value)}
            placeholder="Descreva o motivo para o registro de auditoria..."
            className="w-full rounded-lg border border-stone-200 bg-stone-50/50 p-3 text-sm focus:border-[#C85A32] focus:outline-none"
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={aoFechar}
            className="rounded-xl border-stone-300 text-xs font-bold"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={confirmando}
            onClick={processarConfirmacao}
            className="rounded-xl bg-red-600 px-4 text-xs font-bold text-white shadow-md shadow-red-600/25 hover:bg-red-700"
          >
            {confirmando ? (
              <>
                <Loader2 className="mr-1.5 size-3.5 animate-spin" /> Bloqueando...
              </>
            ) : (
              <>
                <Ban className="mr-1.5 size-3.5" /> Bloquear Usuário
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}