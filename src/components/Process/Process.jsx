"use client";

import { motion } from "framer-motion";
import { Bug, Code2, Compass, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

const iconMap = {
  search: Search,
  compass: Compass,
  pen: PenTool,
  code: Code2,
  bug: Bug,
  rocket: Rocket,
  lifebuoy: LifeBuoy,
};

export default function Process({ processSteps }) {
  return (
    <section id="process" className="bg-white py-24 sm:py-32">
      <Container size="narrow">
        <SectionTitle
          eyebrow="How We Work"
          title="Our Development Process"
          description="A structured, transparent process — from first conversation to long-term support."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-16"
        >
          {processSteps.map(({ id, icon, title, description }, index) => {
            const Icon = iconMap[icon] ?? Search;
            const number = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={id ?? number}
                variants={fadeInUp}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {index < processSteps.length - 1 && (
                  <span
                    className="absolute left-6 top-14 h-[calc(100%-3.25rem)] w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-(image:--gradient-brand) text-white shadow-[0_10px_25px_-12px_rgba(26,44,122,0.5)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="pt-1.5">
                  <span className="text-xs font-bold tracking-widest text-gold-600">
                    STEP {number}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-xl text-body-lg text-muted">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
