"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { easeBrand } from "@/utils/animations";

export default function StatCounter({ value, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplay);
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: easeBrand });
    return controls.stop;
  }, [inView, value, duration, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
