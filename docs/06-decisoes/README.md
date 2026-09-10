# Decisões de Arquitetura (ADRs)

Toda decisão relevante e de difícil reversão (stack, banco, concorrência,
integrações) vira um ADR numerado. Formato breve inspirado em Michael Nygard.

## O que registrar
1. **Contexto**: problema/decisão que surgiu.
2. **Decisão**: escolha final.
3. **Alternativas consideradas** (sempre!) e por que cada uma foi descartada.
4. **Consequências**: ganhos, custos e riscos.
5. **Status**: `Proposta | Aceita | Depreciada | Substituída por ADR-XXX`.

## Ativos
| ADR | Título | Status |
|---|---|---|
| [ADR-001](./ADR-001-stack.md) | Stack: monorepo TS, Next.js, Prisma, PostgreSQL | Aceita |
| [ADR-002](./ADR-002-pagamento-simulado.md) | Pagamento sempre simulado, sem gateway | Aceita |
| [ADR-003](./ADR-003-web-api.md) | Frontend (Next+shadcn) e API (Node+Fastify) separados | Aceita |

## Modelo

```markdown
# ADR-XXX — Título curto

- **Data**: YYYY-MM-DD
- **Status**: Proposta

## Contexto
[o que motiva a decisão]

## Decisão
[o que decidimos]

## Alternativas consideradas
- Alternativa A — por que não
- Alternativa B — por que não

## Consequências
- Ganhos: ...
- Custos/riscos: ...
```