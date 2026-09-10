# ADR-001 — Stack: monorepo TS, Next.js, Prisma, PostgreSQL

- **Data**: 2026-09-10
- **Status**: Aceita (evoluída pela ADR-003 na divisão front/API)

## Contexto
Time de 7 devs construindo marketplace full-stack (vitrine, 2 painéis, APIs) com
escopo médio-alto, em período letivo. Precisamos de produtividade alta, baixo
fricção de setup e um código que demonstre engenharia de software (camadas,
testes, concorrência).

## Decisão
- **Monorepo npm workspaces** (`apps/web`, `apps/worker`) — um repositório, um
  setup, docs centralizadas.
- **Next.js (App Router)** full-stack: vitrine + painéis + Route Handlers/Server
  Actions num único deploy; Server Components reduz latency e lógica no cliente.
  *(A ADR-003 evoluiu este ponto: a UI e a API viraram serviços separados —
  `apps/web` e `apps/api` com Fastify.)*
- **Prisma** sobre **PostgreSQL 17** (via Docker Compose) — schema versionado,
  migrações e cliente tipado.
- Autenticação por sessão NextAuth; testes Vitest + Playwright; Tailwind.

## Alternativas consideradas
- **React SPA + Express/API separada**: mais peças (CORS, 2 deploys), mais setup
  para 7 devs; valor didático menor dado o prazo.
- **Django + DRF + React**: excelente admin pronto, mas divide o time em dois
  ecossistemas; preferimos um único stack TS.
- **SQLite**: simples, mas destoa de produção e dificulta demonstrar
  otimizações/concorrência real.

## Consequências
- Ganhos: um só framework para todas as áreas; tipos ponta-a-ponta (Prisma↔Zod
  ↔TS); banco real desde o começo.
- Custos/riscos: Next.js evolui rápido (atalhos de versão); Prisma resolve
  concorrência por SQL cru quando câmbio; exigimos testes de concorrência
  (RN-060). Ciente: pagamento fake (ADR-002).