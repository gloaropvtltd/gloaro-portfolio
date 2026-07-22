"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function HeroCanvasWrapper() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isWideEnough = window.innerWidth >= 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(isWideEnough && !prefersReducedMotion);
  }, []);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
