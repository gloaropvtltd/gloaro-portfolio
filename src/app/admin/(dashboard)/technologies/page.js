"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/Admin/AdminTable";
import AdminFormModal from "@/components/Admin/AdminFormModal";
import { techIcons } from "@/data/techIcons";

const VALID_KEYS = Object.keys(techIcons).join(", ");

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  {
    name: "items",
    label: `Technology keys (valid: ${VALID_KEYS})`,
    type: "tags",
  },
  { name: "featured", label: "Featured (larger, gold-tinted card)", type: "checkbox" },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "items", label: "Technologies", render: (row) => row.items.join(", ") },
];

export default function AdminTechnologiesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/technologies");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    const url = editing ? `/api/admin/technologies/${editing.id}` : "/api/admin/technologies";
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
    await fetch(`/api/admin/technologies/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h2 text-foreground">Technology Groups</h1>
          <p className="mt-1 text-muted">Manage the Technologies section categories.</p>
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
          Add Group
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <AdminTable
            columns={columns}
            rows={items}
            emptyLabel="No technology groups yet."
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
          title={editing ? "Edit Technology Group" : "Add Technology Group"}
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
