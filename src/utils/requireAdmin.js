import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/utils/auth";

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(verifySession(token));
}
