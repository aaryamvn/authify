import { prisma } from "~/providers/prisma";
import { executeOrFail } from "~/utils/errors";
import { verifyToken } from "./verifyToken";

/**
 * Revokes a token pair based on the provided access token
 * @param accessToken The access token that belongs to the cluster to revoke
 * @returns {boolean} Whether the token cluster was revoked or not
 */

export async function revokeTokenCluster(
  accessToken: string
): Promise<boolean> {
  // verify the access token
  await verifyToken(accessToken, "access");

  // revoke the corresponding token cluster
  await executeOrFail(async function () {
    await prisma.tokenCluster.delete({ where: { accessToken } });
  });

  return true;
}
