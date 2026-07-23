import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM products ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { icon, status, title, tagline, description, highlights, link, image_url } = body;

  if (!title?.trim() || !tagline?.trim() || !description?.trim()) {
    return Response.json({ error: "Title, tagline, and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO products (icon, status, title, tagline, description, highlights, link, image_url)
    VALUES (${icon || "workflow"}, ${status || "Live"}, ${title}, ${tagline}, ${description}, ${highlights ?? []}, ${link || "#"}, ${image_url || null})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
