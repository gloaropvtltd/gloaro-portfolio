"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { whyChooseUs } from "@/data/whyChooseUs";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-surface-50 py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Built On Trust, Backed By Results"
          description="Here's what working with GLOARO actually feels like — from kickoff to long after launch."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyChooseUs.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700 transition-colors duration-base ease-brand group-hover:bg-(image:--gradient-gold) group-hover:text-ink-950">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-h3 text-foreground">{title}</h3>
              <p className="mt-3 text-body-lg text-muted">{description}</p>
              <span className="absolute bottom-0 left-0 h-1 w-0 bg-(image:--gradient-brand) transition-all duration-slow ease-brand group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
