import { buildSchema as generatePrismaSchema } from "decotix";
import { join } from "path";
import { logger } from "./providers/logger";

async function main() {
  await generatePrismaSchema({
    input: [
      join(__dirname, "./models/*.model.ts"),
      join(__dirname, "./enums/*.enum.ts"),
    ],
    emitTo: join(__dirname, "../prisma/schema.prisma"),
    baseSchemas: [join(__dirname, "../base.prisma")],
  });

  logger.info("Generated Prisma schema successfully!");
}

try {
  main();
} catch (e) {
  logger.error(`Could not generate Prisma schema.`);
  throw e;
}
