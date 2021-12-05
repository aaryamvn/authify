export const IS_PROD = process.env.NODE_ENV === "production";
export const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:8000";
export const PASSWORD_SALT_ROUNDS = 11;
