import { User } from ".prisma/client";
import { prisma } from "~/providers/prisma";
import { executeOrFail, throwApiError } from "~/utils/errors";
import bcrypt from "bcrypt";

/** Verifies the Username/Email and Password A User Supplies Whilst Logging In
 * @param {string} unameOrEmail The username or email of the user
 * @param {string} password The (raw) password of the user
 * @returns {User} the user
 */

export async function verifyUserCredentials(
  unameOrEmail: string,
  password: string
): Promise<User> {
  let user: User | null = {} as any;

  // find the user
  await executeOrFail(async function () {
    user =
      (await prisma.user.findFirst({
        where: { username: unameOrEmail, signupMethod: "EMAIL" },
      })) ||
      (await prisma.user.findFirst({
        where: { email: unameOrEmail, signupMethod: "EMAIL" },
      }));
  });

  if (!user)
    throwApiError(401, "Invalid Username Or Password.", "invalid_credentials");

  // verify the password
  const isPasswordValid = await bcrypt.compare(password, user!.password!);
  if (!isPasswordValid)
    throwApiError(401, "Invalid Username Or Password.", "invalid_credentials");

  return user!;
}
