"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

export default function AdminMessagesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setItems(data.items ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleOpen = async (row) => {
    const willOpen = openId !== row.id;
    setOpenId(willOpen ? row.id : null);
    if (willOpen && !row.is_read) {
      await fetch(`/api/admin/messages/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: true }),
      });
      setItems((prev) => prev.map((item) => (item.id === row.id ? { ...item, is_read: true } : item)));
    }
  };

  const handleDelete = async (row) => {
    if (!confirm(`Delete message from "${row.name}"?`)) return;
    await fetch(`/api/admin/messages/${row.id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div>
      <h1 className="font-heading text-h2 text-foreground">Messages</h1>
      <p className="mt-1 text-muted">Contact form submissions from the public site.</p>

      <div className="mt-6 flex flex-col gap-3">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center text-sm text-muted">
            No messages yet.
          </div>
        ) : (
          items.map((row) => {
            const open = openId === row.id;
            return (
              <div
                key={row.id}
                className="overflow-hidden rounded-2xl border border-border bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(row)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left"
                >
                  {row.is_read ? (
                    <MailOpen className="h-4 w-4 flex-shrink-0 text-ink-400" />
                  ) : (
                    <Mail className="h-4 w-4 flex-shrink-0 text-navy-700" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-sm", !row.is_read && "font-semibold text-foreground")}>
                      {row.name} · {row.email}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {row.service || "General inquiry"} — {new Date(row.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(row);
                    }}
                    aria-label="Delete"
                    className="rounded-lg p-2 text-ink-600 transition-colors hover:bg-red-50 hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </button>

                {open && (
                  <div className="border-t border-border bg-surface-50 px-5 py-4 text-sm text-ink-600">
                    {row.company && <p className="mb-1">Company: {row.company}</p>}
                    {row.phone && <p className="mb-1">Phone: {row.phone}</p>}
                    <p className="mt-2 whitespace-pre-wrap">{row.message}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
