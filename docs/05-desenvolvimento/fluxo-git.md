# Fluxo de Git

Grupo de 7 devs: **trunk-based com PRs mínimo** de review, main sempre
deployável.

## Convênção
- Branch principal: `main` (protegida → CI obrigatória, 1+ review).
- Nomes de branch:
  - `feature/<area>-<desc>` — nova funcionalidade
  - `fix/<area>-<desc>` — correção
  - `chore/<desc>` — infra/docs
  - `docs/<desc>` — documentação
  - Ex.: `feature/orders-checkout`, `fix/catalog-stock-decrement`.
- Commits em **Conventional Commits**:
  `feat(orders): baixa atômica de estoque no checkout`; tipos: `feat`, `fix`,
  `refactor`, `test`, `docs`, `chore`, `perf`, `build`.

## Ciclo
```bash
git checkout main && git pull
git checkout -b feature/meu-banner
git add -A && git commit -m "feat(storefront): banner de categorias"
git push -u origin feature/meu-banner
# abrir PR → CI → review → merge (squash)
```

## Regras de review
1. Rodar `npm run lint` + `npm run typecheck` localmente antes do push.
2. PR pequeno: até ~300 linhas de diff (se mais, quebrar).
3. Reviewer: foco em regras de negócio (RN), concorrência e segurança.
4. Não mergear próprio PR sem aprovação de outro dev.
5. Migração Prisma incluída **sempre** que mudar o schema.

## Proteção
- `main` protegida: 1 approval, CI passa, sem push direto.
- CI: `lint → typecheck → test → build`.

## Rebase vs merge
- Merge com **squash** no main. Atualizar sua branch com `git rebase main` para
  resolver conflitos cedo; nunca `push -f` em main.