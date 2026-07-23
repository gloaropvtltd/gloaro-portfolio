import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PUT(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { icon, title, description } = body;

  if (!title?.trim() || !description?.trim()) {
    return Response.json({ error: "Title and description are required." }, { status: 400 });
  }

  const [row] = await sql`
    UPDATE process_steps
    SET icon = ${icon || "search"}, title = ${title}, description = ${description}
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
  await sql`DELETE FROM process_steps WHERE id = ${id}`;
  return Response.json({ success: true });
}
