import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import { loadEnv } from "./config.js";
import { healthRoutes } from "./routes/health.js";

export function buildServer() {
  const env = loadEnv();

  const app = Fastify({
    logger: env.NODE_ENV === "development",
  });

  app.register(cookie);

  // Em produção o browser só fala com a API via proxy do apps/web (mesmo
  // origin); o CORS fica restrito a dev, quando o web chama a API direto.
  app.register(cors, {
    origin: env.APP_URL,
    credentials: true,
  });

  app.register(healthRoutes, { prefix: "" });

  return app;
}