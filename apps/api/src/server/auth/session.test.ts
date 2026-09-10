import { describe, expect, it } from "vitest";
import { signSession, verifySession } from "./session.js";

const SECRET = "test-secret-com-32-caracteres-minimos-0000";

describe("session JWT", () => {
  it("assina e verifica uma sessão válida", async () => {
    const token = await signSession(
      { sub: "u_1", name: "Júlia", role: "BUYER" },
      SECRET,
    );
    const session = await verifySession(token, SECRET);

    expect(session.sub).toBe("u_1");
    expect(session.role).toBe("BUYER");
    expect(session.artisanId).toBeUndefined();
  });

  it("rejeita token com segredo diferente", async () => {
    const token = await signSession(
      { sub: "u_1", name: "Júlia", role: "BUYER" },
      "outro-segredo-com-pelo-menos-32-caracteres-000000",
    );

    await expect(verifySession(token, SECRET)).rejects.toThrow();
  });

  it("expira após o tempo configurado", async () => {
    const expiredMinutesToken = await signSession(
      {
        sub: "u_1",
        name: "Júlia",
        role: "BUYER",
        expiresInMinutes: -1,
      },
      SECRET,
    );

    await expect(verifySession(expiredMinutesToken, SECRET)).rejects.toThrow(
      `"exp" claim timestamp check failed`,
    );
  });
});