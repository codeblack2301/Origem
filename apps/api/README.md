# @origem/api — API REST (Node.js + Fastify)

API do Origem: catálogo, carrinho/pedidos, autenticação JWT (cookie httpOnly),
avaliações, recomendação e indicadores. Exclusiva para dados — não serve UI.

## Estrutura
- `src/index.ts` — bootstrap (porta `PORT`, default 3001).
- `src/app.ts` — `buildServer()` (Fastify) — exportável e testável com `.inject()`.
- `src/config.ts` — config de ambiente validada com Zod (falha rápido).
- `src/routes/` — rotas por domínio (`/api/health`, depois auth, products, orders...).
- `src/server/{domain,services,repositories,auth}` — camadas de aplicação.
- `prisma/` — schema, migrações e seed.

## Comandos (a partir desta pasta)
```bash
npm run dev          # tsx watch
npm test             # vitest (inject, sem porta)
npm run db:push      # schema no banco
npm run db:seed      # dados sintéticos
npm run typecheck    # tsc --noEmit
```

## Convenções de segurança
- Toda rota valida entrada com Zod (`zod`).
- Sessão JWT (`jose`, HS256) em cookie httpOnly definido pela API; ver
  `src/server/auth/session.ts`.
- Nenhum dado de pagamento real (ADR-002); pagamento simulado.