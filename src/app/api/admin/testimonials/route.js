import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, role, company, review, rating } = body;

  if (!name?.trim() || !review?.trim()) {
    return Response.json({ error: "Name and review are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO testimonials (name, role, company, review, rating)
    VALUES (${name}, ${role || ""}, ${company || ""}, ${review}, ${rating || 5})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
