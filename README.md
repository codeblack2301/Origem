# Origem

**Marketplace da economia criativa de Pernambuco** — conectando quem faz a quem
compra, valorizando origem, técnica e o impacto de comprar direto de quem produz.

> Projeto de engenharia de software (grupo de 7 devs). Pagamento **simulado**,
> dados **sintéticos** e respeito à autoria/origem das peças — ver
> [escopo](docs/01-visao/escopo.md).

## Stack
- **Monorepo** npm workspaces → `apps/web` e `apps/api`.
- **Web**: Next.js (App Router) + Tailwind + **shadcn/ui** — porta 3000.
- **API**: Node.js + **Fastify** (REST sob `/api`) + Prisma + PostgreSQL 17
  (Docker) — porta 3001. Autenticação **JWT em cookie httpOnly**.
- O web faz **proxy** de `/api/*` para a API (`next.config.ts` rewrites).
- Vitest (unit/integração) + Playwright (E2E, a configurar) · GitHub Actions CI.

## Estrutura
```
apps/
  web/      Next.js + shadcn/ui — vitrine, painéis, UI (porta 3000)
  api/      Node + Fastify — REST, Prisma, auth JWT (porta 3001)
  worker/   jobs assíncronos (planejado)
docs/       visão, requisitos, arquitetura, banco, decisoes, dev
docker-compose.yml   Postgres 17 local
```

## Quickstart
```bash
npm install
npm run db:up                 # Postgres (Docker)
npm run db:push -w @origem/api    # ou npm run db:push (atalho raiz)
npm run db:seed -w @origem/api
npm run dev                   # sobe web (:3000) + api (:3001)
```

> Pré-requisitos: Node.js ≥ 20 e Docker Desktop. Passo a passo completo em
> [docs/05-desenvolvimento/ambiente.md](docs/05-desenvolvimento/ambiente.md).

## Scripts (raiz)
`dev` · `dev:web` · `dev:api` · `build` · `lint` · `typecheck` · `test` ·
`db:up/db:down/db:logs` · `db:push/db:seed/db:migrate` · `format`

## Documentação
Comece por [docs/README.md](docs/README.md). Antes de codar:
- [Visão e personas](docs/01-visao/visao-produto.md)
- [Requisitos funcionais e regras de negócio](docs/02-requisitos/requisitos-funcionais.md)
- [Visão arquitetural](docs/03-arquitetura/visao-arquitetural.md)
- [Modelo de dados](docs/04-banco/modelo-dados.md)
- [Convenções](docs/05-desenvolvimento/convencoes.md) · [fluxo-git.md](docs/05-desenvolvimento/fluxo-git.md)
- [Decisões de arquitetura (ADRs)](docs/06-decisoes/README.md)

## Grupos de trabalho sugeridos (7 devs)
1. **Plataforma/infra** — monorepo, Docker, CI, auth JWT base.
2. **Catálogo (api)** — produtos, categorias, fotos, busca.
3. **Vitrine (web)** — home, busca/filtros, perfil do artesão.
4. **Carrinho & pedidos (api)** — cart, checkout, concorrência de estoque.
5. **Painel do artesão (web+api)** — gestão de catálogo, estoque, pedidos.
6. **Painel admin & moderação** — aprovações, auditoria.
7. **Recomendação & dashboards** — similaridade, indicadores de venda.