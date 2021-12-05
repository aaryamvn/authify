import { createEnum, ValuesOf } from "decotix";

export const SignupMethodEnum = createEnum("SignupMethod", [
  "EMAIL",
  "GOOGLE",
  "TWITTER",
]);

export type SignupMethodType = ValuesOf<typeof SignupMethodEnum>;
