"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

const spring = { stiffness: 300, damping: 20, mass: 0.5 };

export default function MagneticCta({ href = "#contact", children = "Explore Solutions" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  function handlePointerMove(event) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="inline-block"
    >
      <Button
        as="a"
        href={href}
        variant="gold"
        size="sm"
        className="group/cta shadow-[0_0_0_rgba(242,167,27,0)] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(242,167,27,0.55)]"
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
      </Button>
    </motion.div>
  );
}
