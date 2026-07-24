"use client";

import { motion } from "framer-motion";

/**
 * Generative, on-brand "illustration" for each industry — a hue-shifted
 * aurora mesh + grid + oversized icon watermark. Avoids shipping 12 stock
 * photos while still giving every card a distinct premium visual identity.
 */
export default function IndustryVisual({ icon: Icon, hue = 0, active = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
      <motion.div
        className="bg-mesh-brand absolute inset-0"
        style={{ filter: `hue-rotate(${hue}deg) saturate(1.35)` }}
        animate={{ scale: active ? 1.02 : 1.12 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="bg-grid-pattern absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,black,transparent)]" />
      <motion.div
        animate={{ scale: active ? 1 : 1.08, opacity: active ? 0.14 : 0.1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-8 -right-8 text-white"
      >
        <Icon className="h-40 w-40 lg:h-56 lg:w-56" strokeWidth={1} />
      </motion.div>
      <div className="noise-overlay absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/10" />
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/20 to-transparent" />
      )}
    </div>
  );
}
