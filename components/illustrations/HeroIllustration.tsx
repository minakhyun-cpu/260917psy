// A soft, abstract "quiet moment" scene for the hero section — a figure
// resting calmly under a sun with a couple of leaves nearby. Kept as flat
// silhouette shapes (no faces/skin tones) so it reads as universal rather
// than depicting a specific person.
export default function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="200" cy="180" rx="190" ry="130" className="fill-brand-100" />
      <ellipse cx="150" cy="150" rx="110" ry="80" className="fill-brand-50" opacity="0.7" />

      {/* sun */}
      <g className="stroke-brand-200" strokeWidth="4" strokeLinecap="round">
        <line x1="76" y1="20" x2="76" y2="34" />
        <line x1="76" y1="86" x2="76" y2="100" />
        <line x1="42" y1="60" x2="56" y2="60" />
        <line x1="96" y1="60" x2="110" y2="60" />
        <line x1="51" y1="35" x2="61" y2="45" />
        <line x1="91" y1="75" x2="101" y2="85" />
        <line x1="101" y1="35" x2="91" y2="45" />
        <line x1="61" y1="75" x2="51" y2="85" />
      </g>
      <circle cx="76" cy="60" r="22" className="fill-brand-200" />

      {/* ground shadow */}
      <ellipse cx="205" cy="255" rx="95" ry="14" className="fill-brand-200" opacity="0.5" />

      {/* seated figure */}
      <circle cx="205" cy="150" r="27" className="fill-brand-700" />
      <path
        d="M160 195c0-27 20-42 45-42s45 15 45 42l6 42c-17 14-38 21-51 21s-34-7-51-21Z"
        className="fill-brand-600"
      />
      <circle cx="176" cy="212" r="9" className="fill-brand-700" />
      <circle cx="234" cy="212" r="9" className="fill-brand-700" />

      {/* leaves */}
      <path
        d="M320 230c8-24 28-38 52-40-6 24-24 42-52 40Z"
        className="fill-brand-700"
      />
      <path
        d="M330 232c10-14 18-30 16-46"
        className="stroke-brand-800"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M60 250c-4-18 6-32 24-38 2 18-6 34-24 38Z"
        className="fill-brand-200"
      />

      {/* sparkles */}
      <path
        d="M280 90 292 94 280 98 276 110 272 98 260 94 272 90 276 78Z"
        className="fill-brand-200"
      />
      <path
        d="M130 70 137 72 130 74 128 81 126 74 119 72 126 70 128 63Z"
        className="fill-brand-200"
      />
    </svg>
  );
}
