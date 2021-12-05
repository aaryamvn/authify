import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { ApiResponseType } from "~/types/global";
import { Type, Static } from "@sinclair/typebox";
import { getSuccessResponseSchema } from "~/utils/typebox";

/** Typebox Schemas and Types */
namespace TB {
  /** The blueprint for the data property in the response object */
  export const ResponseData = Type.Object({
    timestamp: Type.String({ format: "date-time" }),
  });
  export type responseDataType = Static<typeof ResponseData>;

  /** The success response (200/201) */
  export const Response = getSuccessResponseSchema(ResponseData);
  export type ResponseType = ApiResponseType<responseDataType>;
}

namespace Router {
  /** Config Options For Fastify Route */
  const options: RouteShorthandOptions = {
    schema: {
      response: { 200: TB.Response },
    },
  };

  /** Server Up Checking Endpoint */
  export const route: FastifyPluginAsync = async (
    fastify,
    opts
  ): Promise<void> => {
    fastify.get(
      "/lifeline",
      options,
      async function (_, res): Promise<TB.ResponseType> {
        res.status(200);
        return {
          ok: true,
          message: "Server up and running.",
          data: {
            timestamp: new Date().toISOString(),
          },
        };
      }
    );
  };
}

export default Router.route;
