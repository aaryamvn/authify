import { logger } from "~/providers/logger";
import { ApiCode } from "~/types/ApiCode";

/**
 * Return API Error Responses

 * @param status Status code.
 * @param message Error message.
 * @param code Api Error Code
 * @throws Error
 */

export function throwApiError(
  status: number = 500,
  message: string = "Internal server error.",
  code: ApiCode = "unknown"
) {
  throw new Error(`${status} || ${message} || ${code}`);
}

/**
 * Runs a block of code and throws an error if it fails

 * @param cb Function to run
 * @param message Error message to throw in case the function fails
 * @returns Returns the result of the cb function or throws an API error
 */

export async function executeOrFail<T>(
  cb: () => T | Promise<T>,
  status = 500,
  message = "Internal server error.",
  code: ApiCode = "unknown"
) {
  try {
    return await cb();
  } catch (err) {
    logger.error(err);
    throwApiError(status, message, code);
    return;
  }
}
