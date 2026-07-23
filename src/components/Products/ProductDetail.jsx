"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
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
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
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

export default function ProductDetail({ product }) {
  const Icon = iconMap[product.icon] ?? Workflow;
  const hasExternalLink = product.link && product.link !== "#" && !product.link.startsWith("#");

  return (
    <div>
      <section className="relative overflow-hidden bg-navy-950 pt-18">
        {product.image_url && (
          <div className="absolute inset-0">
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/40" />
          </div>
        )}

        <Container className="relative z-10">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 py-24"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/#products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-100/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold-400">
                <Icon className="h-7 w-7" />
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[product.status] ?? "bg-white/15 text-white"}`}
              >
                {product.status}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="max-w-2xl font-heading text-h1 leading-[1.05] text-white"
            >
              {product.title}
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-xl text-body-lg text-gold-300">
              {product.tagline}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container size="narrow">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-10"
          >
            <motion.p variants={fadeInUp} className="text-body-lg leading-relaxed text-muted">
              {product.description}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <h2 className="font-heading text-h3 text-foreground">What It Includes</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-surface-50 p-4 transition-all duration-base ease-brand hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-[0_15px_30px_-20px_rgba(26,44,122,0.3)]"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-navy-100 text-navy-700 transition-colors group-hover:bg-[image:var(--gradient-brand)] group-hover:text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-4 rounded-2xl bg-navy-950 p-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Want something like this?
                </h3>
                <p className="mt-1 text-sm text-navy-100/75">
                  We'll scope it around your exact workflow — not a generic template.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                {hasExternalLink && (
                  <Button as="a" href={product.link} target="_blank" rel="noreferrer noopener" variant="outline" className="border-white/25 text-white hover:border-white hover:text-white">
                    Visit Live Site
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                )}
                <Button as="a" href="/#contact" variant="gold">
                  Start a Project
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
