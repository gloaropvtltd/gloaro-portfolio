"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

function toInputValue(field, value) {
  if (value === undefined || value === null) return field.type === "checkbox" ? false : "";
  if (field.type === "tags") return Array.isArray(value) ? value.join(", ") : value;
  return value;
}

function fromInputValue(field, value) {
  if (field.type === "tags") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (field.type === "number") return Number(value);
  if (field.type === "checkbox") return Boolean(value);
  return value;
}

export default function AdminFormModal({ title, fields, initialValues, onSubmit, onClose }) {
  const [values, setValues] = useState(() => {
    const base = {};
    fields.forEach((field) => {
      base[field.name] = toInputValue(field, initialValues?.[field.name] ?? field.defaultValue);
    });
    return base;
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleChange = (field) => (e) => {
    const raw = field.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [field.name]: raw }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = {};
      fields.forEach((field) => {
        payload[field.name] = fromInputValue(field, values[field.name]);
      });
      await onSubmit(payload);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4">
      <div className="modal-surface w-full max-w-lg max-h-[85vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-heading text-lg font-bold text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink-600 hover:bg-surface-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium text-foreground">
                {field.label}
                {field.type === "tags" && (
                  <span className="ml-1 font-normal text-ink-400">(comma-separated)</span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  rows={4}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field)}
                  className="input-base resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field)}
                  className="input-base"
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <input
                  id={field.name}
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={handleChange(field)}
                  className="h-4 w-4 self-start"
                />
              ) : (
                <input
                  id={field.name}
                  type={field.type === "number" ? "number" : "text"}
                  required={field.required}
                  value={values[field.name]}
                  onChange={handleChange(field)}
                  className="input-base"
                />
              )}
            </div>
          ))}

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={submitting}
              className={cn(submitting && "opacity-70")}
            >
              {submitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
