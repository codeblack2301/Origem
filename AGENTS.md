# AGENTS.md — guia para agentes de código (opencode)

Este arquivo orienta agentes IA que trabalham no repositório Origem. Leia junto
com `docs/README.md`.

## Comandos de verificação (rodar após mudanças)
```bash
npm run lint        # ESLint (web + api)
npm run typecheck   # tsc --noEmit (web + api)
npm test            # Vitest unit/integração (web + api)
npm run build       # build de produção (Next e tsc)
```

## Estrutura
- Monorepo npm workspaces: **`apps/web`** (Next.js + shadcn/ui, só UI) e
  **`apps/api`** (Node + Fastify, REST, Prisma, JWT). `apps/worker` planejado.
- O web proxxa `/api/*` → API (`next.config.ts` rewrites + `API_INTERNAL_URL`);
  web **não importa Prisma** nem acessa banco.
- API: camadas `src/routes → server/{domain,services,repositories,auth}`;
  regra de negócio mora em domain/services, não em rotas/componentes.
- Prisma (schema, migrações, seed) em `apps/api/prisma`; `buildServer()` +
  `app.inject()` para testar rotas sem porta.

## Regras do projeto (não podem ser ignoradas)
- **Pagamento 100% simulado**: jamais integrar gateway real nem persistir dados
  de cartão (ADR-002).
- **Dados sintéticos**: só usar dados reais (artesãos) com consentimento (LGPD).
- **Respeito cultural**: preservar técnica/origem; autoria sempre atribuída.
- **Concorrência**: baixa de estoque em transação + lock (`FOR UPDATE`, RN-060)
  na API; nunca descontar estoque fora da confirmação do pedido.
- **Isolamento por artesão**: toda query de painel escopada por `artisanId`.
- **Preços** sempre em centavos inteiros (`priceCents`, `totalCents`).
- **Sem comentários** descrevendo "o quê"; somente "porquê" não óbvio.
- Segredos apenas em `.env` (nunca commit), espelho em `.env.example`
  (`apps/api/.env.example`).

## Fluxo
Nova funcionalidade → atualizar `docs/02-requisitos` (história/RN) se necessário
→ branch `feature/<area>-<desc>` → implementar → lint+typecheck+testes → PR.