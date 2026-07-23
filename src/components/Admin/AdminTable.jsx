"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function AdminTable({ columns, rows, onEdit, onDelete, emptyLabel = "No items yet." }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-sm text-muted">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-50 text-xs font-semibold uppercase tracking-wide text-ink-400">
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3">
                {col.label}
              </th>
            ))}
            <th className="px-5 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-0">
              {columns.map((col) => (
                <td key={col.key} className="max-w-xs truncate px-5 py-3 text-ink-600">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="px-5 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(row)}
                    aria-label="Edit"
                    className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-navy-100 hover:text-navy-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(row)}
                    aria-label="Delete"
                    className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-red-50 hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
