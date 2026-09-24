import { PontoSerie, SegmentoRosca } from "@/lib/admin-data";

interface PropriedadesGraficoLinha {
  dados: PontoSerie[];
  cor?: string;
  identificadorId?: string;
}

const LARGURA_GRAFICO_LINHA = 560;
const ALTURA_GRAFICO_LINHA = 210;
const MARGEM_ESQUERDA = 8;
const MARGEM_DIREITA = 8;
const MARGEM_SUPERIOR = 18;
const MARGEM_INFERIOR = 28;

export function GraficoLinha({
  dados,
  cor = "#C85A32",
  identificadorId = "linha",
}: PropriedadesGraficoLinha) {
  const valores = dados.map((pontoItem) => pontoItem.valor);
  const valorMaximo = Math.max(...valores);
  const valorMinimo = Math.min(...valores);
  const amplitudeValores = valorMaximo - valorMinimo || 1;

  const larguraUtil = LARGURA_GRAFICO_LINHA - MARGEM_ESQUERDA - MARGEM_DIREITA;
  const alturaUtil = ALTURA_GRAFICO_LINHA - MARGEM_SUPERIOR - MARGEM_INFERIOR;

  const obterCoordenada = (indice: number, valor: number) => {
    const x =
      MARGEM_ESQUERDA + (indice / Math.max(1, dados.length - 1)) * larguraUtil;
    const y =
      MARGEM_SUPERIOR + (1 - (valor - valorMinimo) / amplitudeValores) * alturaUtil;
    return { x, y };
  };

  const pontosLinha = dados
    .map((pontoItem, indice) => {
      const coordenada = obterCoordenada(indice, pontoItem.valor);
      return `${coordenada.x},${coordenada.y}`;
    })
    .join(" ");

  const coordenadaInicial = obterCoordenada(0, dados[0].valor);
  const coordenadaFinal = obterCoordenada(dados.length - 1, dados[dados.length - 1].valor);
  const linhaBase = MARGEM_SUPERIOR + alturaUtil;
  const caminhoArea = `M${coordenadaInicial.x},${coordenadaInicial.y} L${pontosLinha.replace(/ /g, " L")} L${coordenadaFinal.x},${linhaBase} L${coordenadaInicial.x},${linhaBase} Z`;

  const idGradiente = `gradiente-area-${identificadorId}-${cor.replace("#", "")}`;

  return (
    <svg
      viewBox={`0 0 ${LARGURA_GRAFICO_LINHA} ${ALTURA_GRAFICO_LINHA}`}
      className="w-full"
      role="img"
      aria-label="Gráfico de linha"
    >
      <defs>
        <linearGradient id={idGradiente} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={cor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={cor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={caminhoArea} fill={`url(#${idGradiente})`} />
      <polyline
        points={pontosLinha}
        fill="none"
        stroke={cor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {dados.map((pontoItem, indice) => {
        const coordenada = obterCoordenada(indice, pontoItem.valor);
        return (
          <g key={`${pontoItem.rotulo}-${indice}`}>
            <circle
              cx={coordenada.x}
              cy={coordenada.y}
              r="4"
              fill="#FFFFFF"
              stroke={cor}
              strokeWidth="2"
            />
            <text
              x={coordenada.x}
              y={ALTURA_GRAFICO_LINHA - 8}
              textAnchor="middle"
              fontSize="11"
              fill="#78716C"
            >
              {pontoItem.rotulo}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

interface PropriedadesGraficoRosca {
  segmentos: SegmentoRosca[];
  identificadorId?: string;
  rotuloCentral?: string;
}

const RAIO_ROSCA = 70;
const CIRCUNFERENCIA_ROSCA = 2 * Math.PI * RAIO_ROSCA;

export function GraficoRosca({
  segmentos,
  identificadorId = "rosca",
  rotuloCentral = "total",
}: PropriedadesGraficoRosca) {
  const totalSegmentos =
    segmentos.reduce((acumulado, segmento) => acumulado + segmento.valor, 0) || 1;

  // Frações acumuladas calculadas de forma pura para compor o deslocamento de cada arco
  const segmentosDesenhados = segmentos.map((segmento, indice) => {
    const proporcaoAnterior = segmentos
      .slice(0, indice)
      .reduce(
        (acumulado, segmentoAnterior) =>
          acumulado + segmentoAnterior.valor / totalSegmentos,
        0
      );
    return {
      rotulo: segmento.rotulo,
      valor: segmento.valor,
      cor: segmento.cor,
      fracao: segmento.valor / totalSegmentos,
      deslocamento: -proporcaoAnterior * CIRCUNFERENCIA_ROSCA,
    };
  });

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 200 200"
          className="size-40 -rotate-90"
          role="img"
          aria-label={identificadorId}
        >
          <circle
            cx="100"
            cy="100"
            r={RAIO_ROSCA}
            fill="none"
            stroke="#F0EDE8"
            strokeWidth="24"
          />
          {segmentosDesenhados.map((segmento) => (
            <circle
              key={segmento.rotulo}
              cx="100"
              cy="100"
              r={RAIO_ROSCA}
              fill="none"
              stroke={segmento.cor}
              strokeWidth="24"
              strokeDasharray={`${segmento.fracao * CIRCUNFERENCIA_ROSCA} ${CIRCUNFERENCIA_ROSCA}`}
              strokeDashoffset={segmento.deslocamento}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-serif text-2xl font-bold text-[#2C221E]">
            {totalSegmentos}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6E6259]">
            {rotuloCentral}
          </span>
        </div>
      </div>

      <ul className="min-w-40 flex-1 space-y-2.5">
        {segmentos.map((segmento) => (
          <li
            key={segmento.rotulo}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="flex items-center gap-2 text-[#6E6259]">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: segmento.cor }}
              />
              {segmento.rotulo}
            </span>
            <span className="font-bold text-[#2C221E]">{segmento.valor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface ItemGraficoBarras {
  rotulo: string;
  valor: number;
  cor?: string;
}

interface PropriedadesGraficoBarras {
  itens: ItemGraficoBarras[];
  sufixoValor?: string;
}

export function GraficoBarras({
  itens,
  sufixoValor = "",
}: PropriedadesGraficoBarras) {
  const valorMaximo = Math.max(...itens.map((item) => item.valor)) || 1;

  return (
    <div className="space-y-4">
      {itens.map((item) => (
        <div key={item.rotulo}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#2C221E]">{item.rotulo}</span>
            <span className="font-bold text-[#6E6259]">
              {item.valor}
              {sufixoValor}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(item.valor / valorMaximo) * 100}%`,
                backgroundColor: item.cor || "#C85A32",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}