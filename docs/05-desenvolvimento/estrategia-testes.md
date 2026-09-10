# Estratégia de Testes

## Pirâmide
```
        E2E (Playwright)         ─ fluxos críticos (web)
     Integração (Vitest+DB)      ─ casos de uso, concorrência (api)
   Unit (Vitest)                 ─ domínio, validators, jwt, money (api+web)
```

## Onde cada teste mora
| Camada | Onde | O que cobre |
|---|---|---|
| Unit | `apps/api` e `apps/web` | regras de domínio, jose/jwt, zod validators, formatadores (`money`) |
| Integração (API) | `apps/api` | serviços/casos de uso com banco real; `app.inject()` do Fastify; concorrência RN-060 |
| Componentes (web) | `apps/web` | componentes com RTL/jest-dom (a configurar) |
| E2E (web) | `apps/web` | vitrine → busca → carrinho → checkout → painéis; admin |

## Obrigatórios (não negocie)
| Área | Testes mínimos |
|---|---|
| Auth | login ok, role negada (buyer tentando painel, artesão tentando admin); JWT expirado/segredo errado |
| Catalog | produto `DRAFT/ARCHIVED` fora da vitrine; filtros; isolamento por artesão |
| Orders | checkout feliz; **2 pedidos simultâneos no último item → 1 ok, 1 falha (RN-060)**; estoque insuficiente → 409; transições de status |
| Reviews | só pós-`DELIVERED`; uma por pedido; moderação oculta `PENDING` |
| Recomendação | só produtos `ACTIVE`+estocado; sem duplicados |
| Dashboard | totais conferem com pedidos `PAID+`; filtro de período |

## Banco de integração
- Postgres de teste com schema via `prisma db push` (ou do compose com
  `origem_test`). Em CI, subir serviço `postgres` (ver `.github/workflows/ci.yml`).
- `DATABASE_URL` de teste configurada no `vitest.config.ts` do `apps/api`.
- Reset entre casos: script `resetDB` (TRUNCATE em ordem de FK).
- Seed de teste mínimo e dedicado (não o seed completo).

## Testes do Fastify
- Usar `buildServer()` + `app.inject()` — não sobe porta, rápido e determinístico.
- Config de env injetada no vitest; `NODE_ENV=test` desliga logger.

## E2E (a estabelecer)
- Playwright contra `npm run dev` (web :3000 + api :3001).
- Pagamento simulado com `SIMULATOR_SUCCESS_RATE=1` para caminho feliz.

## Comandos
```bash
npm test                 # unit + integração (web e api)
npm run test -w @origem/api     # só api
npm run test -w @origem/web     # só web
npm run test:coverage    # (configurar)
```

## Qualidade
- `coverage` focado nas regras de negócio (RN) — 80%+ nas camadas de domínio/
  services da API.
- Correção de bug começa com teste que reproduz (red→green).
- Testes rodam no CI antes de merge.