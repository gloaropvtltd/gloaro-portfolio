"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import IndustryCard from "@/components/Industries/IndustryCard";
import { industriesShowcase } from "@/data/industriesShowcase";
import { fadeInUp, staggerContainer, viewportOnce } from "@/utils/animations";

export default function Industries() {
  const [activeId, setActiveId] = useState(industriesShowcase[0].id);

  function handleKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const currentIndex = industriesShowcase.findIndex((item) => item.id === activeId);
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const next =
      industriesShowcase[(currentIndex + delta + industriesShowcase.length) % industriesShowcase.length];
    setActiveId(next.id);
  }

  return (
    <section id="industries" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-pattern absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="aurora-blob aurora-blob-1 -left-20 top-0 h-96 w-96 bg-navy-500" />
        <div className="aurora-blob aurora-blob-2 right-0 top-32 h-[26rem] w-[26rem] bg-gold-500" />
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
            <Layers className="h-3.5 w-3.5" />
            Industries We Empower
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-h1 leading-[1.08] text-white"
          >
            Built For Every{" "}
            <span className="text-gradient-gold">Industry You Operate In</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-body-lg text-navy-100/75">
            AI-driven digital transformation solutions tailored for businesses across
            every industry.
          </motion.p>
        </motion.div>

        {/* Desktop — expanding rail */}
        <ul
          role="list"
          onKeyDown={handleKeyDown}
          className="mt-16 hidden gap-4 lg:flex"
        >
          {industriesShowcase.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              layoutMode="rail"
              isActive={industry.id === activeId}
              hue={index * 30}
              onSelect={setActiveId}
            />
          ))}
        </ul>

        {/* Tablet — 2-column expanding grid */}
        <ul
          role="list"
          onKeyDown={handleKeyDown}
          className="mt-16 hidden grid-cols-2 gap-5 md:grid lg:hidden"
        >
          {industriesShowcase.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              layoutMode="grid"
              isActive={industry.id === activeId}
              hue={index * 30}
              onSelect={setActiveId}
            />
          ))}
        </ul>

        {/* Mobile — swipeable snap carousel, cards shown fully expanded */}
        <ul
          role="list"
          className="mt-12 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {industriesShowcase.map((industry, index) => (
            <IndustryCard key={industry.id} industry={industry} layoutMode="stack" hue={index * 30} />
          ))}
        </ul>

        {/* Dynamic active indicator */}
        <div
          role="tablist"
          aria-label="Select an industry"
          className="mt-8 hidden flex-wrap items-center justify-center gap-2 md:flex"
        >
          {industriesShowcase.map((industry) => (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-selected={industry.id === activeId}
              aria-label={industry.title}
              onClick={() => setActiveId(industry.id)}
              className="relative h-2 rounded-full bg-white/15 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              style={{ width: industry.id === activeId ? "1.75rem" : "0.5rem" }}
            >
              {industry.id === activeId && (
                <motion.span
                  layoutId="industry-active-dot"
                  className="absolute inset-0 rounded-full bg-(image:--gradient-gold)"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
