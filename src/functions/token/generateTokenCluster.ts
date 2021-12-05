import { prisma } from "~/providers/prisma";

import { TokenCluster } from "~/models/TokenCluster.model";
import { executeOrFail } from "~/utils/errors";
import { createToken } from "./createToken";

/**
 * Creates an access token and refresh token pair for a particular user

 * @param {string} user The ID of the user to generate the token pair for
 * @returns {TokenCluster} The token pair
 */

export async function generateTokenCluster(
  userId: string
): Promise<Omit<TokenCluster, "user">> {
  // variable declaration
  let tokenCluster: Omit<TokenCluster, "user"> = {} as any;

  // create the tokens
  const accessToken = createToken(userId, "access");
  const refreshToken = createToken(userId, "refresh");

  // generate token cluster
  await executeOrFail(async function () {
    tokenCluster = await prisma.tokenCluster.create({
      data: {
        accessToken,
        refreshToken,
        user: { connect: { id: userId } },
      },
    });
  });

  return tokenCluster;
}
