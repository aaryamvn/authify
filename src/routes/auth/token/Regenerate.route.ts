import { Static, Type } from "@sinclair/typebox";
import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { regenerateTokenCluster } from "~/functions/token/regenerateTokenCluster";
import { setRefreshTokenInCookie } from "~/functions/token/setRefreshTokenInCookie";
import { TokenClusterSchema } from "~/schemas/TokenClusterSchema";
import { ApiResponseType } from "~/types/global";
import { throwApiError } from "~/utils/errors";
import { omitKeys } from "~/utils/objects";
import { getSuccessResponseSchema } from "~/utils/typebox";

/** Typebox Schemas and Types */
namespace TB {
  /** The blueprint for the body */
  export const Body = Type.Object({
    refreshToken: Type.Optional(Type.String()),
    client: Type.String(), // mobile or web
  });
  export type BodyType = Static<typeof Body>;

  /** The blueprint for the data property in the response object */
  export const ResponseData = TokenClusterSchema;
  export type ResponseDataType = Static<typeof ResponseData>;

  /** The success response (200/201) */
  export const Response = getSuccessResponseSchema(ResponseData);
  export type ResponseType = ApiResponseType<ResponseDataType>;

  /** Props Interface */
  export interface Props {
    Body: BodyType;
  }
}

namespace Router {
  /** Config Options For Fastify Route */
  const options: RouteShorthandOptions = {
    schema: {
      body: TB.Body,
      response: { 200: TB.Response },
    },
  };

  /** Regenerate A Token Cluster */
  export const route: FastifyPluginAsync = async (
    fastify,
    opts
  ): Promise<void> => {
    fastify.post<TB.Props>(
      "/regenerate",
      options,
      async function (req, res): Promise<TB.ResponseType> {
        const { client } = req.body;
        const isWebClient = client === "web";

        let refreshToken: string = "";

        // if it is a non-web client
        if (!isWebClient) {
          // verify that the refresh token is provided in the body for non-web clients
          if (!req.body["refreshToken"]) {
            throwApiError(
              401,
              "No refresh token provided. Non-Web clients must provide a refresh token in the body.",
              "invalid_refresh_token"
            );
          }

          refreshToken = req.body["refreshToken"]!;
        }

        // if it is a web client
        if (isWebClient) {
          // verify that the refresh token is provided in the cookies for web clients
          if (!req.cookies["refreshToken"]) {
            throwApiError(
              401,
              "No refresh token provided. Web clients must provide a refresh token in cookies.",
              "invalid_refresh_token"
            );
          }

          refreshToken = req.cookies["refreshToken"];
        }

        // regenerate the token cluster
        const newTokenCluster = await regenerateTokenCluster(refreshToken);

        if (isWebClient) {
          setRefreshTokenInCookie(res, newTokenCluster.refreshToken);
        }

        res.status(200);
        return {
          ok: true,
          message: "Successfully Regenerated Token Cluster.",
          data: isWebClient
            ? omitKeys(newTokenCluster, ["refreshToken"])
            : newTokenCluster,
        };
      }
    );
  };
}

export default Router.route;
