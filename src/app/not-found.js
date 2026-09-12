import { Home } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-50 py-24">
      <Container size="narrow" className="flex flex-col items-center gap-6 text-center">
        <Logo />
        <span className="font-heading text-hero text-navy-700">404</span>
        <h1 className="font-heading text-h2 text-foreground">Page Not Found</h1>
        <p className="max-w-md text-body-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Button as="a" href="/" variant="primary" size="lg">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 text-sm text-muted">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-navy-700">
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
