import { ApiCode } from "./ApiCode";

/** The API Response Type */
export interface ApiResponseType<T> {
  ok: boolean;
  message?: string;
  code?: ApiCode;
  data?: T;
}
