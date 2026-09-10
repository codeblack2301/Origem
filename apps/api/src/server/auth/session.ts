// Sessão JWT para autenticação (ADR-003). Assinatura HS256; o token viaja em
// cookie httpOnly definido pela API (o apps/web apenas repassa via proxy).
import { jwtVerify, SignJWT } from "jose";
import type { Role } from "@prisma/client";

export interface SessionPayload {
  sub: string;
  name: string;
  role: Role;
  artisanId?: string | null;
  expiresInMinutes?: number;
}

const ALG = "HS256";
const encoder = new TextEncoder();

export const SESSION_COOKIE = "origem.session";
export const DEFAULT_EXPIRY = "8h";

export async function signSession(
  payload: SessionPayload,
  secret: string,
): Promise<string> {
  const expiresMinutes = payload.expiresInMinutes ?? 8 * 60;
  return new SignJWT({
    name: payload.name,
    role: payload.role,
    artisanId: payload.artisanId ?? null,
  })
    .setProtectedHeader({ alg: ALG })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${expiresMinutes}m`)
    .sign(encoder.encode(secret));
}

export async function verifySession(
  token: string,
  secret: string,
): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, encoder.encode(secret), {
    algorithms: [ALG],
  });

  if (!payload.sub || typeof payload.role !== "string") {
    throw new Error("token sem subject ou role inválidos");
  }

  return {
    sub: payload.sub,
    name: typeof payload.name === "string" ? payload.name : "",
    role: payload.role as Role,
    artisanId:
      typeof payload.artisanId === "string" ? payload.artisanId : undefined,
  };
}