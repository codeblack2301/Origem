"use client";

import { ChevronLeft, ChevronRight, Search, ShieldOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BlockUserModal } from "@/components/admin/block-user-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { USUARIOS_PAINEL_ADMIN } from "@/lib/admin-data";
import { PapelUsuario, StatusContaUsuario, UsuarioPainelAdmin } from "@/lib/types";

const QUANTIDADE_USUARIOS_POR_PAGINA = 20;

const ROTULO_STATUS_CONTA: Record<StatusContaUsuario, string> = {
  aprovado: "Aprovado",
  ativo: "Ativo",
  pendente: "Pendente",
  bloqueado: "Bloqueado",
};

const CLASSES_BADGE_STATUS_CONTA: Record<StatusContaUsuario, string> = {
  aprovado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ativo: "bg-blue-50 text-blue-700 border-blue-200",
  pendente: "bg-amber-50 text-amber-700 border-amber-200",
  bloqueado: "bg-red-50 text-red-700 border-red-200",
};

const ROTULO_PAPEL_USUARIO: Record<PapelUsuario, string> = {
  ARTESAO: "Artesão",
  CONSUMIDOR: "Consumidor",
  ADMIN: "Admin",
};

type FiltroPapel = "todos" | PapelUsuario;
type FiltroStatus = "todos" | StatusContaUsuario;

export default function PaginaUsuariosAdmin() {
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroPapel, setFiltroPapel] = useState<FiltroPapel>("todos");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [usuariosListados, setUsuariosListados] = useState<UsuarioPainelAdmin[]>(
    USUARIOS_PAINEL_ADMIN
  );
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [usuarioParaBloquear, setUsuarioParaBloquear] = useState<UsuarioPainelAdmin | null>(
    null
  );

  const usuariosFiltrados = usuariosListados.filter((usuarioItem) => {
    const correspondeBusca =
      !termoBusca.trim() ||
      usuarioItem.nomeCompleto.toLowerCase().includes(termoBusca.trim().toLowerCase()) ||
      usuarioItem.enderecoEmail.toLowerCase().includes(termoBusca.trim().toLowerCase());
    const correspondePapel =
      filtroPapel === "todos" || usuarioItem.papelUsuario === filtroPapel;
    const correspondeStatus =
      filtroStatus === "todos" || usuarioItem.statusConta === filtroStatus;
    return correspondeBusca && correspondePapel && correspondeStatus;
  });

  const totalPaginas = Math.max(
    1,
    Math.ceil(usuariosFiltrados.length / QUANTIDADE_USUARIOS_POR_PAGINA)
  );
  const paginaSegura = Math.min(paginaAtual, totalPaginas);
  const indiceInicial = (paginaSegura - 1) * QUANTIDADE_USUARIOS_POR_PAGINA;
  const usuariosDaPagina = usuariosFiltrados.slice(
    indiceInicial,
    indiceInicial + QUANTIDADE_USUARIOS_POR_PAGINA
  );

  const processarBloqueioUsuario = (
    usuarioAlvo: UsuarioPainelAdmin,
    motivoBloqueio: string
  ) => {
    setUsuariosListados((usuariosAtuais) =>
      usuariosAtuais.map((usuarioItem) =>
        usuarioItem.identificadorUsuario === usuarioAlvo.identificadorUsuario
          ? { ...usuarioItem, statusConta: "bloqueado", motivoBloqueio }
          : usuarioItem
      )
    );
    toast.success(`${usuarioAlvo.nomeCompleto} foi bloqueado com sucesso.`);
  };

  const processarDesbloqueioUsuario = (usuarioAlvo: UsuarioPainelAdmin) => {
    setUsuariosListados((usuariosAtuais) =>
      usuariosAtuais.map((usuarioItem) =>
        usuarioItem.identificadorUsuario === usuarioAlvo.identificadorUsuario
          ? {
              ...usuarioItem,
              statusConta: usuarioAlvo.papelUsuario === "ARTESAO" ? "aprovado" : "ativo",
              motivoBloqueio: undefined,
            }
          : usuarioItem
      )
    );
    toast.info(`${usuarioAlvo.nomeCompleto} foi reativado na plataforma.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#2C221E] sm:text-3xl">Usuários</h1>
        <p className="text-sm text-[#6E6259]">
          Gerencie contas da plataforma, curadoria de artesãos e bloqueios.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <Input
            type="search"
            value={termoBusca}
            onChange={(eventoChange) => {
              setTermoBusca(eventoChange.target.value);
              setPaginaAtual(1);
            }}
            placeholder="Buscar por nome ou e-mail..."
            className="rounded-full border-stone-200 bg-stone-50 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filtroPapel}
            onChange={(eventoChange) => {
              setFiltroPapel(eventoChange.target.value as FiltroPapel);
              setPaginaAtual(1);
            }}
            className="h-9 rounded-lg border border-stone-200 bg-white px-3 text-xs font-semibold text-[#2C221E] focus:border-[#C85A32]"
            aria-label="Filtrar por papel"
          >
            <option value="todos">Todos os papéis</option>
            <option value="CONSUMIDOR">Consumidores</option>
            <option value="ARTESAO">Artesãos</option>
            <option value="ADMIN">Administradores</option>
          </select>

          <select
            value={filtroStatus}
            onChange={(eventoChange) => {
              setFiltroStatus(eventoChange.target.value as FiltroStatus);
              setPaginaAtual(1);
            }}
            className="h-9 rounded-lg border border-stone-200 bg-white px-3 text-xs font-semibold text-[#2C221E] focus:border-[#C85A32]"
            aria-label="Filtrar por status"
          >
            <option value="todos">Todos os status</option>
            <option value="ativo">Ativos</option>
            <option value="aprovado">Aprovados</option>
            <option value="pendente">Pendentes</option>
            <option value="bloqueado">Bloqueados</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-165 text-left text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                <th className="px-4 py-3">Usuário</th>
                <th className="px-4 py-3">Papel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {usuariosDaPagina.map((usuarioItem) => (
                <tr key={usuarioItem.identificadorUsuario} className="hover:bg-[#FAF7F2]/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FAF3F0] text-xs font-bold text-[#C85A32]">
                        {usuarioItem.nomeCompleto.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-[#2C221E]">
                          {usuarioItem.nomeCompleto}
                        </p>
                        <p className="truncate text-xs text-[#6E6259]">
                          {usuarioItem.enderecoEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className="bg-stone-100 text-stone-600 border-stone-200 uppercase text-[10px]">
                      {ROTULO_PAPEL_USUARIO[usuarioItem.papelUsuario]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`uppercase text-[10px] ${CLASSES_BADGE_STATUS_CONTA[usuarioItem.statusConta]}`}
                    >
                      {ROTULO_STATUS_CONTA[usuarioItem.statusConta]}
                    </Badge>
                    {usuarioItem.motivoBloqueio && (
                      <p className="mt-1 max-w-52 truncate text-[10px] text-stone-400" title={usuarioItem.motivoBloqueio}>
                        {usuarioItem.motivoBloqueio}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {usuarioItem.statusConta === "bloqueado" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => processarDesbloqueioUsuario(usuarioItem)}
                        className="text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                      >
                        <ShieldOff className="mr-1 size-3.5" /> Desbloquear
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setUsuarioParaBloquear(usuarioItem)}
                        className="text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Bloquear
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usuariosFiltrados.length === 0 && (
          <div className="p-10 text-center text-sm text-[#6E6259]">
            Nenhum usuário encontrado com os filtros atuais.
          </div>
        )}

        {/* Paginação */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-stone-100 px-4 py-3 sm:flex-row">
          <p className="text-xs text-[#6E6259]">
            Exibindo{" "}
            <strong className="text-[#2C221E]">
              {usuariosFiltrados.length === 0 ? 0 : indiceInicial + 1}–
              {Math.min(indiceInicial + QUANTIDADE_USUARIOS_POR_PAGINA, usuariosFiltrados.length)}
            </strong>{" "}
            de <strong className="text-[#2C221E]">{usuariosFiltrados.length}</strong> usuários
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={paginaSegura === 1}
              onClick={() => setPaginaAtual((pagina) => Math.max(1, pagina - 1))}
              className="h-8 rounded-lg border-stone-200 text-xs"
            >
              <ChevronLeft className="size-3.5" /> Anterior
            </Button>
            {Array.from({ length: totalPaginas }).map((_, indice) => (
              <button
                key={indice}
                type="button"
                onClick={() => setPaginaAtual(indice + 1)}
                className={`h-8 w-8 rounded-lg text-xs font-bold transition-colors ${
                  paginaSegura === indice + 1
                    ? "bg-[#2C221E] text-white"
                    : "text-[#6E6259] hover:bg-stone-100"
                }`}
              >
                {indice + 1}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={paginaSegura === totalPaginas}
              onClick={() => setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1))}
              className="h-8 rounded-lg border-stone-200 text-xs"
            >
              Próxima <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <BlockUserModal
        usuario={usuarioParaBloquear}
        aoFechar={() => setUsuarioParaBloquear(null)}
        aoConfirmar={processarBloqueioUsuario}
      />
    </div>
  );
}