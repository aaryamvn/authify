export type ApiCode =
  | "unknown"

  // token
  | "expired_access_token"
  | "expired_refresh_token"
  | "invalid_access_token"
  | "invalid_refresh_token"

  // user
  | "user_not_found"
  | "user_exists"
  | "invalid_credentials";
