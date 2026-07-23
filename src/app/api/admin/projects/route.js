import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM projects ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, category, description, tags, link, featured, image_url } = body;

  if (!title?.trim() || !category?.trim() || !description?.trim()) {
    return Response.json({ error: "Title, category, and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO projects (title, category, description, tags, link, featured, image_url)
    VALUES (${title}, ${category}, ${description}, ${tags ?? []}, ${link || "#"}, ${Boolean(featured)}, ${image_url || null})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
