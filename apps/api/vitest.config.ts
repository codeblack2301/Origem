import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    env: {
      NODE_ENV: "test",
      DATABASE_URL:
        "postgresql://origem:origem@localhost:5432/origem_test?schema=public",
      JWT_SECRET: "test-secret-com-32-caracteres-minimos-0000",
    },
  },
});