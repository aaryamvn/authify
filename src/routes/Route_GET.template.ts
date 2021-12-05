import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";
import { ApiResponseType } from "~/types/global";
import { Type, Static } from "@sinclair/typebox";
import { getSuccessResponseSchema } from "~/utils/typebox";

/** Typebox Schemas and Types */
namespace TB {
  /** The blueprint for the querystring */
  export const Querystring = Type.Object({
    property: Type.String({}),
  });
  export type QuerystringType = Static<typeof Querystring>;

  /** The blueprint for the URL params */
  export const UrlParams = Type.Object({
    property: Type.String({}),
  });
  export type UrlParamsType = Static<typeof UrlParams>;

  /** The blueprint for the data property in the response object */
  export const ResponseData = Type.Object({
    property: Type.String({}),
  });
  export type ResponseDataType = Static<typeof ResponseData>;

  /** The success response (200/201) */
  export const Response = getSuccessResponseSchema(ResponseData);
  export type ResponseType = ApiResponseType<ResponseDataType>;

  /** Props Interface */
  export interface Props {
    Querystring: QuerystringType;
    Params: UrlParamsType;
  }
}

namespace Router {
  /** Config Options For Fastify Route */
  const options: RouteShorthandOptions = {
    schema: {
      querystring: TB.Querystring,
      params: TB.UrlParams,
      response: { 200: TB.Response },
    },
  };

  /** Template Endpoint */
  export const route: FastifyPluginAsync = async (
    fastify,
    opts
  ): Promise<void> => {
    fastify.get<TB.Props>(
      "/_template",
      options,
      async function (req, res): Promise<TB.ResponseType> {
        res.status(200);
        return {
          ok: true,
          message: "Dummy Message",
          data: {
            property: "string",
          },
        };
      }
    );
  };
}

export default Router.route;
