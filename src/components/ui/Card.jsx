import { cn } from "@/utils/cn";

const variants = {
  default: "card-surface p-8",
  glass: "glass-panel-light rounded-2xl p-8",
  dark: "rounded-2xl p-8 bg-navy-900 text-white border border-white/10",
};

export default function Card({ variant = "default", className, children, ...props }) {
  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
