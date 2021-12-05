import { User } from "./models/User.model";
import { FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest extends FastifyRequest {
    user: User;
  }
}
