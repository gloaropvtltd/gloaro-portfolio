"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { projectCategories } from "@/data/projects";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { cn } from "@/utils/cn";

export default function Projects({ projects }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="projects" className="bg-white py-24 sm:py-32">
      <Container>
        <SectionTitle
          eyebrow="Featured Projects"
          title="Work That Speaks For Itself"
          description="A look at platforms we've built — from our own products to client-scale software."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {projectCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-fast ease-brand",
                activeCategory === category
                  ? "bg-(image:--gradient-brand) text-white shadow-[0_10px_25px_-12px_rgba(26,44,122,0.5)]"
                  : "border border-border text-muted hover:border-navy-500 hover:text-navy-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a
                key={project.id}
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noreferrer noopener" : undefined}
                variants={fadeInUp}
                layout
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-base ease-brand hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(26,44,122,0.3)]"
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-(image:--gradient-mesh) bg-navy-950">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-slow ease-brand group-hover:scale-110"
                    />
                  ) : (
                    <Layers
                      className="h-12 w-12 text-white/25 transition-transform duration-slow ease-brand group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-700">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-100 px-3 py-1 text-xs font-medium text-ink-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 pt-2 text-sm font-semibold text-navy-700 transition-colors group-hover:text-gold-600">
                    View Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
