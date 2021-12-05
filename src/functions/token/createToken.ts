import jwt from "jsonwebtoken";
import { executeOrFail } from "~/utils/errors";

// generate an authentication token
export function createToken(
  userId: string,
  tokenType: "access" | "refresh"
): string {
  let token: string = "";

  // conditionally set secret variables
  const atSecret = process.env.ACCESS_TOKEN_SECRET;
  const rtSecret = process.env.REFRESH_TOKEN_SECRET;
  const tokenSecret = tokenType === "access" ? atSecret : rtSecret;

  // conditionally set expiry variable
  const expiry = tokenType === "access" ? "5m" : "7d";

  // generate the token
  executeOrFail(function () {
    token = jwt.sign({ userId: String(userId) }, String(tokenSecret)!, {
      expiresIn: expiry,
    });
  });

  return token!;
}
