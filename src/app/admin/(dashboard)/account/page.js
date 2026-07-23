"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function AdminAccountPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [values, setValues] = useState({ currentPassword: "", newEmail: "", newPassword: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/admin/account")
      .then((res) => res.json())
      .then((data) => {
        setCurrentEmail(data.email ?? "");
        setValues((prev) => ({ ...prev, newEmail: data.email ?? "" }));
        setLoading(false);
      });
  }, []);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const res = await fetch("/api/admin/account", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || "Failed to update account.");
      return;
    }

    setCurrentEmail(data.email);
    setValues({ currentPassword: "", newEmail: data.email, newPassword: "" });
    setSuccess("Account updated.");
  };

  if (loading) return <p className="text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="font-heading text-h2 text-foreground">Account</h1>
      <p className="mt-1 text-muted">Signed in as {currentEmail}. Change your login email or password here.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="currentPassword" className="text-sm font-medium text-foreground">
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            required
            value={values.currentPassword}
            onChange={handleChange("currentPassword")}
            className="input-base"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="newEmail" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="newEmail"
            type="email"
            required
            value={values.newEmail}
            onChange={handleChange("newEmail")}
            className="input-base"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-sm font-medium text-foreground">
            New Password
            <span className="ml-1 font-normal text-ink-400">(leave blank to keep current)</span>
          </label>
          <input
            id="newPassword"
            type="password"
            value={values.newPassword}
            onChange={handleChange("newPassword")}
            className="input-base"
          />
        </div>

        {error && <p className="text-sm font-medium text-danger">{error}</p>}
        {success && <p className="text-sm font-medium text-success">{success}</p>}

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={submitting}
          className={cn("mt-2 self-start", submitting && "opacity-70")}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
