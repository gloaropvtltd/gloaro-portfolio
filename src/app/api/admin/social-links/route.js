import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM social_links ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { platform, label, url } = body;

  if (!platform?.trim() || !label?.trim() || !url?.trim()) {
    return Response.json({ error: "Platform, label, and URL are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO social_links (platform, label, url)
    VALUES (${platform}, ${label}, ${url})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
