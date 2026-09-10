# Pagamento Simulado

Objetivo: exercitar o fluxo completo de checkout **sem** qualquer integração ou
dado real de pagamento (limite de projeto).

## Fluxo
1. Comprador confirma o pedido na API → pedido criado em `PENDING_PAYMENT`.
2. A API chama `PaymentSimulator` (módulo interno em `apps/api/src/server`).
3. Simulador "aprova" instantaneamente (ou aguarda N segundos configuráveis)
   → status `PAID`.
4. Comportamento de falha é opcional e determinístico (ex.: modo `fail_every` ou
   por regex no `consumerName`) para testar estados de erro.

## Configuração
- `PAYMENT_MODE=simulated` (`.env.example`).
- `SIMULATOR_SUCCESS_RATE=1.0` (0–1) para testes de falha.
- `SIMULATOR_DELAY_MS=0` para E2E rápido.

## Regras técnicas
- Nenhum dado de cartão em formulário, memória ou banco.
- `orders.payment` guarda apenas `mode=simulated` e `reference` gerado.
- Não há idempotência real de gateway; usamos `orderId` único como chave
  idempotente do simulador.
- Rejeitado: qualquer código que tente chamar gateway real (rotulagem via ADR-002).

## Testes
- Unit: simulador produz `approved`/`declined` respeitando config e é idempotente.
- Integração: pedido só passa a `PAID` com referência válida; duplicada chama
  volta `already_processed`.