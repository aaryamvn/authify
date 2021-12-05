import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { verifyToken } from "~/functions/token/verifyToken";
import { throwApiError } from "~/utils/errors";

/**
 * Confirms that the user is authenticated and returns the user.
 
 * *to be used in preHandler hook*
*/

export async function isAuthenticated(
  req: FastifyRequest,
  res: FastifyReply,
  next: HookHandlerDoneFunction
) {
  // extract the auth header
  const authHeader = req.headers["authorization"];

  // confirm that it exists
  if (!authHeader) {
    throwApiError(
      401,
      "Please provide an access token in the format `Bearer {access_token}`.",
      "invalid_access_token"
    );
  }

  const accessTokenType = authHeader!.split(" ")[0];
  const accessToken = authHeader!.split(" ")[1];

  // confirm the type
  if (accessTokenType.toLowerCase() !== "bearer") {
    throwApiError(
      401,
      "Please provide an access token in the format `Bearer {access_token}`.",
      "invalid_access_token"
    );
  }

  // confirm that the access token exists in the auth header
  if (!accessToken) {
    throwApiError(
      401,
      "Please provide an access token in the format `Bearer {access_token}`.",
      "invalid_access_token"
    );
  }

  // verify the access token and obtain the user
  const user = (await verifyToken(accessToken, "access")).user;

  req.user = user;
}
