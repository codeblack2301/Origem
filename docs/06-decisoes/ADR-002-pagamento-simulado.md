# ADR-002 — Pagamento sempre simulado (sem gateway)

- **Data**: 2026-09-10
- **Status**: Aceita

## Contexto
Limite do projeto: "pagamento simulado, sem gateways reais". Mesmo assim, o
checkout deve exercitar estados de pedido e concorrência de estoque de forma
realista.

## Decisão
- Módulo `PaymentSimulator` interno em `apps/web/src/server` que aprova/recusa
  de forma determinística conforme `SIMULATOR_SUCCESS_RATE` e delay
  configuráveis.
- Pedido nasce `PENDING_PAYMENT` e vai a `PAID` via simulador; `mode=simulated`
  gravado, `reference` gerado como idempotência por `orderId`.
- Nenhum dado de cartão em qualquer camada.

## Alternativas consideradas
- **Gateway sandbox real (Stripe/PayPal test)**: violaria o limite de projeto e
  exigiria contas/segredos do time.
- **Apenas marcar "pago" sem simulador**: não exercitaria estados de falha nem
  idempotência.

## Consequências
- Ganhos: fluxo de pedido completo e testável; E2E determinístico.
- Custos/riscos: não cobre integração real (fora do escopo); se um dia entrar
  gateway, o contrato `orders.status` já suporta evolução.