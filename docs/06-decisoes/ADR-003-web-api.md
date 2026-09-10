# ADR-003 — Frontend e API como serviços separados (web + api)

- **Data**: 2026-09-10
- **Status**: Aceita

## Contexto
A stack aprovada no ADR-001 previa um único app Next.js full-stack. O grupo
decidiu separar a entrega em dois apps: uma aplicação web (UI) e uma API Node
(REST), cada uma com responsabilidade e ciclo de deploy próprios, mantendo o
monorepo.

## Decisão
- **`apps/web`** — Next.js + shadcn/ui: vitrine, painéis e UI. Sem acesso a
  banco; fala com a API via **proxy** (`next.config.ts` rewrites de `/api/*`
  → `API_INTERNAL_URL`), mantendo cookie/CORS no mesmo origin.
- **`apps/api`** — Node.js + **Fastify** (v5): API REST sob `/api`, com
  Prisma (schema/migrações/seed), validação Zod e **sessão JWT** (jose) em
  cookie httpOnly expedido pela própria API.
- Portas padrão: web `3000`, api `3001`. `npm run dev` sobe os dois
  (concurrently).

## Alternativas consideradas
- **API como Route Handlers do Next dentro de apps/web**: um só processo e
  linguagem, porém junta UI e backend no mesmo deploy (escala/segurança juntos)
  e dificulta testar a API isolada.
- **Express**: funcional, porém menos TS-nativo e schema validation fica
  manual (RN validação obrigatória).
- **SPA pura (Vite) + API**: perderia SSR e o benefício do Next para vitrine
  pública com SEO.

## Consequências
- Ganhos: fronteira clara front/back; API testável com `.inject()` sem porta;
  deploys independentes; browser conversa com a API sem CORS acoplado (proxy).
- Custos/riscos: dois processos no dev (resolvido por concurrently); o proxy é
  ponto único (rewrites do Next); atenção ao repassar cookie em SSR (usar
  `cookies()` e header `Authorization`/cookie no fetch server-side).
- `PaymentSimulator`, domínio e dados permanecem **somente na API** (ADR-002).