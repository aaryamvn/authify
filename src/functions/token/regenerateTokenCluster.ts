import { TokenCluster } from "~/models/TokenCluster.model";
import { executeOrFail } from "~/utils/errors";
import { createToken } from "./createToken";
import { prisma } from "~/providers/prisma";
import { verifyToken } from "./verifyToken";

/** Regenerates a token cluster. */

export async function regenerateTokenCluster(
  refreshToken: string
): Promise<Omit<TokenCluster, "user">> {
  let newTokenCluster: Omit<TokenCluster, "user"> = {} as any;

  // verify the refresh token and extract the userId from the payload
  const userId = (await verifyToken(refreshToken, "refresh")).user.id;

  // regenerate the token cluster
  await executeOrFail(async function () {
    newTokenCluster = await prisma.tokenCluster.update({
      where: { refreshToken },
      data: {
        accessToken: createToken(userId, "access"),
        refreshToken: createToken(userId, "refresh"),
      },
    });
  });

  return newTokenCluster;
}
