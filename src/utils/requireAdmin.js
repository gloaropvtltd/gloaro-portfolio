import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/utils/auth";

export async function getAdminEmail() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySession(token)?.email ?? null;
}

export async function requireAdmin() {
  return Boolean(await getAdminEmail());
}
