import AdminSidebar from "@/components/Admin/AdminSidebar";
import { AdminThemeProvider } from "@/components/Admin/AdminThemeProvider";

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminThemeProvider>
      <div className="flex min-h-screen bg-surface-50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </AdminThemeProvider>
  );
}
