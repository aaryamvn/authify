import fp from "fastify-plugin";
import fastifyCompress, { FastifyCompressOptions } from "fastify-compress";

/**
 * This plugins implements fastify-compress
 */

export default fp<FastifyCompressOptions>(async (fastify, _) => {
  fastify.register(fastifyCompress);
});
