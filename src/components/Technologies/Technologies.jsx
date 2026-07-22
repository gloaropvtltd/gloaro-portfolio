"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { technologyGroups } from "@/data/technologies";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function Technologies() {
  return (
    <section id="technologies" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Our Stack"
          title="Technologies We Work With"
          description="A modern, battle-tested stack chosen for performance, reliability, and long-term maintainability."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {technologyGroups.map(({ category, icon: Icon, items }) => (
            <motion.div key={category} variants={fadeInUp}>
              <Card className="h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy-100 text-navy-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-bold text-foreground">
                  {category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors duration-fast ease-brand hover:border-navy-500 hover:bg-navy-100 hover:text-navy-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
