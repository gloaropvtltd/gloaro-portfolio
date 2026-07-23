"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/Admin/AdminTable";
import AdminFormModal from "@/components/Admin/AdminFormModal";

const ICON_OPTIONS = [
  "workflow",
  "analytics",
  "inventory",
  "rocket",
  "shield",
  "cloud",
  "crm",
  "pos",
  "hr",
];
const STATUS_OPTIONS = ["Live", "Beta", "Case Study"];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "tagline", label: "Tagline", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "status", label: "Status", type: "select", options: STATUS_OPTIONS, defaultValue: "Live" },
  { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS, defaultValue: "workflow" },
  { name: "highlights", label: "Highlights", type: "tags" },
  { name: "link", label: "Link (external, optional)", type: "text", defaultValue: "#" },
  { name: "image_url", label: "Image URL", type: "text" },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "icon", label: "Icon" },
];

export default function AdminProductsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    const url = editing ? `/api/admin/products/${editing.id}` : "/api/admin/products";
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
    await fetch(`/api/admin/products/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h2 text-foreground">Products</h1>
          <p className="mt-1 text-muted">Manage the Products section.</p>
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
          Add Product
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <AdminTable
            columns={columns}
            rows={items}
            emptyLabel="No products yet."
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
          title={editing ? "Edit Product" : "Add Product"}
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
