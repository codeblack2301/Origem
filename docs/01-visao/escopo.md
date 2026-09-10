# Escopo

## Dentro do escopo (MVP)

### Vitrine do comprador (público)
- Home com destaques e categorias.
- Busca e filtros: categoria, local/origem, técnica, faixa de preço, avaliação.
- Perfil público do artesão (história, origem, avaliações).
- Página de produto (fotos, descrição, técnica, materiais, estoque).
- Carrinho, checkout com **pagamento simulado**, endereço, acompanhamento do pedido.
- Avaliação de produtos/pedido.

### Painel do artesão (autenticado, papel `ARTISAN`)
- Cadastro/edição de produtos (fotos, técnica, origem, preço, estoque).
- Gestão de estoque (entradas, saídas, baixa).
- Pedidos recebidos com mudança de status.
- Indicadores de venda do próprio catálogo.

### Painel administrativo (papel `ADMIN`)
- Gestão de produtos (publicar/despublicar), categorias e moderação de avaliações.
- Layout de vendedores/artesãos e aprovação de cadastro.
- Banco de dados indicadores de venda (faturamento, top produtos, ticket médio).

### Recomendação
- Módulo simples (não-supervisionado) primeiro: similaridade por categoria,
  origem e avaliação; depois evolução para dados de navegação.

### Técnica
- Monorepo TS, Next.js (App Router), Prisma + PostgreSQL (Docker Compose),
  autenticação com papéis, testes (unit/integração/E2E), CI.

## Fora do escopo (por enquanto)
- Pagamento real (gateways, Pix real, antifraude) — sempre **simulado**.
- Logística/frete externo real (cálculo simulado).
- App mobile nativo.
- Multicidades/estados além de Pernambuco no seed.
- Chat em tempo real entre comprador e artesão.
- Modelos de recomendação sofisticados (ML) na primeira entrega.
- Mercado de segunda mão.

## Limites e cuidados (contrato de qualidade)
1. **Dados sintéticos** representativos; com consentimento apenas se houver
   parceria real (LGPD).
2. **Pagamento simulado**: nenhum dado de cartão real; borderô fake só para
   exercitar o fluxo.
3. **Respeito cultural**: técnicas e origens retratadas com exatidão e respeito;
   nada de apropriação ou estereótipo; crédito à autoria obrigatório.
4. **Moderação**: avaliações passam por regras (sem ofensas) antes de publicar.
5. **Princípios de engenharia**: SOLID/GRASP, camadas claras, testes e revisão.

## Critérios de prontidão (Definition of Done)
- Código revisado em PR e CI verde.
- Testes da funcionalidade no nível adequado.
- Migração/seed de banco aplicáveis e documentados no `docs/04-banco`.
- Docs relevantes atualizados.