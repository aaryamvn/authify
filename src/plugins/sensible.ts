import fp from "fastify-plugin";
import fastifySensible, { SensibleOptions } from "fastify-sensible";

/**
 * This plugins adds some utilities to handle http errors
 */

export default fp<SensibleOptions>(async (fastify, _) => {
  fastify.register(fastifySensible, {
    errorHandler: false,
  });
});
