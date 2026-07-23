import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PUT(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, role, company, review, rating } = body;

  if (!name?.trim() || !review?.trim()) {
    return Response.json({ error: "Name and review are required." }, { status: 400 });
  }

  const [row] = await sql`
    UPDATE testimonials
    SET name = ${name}, role = ${role || ""}, company = ${company || ""},
        review = ${review}, rating = ${rating || 5}
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
  await sql`DELETE FROM testimonials WHERE id = ${id}`;
  return Response.json({ success: true });
}
