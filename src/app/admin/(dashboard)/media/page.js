"use client";

import { useRef, useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminMediaPage() {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploads, setUploads] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      setUploads((prev) => [{ url: data.url, name: file.name }, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  return (
    <div>
      <h1 className="font-heading text-h2 text-foreground">Media</h1>
      <p className="mt-1 text-muted">
        Upload images to Cloudinary and copy the URL to use in Projects, Products, or elsewhere.
      </p>

      <div className="mt-6 rounded-2xl border border-dashed border-border bg-white p-8 text-center">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="media-upload"
        />
        <label htmlFor="media-upload">
          <Button
            as="span"
            variant="primary"
            size="md"
            className={uploading ? "pointer-events-none opacity-70" : "cursor-pointer"}
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Choose File"}
          </Button>
        </label>
        <p className="mt-3 text-xs text-muted">Images or videos, up to 10MB.</p>
        {error && <p className="mt-3 text-sm font-medium text-danger">{error}</p>}
      </div>

      {uploads.length > 0 && (
        <div className="mt-8">
          <h2 className="font-heading text-base font-bold text-foreground">Recent uploads</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {uploads.map((item) => (
              <li
                key={item.url}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.url} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                  <p className="truncate text-xs text-muted">{item.url}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.url)}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink-600 hover:border-navy-500 hover:text-navy-700"
                >
                  {copiedUrl === item.url ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy URL
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
