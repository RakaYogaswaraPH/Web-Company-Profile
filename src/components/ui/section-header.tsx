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
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`space-y-4 ${isCenter ? "text-center mx-auto max-w-4xl" : "max-w-4xl"} ${className}`}
    >
      {/* NO BADGE, NO CARD, NO PILL - Thinking*Room minimal category title */}
      {tag && (
        <p className="text-xs uppercase tracking-widest text-[#888888] font-mono">
          {tag}
        </p>
      )}

      <h2 className="text-3xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-tight">
        {title}
      </h2>

      {description && (
        <p className="text-base text-[#999999] leading-relaxed sm:text-xl font-light max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}
