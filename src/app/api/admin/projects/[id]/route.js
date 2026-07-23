import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PUT(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { title, category, description, tags, link, featured, image_url } = body;

  if (!title?.trim() || !category?.trim() || !description?.trim()) {
    return Response.json({ error: "Title, category, and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    UPDATE projects
    SET title = ${title}, category = ${category}, description = ${description},
        tags = ${tags ?? []}, link = ${link || "#"}, featured = ${Boolean(featured)},
        image_url = ${image_url || null}
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
  await sql`DELETE FROM projects WHERE id = ${id}`;
  return Response.json({ success: true });
}
