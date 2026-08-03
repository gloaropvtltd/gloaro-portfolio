"use client";

import { useEffect, useState } from "react";
import { Copy, Mail, MailOpen, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

const urgencyStyles = {
  high: "bg-red-50 text-danger",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-surface-100 text-muted",
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyReply = async (row) => {
    await navigator.clipboard.writeText(row.lead_draft_reply);
    setCopiedId(row.id);
    setTimeout(() => setCopiedId((current) => (current === row.id ? null : current)), 2000);
  };

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    const sorted = [...(data.items ?? [])].sort(
      (a, b) => (b.lead_score ?? -1) - (a.lead_score ?? -1)
    );
    setItems(sorted);
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
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleOpen(row)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleOpen(row);
                    }
                  }}
                  className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
                >
                  {row.is_read ? (
                    <MailOpen className="h-4 w-4 flex-shrink-0 text-ink-400" />
                  ) : (
                    <Mail className="h-4 w-4 flex-shrink-0 text-navy-700" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={cn("flex items-center gap-2 truncate text-sm", !row.is_read && "font-semibold text-foreground")}>
                      {row.name} · {row.email}
                      {row.lead_score != null && (
                        <span
                          className={cn(
                            "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                            urgencyStyles[row.lead_urgency] ?? urgencyStyles.low
                          )}
                        >
                          {row.lead_score}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {row.service || "General inquiry"} — {new Date(row.created_at).toLocaleString()}
                      {row.lead_summary ? ` — ${row.lead_summary}` : ""}
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
                </div>

                {open && (
                  <div className="border-t border-border bg-surface-50 px-5 py-4 text-sm text-ink-600">
                    {row.company && <p className="mb-1">Company: {row.company}</p>}
                    {row.phone && <p className="mb-1">Phone: {row.phone}</p>}
                    {row.lead_tags?.length > 0 && (
                      <div className="mb-1 flex flex-wrap gap-1.5">
                        {row.lead_tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2 whitespace-pre-wrap">{row.message}</p>

                    {row.lead_call_brief && (
                      <div className="mt-4 rounded-xl border border-navy-100 bg-navy-100/30 p-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-navy-700">
                          Call brief
                        </p>
                        <p className="whitespace-pre-wrap text-ink-600">{row.lead_call_brief}</p>
                      </div>
                    )}

                    {row.lead_draft_reply && (
                      <div className="mt-3 rounded-xl border border-border bg-white p-3">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                            Draft reply
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyReply(row);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-navy-700 transition-colors hover:bg-navy-100"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {copiedId === row.id ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <p className="whitespace-pre-wrap text-ink-600">{row.lead_draft_reply}</p>
                      </div>
                    )}
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
