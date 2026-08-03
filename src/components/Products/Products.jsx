"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
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
import FlipCard from "@/components/Products/FlipCard";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

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
              <motion.div key={id} variants={fadeInUp} className="h-full">
                <FlipCard
                  image={image_url}
                  icon={Icon}
                  status={status}
                  title={title}
                  tagline={tagline}
                  description={description}
                  highlights={highlights}
                  href={`/products/${id}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
