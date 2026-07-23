"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  Cpu,
  FolderKanban,
  Globe2,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  ListChecks,
  LogOut,
  MessageSquare,
  Moon,
  Package,
  Share2,
  Star,
  Sun,
  UserCog,
  Wrench,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAdminTheme } from "@/components/Admin/AdminThemeProvider";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/industries", label: "Industries", icon: Globe2 },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/technologies", label: "Technologies", icon: Cpu },
  { href: "/admin/process", label: "Process", icon: ListChecks },
  { href: "/admin/why-choose-us", label: "Why Choose Us", icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/account", label: "Account", icon: UserCog },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useAdminTheme();
  const isDark = theme === "dark";

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside
      className={cn(
        "flex h-screen w-64 flex-none flex-col border-r transition-colors duration-base ease-brand",
        isDark ? "border-white/10 bg-navy-950" : "border-border bg-white"
      )}
    >
      <div className={cn("border-b p-6", isDark ? "border-white/10" : "border-border")}>
        <Logo variant={isDark ? "light" : "dark"} />
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? isDark
                        ? "bg-white/10 text-gold-300"
                        : "bg-navy-100 text-navy-700"
                      : isDark
                        ? "text-navy-100/70 hover:bg-white/5 hover:text-white"
                        : "text-ink-600 hover:bg-surface-100 hover:text-foreground"
                  )}
                >
                  {active && (
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full",
                        isDark ? "bg-gold-400" : "bg-navy-700"
                      )}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn("flex flex-col gap-1 border-t p-4", isDark ? "border-white/10" : "border-border")}>
        <button
          type="button"
          onClick={toggleTheme}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isDark
              ? "text-navy-100/70 hover:bg-white/5 hover:text-white"
              : "text-ink-600 hover:bg-surface-100 hover:text-foreground"
          )}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? "Light Sidebar" : "Dark Sidebar"}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isDark
              ? "text-navy-100/70 hover:bg-white/5 hover:text-danger"
              : "text-ink-600 hover:bg-surface-100 hover:text-danger"
          )}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
