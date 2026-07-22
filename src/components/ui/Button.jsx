import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-(image:--gradient-brand) text-white shadow-[0_10px_30px_-10px_rgba(26,44,122,0.55)] hover:shadow-[0_16px_40px_-10px_rgba(26,44,122,0.65)] hover:-translate-y-0.5",
  gold:
    "bg-(image:--gradient-gold) text-ink-950 shadow-[0_10px_30px_-10px_rgba(230,148,12,0.5)] hover:shadow-[0_16px_40px_-10px_rgba(230,148,12,0.6)] hover:-translate-y-0.5",
  outline:
    "border border-border text-foreground hover:border-navy-500 hover:text-navy-700",
  ghost:
    "text-foreground hover:bg-surface-100",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-brand cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
