# Requisitos Funcionais (RFs)

Identificadores: `RF-MOD-###`. Rastreabilidade com histórias de usuário em
`historias-usuario.md` (campo US).

## Autenticação e perfis (`RF-AUTH`)
| ID | Requisito |
|---|---|
| RF-AUTH-001 | Usuário se cadastra com e-mail/senha e escolhe papel: comprador ou artesão. |
| RF-AUTH-002 | O sistema autentica com sessão segura (NextAuth/Session) e senha com hash. |
| RF-AUTH-003 | O artesão só ativa sua loja após aprovação do admin. |
| RF-AUTH-004 | Papéis: `BUYER`, `ARTISAN`, `ADMIN`; controle de acesso por rota e por API. |
| RF-AUTH-005 | Sessão expira em 8h; logout encerra a sessão em todos os dispositivos (conforme viável). |

## Vitrine (`RF-VIT`)
| ID | Requisito |
|---|---|
| RF-VIT-001 | Home lista produtos em destaque e categorias. |
| RF-VIT-002 | Busca por texto com filtros: categoria, origem/local, técnica, preço, avaliação mínima. |
| RF-VIT-003 | Página de produto mostra fotos, descrição, técnica, materiais, origem, tempo de produção e autor. |
| RF-VIT-004 | Perfil público do artesão mostra história, localização, técnica e avaliações. |
| RF-VIT-005 | Somente produtos publicados e com estoque > 0 aparecem na vitrine. |

## Carrinho e checkout (`RF-CAR`)
| ID | Requisito |
|---|---|
| RF-CAR-001 | Comprador logado adiciona/remove itens e altera quantidades no carrinho. |
| RF-CAR-002 | Carrinho recusa quantidade acima do estoque disponível. |
| RF-CAR-003 | Checkout pede endereço de entrega e resumo do pedido. |
| RF-CAR-004 | Pagamento é **simulado** (modo `PAYMENT_MODE=simulated`), sem dados reais. |
| RF-CAR-005 | Ao confirmar, cria-se pedido com status `PENDING_PAYMENT`. |
| RF-CAR-006 | Estoque é baixado no momento da confirmação do pedido (ver concorrência em RNF). |
| RF-CAR-007 | Comprador acompanha status do pedido; artesão atualiza status. |

## Painel do artesão (`RF-ART`)
| ID | Requisito |
|---|---|
| RF-ART-001 | Artesão cadastra produto com fotos, título, descrição, técnica, materiais, origem, preço, estoque e categoria. |
| RF-ART-002 | Artesão edita/arquiva/despublica produto. |
| RF-ART-003 | Artesão ajusta estoque manualmente (reposição/baixa) com justificativa. |
| RF-ART-004 | Artesão lista pedidos recebidos e muda status (confirmado, em produção, enviado, entregue, cancelado). |
| RF-ART-005 | Artesão vê indicadores: vendas, faturamento, top produtos, ticket médio. |
| RF-ART-006 | Artesão só acessa dados do próprio catálogo (isolamento por `artisanId`). |

## Painel administrativo (`RF-ADM`)
| ID | Requisito |
|---|---|
| RF-ADM-001 | Admin gerencia categorias (CRUD). |
| RF-ADM-002 | Admin aprova/rejeita cadastro de artesão. |
| RF-ADM-003 | Admin publica/despublica produtos e modera avaliações. |
| RF-ADM-004 | Admin consulta indicadores globais: faturamento por período, top produtos, artesãos, ticket médio. |
| RF-ADM-005 | Admin audita ações sensíveis (log de moderação) — mínimo: data, admin, ação. |

## Avaliações (`RF-AVA`)
| ID | Requisito |
|---|---|
| RF-AVA-001 | Comprador que finalizou pedido avaliou produto (1–5) com comentário. |
| RF-AVA-002 | Avaliação só é pública após passar por regra de moderação (sem linguagem ofensiva). |
| RF-AVA-003 | Perfil do artesão e produto mostram média e contagem de avaliações. |

## Recomendação (`RF-REC`)
| ID | Requisito |
|---|---|
| RF-REC-001 | Página de produto sugere itens similares (mesma categoria e/ou origem). |
| RF-REC-002 | Home mostra seção "recomendados para você" para comprador logado (base simples: categoria/origem já compradas/avaliadas). |
| RF-REC-003 | Recomendação deve ser calculada de forma rastreável e com dados sintéticos. |

## Indicadores (`RF-IND`)
| ID | Requisito |
|---|---|
| RF-IND-001 | Dashboards geram: vendas no período, faturamento, ticket médio, top N produtos, top N artesãos. |
| RF-IND-002 | Agregações são computadas por consulta otimizada (não no cliente). |