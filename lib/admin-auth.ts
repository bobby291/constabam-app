import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "constabam_admin_session";

const SESSION_DURATION = 60 * 60 * 8; // 8 hours

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be configured with at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSession(email: string) {
  return new SignJWT({
    email,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("constabam")
    .setAudience("constabam-admin")
    .setExpirationTime("8h")
    .sign(getSessionSecret());
}

export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret(), {
      issuer: "constabam",
      audience: "constabam-admin",
    });

    return (
      payload.role === "admin" &&
      typeof payload.email === "string" &&
      payload.email === process.env.ADMIN_EMAIL
    );
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) {
    return false;
  }

  return verifyAdminSession(token);
}