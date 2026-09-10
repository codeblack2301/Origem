# Ambiente de Desenvolvimento

## Pré-requisitos
- **Node.js ≥ 20** (recomendado 22 LTS). Verificar: `node -v`, `npm -v`.
- **Docker Desktop** com WSL2 backend (Windows). Verificar: `docker version`.
- **Git**: `git --version`.

## Instalação do Docker (Windows) — se ainda não instalado
1. Instalar **Docker Desktop** (winget ou site oficial), habilitar backend WSL2.
2. Abrir o Docker Desktop uma vez para iniciar o engine.
3. Confirmar: `docker run hello-world`.

## Serviços e portas
| Serviço | Pasta | Porta | Env |
|---|---|---|---|
| Front (web) | `apps/web` | 3000 | `apps/web/.env` |
| API | `apps/api` | 3001 | `apps/api/.env` |
| Postgres | `docker compose` | 5432 | `apps/api/.env` |

O browser acessa só `http://localhost:3000`; `/api/*` é proxxado pelo Next para
`apps/api` (cookie httpOnly e CORS permanecem no mesmo origin).

## Passo a passo (primeira vez)
```bash
# 1. Clone e instala dependências (raiz instala todos os workspaces)
git clone <url> origem && cd origem
npm install

# 2. Envs
cp .env.example .env                       # (raiz — espelho de variáveis)
# Se houver apps/api/.env.example:
cp apps/api/.env.example apps/api/.env     # DATABASE_URL, JWT_SECRET, PORT
# web só precisa de: API_INTERNAL_URL=http://localhost:3001 (em apps/web/.env)

# 3. Banco
npm run db:up                              # Postgres 17 (Docker)

# 4. Schema + seed (prisma em apps/api)
npm run db:push
npm run db:seed

# 5. Subir web + api juntos
npm run dev                                # http://localhost:3000 | api :3001
# (ou separado: npm run dev:web / npm run dev:api)
```

## Verificação rápida
```bash
curl http://localhost:3000/api/health      # via proxy do web → 200 {"status":"ok"}
curl http://localhost:3001/api/health      # API direta
```

## Scripts (raiz)
| Comando | Efeito |
|---|---|
| `npm run dev` / `dev:web` / `dev:api` | Sobe web+api juntos / separados |
| `npm run db:up` / `db:down` / `db:logs` | Postgres |
| `npm run db:push` / `db:seed` / `db:migrate` | Prisma no workspace `@origem/api` |
| `npm run build` | Build de web e api |
| `npm run lint` / `typecheck` / `test` | Qualidade em web e api |

## Fallback Postgres sem Docker
Instale Postgres local (16+), crie o banco e ajuste `DATABASE_URL` no
`apps/api/.env`. Mantenha o `docker-compose.yml` como padrão do time.

## Troubleshooting
| Sintoma | Causa provável | Solução |
|---|---|---|
| `ECONNREFUSED 5432` (api) | Banco fora | `npm run db:up`; aguardar healthcheck |
| web 502/500 no `/api/*` | API fora | subir `npm run dev:api` |
| `role "origem" does not exist` | 1ª subida | aguardar `healthy`; re-criar volume se mudou credencial |
| Porta 5432 ocupada | outro Postgres | mudar porta no compose ou parar o serviço |
| `JWT_SECRET` curto | config falha | usar segredo ≥ 32 chars (zod valida) |
| Docker não inicia | WSL2/engine | reabrir Docker Desktop; conferir WSL2 |