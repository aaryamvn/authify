import bcrypt from "bcrypt";

import { executeOrFail, throwApiError } from "~/utils/errors";
import { omitKeys } from "~/utils/objects";

import { prisma } from "~/providers/prisma";
import { generateUsername } from "./generateUsername";
import { User } from ".prisma/client";

async function hashPassword(password: string): Promise<string | undefined> {
  const hashedPassword = await executeOrFail(
    async () => await bcrypt.hash(password, 10)
  );

  return hashedPassword;
}

export async function createUserByEmail(
  email: string,
  password: string
): Promise<Omit<User, "password">> {
  // if the user already exists, throw an error
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists)
    return throwApiError(401, "User already exists.", "user_exists") as any;

  // create the user
  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      username: generateUsername({ length: 13, type: "url-safe" }),
      signupMethod: "EMAIL",
      isVerified: false,
    },
  });

  // clean up the new user object and return it
  return omitKeys(user, ["password"]);
}
