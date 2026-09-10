# Requisitos Não Funcionais (RNFs)

IDs `RNF-###`. Vinculam a `estrategia-testes.md` e `convencoes.md`.

## Desempenho e concorrência
| ID | Requisito | Métrica |
|---|---|---|
| RNF-001 | Vitrine renderiza com time to interactive adequado em cidades do estado (conexões medianas). | LCP < 3s (referência), SSG/ISR para páginas públicas. |
| RNF-002 | Consultas de home/busca com índices: resposta < 300 ms para o seed (até ~10k produtos). | `explain analyze` documentado no schema. |
| RNF-003 | Baixa de estoque em confirmação de pedido é **atômica** (transação + lock) sem sofrer uma venda simultânea. | Teste de concorrência (2+ pedidos últimos item). |
| RNF-004 | Recomendação simples (similaridade) calculada em consulta agregada; sem latência perceptível. | < 200 ms extra na página de produto. |

## Segurança
| ID | Requisito |
|---|---|
| RNF-010 | Senhas com hash forte (bcrypt/argon2); nunca em texto plano. |
| RNF-011 | Autorização por papel em todo endpoint (`buyer`/`artisan`/`admin`) com teste de acesso negado. |
| RNF-012 | Isolamento entre artesãos: artesão não lê/altera produtos ou pedidos de outro. |
| RNF-013 | Input validado no servidor (zod) + sanitização antes de renderizar/persistir. |
| RNF-014 | Nenhum segredo em código/repositório; apenas `.env` via `.env.example`. |
| RNF-015 | Upload de imagem valida tipo/tamanho e serve com cabeçalhos de segurança. |
| RNF-016 | LGPD: consentimento de cadastro; dados pessoais acessíveis/solicitáveis; mínimos necessários. |

## Usabilidade e acessibilidade
| ID | Requisito |
|---|---|
| RNF-020 | Navegação clara entre vitrine e painéis (role/título alternativo por área). |
| RNF-021 | Semântica básica de acessibilidade (alt em imagens, contraste, foco visível). |
| RNF-022 | Mensagens de erro em PT-BR e legíveis. |

## Disponibilidade e infraestrutura
| ID | Requisito |
|---|---|
| RNF-030 | Banco Postgres 17 via Docker Compose, com volume persistente e healthcheck. |
| RNF-031 | Migrações versionadas (Prisma migrate); schema de produção = schema de desenvolvimento. |
| RNF-032 | CI roda lint, typecheck, testes e build em cada PR. |
| RNF-033 | Execute procedimento de seed reproduzível (determinístico). |

## Escalabilidade (orientação, escopo controlado)
| ID | Requisito |
|---|---|
| RNF-040 | Trabalhar com fila/jobs (worker em `apps/worker`) para tarefas assíncronas: notificações, pré-computação de recomendação/indicadores. |
| RNF-041 | Diferente (540): sem gateway real; worker não interage com provedor externo de pagamento. |