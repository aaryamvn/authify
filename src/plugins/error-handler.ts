import fp from "fastify-plugin";
import { logger } from "~/providers/logger";
import { ApiResponseType } from "~/types/global";

/**
 * This plugin is a fastify error handler
 */
export default fp(async (fastify, _) => {
  fastify.setErrorHandler((error, _, reply) => {
    // disect the error message
    const errorParts = error.message.split(" || ");

    const errorStatus = parseInt(errorParts[0]) || 500;
    const errorMessage =
      errorParts.length === 3 ? errorParts[1] : error.message;
    const errorCode = errorParts[2] || "unknown";

    // log the error message
    logger.error(`${errorCode}: ${errorMessage}`);

    // send the error to the client
    reply.status(errorStatus).send({
      ok: false,
      code: errorCode,
      message: errorMessage,
      data: null,
    } as ApiResponseType<null>);
  });
});
