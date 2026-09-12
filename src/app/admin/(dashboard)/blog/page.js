"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/Admin/AdminTable";
import AdminFormModal from "@/components/Admin/AdminFormModal";

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "slug", label: "Slug (URL path, e.g. my-post-title)", type: "text", required: true },
  { name: "excerpt", label: "Excerpt (short summary)", type: "textarea", required: true },
  {
    name: "content",
    label: "Content (separate paragraphs with a blank line)",
    type: "textarea",
    required: true,
  },
  { name: "cover_image_url", label: "Cover Image URL", type: "text" },
  { name: "author", label: "Author", type: "text", defaultValue: "GLOARO Team" },
  { name: "published", label: "Published", type: "checkbox", defaultValue: true },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "published", label: "Published" },
];

export default function AdminBlogPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    const url = editing ? `/api/admin/blog/${editing.id}` : "/api/admin/blog";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to save.");
    }
    setShowForm(false);
    setEditing(null);
    await load();
  };

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.title}"?`)) return;
    await fetch(`/api/admin/blog/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h2 text-foreground">Blog</h1>
          <p className="mt-1 text-muted">Manage blog posts shown on /blog.</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Post
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <AdminTable
            columns={columns}
            rows={items}
            emptyLabel="No blog posts yet."
            onEdit={(row) => {
              setEditing(row);
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />
        )}
      </div>

      {showForm && (
        <AdminFormModal
          title={editing ? "Edit Post" : "Add Post"}
          fields={fields}
          initialValues={editing}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
