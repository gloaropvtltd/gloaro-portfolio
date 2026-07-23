import { cookies } from "next/headers";
import { sql } from "@/utils/db";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, verifyPassword } from "@/utils/auth";

async function findAdminByEmail(email) {
  try {
    const [row] = await sql`SELECT * FROM admin_users WHERE email = ${email}`;
    return row ?? null;
  } catch {
    return null;
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body ?? {};

  if (!email?.trim() || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 });
  }

  if (!process.env.SESSION_SECRET) {
    console.error("SESSION_SECRET is not configured.");
    return Response.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  const normalizedEmail = email.trim();
  const dbAdmin = await findAdminByEmail(normalizedEmail);

  let isValid = false;
  if (dbAdmin) {
    isValid = verifyPassword(password, dbAdmin.password_hash);
  } else if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH) {
    isValid =
      normalizedEmail === process.env.ADMIN_EMAIL &&
      verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
  }

  if (!isValid) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = createSessionToken(normalizedEmail);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return Response.json({ success: true });
}
