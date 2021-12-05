import fp from "fastify-plugin";
import fastifyCookie from "fastify-cookie";

/**
 * This plugins sets up authentication
 */

export default fp(async (fastify, _) => {
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });
  fastify.decorate("user", null);
});
