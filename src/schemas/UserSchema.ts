import { Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
  id: Type.String(),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
  username: Type.String(),
  signupMethod: Type.String(),
  isVerified: Type.Optional(Type.Boolean()),
  email: Type.String(),
});
