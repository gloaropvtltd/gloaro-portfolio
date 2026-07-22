import { cn } from "@/utils/cn";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={cn("flex flex-col gap-4", alignment, className)}>
      {eyebrow && (
        <span className="badge-base bg-navy-100 text-navy-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-h2 leading-[1.1] text-foreground">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-body-lg text-muted">{description}</p>
      )}
    </div>
  );
}
