import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import {
  footerCompanyLinks,
  footerServices,
  footerSocialLinks,
  socialIconMap,
} from "@/data/footerLinks";
import { GlobeIcon } from "@/components/ui/SocialIcons";
import { contactInfo } from "@/data/contactInfo";

export default function Footer({ socialLinks = footerSocialLinks }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-4 lg:w-2/5">
            <Logo variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-navy-100/80">
              Innovative Digital Future &amp; Digital Network — GLOARO builds
              premium, enterprise-grade software that connects, grows, and
              collaborates.
            </p>
            <ul className="flex gap-3 pt-2">
              {socialLinks.map(({ id, platform, label, url }) => {
                const Icon = socialIconMap[platform] ?? GlobeIcon;
                return (
                  <li key={id ?? label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-navy-100/80 transition-colors hover:bg-gold-500 hover:text-ink-950"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-100/60">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                {footerCompanyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-navy-100/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-100/60">
                Services
              </h3>
              <ul className="flex flex-col gap-3">
                {footerServices.map((service) => (
                  <li key={service} className="text-sm text-navy-100/80">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-navy-100/60">
                Contact
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-navy-100/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <span>{contactInfo.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                  <a href={contactInfo.phoneHref} className="hover:text-white">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-center border-t border-white/10 pt-8 text-xs text-navy-100/60">
          <p>© {year} GLOARO PVT LTD. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
