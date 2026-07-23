"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/Admin/AdminTable";
import AdminFormModal from "@/components/Admin/AdminFormModal";

const ICON_OPTIONS = ["search", "compass", "pen", "code", "bug", "rocket", "lifebuoy"];

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS, defaultValue: "search" },
];

const columns = [
  { key: "title", label: "Title" },
  { key: "icon", label: "Icon" },
];

export default function AdminProcessPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/process");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    const url = editing ? `/api/admin/process/${editing.id}` : "/api/admin/process";
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
    await fetch(`/api/admin/process/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h2 text-foreground">Development Process</h1>
          <p className="mt-1 text-muted">
            Manage the process timeline steps. Order here (top to bottom) sets the step numbers.
          </p>
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
          Add Step
        </Button>
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : (
          <AdminTable
            columns={columns}
            rows={items}
            emptyLabel="No process steps yet."
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
          title={editing ? "Edit Step" : "Add Step"}
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
