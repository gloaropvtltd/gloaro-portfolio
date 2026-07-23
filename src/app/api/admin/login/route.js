import { cookies } from "next/headers";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, verifyPassword } from "@/utils/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body ?? {};

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH || !process.env.SESSION_SECRET) {
    console.error("Admin auth environment variables are not fully configured.");
    return Response.json({ error: "Admin login is not configured." }, { status: 500 });
  }

  if (email !== process.env.ADMIN_EMAIL || !verifyPassword(password ?? "", process.env.ADMIN_PASSWORD_HASH)) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = createSessionToken(email);
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
