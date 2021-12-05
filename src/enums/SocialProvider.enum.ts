import { createEnum, ValuesOf } from "decotix";

export const SocialProviderEnum = createEnum("SocialProvider", [
  "GOOGLE",
  "TWITTER",
]);

export type SocialProviderType = ValuesOf<typeof SocialProviderEnum>;
