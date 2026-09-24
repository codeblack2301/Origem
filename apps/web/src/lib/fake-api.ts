/**
 * Serviço de Fake API da plataforma Manuali.
 * Simula todas as rotas do contrato de API v1 (/api/v1/*) utilizando localStorage
 * para persistência local durante desenvolvimento e testes de demonstração.
 */

import {
  CarrinhoCompraCliente,
  CategoriaArtesanato,
  ItemCarrinhoCompra,
  ItemCatalogoProduto,
  PedidoCliente,
  PerfilUsuarioAutenticado,
  RequisicaoAutenticacaoLogin,
  RequisicaoNovoProduto,
  RequisicaoRegistroArtesao,
  RequisicaoRegistroConsumidor,
  StatusPedido,
} from "./types";

// Chaves de armazenamento no localStorage
const CHAVE_SESSAO_USUARIO = "manuali_sessao_usuario_v1";
const CHAVE_CATALOGO_PRODUTOS = "manuali_catalogo_produtos_v1";
const CHAVE_CARRINHO_COMPRAS = "manuali_carrinho_compras_v1";
const CHAVE_HISTORICO_PEDIDOS = "manuali_historico_pedidos_v1";

// Categorias iniciais baseadas no artesanato pernambucano
export const CATEGORIAS_INICIAIS_MANUALI: CategoriaArtesanato[] = [
  {
    identificadorCategoria: "cat-1",
    nomeCategoria: "Cerâmica e Barro",
    slugCategoria: "ceramica-barro",
    descricaoCategoria:
      "Peças modeladas à mão e queimadas em forno tradicional por mestres ceramistas.",
  },
  {
    identificadorCategoria: "cat-2",
    nomeCategoria: "Renda Renascença",
    slugCategoria: "renda-renascenca",
    descricaoCategoria:
      "Tecedura minuciosa em lacê e linhas de algodão feitas em agulhas de ponta fina.",
  },
  {
    identificadorCategoria: "cat-3",
    nomeCategoria: "Talhas de Madeira",
    slugCategoria: "talhas-madeira",
    descricaoCategoria:
      "Esculturas entalhadas em madeira maciça com inspiração na fauna e tradição sertaneja.",
  },
  {
    identificadorCategoria: "cat-4",
    nomeCategoria: "Palha & Fibras",
    slugCategoria: "palha-fibras",
    descricaoCategoria:
      "Trançados artesanais utilizando fibras nativas do sertão como o ouricuri e carnaúba.",
  },
  {
    identificadorCategoria: "cat-5",
    nomeCategoria: "Metal Trabalhado",
    slugCategoria: "metal-trabalhado",
    descricaoCategoria:
      "Luminárias e utilitários moldados em metal repuxado e cinzelado à mão.",
  },
];

// Produtos iniciais espelhando o protótipo do Figma
const PRODUTOS_INICIAIS_MANUALI: ItemCatalogoProduto[] = [
  {
    identificadorProduto: "prod-1",
    tituloProduto: "Bonecos de Barro - Retirantes",
    identificadorArtesao: "artesao-1",
    nomeArtesao: "Ateliê Mestre Vitalino Filho",
    nomeAtelie: "Ateliê Vitalino (Alto do Moura)",
    identificadorCategoria: "cat-1",
    nomeCategoria: "Cerâmica e Barro",
    precoEmCentavos: 18000, // R$ 180,00
    estoqueDisponivel: 8,
    urlImagem:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Conjunto artesanal feito em argila natural representando a travessia e a esperança dos retirantes no agreste pernambucano.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 4.9,
    totalAvaliacoes: 24,
  },
  {
    identificadorProduto: "prod-2",
    tituloProduto: "Caminho de Mesa Renascença",
    identificadorArtesao: "artesao-2",
    nomeArtesao: "Dona Maria da Renda",
    nomeAtelie: "Rendeiras de Poção",
    identificadorCategoria: "cat-2",
    nomeCategoria: "Renda Renascença",
    precoEmCentavos: 42000, // R$ 420,00
    estoqueDisponivel: 3,
    urlImagem:
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Peça exclusiva tecida 100% à mão no município de Poção-PE com pontas minuciosas de renda renascença sobre linho puro.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 5.0,
    totalAvaliacoes: 18,
  },
  {
    identificadorProduto: "prod-3",
    tituloProduto: "Leão de Nuca em Madeira",
    identificadorArtesao: "artesao-3",
    nomeArtesao: "Mestre Nuca (Tracunhaém)",
    nomeAtelie: "Ateliê Nuca das Três Ilhas",
    identificadorCategoria: "cat-3",
    nomeCategoria: "Talhas de Madeira",
    precoEmCentavos: 38000, // R$ 380,00
    estoqueDisponivel: 5,
    urlImagem:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Escultura marcante esculpida em madeira nobre entalhada à mão, inspirada no lendário leão de juba encaracolada de Tracunhaém.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 4.8,
    totalAvaliacoes: 31,
  },
  {
    identificadorProduto: "prod-4",
    tituloProduto: "Vaso de Barro Espiralado",
    identificadorArtesao: "artesao-1",
    nomeArtesao: "Ateliê Barro Forte",
    nomeAtelie: "Barro Forte Caruaru",
    identificadorCategoria: "cat-1",
    nomeCategoria: "Cerâmica e Barro",
    precoEmCentavos: 14500, // R$ 145,00
    estoqueDisponivel: 12,
    urlImagem:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Vaso decorativo modelado na roda de oleiro com grafismos rústicos e acabamento em terras naturais queimadas.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 4.7,
    totalAvaliacoes: 15,
  },
  {
    identificadorProduto: "prod-5",
    tituloProduto: "Bolsa de Ouricuri Tecida",
    identificadorArtesao: "artesao-4",
    nomeArtesao: "Artesanato de Petrolina",
    nomeAtelie: "Fibras do São Francisco",
    identificadorCategoria: "cat-4",
    nomeCategoria: "Palha & Fibras",
    precoEmCentavos: 12000, // R$ 120,00
    estoqueDisponivel: 7,
    urlImagem:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Bolsa artesanal trançada com palha de ouricuri colhida sustentavelmente nas margens do Rio São Francisco.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 4.9,
    totalAvaliacoes: 22,
  },
  {
    identificadorProduto: "prod-6",
    tituloProduto: "Luminária Rendada em Metal",
    identificadorArtesao: "artesao-5",
    nomeArtesao: "Artesanato Olinda",
    nomeAtelie: "Oficina do Metal Olindense",
    identificadorCategoria: "cat-5",
    nomeCategoria: "Metal Trabalhado",
    precoEmCentavos: 29000, // R$ 290,00
    estoqueDisponivel: 4,
    urlImagem:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    descricaoCompleta:
      "Luminária de mesa com perfurações que projetam rendados de luz e sombra nas paredes, inspirada no casario de Olinda.",
    estatutoAtivo: true,
    notaAvaliacaoMedia: 5.0,
    totalAvaliacoes: 11,
  },
];

// Helper para delay simulado de requisição assíncrona
const aguardarSimulacaoRede = (tempoEmMilissegundos: number = 250): Promise<void> => {
  return new Promise((resolverPromessa) =>
    setTimeout(resolverPromessa, tempoEmMilissegundos)
  );
};

// Funções de Inicialização e Leitura do localStorage
export function obterProdutosGravados(): ItemCatalogoProduto[] {
  if (typeof window === "undefined") return PRODUTOS_INICIAIS_MANUALI;
  const dadosBrutos = localStorage.getItem(CHAVE_CATALOGO_PRODUTOS);
  if (!dadosBrutos) {
    localStorage.setItem(
      CHAVE_CATALOGO_PRODUTOS,
      JSON.stringify(PRODUTOS_INICIAIS_MANUALI)
    );
    return PRODUTOS_INICIAIS_MANUALI;
  }
  try {
    return JSON.parse(dadosBrutos);
  } catch {
    return PRODUTOS_INICIAIS_MANUALI;
  }
}

export function salvarProdutosGravados(
  produtos: ItemCatalogoProduto[]
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_CATALOGO_PRODUTOS, JSON.stringify(produtos));
}

export function obterCarrinhoGravado(): ItemCarrinhoCompra[] {
  if (typeof window === "undefined") return [];
  const dadosBrutos = localStorage.getItem(CHAVE_CARRINHO_COMPRAS);
  if (!dadosBrutos) return [];
  try {
    return JSON.parse(dadosBrutos);
  } catch {
    return [];
  }
}

export function salvarCarrinhoGravado(itens: ItemCarrinhoCompra[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_CARRINHO_COMPRAS, JSON.stringify(itens));
}

export function obterSessaoUsuarioLogado(): PerfilUsuarioAutenticado | null {
  if (typeof window === "undefined") return null;
  const dadosBrutos = localStorage.getItem(CHAVE_SESSAO_USUARIO);
  if (!dadosBrutos) {
    // Retorna uma sessão padrão simulada de Comprador caso nenhuma esteja criada
    const sessaoPadrao: PerfilUsuarioAutenticado = {
      identificadorUsuario: "usr-demo-comprador",
      nomeCompleto: "João Silva",
      enderecoEmail: "joao@exemplo.com",
      papelUsuario: "CONSUMIDOR",
      tokenAcessoJwt: "jwt_token_fake_demo_12345",
    };
    return sessaoPadrao;
  }
  try {
    return JSON.parse(dadosBrutos);
  } catch {
    return null;
  }
}

export function salvarSessaoUsuario(
  perfil: PerfilUsuarioAutenticado | null
): void {
  if (typeof window === "undefined") return;
  if (perfil === null) {
    localStorage.removeItem(CHAVE_SESSAO_USUARIO);
  } else {
    localStorage.setItem(CHAVE_SESSAO_USUARIO, JSON.stringify(perfil));
  }
}

export function obterHistoricoPedidosGravados(): PedidoCliente[] {
  if (typeof window === "undefined") return [];
  const dadosBrutos = localStorage.getItem(CHAVE_HISTORICO_PEDIDOS);
  if (!dadosBrutos) return [];
  try {
    return JSON.parse(dadosBrutos);
  } catch {
    return [];
  }
}

export function salvarHistoricoPedidosGravados(
  pedidos: PedidoCliente[]
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAVE_HISTORICO_PEDIDOS, JSON.stringify(pedidos));
}

// Implementações do Serviço da Fake API (/api/v1/*)

export const fakeApiService = {
  // Autenticação
  async autenticarUsuario(
    requisicao: RequisicaoAutenticacaoLogin
  ): Promise<PerfilUsuarioAutenticado> {
    await aguardarSimulacaoRede();

    const eModoArtesao = requisicao.papelDesejado === "ARTESAO";
    const eModoAdmin = requisicao.papelDesejado === "ADMIN";

    const perfilAutenticado: PerfilUsuarioAutenticado = {
      identificadorUsuario: eModoAdmin
        ? "admin-1"
        : eModoArtesao
          ? "artesao-1"
          : "usr-comprador-99",
      nomeCompleto: eModoAdmin
        ? "Admin"
        : eModoArtesao
          ? "Ateliê Mestre Vitalino Filho"
          : "Mariana Costa",
      enderecoEmail:
        requisicao.enderecoEmail ||
        (eModoAdmin
          ? "admin@manuali.com.br"
          : eModoArtesao
            ? "artesao@manuali.com.br"
            : "mariana@exemplo.com"),
      papelUsuario: requisicao.papelDesejado,
      identificadorArtesao: eModoArtesao ? "artesao-1" : undefined,
      nomeAtelie: eModoArtesao ? "Ateliê Vitalino (Alto do Moura)" : undefined,
      documentoCpfCnpj: eModoArtesao ? "12.345.678/0001-90" : undefined,
      biografiaAtelie: eModoArtesao
        ? "Moldando o barro com a alma do Agreste Pernambucano há mais de três gerações."
        : undefined,
      statusCuradoria: "aprovado",
      tokenAcessoJwt: `fake_jwt_token_${Date.now()}`,
    };

    salvarSessaoUsuario(perfilAutenticado);
    return perfilAutenticado;
  },

  async registrarArtesao(
    requisicao: RequisicaoRegistroArtesao
  ): Promise<PerfilUsuarioAutenticado> {
    await aguardarSimulacaoRede();

    const novoArtesao: PerfilUsuarioAutenticado = {
      identificadorUsuario: `artesao-${Date.now()}`,
      nomeCompleto: requisicao.nomeCompleto,
      enderecoEmail: requisicao.enderecoEmail,
      papelUsuario: "ARTESAO",
      identificadorArtesao: `artesao-${Date.now()}`,
      nomeAtelie: requisicao.nomeAtelie,
      documentoCpfCnpj: requisicao.documentoCpfCnpj,
      biografiaAtelie: requisicao.biografiaAtelie,
      statusCuradoria: "aprovado",
      tokenAcessoJwt: `fake_jwt_token_artesao_${Date.now()}`,
    };

    salvarSessaoUsuario(novoArtesao);
    return novoArtesao;
  },

  async registrarConsumidor(
    requisicao: RequisicaoRegistroConsumidor
  ): Promise<PerfilUsuarioAutenticado> {
    await aguardarSimulacaoRede();

    const novoConsumidor: PerfilUsuarioAutenticado = {
      identificadorUsuario: `usr-${Date.now()}`,
      nomeCompleto: requisicao.nomeCompleto,
      enderecoEmail: requisicao.enderecoEmail,
      papelUsuario: "CONSUMIDOR",
      tokenAcessoJwt: `fake_jwt_token_consumidor_${Date.now()}`,
    };

    salvarSessaoUsuario(novoConsumidor);
    return novoConsumidor;
  },

  async efetuarLogout(): Promise<void> {
    await aguardarSimulacaoRede(100);
    salvarSessaoUsuario(null);
  },

  // Produtos & Vitrine
  async listarProdutos(
    filtroCategoriaId?: string,
    termoBusca?: string
  ): Promise<ItemCatalogoProduto[]> {
    await aguardarSimulacaoRede();
    let lista = obterProdutosGravados().filter(
      (produtoItem) => produtoItem.estatutoAtivo
    );

    if (filtroCategoriaId && filtroCategoriaId !== "todos") {
      lista = lista.filter(
        (produtoItem) =>
          produtoItem.identificadorCategoria === filtroCategoriaId
      );
    }

    if (termoBusca && termoBusca.trim() !== "") {
      const termoFormatado = termoBusca.toLowerCase().trim();
      lista = lista.filter(
        (produtoItem) =>
          produtoItem.tituloProduto.toLowerCase().includes(termoFormatado) ||
          produtoItem.nomeArtesao.toLowerCase().includes(termoFormatado) ||
          produtoItem.nomeAtelie.toLowerCase().includes(termoFormatado) ||
          produtoItem.nomeCategoria.toLowerCase().includes(termoFormatado)
      );
    }

    return lista;
  },

  async cadastrarProduto(
    requisicao: RequisicaoNovoProduto,
    artesaoLogado: PerfilUsuarioAutenticado
  ): Promise<ItemCatalogoProduto> {
    await aguardarSimulacaoRede();

    const categoriaEncontrada = CATEGORIAS_INICIAIS_MANUALI.find(
      (categoriaItem) =>
        categoriaItem.identificadorCategoria ===
        requisicao.identificadorCategoria
    );

    const novoProduto: ItemCatalogoProduto = {
      identificadorProduto: `prod-${Date.now()}`,
      tituloProduto: requisicao.tituloProduto,
      identificadorArtesao:
        artesaoLogado.identificadorArtesao || "artesao-1",
      nomeArtesao: artesaoLogado.nomeCompleto,
      nomeAtelie: artesaoLogado.nomeAtelie || "Ateliê Artesanal",
      identificadorCategoria: requisicao.identificadorCategoria,
      nomeCategoria: categoriaEncontrada
        ? categoriaEncontrada.nomeCategoria
        : "Artesanato Geral",
      precoEmCentavos: requisicao.precoEmCentavos,
      estoqueDisponivel: requisicao.estoqueDisponivel,
      urlImagem:
        requisicao.urlImagem ||
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
      descricaoCompleta: requisicao.descricaoCompleta,
      historiaPeca: requisicao.historiaPeca,
      urlImagensGaleria: requisicao.urlImagensGaleria,
      statusPublicacao: requisicao.statusPublicacao ?? "ativo",
      estatutoAtivo: (requisicao.statusPublicacao ?? "ativo") === "ativo",
      notaAvaliacaoMedia: 5.0,
      totalAvaliacoes: 1,
    };

    const listaAtual = obterProdutosGravados();
    listaAtual.unshift(novoProduto);
    salvarProdutosGravados(listaAtual);

    return novoProduto;
  },

  async atualizarEstoqueProduto(
    identificadorProduto: string,
    novoEstoque: number
  ): Promise<ItemCatalogoProduto> {
    await aguardarSimulacaoRede();
    const listaAtual = obterProdutosGravados();
    const indice = listaAtual.findIndex(
      (produtoItem) =>
        produtoItem.identificadorProduto === identificadorProduto
    );

    if (indice === -1) {
      throw new Error("Produto não encontrado.");
    }

    listaAtual[indice].estoqueDisponivel = novoEstoque;
    salvarProdutosGravados(listaAtual);
    return listaAtual[indice];
  },

  async obterProdutoPorId(
    identificadorProduto: string
  ): Promise<ItemCatalogoProduto | null> {
    await aguardarSimulacaoRede(150);
    return (
      obterProdutosGravados().find(
        (produtoItem) =>
          produtoItem.identificadorProduto === identificadorProduto
      ) ?? null
    );
  },

  // Inclui rascunhos e pausados, que a vitrine pública não exibe
  async listarProdutosDoArtesao(
    identificadorArtesao: string
  ): Promise<ItemCatalogoProduto[]> {
    await aguardarSimulacaoRede();
    return obterProdutosGravados().filter(
      (produtoItem) => produtoItem.identificadorArtesao === identificadorArtesao
    );
  },

  async atualizarProduto(
    identificadorProduto: string,
    requisicao: RequisicaoNovoProduto
  ): Promise<ItemCatalogoProduto> {
    await aguardarSimulacaoRede();
    const listaAtual = obterProdutosGravados();
    const indice = listaAtual.findIndex(
      (produtoItem) =>
        produtoItem.identificadorProduto === identificadorProduto
    );

    if (indice === -1) {
      throw new Error("Produto não encontrado.");
    }

    const statusPublicacao = requisicao.statusPublicacao ?? "ativo";
    listaAtual[indice] = {
      ...listaAtual[indice],
      tituloProduto: requisicao.tituloProduto,
      identificadorCategoria: requisicao.identificadorCategoria,
      nomeCategoria:
        CATEGORIAS_INICIAIS_MANUALI.find(
          (categoriaItem) =>
            categoriaItem.identificadorCategoria ===
            requisicao.identificadorCategoria
        )?.nomeCategoria ?? listaAtual[indice].nomeCategoria,
      precoEmCentavos: requisicao.precoEmCentavos,
      estoqueDisponivel: requisicao.estoqueDisponivel,
      urlImagem: requisicao.urlImagem || listaAtual[indice].urlImagem,
      descricaoCompleta: requisicao.descricaoCompleta,
      historiaPeca: requisicao.historiaPeca,
      urlImagensGaleria: requisicao.urlImagensGaleria,
      statusPublicacao,
      estatutoAtivo: statusPublicacao === "ativo",
    };

    salvarProdutosGravados(listaAtual);
    return listaAtual[indice];
  },

  async removerProduto(identificadorProduto: string): Promise<void> {
    await aguardarSimulacaoRede();
    const listaAtual = obterProdutosGravados();
    const novaLista = listaAtual.filter(
      (produtoItem) =>
        produtoItem.identificadorProduto !== identificadorProduto
    );
    salvarProdutosGravados(novaLista);
  },

  // Categorias
  async listarCategorias(): Promise<CategoriaArtesanato[]> {
    await aguardarSimulacaoRede(100);
    return CATEGORIAS_INICIAIS_MANUALI;
  },

  // Carrinho de Compras
  async obterCarrinho(): Promise<CarrinhoCompraCliente> {
    await aguardarSimulacaoRede(100);
    const itens = obterCarrinhoGravado();
    const valorTotalEmCentavos = itens.reduce(
      (acumulador, itemAtual) => acumulador + itemAtual.subtotalEmCentavos,
      0
    );
    const quantidadeTotalItens = itens.reduce(
      (acumulador, itemAtual) => acumulador + itemAtual.quantidadeSolicitada,
      0
    );

    return {
      itensCarrinho: itens,
      valorTotalEmCentavos,
      quantidadeTotalItens,
    };
  },

  async adicionarAoCarrinho(
    produto: ItemCatalogoProduto,
    quantidade: number = 1
  ): Promise<CarrinhoCompraCliente> {
    await aguardarSimulacaoRede(150);
    const itensAtuais = obterCarrinhoGravado();
    const indiceExistente = itensAtuais.findIndex(
      (itemAtual) =>
        itemAtual.produtoItem.identificadorProduto ===
        produto.identificadorProduto
    );

    if (indiceExistente !== -1) {
      const novaQuantidade =
        itensAtuais[indiceExistente].quantidadeSolicitada + quantidade;
      itensAtuais[indiceExistente].quantidadeSolicitada = novaQuantidade;
      itensAtuais[indiceExistente].subtotalEmCentavos =
        novaQuantidade * produto.precoEmCentavos;
    } else {
      itensAtuais.push({
        identificadorItemCarrinho: `item-${Date.now()}`,
        produtoItem: produto,
        quantidadeSolicitada: quantidade,
        subtotalEmCentavos: quantidade * produto.precoEmCentavos,
      });
    }

    salvarCarrinhoGravado(itensAtuais);
    return this.obterCarrinho();
  },

  async alterarQuantidadeItemCarrinho(
    identificadorItemCarrinho: string,
    novaQuantidade: number
  ): Promise<CarrinhoCompraCliente> {
    await aguardarSimulacaoRede(100);
    let itensAtuais = obterCarrinhoGravado();

    if (novaQuantidade <= 0) {
      itensAtuais = itensAtuais.filter(
        (itemAtual) =>
          itemAtual.identificadorItemCarrinho !== identificadorItemCarrinho
      );
    } else {
      const indice = itensAtuais.findIndex(
        (itemAtual) =>
          itemAtual.identificadorItemCarrinho === identificadorItemCarrinho
      );
      if (indice !== -1) {
        itensAtuais[indice].quantidadeSolicitada = novaQuantidade;
        itensAtuais[indice].subtotalEmCentavos =
          novaQuantidade * itensAtuais[indice].produtoItem.precoEmCentavos;
      }
    }

    salvarCarrinhoGravado(itensAtuais);
    return this.obterCarrinho();
  },

  async removerItemCarrinho(
    identificadorItemCarrinho: string
  ): Promise<CarrinhoCompraCliente> {
    return this.alterarQuantidadeItemCarrinho(identificadorItemCarrinho, 0);
  },

  // Pedidos & Checkout
  async finalizarCheckout(): Promise<PedidoCliente> {
    await aguardarSimulacaoRede(300);
    const carrinho = await this.obterCarrinho();

    if (carrinho.itensCarrinho.length === 0) {
      throw new Error("Carrinho de compras está vazio.");
    }

    const primeiroItem = carrinho.itensCarrinho[0];

    const novoPedido: PedidoCliente = {
      identificadorPedido: `ped-${Math.floor(100000 + Math.random() * 900000)}`,
      identificadorComprador: "usr-comprador-99",
      nomeComprador: "Mariana Costa",
      identificadorArtesao: primeiroItem.produtoItem.identificadorArtesao,
      nomeAtelie: primeiroItem.produtoItem.nomeAtelie,
      itensPedido: carrinho.itensCarrinho.map((itemAtual) => ({
        identificadorProduto: itemAtual.produtoItem.identificadorProduto,
        tituloProduto: itemAtual.produtoItem.tituloProduto,
        quantidadeComprada: itemAtual.quantidadeSolicitada,
        precoUnitarioEmCentavos: itemAtual.produtoItem.precoEmCentavos,
        urlImagem: itemAtual.produtoItem.urlImagem,
      })),
      valorTotalEmCentavos: carrinho.valorTotalEmCentavos,
      statusPedido: "pago",
      statusPagamento: "aprovado",
      metodoPagamento: "pix",
      statusEntrega: "aguardando_envio",
      dataCriacaoIso: new Date().toISOString(),
    };

    const historico = obterHistoricoPedidosGravados();
    historico.unshift(novoPedido);
    salvarHistoricoPedidosGravados(historico);

    // Limpar carrinho pós-compra
    salvarCarrinhoGravado([]);

    return novoPedido;
  },

  async listarPedidosArtesao(
    identificadorArtesao: string = "artesao-1"
  ): Promise<PedidoCliente[]> {
    await aguardarSimulacaoRede();
    const historico = obterHistoricoPedidosGravados();

    // Se o histórico local estiver vazio, fornece um par de pedidos simulados para o artesão
    if (historico.length === 0) {
      const pedidosSimuladosIniciais: PedidoCliente[] = [
        {
          identificadorPedido: "ped-882194",
          identificadorComprador: "usr-cli-1",
          nomeComprador: "Fernanda Vasconcelos",
          identificadorArtesao: identificadorArtesao,
          nomeAtelie: "Ateliê Vitalino (Alto do Moura)",
          itensPedido: [
            {
              identificadorProduto: "prod-1",
              tituloProduto: "Bonecos de Barro - Retirantes",
              quantidadeComprada: 1,
              precoUnitarioEmCentavos: 18000,
              urlImagem:
                "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
            },
          ],
          valorTotalEmCentavos: 18000,
          statusPedido: "pago",
          statusPagamento: "aprovado",
          metodoPagamento: "pix",
          statusEntrega: "aguardando_envio",
          dataCriacaoIso: new Date(Date.now() - 3600000 * 4).toISOString(),
        },
        {
          identificadorPedido: "ped-449102",
          identificadorComprador: "usr-cli-2",
          nomeComprador: "Carlos Eduardo Silva",
          identificadorArtesao: identificadorArtesao,
          nomeAtelie: "Ateliê Vitalino (Alto do Moura)",
          itensPedido: [
            {
              identificadorProduto: "prod-4",
              tituloProduto: "Vaso de Barro Espiralado",
              quantidadeComprada: 2,
              precoUnitarioEmCentavos: 14500,
              urlImagem:
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
            },
          ],
          valorTotalEmCentavos: 29000,
          statusPedido: "enviado",
          statusPagamento: "aprovado",
          metodoPagamento: "cartao_credito",
          statusEntrega: "em_transito",
          dataCriacaoIso: new Date(Date.now() - 3600000 * 28).toISOString(),
        },
      ];
      salvarHistoricoPedidosGravados(pedidosSimuladosIniciais);
      return pedidosSimuladosIniciais;
    }

    return historico;
  },

  async atualizarStatusPedido(
    identificadorPedido: string,
    novoStatus: StatusPedido
  ): Promise<PedidoCliente> {
    await aguardarSimulacaoRede();
    const historico = obterHistoricoPedidosGravados();
    const indice = historico.findIndex(
      (pedidoItem) => pedidoItem.identificadorPedido === identificadorPedido
    );

    if (indice === -1) {
      throw new Error("Pedido não encontrado.");
    }

    historico[indice].statusPedido = novoStatus;
    if (novoStatus === "enviado") {
      historico[indice].statusEntrega = "em_transito";
    } else if (novoStatus === "entregue") {
      historico[indice].statusEntrega = "entregue";
    }

    salvarHistoricoPedidosGravados(historico);
    return historico[indice];
  },
};
