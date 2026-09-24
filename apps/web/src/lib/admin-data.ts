import { UsuarioPainelAdmin } from "./types";

// Dados sintéticos do painel administrativo (indicadores globais sem base real)
export const DATA_PAINEL_ADMIN = "12 de mai. de 2025 - 14:32";

export const METRICAS_GERAIS_ADMIN = {
  totalVendasCentavos: 15823050,
  variacaoVendas: "+12%",
  totalPedidos: 412,
  variacaoPedidos: "+8%",
  totalUsuarios: 966,
  totalConsumidores: 890,
  totalArtesaos: 76,
  produtosAtivos: 340,
  variacaoProdutos: "+6%",
};

export interface PontoSerie {
  rotulo: string;
  valor: number;
}

// Série de "Vendas em andamento" (últimos 30 dias) — eixo Y em reais × 1000
export const SERIE_VENDAS_ANDAMENTO: PontoSerie[] = [
  { rotulo: "12/04", valor: 3200 },
  { rotulo: "15/04", valor: 4100 },
  { rotulo: "18/04", valor: 3800 },
  { rotulo: "21/04", valor: 5600 },
  { rotulo: "25/04", valor: 4900 },
  { rotulo: "28/04", valor: 6400 },
  { rotulo: "01/05", valor: 5900 },
  { rotulo: "03/05", valor: 7500 },
  { rotulo: "05/05", valor: 6100 },
  { rotulo: "08/05", valor: 6800 },
  { rotulo: "10/05", valor: 5200 },
  { rotulo: "12/05", valor: 7200 },
];

export interface SegmentoRosca {
  rotulo: string;
  valor: number;
  cor: string;
}

export const STATUS_PEDIDOS_ADMIN: SegmentoRosca[] = [
  { rotulo: "Entregues", valor: 312, cor: "#16A34A" },
  { rotulo: "Em andamento", valor: 63, cor: "#F59E0B" },
  { rotulo: "Cancelados", valor: 22, cor: "#DC2626" },
  { rotulo: "Reembolsos", valor: 15, cor: "#A8A29E" },
];

export interface PeriodoVendas {
  rotulo: string;
  intervaloDatas: string;
  gmvCentavos: number;
  pedidosFinalizados: number;
  ticketMedioCentavos: number;
  variacaoGmv: string;
  variacaoPedidos: string;
  variacaoTicket: string;
  serieGrafico: PontoSerie[];
}

const SERIE_VENDAS_7_DIAS: PontoSerie[] = [
  { rotulo: "06/05", valor: 1800 },
  { rotulo: "07/05", valor: 2400 },
  { rotulo: "08/05", valor: 3100 },
  { rotulo: "09/05", valor: 2200 },
  { rotulo: "10/05", valor: 2900 },
  { rotulo: "11/05", valor: 3500 },
  { rotulo: "12/05", valor: 4100 },
];

const SERIE_VENDAS_90_DIAS: PontoSerie[] = [
  { rotulo: "12/02", valor: 21000 },
  { rotulo: "22/02", valor: 24500 },
  { rotulo: "04/03", valor: 23000 },
  { rotulo: "14/03", valor: 29000 },
  { rotulo: "24/03", valor: 27000 },
  { rotulo: "03/04", valor: 33000 },
  { rotulo: "13/04", valor: 31500 },
  { rotulo: "23/04", valor: 36500 },
  { rotulo: "03/05", valor: 34800 },
  { rotulo: "12/05", valor: 39000 },
];

export const PERIODOS_VENDAS: Record<string, PeriodoVendas> = {
  "7": {
    rotulo: "7 dias",
    intervaloDatas: "De 06/05/2025 até 12/05/2025",
    gmvCentavos: 1143080,
    pedidosFinalizados: 42,
    ticketMedioCentavos: 27216,
    variacaoGmv: "+9%",
    variacaoPedidos: "+7%",
    variacaoTicket: "+3%",
    serieGrafico: SERIE_VENDAS_7_DIAS,
  },
  "30": {
    rotulo: "30 dias",
    intervaloDatas: "De 12/04/2025 até 12/05/2025",
    gmvCentavos: 4521030,
    pedidosFinalizados: 118,
    ticketMedioCentavos: 38314,
    variacaoGmv: "+18%",
    variacaoPedidos: "+14%",
    variacaoTicket: "+5%",
    serieGrafico: SERIE_VENDAS_ANDAMENTO,
  },
  "90": {
    rotulo: "90 dias",
    intervaloDatas: "De 12/02/2025 até 12/05/2025",
    gmvCentavos: 11874090,
    pedidosFinalizados: 341,
    ticketMedioCentavos: 34821,
    variacaoGmv: "+22%",
    variacaoPedidos: "+19%",
    variacaoTicket: "+4%",
    serieGrafico: SERIE_VENDAS_90_DIAS,
  },
  custom: {
    rotulo: "Custom",
    intervaloDatas: "De 12/04/2025 até 12/05/2025",
    gmvCentavos: 4521030,
    pedidosFinalizados: 118,
    ticketMedioCentavos: 38314,
    variacaoGmv: "+18%",
    variacaoPedidos: "+14%",
    variacaoTicket: "+5%",
    serieGrafico: SERIE_VENDAS_ANDAMENTO,
  },
};

export interface MaisVendidoAdmin {
  posicao: number;
  tituloProduto: string;
  nomeCategoria: string;
  unidadesVendidas: number;
  urlImagem: string;
}

export const MAIS_VENDIDOS_ADMIN: MaisVendidoAdmin[] = [
  {
    posicao: 1,
    tituloProduto: "Bonecos de Barro - Retirantes",
    nomeCategoria: "Cerâmica e Barro",
    unidadesVendidas: 34,
    urlImagem:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80",
  },
  {
    posicao: 2,
    tituloProduto: "Caminho de Mesa Renascença",
    nomeCategoria: "Renda Renascença",
    unidadesVendidas: 28,
    urlImagem:
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=400&q=80",
  },
  {
    posicao: 3,
    tituloProduto: "Leão de Nuca em Madeira",
    nomeCategoria: "Talhas de Madeira",
    unidadesVendidas: 21,
    urlImagem:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
  },
  {
    posicao: 4,
    tituloProduto: "Bolsa de Ouricuri Tecida",
    nomeCategoria: "Palha & Fibras",
    unidadesVendidas: 18,
    urlImagem:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80",
  },
  {
    posicao: 5,
    tituloProduto: "Luminária Rendada em Metal",
    nomeCategoria: "Metal Trabalhado",
    unidadesVendidas: 15,
    urlImagem:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80",
  },
];

export interface CategoriaConversaoAdmin {
  nomeCategoria: string;
  taxaConversao: number; // percentual inteiro
}

export const CATEGORIAS_CONVERSAO_ADMIN: CategoriaConversaoAdmin[] = [
  { nomeCategoria: "Cerâmica e Barro", taxaConversao: 12 },
  { nomeCategoria: "Talhas de Madeira", taxaConversao: 9 },
  { nomeCategoria: "Renda Renascença", taxaConversao: 7 },
  { nomeCategoria: "Palha & Fibras", taxaConversao: 6 },
  { nomeCategoria: "Metal Trabalhado", taxaConversao: 4 },
];

export const METRICAS_CONSUMIDORES_ADMIN = {
  novosCadastrosMes: 45,
  variacaoCadastros: "+12%",
  taxaRecorrencia: "31%",
  variacaoRecorrencia: "+9%",
};

export const SERIE_NOVOS_CADASTRADOS: PontoSerie[] = [
  { rotulo: "12/04", valor: 28 },
  { rotulo: "15/04", valor: 36 },
  { rotulo: "18/04", valor: 30 },
  { rotulo: "21/04", valor: 42 },
  { rotulo: "25/04", valor: 38 },
  { rotulo: "28/04", valor: 48 },
  { rotulo: "01/05", valor: 45 },
  { rotulo: "03/05", valor: 52 },
  { rotulo: "05/05", valor: 47 },
  { rotulo: "08/05", valor: 55 },
  { rotulo: "10/05", valor: 50 },
  { rotulo: "12/05", valor: 45 },
];

export const PERFIL_CONSUMIDORES_ADMIN: SegmentoRosca[] = [
  { rotulo: "Ativos", valor: 625, cor: "#16A34A" },
  { rotulo: "Inativos", valor: 250, cor: "#A8A29E" },
  { rotulo: "Bloqueados", valor: 15, cor: "#DC2626" },
];

export const METRICAS_ARTESAOS_ADMIN = {
  totalArtesaos: 76,
  variacaoTotal: "+6%",
  ativos: 58,
  variacaoAtivos: "+8%",
};

export const SERIE_ARTESAOS_CADASTRADOS: PontoSerie[] = [
  { rotulo: "Dez", valor: 48 },
  { rotulo: "Jan", valor: 54 },
  { rotulo: "Fev", valor: 58 },
  { rotulo: "Mar", valor: 63 },
  { rotulo: "Abr", valor: 69 },
  { rotulo: "Mai", valor: 76 },
];

export const STATUS_ARTESAOS_ADMIN: SegmentoRosca[] = [
  { rotulo: "Ativos", valor: 58, cor: "#16A34A" },
  { rotulo: "Em análise", valor: 12, cor: "#F59E0B" },
  { rotulo: "Bloqueados", valor: 6, cor: "#DC2626" },
];

// Usuários consultáveis no painel (sintéticos, sem dados reais de pessoas)
export const USUARIOS_PAINEL_ADMIN: UsuarioPainelAdmin[] = [
  {
    identificadorUsuario: "usr-001",
    nomeCompleto: "Maria Silva",
    enderecoEmail: "maria.silva@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
  {
    identificadorUsuario: "usr-002",
    nomeCompleto: "João Pereira",
    enderecoEmail: "joao.pereira@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-003",
    nomeCompleto: "Ana Costa",
    enderecoEmail: "ana.costa@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "pendente",
  },
  {
    identificadorUsuario: "usr-004",
    nomeCompleto: "Carlos Souza",
    enderecoEmail: "carlos.souza@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "bloqueado",
    motivoBloqueio: "Conduta imprópria reportada por múltiplos compradores.",
  },
  {
    identificadorUsuario: "usr-005",
    nomeCompleto: "Fernanda Lima",
    enderecoEmail: "fernanda.lima@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-006",
    nomeCompleto: "Paulo Mendes",
    enderecoEmail: "paulo.mendes@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
  {
    identificadorUsuario: "usr-007",
    nomeCompleto: "Beatriz Rocha",
    enderecoEmail: "beatriz.rocha@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-008",
    nomeCompleto: "Rafael Lopes",
    enderecoEmail: "rafael.lopes@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "pendente",
  },
  {
    identificadorUsuario: "usr-009",
    nomeCompleto: "Juliana Alves",
    enderecoEmail: "juliana.alves@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-010",
    nomeCompleto: "Marcos Vega",
    enderecoEmail: "marcos.vega@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "bloqueado",
    motivoBloqueio: "Tentativa de pagamento com cartão de terceiros.",
  },
  {
    identificadorUsuario: "usr-011",
    nomeCompleto: "Luciana Barros",
    enderecoEmail: "luciana.barros@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
  {
    identificadorUsuario: "usr-012",
    nomeCompleto: "Roberto Nunes",
    enderecoEmail: "roberto.nunes@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-013",
    nomeCompleto: "Camila Duarte",
    enderecoEmail: "camila.duarte@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "bloqueado",
    motivoBloqueio: "Avaliação falsa registrada em pedidos de terceiros.",
  },
  {
    identificadorUsuario: "usr-014",
    nomeCompleto: "Eduardo Farias",
    enderecoEmail: "eduardo.farias@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "pendente",
  },
  {
    identificadorUsuario: "usr-015",
    nomeCompleto: "Patrícia Gomes",
    enderecoEmail: "patricia.gomes@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-016",
    nomeCompleto: "Diego Cardoso",
    enderecoEmail: "diego.cardoso@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-017",
    nomeCompleto: "Sofia Reis",
    enderecoEmail: "sofia.reis@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
  {
    identificadorUsuario: "usr-018",
    nomeCompleto: "Otávio Melo",
    enderecoEmail: "otavio.melo@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "pendente",
  },
  {
    identificadorUsuario: "usr-019",
    nomeCompleto: "Larissa Freitas",
    enderecoEmail: "larissa.freitas@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "bloqueado",
    motivoBloqueio: "Reincidência em prazo de entrega não cumprido.",
  },
  {
    identificadorUsuario: "usr-020",
    nomeCompleto: "Bruno Teixeira",
    enderecoEmail: "bruno.teixeira@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-021",
    nomeCompleto: "Amanda Ribeiro",
    enderecoEmail: "amanda.ribeiro@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
  {
    identificadorUsuario: "usr-022",
    nomeCompleto: "Gustavo Pinto",
    enderecoEmail: "gustavo.pinto@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-023",
    nomeCompleto: "Elaine Martins",
    enderecoEmail: "elaine.martins@email.com",
    papelUsuario: "CONSUMIDOR",
    statusConta: "ativo",
  },
  {
    identificadorUsuario: "usr-024",
    nomeCompleto: "Fábio Santana",
    enderecoEmail: "fabio.santana@email.com",
    papelUsuario: "ARTESAO",
    statusConta: "aprovado",
  },
];