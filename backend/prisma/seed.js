// Seed the database with the dishes from dish-assignment.json.
// Uses upsert (matched on dishId) so the script is safe to run more than once.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const __dirname = dirname(fileURLToPath(import.meta.url));
const dishes = JSON.parse(
  readFileSync(join(__dirname, "dish-assignment.json"), "utf-8")
);

async function main() {
  for (const dish of dishes) {
    await prisma.dish.upsert({
      where: { dishId: dish.dishId },
      update: {
        dishName: dish.dishName,
        imageUrl: dish.imageUrl,
        isPublished: dish.isPublished,
      },
      create: {
        dishId: dish.dishId,
        dishName: dish.dishName,
        imageUrl: dish.imageUrl,
        isPublished: dish.isPublished,
      },
    });
  }
  console.log(`Seeded ${dishes.length} dishes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
