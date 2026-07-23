"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import Container from "@/components/ui/Container";
import StatCounter from "@/components/ui/StatCounter";
import TechCard from "@/components/Technologies/TechCard";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function Technologies({ technologyGroups }) {
  const totalTechnologies = new Set(technologyGroups.flatMap((group) => group.items)).size;

  const stats = [
    { value: totalTechnologies, suffix: "+", label: "Tools & Frameworks" },
    { value: technologyGroups.length, suffix: "", label: "Engineering Domains" },
    { value: 24, suffix: "/7", label: "Support Mindset" },
  ];

  return (
    <section id="technologies" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="aurora-blob aurora-blob-1 -left-20 top-0 h-96 w-96 bg-navy-500" />
        <div className="aurora-blob aurora-blob-2 right-0 top-20 h-[26rem] w-[26rem] bg-gold-500" />
        <div className="aurora-blob aurora-blob-3 bottom-0 left-1/3 h-80 w-80 bg-navy-400" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="badge-base border border-white/15 bg-white/5 text-gold-300"
          >
            <Zap className="h-3.5 w-3.5" />
            Our Engineering Stack
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-h1 leading-[1.08] text-white"
          >
            Building Intelligent Products,
            <br />
            <span className="text-gradient-gold">Powered by Modern Technologies</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-body-lg text-navy-100/75">
            We combine AI, cloud-native architecture, and modern engineering practices to
            build products that are fast, secure, and future-ready.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp} className="flex flex-col items-center gap-1">
              <span className="font-heading text-h3 text-white">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs text-navy-100/60">{stat.label}</span>
            </motion.div>
          ))}
          <motion.div variants={fadeInUp} className="flex items-center gap-1.5 text-sm font-semibold text-gold-300">
            <Sparkles className="h-4 w-4" />
            AI-Ready Architecture
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {technologyGroups.map((group) => (
            <TechCard key={group.id ?? group.title} group={group} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
