import { cn } from "@/utils/cn";

export default function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
  ...props
}) {
  const sizes = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-[90rem]",
  };

  return (
    <Tag
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-10", sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
