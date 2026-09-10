# @origem/web — App principal (Next.js)

Aplicação full-stack do Origem: vitrine do comprador, painel do artesão, painel
administrativo e APIs. Stack: Next.js (App Router), TypeScript, Tailwind,
Prisma + PostgreSQL.

## Pastas principais
- `src/app/(storefront)/` — páginas públicas (home, busca, produto, artesão).
- `src/app/(artisan)/painel` — painel do artesão.
- `src/app/admin/` — painel administrativo.
- `src/app/api/` — Route Handlers REST.
- `src/server/{domain,services,repositories,auth}` — camadas de aplicação.
- `prisma/` — schema, migrações e seed.

## Comandos (a partir desta pasta ou via raiz `npm run <x> -w @origem/web`)
```bash
npm run dev            # dev server
npm test               # unit + integração
npm run typecheck      # tsc --noEmit
npm run db:push        # aplica schema (dev)
npm run db:seed        # dados sintéticos
```

Consulte `docs/05-desenvolvimento/ambiente.md` para o passo a passo completo.