import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  readonly tag?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: "left" | "center";
  readonly className?: string;
}

export function SectionHeader({
  tag,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {tag && (
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-600" />
          <span className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
            {tag}
          </span>
        </div>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
