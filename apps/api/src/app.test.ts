import { describe, expect, it } from "vitest";
import { buildServer } from "./app.js";

describe("buildServer", () => {
  it("responde em /api/health", async () => {
    const app = buildServer();

    const res = await app.inject({
      method: "GET",
      url: "/api/health",
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toMatchObject({ status: "ok", service: "origem-api" });

    await app.close();
  });
});