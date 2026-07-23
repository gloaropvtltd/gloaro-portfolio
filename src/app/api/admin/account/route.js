import { cookies } from "next/headers";
import { sql } from "@/utils/db";
import {
  createSessionToken,
  hashPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  verifyPassword,
} from "@/utils/auth";
import { getAdminEmail } from "@/utils/requireAdmin";

export async function GET() {
  const email = await getAdminEmail();
  if (!email) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ email });
}

export async function PUT(request) {
  const email = await getAdminEmail();
  if (!email) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { currentPassword, newEmail, newPassword } = body ?? {};

  if (!currentPassword) {
    return Response.json({ error: "Current password is required." }, { status: 400 });
  }
  if (!newEmail?.trim()) {
    return Response.json({ error: "A new email is required." }, { status: 400 });
  }

  const [dbAdmin] = await sql`SELECT * FROM admin_users WHERE email = ${email}`;
  const currentHash = dbAdmin?.password_hash ?? process.env.ADMIN_PASSWORD_HASH;

  if (!currentHash || !verifyPassword(currentPassword, currentHash)) {
    return Response.json({ error: "Current password is incorrect." }, { status: 401 });
  }

  const normalizedEmail = newEmail.trim();
  const passwordHash = newPassword?.trim() ? hashPassword(newPassword.trim()) : currentHash;

  try {
    if (dbAdmin) {
      await sql`
        UPDATE admin_users SET email = ${normalizedEmail}, password_hash = ${passwordHash}
        WHERE id = ${dbAdmin.id}
      `;
    } else {
      await sql`
        INSERT INTO admin_users (email, password_hash) VALUES (${normalizedEmail}, ${passwordHash})
      `;
    }
  } catch {
    return Response.json(
      { error: "That email is already in use, or the database isn't reachable." },
      { status: 400 }
    );
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

  return Response.json({ success: true, email: normalizedEmail });
}
