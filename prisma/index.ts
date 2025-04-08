import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    // await prisma.$disconnect()
    console.log("DB connected");
  })
  .catch(async (e) => {
    console.error(e);
    // await prisma.$disconnect()
    // process.exit(1)
  });

export default prisma;
