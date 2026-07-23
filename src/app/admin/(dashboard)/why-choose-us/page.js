"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/Admin/AdminTable";
import AdminFormModal from "@/components/Admin/AdminFormModal";

const ICON_OPTIONS = ["users", "cpu", "badge", "shield", "headset", "zap"];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS, defaultValue: "users" },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "icon", label: "Icon" },
];

export default function AdminWhyChooseUsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/why-choose-us");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    const url = editing ? `/api/admin/why-choose-us/${editing.id}` : "/api/admin/why-choose-us";
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
    await fetch(`/api/admin/why-choose-us/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h2 text-foreground">Why Choose Us</h1>
          <p className="mt-1 text-muted">Manage the Why Choose Us section.</p>
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
          Add Item
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <AdminTable
            columns={columns}
            rows={items}
            emptyLabel="No items yet."
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
          title={editing ? "Edit Item" : "Add Item"}
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
