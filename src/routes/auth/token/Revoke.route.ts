import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { revokeAllTokenClusters } from "~/functions/token/revokeAllTokenClusters";
import { revokeTokenCluster } from "~/functions/token/revokeTokenCluster";
import { isAuthenticated } from "~/hooks/isAuthenticated";
import { ApiResponseType } from "~/types/global";
import { getSuccessResponseSchema } from "~/utils/typebox";

/** Typebox Schemas and Types */
namespace TB {
  /** The blueprint for the data property in the response object */
  export const ResponseData = Type.Object({});
  export type ResponseDataType = Static<typeof ResponseData>;

  /** The success response (200/201) */
  export const Response = getSuccessResponseSchema(ResponseData);
  export type ResponseType = ApiResponseType<ResponseDataType>;
}

namespace Router {
  /** Config Options For Fastify Route */
  const options: RouteShorthandOptions = {
    schema: {
      response: { 200: TB.Response },
    },
  };

  /** Revoke A Token Cluster */
  export const route: FastifyPluginAsync = async (
    fastify,
    opts
  ): Promise<void> => {
    fastify.addHook("preHandler", isAuthenticated);

    fastify.delete(
      "/revoke",
      options,
      async function (req, res): Promise<TB.ResponseType> {
        const accessToken = req.headers.authorization?.split(" ")[1]!;

        await revokeTokenCluster(accessToken);

        res.status(200);
        return {
          ok: true,
          message: "Successfully Revoked Token Cluster.",
          data: {},
        };
      }
    );

    fastify.delete(
      "/revoke_all",
      options,
      async function (req, res): Promise<TB.ResponseType> {
        const accessToken = req.headers.authorization?.split(" ")[1]!;

        await revokeAllTokenClusters(accessToken);

        res.status(200);
        return {
          ok: true,
          message: "Successfully Revoked All Token Clusters.",
          data: {},
        };
      }
    );
  };
}

export default Router.route;
