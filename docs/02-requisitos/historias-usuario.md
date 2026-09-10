# Histórias de Usuário

Formato: **Como** `<papel>`, **quero** `<ação>`, **para** `<benefício>`.
Critérios de aceite aparecem em "Dado/Quando/Então" ou listas verificáveis.

## US-001 — Cadastro de artesão
Como **artesã**, quero me cadastrar escolhendo meu papel e contando minha
história, para ativar minha loja na plataforma.
**Aceite:**
- Cadastro com e-mail, senha, nome, cidade/UF (PE) e papel `ARTISAN`.
- Após cadastro, loja fica `PENDING` até aprovação do admin.
- Não posso criar produtos enquanto `PENDING`.

## US-002 — Publicar produto
Como **artesã**, quero cadastrar peças com fotos, técnica, materiais e origem,
para que compradores conheçam e comprem minhas peças.
**Aceite:**
- Campos obrigatórios: título, descrição, preço, estoque, categoria, técnica, origem.
- Ao menos 1 foto válida.
- Produto criado com status `DRAFT`; só aparece na vitrine como `ACTIVE`.

## US-003 — Buscar e filtrar
Como **compradora**, quero buscar por palavra-chave e filtrar por categoria,
local, técnica e preço, para encontrar a peça certa.
**Aceite:**
- Filtros combináveis; URL compartilhável (parâmetros de query).
- Resultados mostram apenas produtos `ACTIVE` com estoque > 0.
- Paginação ou carga incremental.

## US-004 — Comprar com pagamento simulado
Como **compradora**, quero montar o carrinho, informar endereço e concluir com
pagamento simulado, para receber minha peça.
**Aceite:**
- Quantidade válida contra estoque em confirmação (transação atômica).
- Pedido nasce com `PENDING_PAYMENT` e vai a `PAID` após simulação.
- Não há coleta de dados reais de pagamento.

## US-005 — Acompanhar pedido
Como **compradora**, quero ver o status do meu pedido, para saber quando chega.
**Aceite:**
- Status visível: pendente, pago, confirmado, em produção, enviado, entregue, cancelado.
- Histórico de mudanças com data.

## US-006 — Gerenciar pedidos recebidos
Como **artesã**, quero listar e atualizar status dos pedidos, para organizar a
produção e entrega.
**Aceite:**
- Só aparecem pedidos do próprio artesão.
- Transições permitidas conforme regra de negócio (`regras-negocio.md`).

## US-007 — Avaliar após compra
Como **compradora**, quero avaliar (1–5) um produto de pedido entregue, para
ajudar outros compradores.
**Aceite:**
- Só após pedido `DELIVERED`; uma avaliação por produto por pedido.
- Avaliação fica `PENDING` até moderação (sem ofensa); depois `PUBLISHED`.

## US-008 — Ver indicadores
Como **artesã**, quero ver vendas, faturamento e top produtos do meu catálogo,
para entender o que funciona.
**Aceite:**
- Filtro por período; números crus (sem média falsa); somente dados próprios.

## US-009 — Moderar e publicar (admin)
Como **admin**, quero aprovar artesãos, publicar/despublicar produtos e moderar
avaliações, para manter a plataforma confiável.
**Aceite:**
- Ações registradas em trilha de auditoria.
- Mudança de status não altera conteúdo (fotos/preço) do artesão.

## US-010 — Recomendação de produtos
Como **compradora**, quero ver produtos relacionados na página da peça, para
descobrir peças parecidas.
**Aceite:**
- Sugestões por mesma categoria e/ou origem, ordenadas por avaliação.
- Sem produtos inativos/sem estoque.