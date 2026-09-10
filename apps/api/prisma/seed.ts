// Seed mínimo e determinístico. Expansão (produtos, pedidos, avaliações)
// seguirá docs/04-banco/seed-dados.md.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hash fixo de demonstração. A autenticação (NextAuth) definirá o algoritmo
// real; estes usuários servirão apenas para a primeira navegação.
const DEMO_HASH =
  "$2b$10$roundedcormorant0000000000000000000000000000000000000000000000";

const categories = [
  { name: "Cerâmica", slug: "ceramica" },
  { name: "Renda e Bordado", slug: "renda-e-bordado" },
  { name: "Xilogravura", slug: "xilogravura" },
  { name: "Madeira e Escultura", slug: "madeira-e-escultura" },
  { name: "Cordel e Papel", slug: "cordel-e-papel" },
];

async function main() {
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@origem.dev" },
    update: {},
    create: {
      name: "Administradora Origem",
      email: "admin@origem.dev",
      passwordHash: DEMO_HASH,
      role: "ADMIN",
      consentLoggedAt: new Date(),
    },
  });

  const artisan = await prisma.user.upsert({
    where: { email: "artesao@origem.dev" },
    update: {},
    create: {
      name: "Mestra Iracema (demo)",
      email: "artesao@origem.dev",
      passwordHash: DEMO_HASH,
      role: "ARTISAN",
      consentLoggedAt: new Date(),
    },
  });

  await prisma.artisan.upsert({
    where: { userId: artisan.id },
    update: {},
    create: {
      userId: artisan.id,
      bio: "Ceramista de Caruaru, terceira geração da família.",
      story: "Conta de exemplo para desenvolvimento.",
      city: "Caruaru",
      uf: "PE",
      origin: "Caruaru - Agreste de Pernambuco",
      status: "ACTIVE",
    },
  });

  await prisma.user.upsert({
    where: { email: "comprador@origem.dev" },
    update: {},
    create: {
      name: "Júlia (demo)",
      email: "comprador@origem.dev",
      passwordHash: DEMO_HASH,
      role: "BUYER",
      consentLoggedAt: new Date(),
    },
  });

  console.log("Seed concluído:", categories.length, "categorias + usuários demo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());