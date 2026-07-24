"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles as SparklesIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import HeroCanvasWrapper from "@/components/Hero/HeroCanvasWrapper";
import { fadeInUp, staggerContainer } from "@/utils/animations";

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-18"
    >
      <div
        ref={bgRef}
        className="bg-mesh-brand absolute -top-24 -bottom-24 inset-x-0"
        aria-hidden="true"
      />

      <HeroCanvasWrapper />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-navy-950)_85%)]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center gap-7 py-32 text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="badge-base border border-white/15 bg-white/5 text-gold-300"
          >
            <SparklesIcon className="h-3.5 w-3.5" />
            Innovative Digital Future | Connect • Grow • Succeed
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-hero leading-[1.05] text-white"
          >
            Business Networking &amp;{" "}
            <span className="text-gradient-gold">Digital Growth</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-body-lg text-navy-100/85"
          >
            Connecting entrepreneurs, startups, and enterprises with the
            digital solutions and business networking that accelerate growth.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-4 pt-2 sm:flex-row"
          >
            <Button as="a" href="#contact" variant="gold" size="lg">
              Start Project
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href="#projects"
              variant="outline"
              size="lg"
              className="border-white/25 text-white hover:border-white hover:text-white"
            >
              View Portfolio
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
