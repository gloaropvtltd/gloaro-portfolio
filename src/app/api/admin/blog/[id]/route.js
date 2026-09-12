import { sql } from "@/utils/db";
import { requireAdmin } from "@/utils/requireAdmin";

export async function PUT(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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
      UPDATE blog_posts
      SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content},
          cover_image_url = ${cover_image_url || null}, author = ${author || "GLOARO Team"},
          published = ${published ?? true}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!row) return Response.json({ error: "Not found." }, { status: 404 });
    return Response.json({ item: row });
  } catch (err) {
    if (err.message?.includes("blog_posts_slug_key")) {
      return Response.json({ error: "That slug is already in use." }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(request, { params }) {
  if (!(await requireAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
  return Response.json({ success: true });
}
