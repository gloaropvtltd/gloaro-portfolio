import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM faqs ORDER BY sort_order ASC, id ASC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { question, answer } = body;

  if (!question?.trim() || !answer?.trim()) {
    return Response.json({ error: "Question and answer are required." }, { status: 400 });
  }

  const [row] = await sql`
    INSERT INTO faqs (question, answer)
    VALUES (${question}, ${answer})
    RETURNING *
  `;
  return Response.json({ item: row }, { status: 201 });
}
