import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PATCH(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const [row] = await sql`
    UPDATE contact_submissions SET is_read = ${Boolean(body.is_read)}
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
  await sql`DELETE FROM contact_submissions WHERE id = ${id}`;
  return Response.json({ success: true });
}
