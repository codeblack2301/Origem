/**
 * Tipos e Enumerações Base do Marketplace Manuali (API v1)
 * Segue estritamente as convenções de contrato e enums da aplicação.
 */

// Enumerações Oficiais do Contrato de API
export type StatusCuradoria = "pendente" | "aprovado" | "rejeitado" | "bloqueado";

export type StatusPedido =
  | "aguardando_pagamento"
  | "pago"
  | "preparando"
  | "enviado"
  | "entregue"
  | "cancelado";

export type StatusPagamento = "pendente" | "aprovado" | "recusado" | "estornado";

export type MetodoPagamento = "cartao_credito" | "pix" | "boleto";

export type StatusEntrega =
  | "aguardando_envio"
  | "enviado"
  | "em_transito"
  | "entregue";

export type PapelUsuario = "ARTESAO" | "CONSUMIDOR" | "ADMIN";

// Estado de publicação do produto na vitrine do artesão (painel)
export type StatusPublicacaoProduto = "ativo" | "rascunho" | "pausado";

// Estado da conta de um usuário no painel administrativo
export type StatusContaUsuario = "aprovado" | "ativo" | "pendente" | "bloqueado";

// Perfil de Usuário Autenticado na Sessão
export interface PerfilUsuarioAutenticado {
  identificadorUsuario: string;
  nomeCompleto: string;
  enderecoEmail: string;
  papelUsuario: PapelUsuario;
  identificadorArtesao?: string;
  nomeAtelie?: string;
  documentoCpfCnpj?: string;
  biografiaAtelie?: string;
  statusCuradoria?: StatusCuradoria;
  tokenAcessoJwt: string;
}

// Produto do Catálogo Artesanal
export interface ItemCatalogoProduto {
  identificadorProduto: string;
  tituloProduto: string;
  identificadorArtesao: string;
  nomeArtesao: string;
  nomeAtelie: string;
  identificadorCategoria: string;
  nomeCategoria: string;
  precoEmCentavos: number;
  estoqueDisponivel: number;
  urlImagem: string;
  descricaoCompleta: string;
  estatutoAtivo: boolean;
  notaAvaliacaoMedia: number;
  totalAvaliacoes: number;
  statusPublicacao?: StatusPublicacaoProduto;
  historiaPeca?: string;
  urlImagensGaleria?: string[];
}

// Categoria de Artesanato
export interface CategoriaArtesanato {
  identificadorCategoria: string;
  nomeCategoria: string;
  slugCategoria: string;
  descricaoCategoria: string;
}

// Item no Carrinho de Compras
export interface ItemCarrinhoCompra {
  identificadorItemCarrinho: string;
  produtoItem: ItemCatalogoProduto;
  quantidadeSolicitada: number;
  subtotalEmCentavos: number;
}

// Carrinho Consolidado do Consumidor
export interface CarrinhoCompraCliente {
  itensCarrinho: ItemCarrinhoCompra[];
  valorTotalEmCentavos: number;
  quantidadeTotalItens: number;
}

// Item Individual do Pedido
export interface ItemPedidoResumido {
  identificadorProduto: string;
  tituloProduto: string;
  quantidadeComprada: number;
  precoUnitarioEmCentavos: number;
  urlImagem: string;
}

// Pedido Efetuado
export interface PedidoCliente {
  identificadorPedido: string;
  identificadorComprador: string;
  nomeComprador: string;
  identificadorArtesao: string;
  nomeAtelie: string;
  itensPedido: ItemPedidoResumido[];
  valorTotalEmCentavos: number;
  statusPedido: StatusPedido;
  statusPagamento: StatusPagamento;
  metodoPagamento: MetodoPagamento;
  statusEntrega: StatusEntrega;
  dataCriacaoIso: string;
}

// DTOs para requisições de Autenticação e Cadastro
export interface RequisicaoRegistroArtesao {
  nomeCompleto: string;
  enderecoEmail: string;
  senhaAcesso: string;
  documentoCpfCnpj: string;
  nomeAtelie: string;
  biografiaAtelie: string;
}

export interface RequisicaoRegistroConsumidor {
  nomeCompleto: string;
  enderecoEmail: string;
  senhaAcesso: string;
}

export interface RequisicaoAutenticacaoLogin {
  enderecoEmail: string;
  senhaAcesso: string;
  papelDesejado: PapelUsuario;
}

export interface RequisicaoNovoProduto {
  tituloProduto: string;
  identificadorCategoria: string;
  precoEmCentavos: number;
  estoqueDisponivel: number;
  urlImagem: string;
  descricaoCompleta: string;
  historiaPeca?: string;
  urlImagensGaleria?: string[];
  statusPublicacao?: StatusPublicacaoProduto;
}

// Usuário consultável no painel administrativo
export interface UsuarioPainelAdmin {
  identificadorUsuario: string;
  nomeCompleto: string;
  enderecoEmail: string;
  papelUsuario: PapelUsuario;
  statusConta: StatusContaUsuario;
  motivoBloqueio?: string;
}
