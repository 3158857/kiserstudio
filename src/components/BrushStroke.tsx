/**
 * Rough red brush marks behind the hero artwork, reading past its edges.
 * Displaced SVG paths rather than a bitmap, so it scales cleanly and stays
 * a few KB. Keep `scale` low — high values turn the strokes into blobs.
 */
export function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 820"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="brush-rough" x="-30%" y="-15%" width="160%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.014"
            numOctaves="5"
            seed="11"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="17"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <linearGradient id="brush-fade" x1="0.75" y1="0.05" x2="0.15" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.82" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <g filter="url(#brush-rough)" fill="url(#brush-fade)">
        <path d="M252 70 L286 84 L96 520 L68 506 Z" />
        <path d="M214 60 L232 68 L64 470 L48 462 Z" opacity="0.75" />
        <path d="M170 250 L196 262 L74 596 L52 586 Z" opacity="0.85" />
        <path d="M138 430 L164 442 L66 726 L44 716 Z" />
        <path d="M232 190 L244 196 L150 430 L138 424 Z" opacity="0.45" />
        <path d="M108 560 L124 568 L58 760 L44 754 Z" opacity="0.6" />
      </g>
    </svg>
  );
}
