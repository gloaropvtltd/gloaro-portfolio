"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { cn } from "@/utils/cn";

const statusStyles = {
  Live: "bg-gold-500 text-ink-950",
  Beta: "bg-navy-500 text-white",
  "Case Study": "bg-white/15 text-white",
};

export default function FlipCard({
  image,
  icon: Icon,
  status,
  title,
  tagline,
  description,
  highlights,
  href,
}) {
  const [flipped, setFlipped] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHoverCapable(mq.matches);
    const listener = (event) => setHoverCapable(event.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const toggleFlip = () => setFlipped((current) => !current);

  const handleClick = () => {
    if (!hoverCapable) toggleFlip();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div
      className="flip-card h-full"
      onMouseEnter={() => hoverCapable && setFlipped(true)}
      onMouseLeave={() => hoverCapable && setFlipped(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      role="group"
      aria-label={`${title} — ${tagline}`}
      tabIndex={0}
    >
      <div
        className={cn(
          "flip-card-inner relative h-full min-h-[420px] w-full rounded-2xl",
          flipped && "flip-card-flipped",
        )}
      >
        <div className="flip-card-face group absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-xl shadow-black/30">
          <Image
            src={image}
            alt={title}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              flipped ? "scale-110" : "scale-100",
            )}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/10" />
          <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-gold-400 backdrop-blur-md">
            <Icon className="h-5 w-5" />
          </span>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span
              className={cn(
                "mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                statusStyles[status] ?? "bg-white/15 text-white",
              )}
            >
              {status}
            </span>
            <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm font-medium text-gold-300">{tagline}</p>
          </div>
        </div>

        <div className="flip-card-face flip-card-back absolute inset-0 flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-navy-900/95 p-7 shadow-xl shadow-black/40 backdrop-blur-2xl">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--color-navy-500) 35%, transparent), transparent 60%), radial-gradient(circle at 100% 100%, color-mix(in srgb, var(--color-gold-500) 22%, transparent), transparent 55%)",
            }}
          />

          <div className="relative flex flex-1 flex-col">
            <span className="inline-flex h-11 w-11 items-center justify-center self-start rounded-xl border border-white/15 bg-white/10 text-gold-400">
              <Icon className="h-5 w-5" />
            </span>

            <h3 className="mt-5 font-heading text-lg font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm font-medium text-gold-300">{tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-navy-100/80">{description}</p>

            <ul className="mt-5 flex flex-col gap-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-navy-100/85">
                  <Check className="h-4 w-4 shrink-0 text-gold-400" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={href}
              onClick={(event) => event.stopPropagation()}
              className="group/cta mt-6 inline-flex w-fit items-center gap-2 self-start rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-black/20 transition-all duration-base ease-brand hover:bg-gold-400 hover:shadow-gold-500/30"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4 transition-transform duration-base ease-brand group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
