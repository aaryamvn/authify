import fp from "fastify-plugin";
import fastifyHelmet from "fastify-helmet";

/**
 * This plugins implements fastify-helmet
 */

export default fp(async (fastify, _) => {
  fastify.register(fastifyHelmet);
});
