# @origem/worker

Processamento assíncrono do Origem: pré-computação de recomendação e
indicadores, notificações simuladas e jobs de pedido.

Estrutura planejada (a implementar):
- `src/index.ts` — entrada do worker (consome fila ou modo inline).
- `src/jobs/` — definição de jobs (recomputeRecommendations, indicatorsSnapshot).
- `src/lib/db.ts` — conexão Prisma compartilhada.

Em dev sem Redis, executa em modo inline sob demanda. Ver
`docs/03-arquitetura/visao-arquitetural.md`.