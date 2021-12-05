import fp from "fastify-plugin";
import { appendFileSync, writeFileSync } from "fs";
import { executeOrFail } from "~/utils/errors";

/**
 * This plugin makes a list of all the registered routes
 */

export default fp(async (fastify, _) => {
  // Clear the file
  writeFileSync(
    "routes.md",
    `
# Routes
This File Contains a list of all the registered routes.

Note: All routes are automatically appended to this file
  `
  );

  let i: number = 0;

  fastify.addHook("onRoute", (routeOptions) => {
    i++;

    executeOrFail(() => {
      appendFileSync(
        "routes.md",
        `\n ${i}. **${routeOptions.method} -** ${routeOptions.url}`
      );
    });
  });
});
