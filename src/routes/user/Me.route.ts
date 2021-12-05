import { Static } from "@sinclair/typebox";
import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { isAuthenticated } from "~/hooks/isAuthenticated";
import { UserSchema } from "~/schemas/UserSchema";
import { ApiResponseType } from "~/types/global";
import { getSuccessResponseSchema } from "~/utils/typebox";

/** Typebox Schemas and Types */
namespace TB {
  /** The blueprint for the data property in the response object */
  export const ResponseData = UserSchema;
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

  /** Retrieve the currently logged in user */
  export const route: FastifyPluginAsync = async (
    fastify,
    opts
  ): Promise<void> => {
    fastify.addHook("preHandler", isAuthenticated);

    fastify.get(
      "/me",
      options,
      async function (req, res): Promise<TB.ResponseType> {
        res.status(200);
        return {
          ok: true,
          message: "Successfully retrieved user.",
          data: req.user,
        };
      }
    );
  };
}

export default Router.route;
