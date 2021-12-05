import { join } from "path";
import AutoLoad from "fastify-autoload";
import Fastify from "fastify";
import * as dotenv from "dotenv";
import { logger } from "./providers/logger";

// set variables
const fastify = Fastify();
const port = Number(process.env.PORT) || 8000;

/**
 * Register The Fastify Plugins
 */
function registerPlugins() {
  fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
  });

  logger.info("✔️  Registered Plugins.");
}

/**
 * Register The Routes
 */
function registerRoutes() {
  fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    ignorePattern: /.*(template).(ts|js)/,
    prefix: "/api",
  });

  logger.info("✔️  Registered Routes.");
}

/**
 * Run the Fastify Server
 */

function runServer(): void {
  fastify.listen(port, "0.0.0.0", (err, address) => {
    // No Errors
    if (!err) {
      logger.info(`🏁 Server running at ${address} 🚀`);
      return;
    }

    // In case of error
    logger.error(err.message);
    return process.exit(1);
  });
}

async function main(): Promise<void> {
  dotenv.config();

  registerPlugins();
  registerRoutes();
  runServer();
}

main().catch(console.error);
