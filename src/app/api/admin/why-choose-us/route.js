import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM why_choose_us ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { icon, title, description } = body;

  if (!title?.trim() || !description?.trim()) {
    return Response.json({ error: "Title and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO why_choose_us (icon, title, description)
    VALUES (${icon || "users"}, ${title}, ${description})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
