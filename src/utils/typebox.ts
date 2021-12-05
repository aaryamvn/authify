import { Type } from "@sinclair/typebox";

/** The success response schema for JSONschema (applicable to status codes 200 and 201) */
export function getSuccessResponseSchema(data: any) {
  return {
    ok: Type.Boolean(),
    message: Type.Optional(Type.String()),
    data,
  };
}
