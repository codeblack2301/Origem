# Regras de Negócio

IDs `RN-###`. Estas regras são o "contrato" do sistema; toda mudança aqui exige
revisão de testes.

## Catálogo e produto
| ID | Regra |
|---|---|
| RN-001 | Produto só aparece na vitrine com status `ACTIVE` e estoque > 0. |
| RN-002 | Produto pertence a exatamente 1 artesão; o título deve ser único por artesão. |
| RN-003 | Preço deve ser > 0. Descontos (sale) opcionais e limitados a 70%. |
| RN-004 | Campos de origem e técnica são obrigatórios e exibidos como parte da história da peça. |

## Estoque
| ID | Regra |
|---|---|
| RN-010 | Baixa de estoque ocorre na confirmação do pedido, em transação atômica. |
| RN-011 | `estoque >= quantidade do carrinho` sempre; caso contrário, item é barrado no carrinho e no checkout. |
| RN-012 | Ajuste manual de estoque (reposição/baixa) exige justificativa e fica registrado. |

## Pedidos
| ID | Regra |
|---|---|
| RN-020 | Status válidos: `PENDING_PAYMENT → PAID → CONFIRMED → IN_PRODUCTION → SHIPPED → DELIVERED`. Cancelamento permitido de `PENDING_PAYMENT`–`CONFIRMED`; após `SHIPPED`, exige admin. |
| RN-021 | Pedido pode agrupar itens de **vários artesãos**; cada item pertence ao seu artesão. |
| RN-022 | Pagamento é sempre simulado; nenhum dado real de cartão é coletado/armazenado. |

## Avaliações
| ID | Regra |
|---|---|
| RN-030 | Avaliação exige pedido `DELIVERED` e pertence ao produto comprado; 1 avaliação por comprador por produto por pedido. |
| RN-031 | Avaliação passa por moderação antes de publicar. |
| RN-032 | Média e contagem calculadas apenas sobre avaliações `PUBLISHED`. |

## Artesão e loja
| ID | Regra |
|---|---|
| RN-040 | Loja `PENDING` → aprovação admin → `ACTIVE`; reprovada → `REJECTED` com motivo. |
| RN-041 | Produtos `DRAFT`/`ARCHIVED` não aparecem em lugar nenhum público. |
| RN-042 | Dados do artesão são isolados: operações sempre escopadas por `artisanId`. |

## Recomendação e indicadores
| ID | Regra |
|---|---|
| RN-050 | Recomendação usa somente dados sintéticos/próprios; sem tracker externo. |
| RN-051 | Indicadores usam pedidos `PAID` ou posteriores (entregas), nunca `PENDING_PAYMENT`. |
| RN-052 | Recomendação não mostra produtos sem estoque/inativos. |

## Concorrência
| ID | Regra |
|---|---|
| RN-060 | Duas confirmações simultâneas do último item: exatamente **uma** vence; a outra recebe erro de estoque. Implementar com transação + lock (ver `04-banco/modelo-dados.md`). |