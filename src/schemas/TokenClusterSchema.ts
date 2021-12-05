import { Type, Static } from "@sinclair/typebox";

export const TokenClusterSchema = Type.Object({
  id: Type.String(),
  accessToken: Type.String(),
  refreshToken: Type.Optional(Type.String()),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
});

export type TokenClusterType = Static<typeof TokenClusterSchema>;
