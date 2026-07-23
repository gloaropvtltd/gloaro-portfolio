"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Cloud,
  CreditCard,
  LineChart,
  PackageSearch,
  Rocket,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

const statusStyles = {
  Live: "bg-gold-500 text-ink-950",
  Beta: "bg-navy-500 text-white",
  "Case Study": "bg-white/15 text-white",
};

const iconMap = {
  workflow: Workflow,
  analytics: LineChart,
  inventory: PackageSearch,
  rocket: Rocket,
  shield: ShieldCheck,
  cloud: Cloud,
  crm: Users,
  pos: CreditCard,
  hr: Briefcase,
};

export default function Products({ products }) {
  return (
    <section id="products" className="bg-navy-950 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Our Products"
          title="Products We've Built & Shipped"
          description="Beyond client work, we build our own SaaS tools, internal products, and case studies to prove what our stack can do."
          className="[&_p]:text-navy-100/75 [&_h2]:text-white"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {products.map(({ id, icon, status, title, tagline, description, highlights, image_url }) => {
            const Icon = iconMap[icon] ?? Workflow;
            return (
              <motion.div key={id} variants={fadeInUp}>
                <Card variant="dark" className="flex h-full flex-col overflow-hidden p-0">
                  {image_url && (
                    <div className="relative h-40 w-full">
                      <Image src={image_url} alt={title} fill className="object-cover" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-400">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] ?? "bg-white/15 text-white"}`}
                      >
                        {status}
                      </span>
                    </div>

                    <h3 className="mt-5 font-heading text-lg font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm font-medium text-gold-300">{tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-100/75">{description}</p>

                    <ul className="mt-5 flex flex-col gap-2">
                      {highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-navy-100/85">
                          <Check className="h-4 w-4 shrink-0 text-gold-400" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/products/${id}`}
                      className="group mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-white transition-colors hover:text-gold-400"
                    >
                      Explore Product
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
