import Link from "next/link";
import {
  Award,
  Cpu,
  FolderKanban,
  Globe2,
  HelpCircle,
  ListChecks,
  MessageSquare,
  Package,
  Star,
  Wrench,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { sql } from "@/utils/db";

async function getCounts() {
  try {
    const [services] = await sql`SELECT COUNT(*)::int AS count FROM services`;
    const [industries] = await sql`SELECT COUNT(*)::int AS count FROM industries`;
    const [projects] = await sql`SELECT COUNT(*)::int AS count FROM projects`;
    const [products] = await sql`SELECT COUNT(*)::int AS count FROM products`;
    const [technologies] = await sql`SELECT COUNT(*)::int AS count FROM technology_groups`;
    const [process] = await sql`SELECT COUNT(*)::int AS count FROM process_steps`;
    const [whyChooseUs] = await sql`SELECT COUNT(*)::int AS count FROM why_choose_us`;
    const [testimonials] = await sql`SELECT COUNT(*)::int AS count FROM testimonials`;
    const [faqs] = await sql`SELECT COUNT(*)::int AS count FROM faqs`;
    const [messages] = await sql`SELECT COUNT(*)::int AS count FROM contact_submissions WHERE is_read = false`;
    return {
      services: services.count,
      industries: industries.count,
      projects: projects.count,
      products: products.count,
      technologies: technologies.count,
      process: process.count,
      whyChooseUs: whyChooseUs.count,
      testimonials: testimonials.count,
      faqs: faqs.count,
      unreadMessages: messages.count,
    };
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/services", label: "Services", icon: Wrench, count: counts?.services },
    { href: "/admin/industries", label: "Industries", icon: Globe2, count: counts?.industries },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban, count: counts?.projects },
    { href: "/admin/products", label: "Products", icon: Package, count: counts?.products },
    { href: "/admin/technologies", label: "Technology Groups", icon: Cpu, count: counts?.technologies },
    { href: "/admin/process", label: "Process Steps", icon: ListChecks, count: counts?.process },
    { href: "/admin/why-choose-us", label: "Why Choose Us", icon: Award, count: counts?.whyChooseUs },
    { href: "/admin/testimonials", label: "Testimonials", icon: Star, count: counts?.testimonials },
    { href: "/admin/faqs", label: "FAQs", icon: HelpCircle, count: counts?.faqs },
    { href: "/admin/messages", label: "Unread Messages", icon: MessageSquare, count: counts?.unreadMessages },
  ];

  return (
    <div>
      <h1 className="font-heading text-h2 text-foreground">Dashboard</h1>
      <p className="mt-1 text-muted">Manage your site content from here.</p>

      {!counts && (
        <div className="mt-6 rounded-2xl border border-gold-300 bg-gold-100 p-4 text-sm text-ink-800">
          Couldn&apos;t connect to the database. Make sure <code>DATABASE_URL</code> is set and
          you&apos;ve run <code>npm run db:migrate</code>.
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, label, icon: Icon, count }) => (
          <Link key={href} href={href}>
            <Card className="flex items-center justify-between hover:border-navy-300">
              <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-1 font-heading text-3xl font-bold text-foreground">
                  {count ?? "—"}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                <Icon className="h-5 w-5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
