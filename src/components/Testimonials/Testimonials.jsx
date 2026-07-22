"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { testimonials } from "@/data/testimonials";
import { easeBrand } from "@/utils/animations";
import { cn } from "@/utils/cn";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (next) => setIndex((next + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => goTo(index + 1), 6000);
    return () => clearInterval(timer);
  }, [index, paused]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="bg-white py-24 sm:py-32">
      <Container size="narrow">
        <SectionTitle
          eyebrow="Client Testimonials"
          title="What Our Clients Say"
          description="Real feedback from the businesses we've partnered with."
        />

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-surface-50 px-6 py-12 sm:px-16">
            <Quote className="mx-auto h-10 w-10 text-navy-300" />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: easeBrand }}
                className="mt-6 flex flex-col items-center gap-6 text-center"
              >
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <p className="max-w-2xl text-body-lg text-foreground">
                  &ldquo;{current.review}&rdquo;
                </p>

                <div className="flex flex-col items-center gap-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(image:--gradient-brand) font-heading text-sm font-bold text-white">
                    {current.name.replace("[Sample] ", "").charAt(0)}
                  </span>
                  <span className="mt-2 font-heading text-sm font-bold text-foreground">
                    {current.name}
                  </span>
                  <span className="text-sm text-muted">
                    {current.role}, {current.company}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white p-2.5 text-foreground shadow-sm transition-colors hover:border-navy-500 hover:text-navy-700 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-border bg-white p-2.5 text-foreground shadow-sm transition-colors hover:border-navy-500 hover:text-navy-700 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name + i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-base ease-brand",
                  i === index ? "w-8 bg-navy-700" : "w-2 bg-border hover:bg-navy-300"
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
