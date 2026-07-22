import Image from "next/image";
import { cn } from "@/utils/cn";

export default function Logo({ variant = "dark", className }) {
  const wordmarkColor = variant === "light" ? "text-white" : "text-foreground";

  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-[0_6px_16px_-6px_rgba(26,44,122,0.35)] ring-1 ring-navy-700/10">
        <Image
          src="/brand/logo-mark.png"
          alt="GLOARO mark"
          width={40}
          height={40}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span className={cn("font-heading text-lg font-bold tracking-tight", wordmarkColor)}>
        GLOARO
      </span>
    </span>
  );
}
