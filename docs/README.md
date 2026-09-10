# Documentação do Origem

Índice central da documentação do projeto. Toda decisão deve ser refletida aqui
antes de virar código. Documentos são escritos em PT-BR.

## Visão e escopo ([01-visao](./01-visao))

| Documento | Para que serve |
|---|---|
| [visao-produto.md](./01-visao/visao-produto.md) | O que é o produto, problema, diferenciais |
| [personas.md](./01-visao/personas.md) | Quem usa a plataforma |
| [escopo.md](./01-visao/escopo.md) | O que entra e o que fica de fora (MVP) |

## Requisitos ([02-requisitos](./02-requisitos))

| Documento | Para que serve |
|---|---|
| [requisitos-funcionais.md](./02-requisitos/requisitos-funcionais.md) | RFs por módulo (vitrine, artesão, admin, recomendação) |
| [requisitos-nao-funcionais.md](./02-requisitos/requisitos-nao-funcionais.md) | RNFs (desempenho, segurança, usabilidade...) |
| [historias-usuario.md](./02-requisitos/historias-usuario.md) | Histórias de usuário com critérios de aceite |
| [regras-negocio.md](./02-requisitos/regras-negocio.md) | Regras de negócio (estoque, pedidos, avaliações...) |
| [glossario.md](./02-requisitos/glossario.md) | Termos do domínio |

## Arquitetura ([03-arquitetura](./03-arquitetura))

| Documento | Para que serve |
|---|---|
| [visao-arquitetural.md](./03-arquitetura/visao-arquitetural.md) | Diagramas e visão de contêineres/camadas |
| [seguranca-dados.md](./03-arquitetura/seguranca-dados.md) | Autenticação, autorização, LGPD, uploads |
| [pagamento-simulado.md](./03-arquitetura/pagamento-simulado.md) | Estratégia de checkout/pagamento fake |

## Banco de dados ([04-banco](./04-banco))

| Documento | Para que serve |
|---|---|
| [modelo-dados.md](./04-banco/modelo-dados.md) | Entidades, relacionamentos, índices |
| [seed-dados.md](./04-banco/seed-dados.md) | Dados sintéticos representativos e como gerar |

## Desenvolvimento ([05-desenvolvimento](./05-desenvolvimento))

| Documento | Para que serve |
|---|---|
| [ambiente.md](./05-desenvolvimento/ambiente.md) | Setup do ambiente (passo a passo) |
| [convencoes.md](./05-desenvolvimento/convencoes.md) | Estilo de código, nomenclatura, padrões |
| [fluxo-git.md](./05-desenvolvimento/fluxo-git.md) | Git, branches, PRs e code review |
| [estrategia-testes.md](./05-desenvolvimento/estrategia-testes.md) | Como testamos cada camada |

## Decisões de arquitetura ([06-decisoes](./06-decisoes/))

Registros de decisão (ADRs). Cada decisão relevante ganha um `ADR-XXX`. Modelo em
`06-decisoes/README.md`.

## Ciclo de vida do código

1. Nova ideia entra como **história de usuário** em `02-requisitos`.
2. Discute **arquitetura/banco** antes de codar.
3. Cria **branch** → implementa → **testes** → **PR** com review.
4. Merged, atualiza docs que mudaram.