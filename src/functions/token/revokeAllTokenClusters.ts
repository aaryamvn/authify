import { prisma } from "~/providers/prisma";
import { executeOrFail } from "~/utils/errors";
import { verifyToken } from "./verifyToken";

/**
 * Revokes all a users token pairs based on the provided access token
 
 * @param accessToken The access token that the user is currently logged in with
 * @returns {boolean} Whether the token clusters were revoked or not
 */

export async function revokeAllTokenClusters(
  accessToken: string
): Promise<boolean> {
  let userId: string;

  // verify the access token and retrieve its corresponding token cluster
  userId = (await verifyToken(accessToken, "access")).user.id;

  // revoke all the token clusters for that one user
  await executeOrFail(async function () {
    await prisma.tokenCluster.deleteMany({ where: { userId } });
  });

  return true;
}
