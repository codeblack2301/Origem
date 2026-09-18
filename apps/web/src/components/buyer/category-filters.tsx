"use client";

import { CategoriaArtesanato } from "@/lib/types";

interface PropriedadesCategoryFilters {
  categorias: CategoriaArtesanato[];
  categoriaSelecionadaId: string;
  aoSelecionarCategoria: (categoriaId: string) => void;
}

export function CategoryFilters({
  categorias,
  categoriaSelecionadaId,
  aoSelecionarCategoria,
}: PropriedadesCategoryFilters) {
  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max">
        {/* Opção Todos */}
        <button
          type="button"
          onClick={() => aoSelecionarCategoria("todos")}
          className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
            categoriaSelecionadaId === "todos"
              ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/25"
              : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
          }`}
        >
          Todos
        </button>

        {/* Lista de Categorias vindas da API */}
        {categorias.map((categoriaItem) => {
          const eSelecionada =
            categoriaSelecionadaId === categoriaItem.identificadorCategoria;
          return (
            <button
              key={categoriaItem.identificadorCategoria}
              type="button"
              onClick={() =>
                aoSelecionarCategoria(categoriaItem.identificadorCategoria)
              }
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 ${
                eSelecionada
                  ? "bg-[#C85A32] text-white shadow-md shadow-[#C85A32]/25"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {categoriaItem.nomeCategoria}
            </button>
          );
        })}
      </div>
    </div>
  );
}
