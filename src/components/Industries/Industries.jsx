"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingCart,
  Store,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

const iconMap = {
  cart: ShoppingCart,
  heart: HeartPulse,
  graduation: GraduationCap,
  landmark: Landmark,
  building: Building2,
  factory: Factory,
  store: Store,
  plane: Plane,
  boxes: Boxes,
};

export default function Industries({ industries }) {
  return (
    <section id="industries" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Industries We Serve"
          title="Software Expertise Across Sectors"
          description="Every industry moves differently. We bring the right architecture, compliance, and design instincts to each one."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3"
        >
          {industries.map(({ id, icon, title, description }) => {
            const Icon = iconMap[icon] ?? Boxes;
            return (
              <motion.div
                key={id}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-base ease-brand hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_20px_40px_-20px_rgba(26,44,122,0.25)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700 transition-colors duration-base group-hover:bg-(image:--gradient-brand) group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted opacity-0 transition-all duration-base ease-brand group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
