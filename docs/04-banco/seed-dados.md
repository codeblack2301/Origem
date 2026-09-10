# Dados de Seed

Dados **sintéticos e representativos** da economia criativa de PE. Nunca coletar
dados reais de artesãos sem consentimento; se houver parceria, registrar
consentimento (LGPD) e anonimizar o que não for necessário.

## Princípios
- **Representatividade**: referências culturais reais e respeitosas (técnicas,
  cidades), mas nomes/avatares de artesãos **fictícios**.
- **Determinístico**: mesmo resultado para todos os devs — sementes fixas
  (ids explícitos, não aleatórios).
- **Reset fácil**: `npm run db:seed:reset` recria e semeia.
- **Quantidades pequenas e realistas**: suficiente para vitrine, testes e
  dashboards, sem sobrecarregar consultas.

## Conteúdo do seed
- 5 categorias: Cerâmica, Renda e Bordado, Xilogravura, Madeira e Escultura,
  Cordel e Papel.
- 8–10 artesãos fictícios por técnica em cidades de PE (Caruaru, Recife,
  Olinda, Gravatá, Bezerros, Triunfo, Tracunhaém, Petrolina).
- ~200–400 produtos com ficha completa: título, descrição, técnica, materiais,
  origem, preço (centavos), estoque, fotos (de imagens públicas licenciadas ou
  placeholders), tempo de produção.
- Pedidos em vários status (inclusive `DELIVERED` para avaliações) ao longo de
  ~6 meses para alimentar indicadores.
- 1 conta admin, 1 artesão demo, 2 compradores demo com senhas documentadas
  (apenas dev).

## Recomendação
- Para avaliar a qualidade da recomendação, garantir sobreposição proposital
  (ex.: vários produtos na mesma técnica/origem).
- Pedidos/avaliações do seed geram pares `comprou X → gostou de Y` rastreáveis.

## Como executar
```bash
# (com banco up)
npm run db:push       # cria schema (equivalente a npx prisma db push em apps/api)
npm run db:seed       # dados sintéticos
```

## Estrutura
- Script em `apps/api/prisma/seed.ts` (executado via "prisma.seed" no
  `package.json` do `@origem/api`).
- Dados "crus" em `apps/api/prisma/seed-data/` (json/ts) → importados no seed.

## Cuidados culturais
- Descrever cada técnica com exatidão (sem exotismo); nomes de técnicas conforme
  o vocabulário local (ex.: "renda renascença", "bordado filé").
- Autoria sempre atribuída a um artesão fictício e claramente marcada como
  ficcional no seed.
- Fotos: somente domínio público / Creative Commons com atribuição, ou
  placeholders gerados; nunca puxar de perfis reais.