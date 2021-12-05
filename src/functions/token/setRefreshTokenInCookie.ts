import { FastifyReply } from "fastify";
import { IS_PROD } from "~/constants";

export function setRefreshTokenInCookie(res: FastifyReply, token: string) {
  res.clearCookie("refreshToken", { path: "/" });
  res.setCookie("refreshToken", token, {
    httpOnly: IS_PROD,
    path: "/",
  });
}
