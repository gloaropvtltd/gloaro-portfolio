import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function GET() {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const rows = await sql`SELECT * FROM blog_posts ORDER BY published_at DESC, id DESC`;
  return Response.json({ items: rows });
}

export async function POST(request) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, slug, excerpt, content, cover_image_url, author, published } = body;

  if (!title?.trim() || !slug?.trim() || !excerpt?.trim() || !content?.trim()) {
    return Response.json(
      { error: "Title, slug, excerpt, and content are required." },
      { status: 400 }
    );
  }

  try {
    const [row] = await sql`
      INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, author, published)
      VALUES (
        ${title}, ${slug}, ${excerpt}, ${content},
        ${cover_image_url || null}, ${author || "GLOARO Team"}, ${published ?? true}
      )
      RETURNING *
    `;
    return Response.json({ item: row }, { status: 201 });
  } catch (err) {
    if (err.message?.includes("blog_posts_slug_key")) {
      return Response.json({ error: "That slug is already in use." }, { status: 409 });
    }
    throw err;
  }
}
