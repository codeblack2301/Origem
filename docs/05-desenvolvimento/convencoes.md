# Convenções de Código

## Linguagem e idioma
- Código, nomes e comentários em **inglês**? Não — combinamos: **código em
  inglês** (Padrão: identificadores, enums, tabelas) **e textos de interface em
  PT-BR**. Mensagens de erro expostas ao usuário em PT-BR.
- Commit/PR: em PT-BR é aceito; mensagens claras.

## TypeScript
- Strict mode sempre (`tsconfig` default do Next).
- Tipos inferidos a partir de **Zod schemas** para payloads; evitar `any`.
- Enums de domínio definidos no Prisma geram tipos; não duplicar em string solta.

## Formatação e lint
- **Prettier** (arquivo `.prettierrc` na raiz) e **ESLint** por workspace.
- Rode antes de cada PR: `npm run lint` e `npm run typecheck`.

## Estrutura de pastas
- **UI (`apps/web/src`)** — sem lógica de banco:
  - `app/(storefront)/**` — páginas públicas; `app/admin/**` — painel admin.
  - `components/ui` — primitivos **shadcn/ui**; `components/{storefront,artisan,admin}` — feature.
  - `lib` — API client (`fetch` para a API), `money`, formatadores.
- **API (`apps/api/src`)**:
  - `routes/` — rotas Fastify (fina; chamam services).
  - `server/domain` — entidades e regras de negócio (sem libs de infra).
  - `server/services` — casos de uso (orquestra domínio + repositórios).
  - `server/repositories` — Prisma com interface; serviços dependem da interface.
  - `server/auth` — sessão JWT, guards de papel.
  - `config.ts` — env validada com Zod; `app.ts` — `buildServer()`.
- **Web não importa Prisma**; regras de negócio vivem só na API.

## Nomenclatura
- Arquivos/pastas: `kebab-case`. Componentes/páginas `page.tsx`.
- Variáveis/funções: `camelCase`; classes e tipos: `PascalCase`.
- Constantes em `SCREAMING_SNAKE`; enums Prisma `PascalCase`.
- Nome de translations de status seguem os enums do schema Prisma.

## Regras de boas práticas
- **Nenhum comentário explicando "o quê"**; comentários só para "porquê" não
  óbvio (diretriz do agente opencode). Preferir código que se auto-explica.
- Rotas da API **validam** com Zod antes de qualquer uso do banco; services não
  confiam em payload não validado.
- Nenhum dado real de pagamento; sem segredos no código.
- Componente de cliente só onde interação real; o resto Server Component.

## Concorrência no código
- Toda escrita que mexe em estoque passa por `repositories` com transação +
  lock (`SELECT ... FOR UPDATE`) — RN-060.
- Evitar `setTimeout`/race no cliente para garantir consistência; confiar no
  servidor.

## Testes
- Cobertura mínima obrigatória nos módulos: `orders`, `catalog`, `auth`, `reviews`
  (ver `estrategia-testes.md`).
- Nomes de teste: `deve <comportamento> quando <condição>` (pt) ou inglês
  consistente do arquivo.

## Arquivos de ambiente
- Nunca commitar `.env`; apenas `.env.example`. Novas variáveis vão no exemplo
  com breve comentário (`apps/api/.env.example` espelha a API; web usa
  `API_INTERNAL_URL`).