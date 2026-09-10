import "dotenv/config";
import { buildServer } from "./app.js";
import { loadEnv } from "./config.js";

const env = loadEnv();
const app = buildServer();

try {
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}