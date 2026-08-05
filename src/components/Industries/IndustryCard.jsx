"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { industryIconMap } from "@/components/Industries/icons";
import IndustryVisual from "@/components/Industries/IndustryVisual";
import MagneticCta from "@/components/Industries/MagneticCta";

const easeBrand = [0.16, 1, 0.3, 1];

const expandedContentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const itemUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeBrand } },
};

function ExpandedBody({ industry, headingId }) {
  return (
    <motion.div
      variants={expandedContentVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex flex-col gap-3 sm:gap-4"
    >
      <motion.p variants={itemUp} className="max-w-md text-sm text-navy-100/85 sm:text-base">
        {industry.description}
      </motion.p>

      <motion.ul
        variants={itemUp}
        aria-labelledby={headingId}
        className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2"
      >
        {industry.keyServices.map((service) => (
          <li key={service} className="flex items-center gap-2 text-sm text-white/90">
            <Check className="h-4 w-4 flex-none text-gold-400" aria-hidden="true" />
            {service}
          </li>
        ))}
      </motion.ul>

      <motion.div variants={itemUp} className="flex flex-wrap gap-2">
        {industry.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-navy-100/80"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div variants={itemUp} className="pointer-events-auto pt-1">
        <MagneticCta href="#contact">Explore Solutions</MagneticCta>
      </motion.div>
    </motion.div>
  );
}

export default function IndustryCard({
  industry,
  layoutMode = "rail",
  isActive = false,
  hue = 0,
  onSelect,
}) {
  const Icon = industryIconMap[industry.icon];
  const cardRef = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}% ${my}%, rgba(255,255,255,0.16), transparent 65%)`;

  const stacked = layoutMode === "stack";
  const active = stacked || isActive;
  const headingId = `industry-heading-${industry.id}`;
  const panelId = `industry-panel-${industry.id}`;

  function handlePointerMove(event) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <li
      className={cn(
        "list-none",
        layoutMode === "rail" &&
          cn("relative shrink-0 basis-0", active ? "grow-[11]" : "grow-[1] min-w-[68px] sm:min-w-[84px]"),
        layoutMode === "grid" && "relative min-w-0",
        layoutMode === "stack" && "w-[86vw] max-w-sm shrink-0 snap-center"
      )}
      style={layoutMode === "grid" ? { gridColumn: active ? "span 2 / span 2" : "span 1 / span 1" } : undefined}
    >
      <motion.div
        layout
        transition={{ layout: { duration: 0.6, ease: easeBrand } }}
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className={cn(
          "group relative isolate overflow-hidden rounded-[32px] border border-white/10",
          "shadow-[0_30px_60px_-30px_rgba(6,10,30,0.8)]",
          layoutMode === "rail" && "h-130 lg:h-150",
          layoutMode === "grid" && (active ? "h-130" : "h-42"),
          layoutMode === "stack" && "h-150"
        )}
      >
        <IndustryVisual icon={Icon} hue={hue} active={active} />

        {/* gradient border glow on hover/active */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300",
            "[background:linear-gradient(135deg,rgba(242,167,27,0.5),transparent_35%,transparent_65%,rgba(43,70,184,0.5))]",
            "[mask:linear-gradient(#000,#000)_content-box,linear-gradient(#000,#000)]",
            "p-px [mask-composite:exclude] [-webkit-mask-composite:xor]",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
          )}
        />

        {/* cursor spotlight */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {!stacked && (
          <button
            type="button"
            onClick={() => onSelect(industry.id)}
            onMouseEnter={() => onSelect(industry.id)}
            onFocus={() => onSelect(industry.id)}
            aria-expanded={active}
            aria-controls={panelId}
            aria-label={`${active ? "Currently expanded — " : "Expand "}${industry.title} industry solutions`}
            className="absolute inset-0 z-20 cursor-pointer rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
          />
        )}

        <div
          id={panelId}
          className={cn(
            "pointer-events-none relative z-30 flex h-full p-5 sm:p-6 lg:p-8",
            active && layoutMode !== "grid" && "flex-col justify-between",
            active && layoutMode === "grid" && "flex-col justify-start gap-6 overflow-y-auto",
            !active && layoutMode === "rail" && "flex-col items-center justify-center gap-4",
            !active && layoutMode === "grid" && "flex-row items-center gap-3"
          )}
        >
          {active ? (
            <>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:rotate-6 sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 text-gold-300" aria-hidden="true" />
                </span>
                <h3 id={headingId} className="font-heading text-h3 text-white">
                  {industry.title}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <ExpandedBody key={industry.id} industry={industry} headingId={headingId} />
              </AnimatePresence>
            </>
          ) : layoutMode === "grid" ? (
            <>
              <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:rotate-6">
                <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
              </span>
              <span className="font-heading text-base font-bold text-white">{industry.title}</span>
            </>
          ) : (
            <>
              <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition-transform duration-300 group-hover:rotate-6">
                <Icon className="h-5 w-5 text-gold-300" aria-hidden="true" />
              </span>
              <span
                className="font-heading text-sm font-bold tracking-wide text-white [writing-mode:vertical-rl]"
                style={{ transform: "rotate(180deg)" }}
              >
                {industry.title}
              </span>
            </>
          )}
        </div>
      </motion.div>
    </li>
  );
}
