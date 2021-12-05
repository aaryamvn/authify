import jwt, {
  VerifyOptions,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";

import { prisma } from "~/providers/prisma";
import { TokenCluster } from "~/models/TokenCluster.model";
import { ApiCode } from "~/types/ApiCode";
import { throwApiError } from "~/utils/errors";
import { logger } from "~/providers/logger";
import { User } from "~/models/User.model";

/**
 * Verifies an access or refresh token
 
 * @param {string} token - The token to verify
 * @param {string} tokenType - The type of the token
 * @param {VerifyOptions} opts - Options for the verification
 
 * @returns {TokenCluster} - Corresponding token cluster

*/

export async function verifyToken(
  token: string,
  tokenType: "access" | "refresh",
  opts: VerifyOptions = {}
): Promise<TokenCluster> {
  let tokenCluster: TokenCluster = {} as any;

  // conditionally set secret variables
  const atSecret = process.env.ACCESS_TOKEN_SECRET;
  const rtSecret = process.env.REFRESH_TOKEN_SECRET;
  const tokenSecret = tokenType === "access" ? atSecret : rtSecret;

  // conditionally set error codes
  const errorCodes: { expired: ApiCode; invalid: ApiCode } = {
    expired:
      tokenType === "access" ? "expired_access_token" : "expired_refresh_token",
    invalid:
      tokenType === "access" ? "invalid_access_token" : "invalid_refresh_token",
  };

  // conditionally set token cluster find options
  const tokenClusterFindOptions =
    tokenType === "access" ? { accessToken: token } : { refreshToken: token };

  try {
    // verify the token signature
    const payload = jwt.verify(token, tokenSecret!, { ...opts });

    // find the corresponding token cluster
    tokenCluster = (await prisma.tokenCluster.findFirst({
      where: { ...tokenClusterFindOptions, userId: (payload as any).userId },
      include: {
        user: true,
      },
    })) as any;
  } catch (err) {
    logger.error(err);

    // token is expired error
    if (err instanceof TokenExpiredError)
      throwApiError(401, `${tokenType} Token Expired`, errorCodes.expired);

    // fallback error
    throwApiError(401, `${tokenType} Token Invalid`, errorCodes.invalid);
  }

  // if the corresponding token cluster was not found, throw an error
  if (!tokenCluster)
    throwApiError(401, `${tokenType} Token Invalid`, errorCodes.invalid);

  // return the token cluster
  return tokenCluster;
}
