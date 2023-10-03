import { PrismaClient } from '@prisma/client';
import { memberSeed } from './members';
import { bookSeed } from './books';

const prisma = new PrismaClient();

async function generateSeed() {
  const members = await prisma.members.createMany({
    data: memberSeed,
    skipDuplicates: false,
  });

  const books = await prisma.books.createMany({
    data: bookSeed,
    skipDuplicates: false,
  });

  console.log({ members, books });
}

generateSeed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
