# Segurança e Dados

## Autenticação e autorização
- Sessões gerenciadas por NextAuth (cookie httpOnly, secure em produção).
- Roles: `BUYER`, `ARTISAN`, `ADMIN`. Guard por grupo de rotas **e** por
  endpoint (sempre server-side; nunca confie no cliente).
- `ARTISAN` acessa somente `artisanId` próprio (verificação a cada query).

## Validação e sanitização
- Todo input que cruza o limite de confiança passa por schema Zod.
- Renderização server-side do framework escapa por padrão; dados de usuário
  tratados como texto (sem `dangerouslySetInnerHTML`).
- Comentários/avaliações passam por moderação textual simples antes de publicar.

## Falhas comuns a evitar
- NUNCA logue senha, hash sensível ou dados de pagamento.
- Segredos somente em variáveis de ambiente / `.env` (gitignored).
- Não liste produtos em rascunho (`DRAFT`/`ARCHIVED`) em nenhuma endpoint pública.
- Não exponha `internal_id`/timestamps internos em payloads públicos sem motivo.

## LGPD (dados pessoais)
- Cadastro: consentimento explícito (checkbox) registrado.
- Coleta mínima: e-mail, nome, cidade/UF, endereço de entrega para pedido.
- Dados do artesão (história, fotos) são **conteúdo público** apenas quando ele
  publica; sobreaviado no cadastro.
- Endpoint para solicitar exportação/exclusão de dados pessoais (escopo RNF-016).

## Upload de imagens
- Tipos permitidos: JPEG/PNG/WebP; limite de tamanho (ex.: 5 MB).
- Nome de arquivo gerado pelo servidor; conteúdo servido com `Content-Type`
  seguro e `X-Content-Type-Options: nosniff`.
- Em desenvolvimento local, armazenamento em disco sob `apps/web/uploads/`;
  em produção, bucket objet-storage (não implementado — escopo controlado).

## Trilha de auditoria (admin)
- Tabela `audit_log`: `adminId`, `action`, `targetType`, `targetId`, `payload`,
  `createdAt`. Ações: aprovar/rejeitar artesão, publicar/despublicar produto,
  moderar avaliação.