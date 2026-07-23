"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import BrandIcon from "@/components/ui/BrandIcon";
import { techIcons } from "@/data/techIcons";
import { fadeInUp } from "@/utils/animations";
import { cn } from "@/utils/cn";

export default function TechCard({ group, className }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBackground = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, ${group.featured ? "rgba(242,167,27,0.16)" : "rgba(43,70,184,0.18)"}, transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className={cn("group relative", className)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-[30px] border p-8 backdrop-blur-xl transition-colors duration-base ease-brand",
          group.featured
            ? "border-gold-400/30 bg-white/[0.06] hover:border-gold-400/50"
            : "border-white/10 bg-white/[0.04] hover:border-white/20"
        )}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base ease-brand group-hover:opacity-100"
          style={{ background: glowBackground }}
        />

        <div className="relative z-10 flex h-full flex-col">
          {group.featured && (
            <span className="badge-base mb-4 w-fit border border-gold-400/30 bg-gold-500/10 text-gold-300">
              AI-Native
            </span>
          )}
          <h3 className="font-heading text-h3 text-white">{group.title}</h3>
          <p className="mt-2 text-sm text-navy-100/70">{group.description}</p>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {group.items.map((key) => {
              const icon = techIcons[key];
              if (!icon) return null;
              // Some official brand marks are pure black — invisible on our
              // dark cards, so render those in white instead (same as how
              // Next.js/Vercel show their own logo on dark backgrounds).
              const hex = icon.hex === "000000" ? "FFFFFF" : icon.hex;
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-fast ease-brand hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                >
                  {icon.path && <BrandIcon path={icon.path} hex={hex} className="h-5 w-5" />}
                  {icon.title}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
