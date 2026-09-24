import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

interface PropriedadesMetricCard {
  rotulo: string;
  valorFormatado: string;
  variacao?: string;
  icone: LucideIcon;
  classesCorIcone: string;
}

export function MetricCard({
  rotulo,
  valorFormatado,
  variacao,
  icone: IconeItem,
  classesCorIcone,
}: PropriedadesMetricCard) {
  const variacaoPositiva = variacao?.startsWith("+") ?? true;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#6E6259]">{rotulo}</span>
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${classesCorIcone}`}
        >
          <IconeItem className="size-5" />
        </div>
      </div>
      <p className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#2C221E]">
        {valorFormatado}
      </p>
      {variacao && (
        <p
          className={`mt-1 flex items-center gap-1 text-xs font-bold ${
            variacaoPositiva ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {variacaoPositiva ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {variacao}
          <span className="font-normal text-[#6E6259]">vs. período anterior</span>
        </p>
      )}
    </div>
  );
}