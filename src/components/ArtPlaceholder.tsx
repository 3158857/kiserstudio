/**
 * Stands in for Logan's artwork until the real files arrive. Deliberately
 * reads as a placeholder rather than imitating a drawing.
 */
export function ArtPlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`grain wash relative overflow-hidden bg-bg-raised ${ratio} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="tracked text-[0.6rem] uppercase text-ink-faint">
          {label}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-rule" />
    </div>
  );
}
