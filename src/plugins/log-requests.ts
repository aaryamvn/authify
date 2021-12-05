import fp from "fastify-plugin";
import { logger } from "~/providers/logger";

/**
 * This plugin will log to the console when a client requests a route
 */

export default fp(async (fastify, _) => {
  fastify.addHook("onRequest", (req, _, done) => {
    logger.info(`${req.method}: ${req.url}`);
    done();
  });
});
