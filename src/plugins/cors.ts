import fp from "fastify-plugin";
import fastifyCors, { FastifyCorsOptions } from "fastify-cors";

/**
 * This plugins implements fastify-cors
 */

export default fp<FastifyCorsOptions>(async (fastify, _) => {
  fastify.register(fastifyCors);
});
