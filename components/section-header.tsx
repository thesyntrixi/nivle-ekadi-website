type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-text-on-dark" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-text-muted-on-dark" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
