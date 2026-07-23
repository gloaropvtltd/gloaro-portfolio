import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PUT(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { icon, status, title, tagline, description, highlights, link, image_url } = body;

  if (!title?.trim() || !tagline?.trim() || !description?.trim()) {
    return Response.json({ error: "Title, tagline, and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    UPDATE products
    SET icon = ${icon || "workflow"}, status = ${status || "Live"}, title = ${title},
        tagline = ${tagline}, description = ${description}, highlights = ${highlights ?? []},
        link = ${link || "#"}, image_url = ${image_url || null}
    WHERE id = ${id}
    RETURNING *
  `;

  if (!row) return Response.json({ error: "Not found." }, { status: 404 });
  return Response.json({ item: row });
}

export async function DELETE(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await sql`DELETE FROM products WHERE id = ${id}`;
  return Response.json({ success: true });
}
