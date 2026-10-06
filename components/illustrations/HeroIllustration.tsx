// A refined, editorial "quiet moment" scene for the hero section — a
// gradient-rendered figure resting in soft light, with a delicate botanical
// accent. Kept abstract (no face/skin tone) so it reads as universal.
export default function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-bg" x1="40" y1="30" x2="360" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff3ec" />
          <stop offset="1" stopColor="#ffe1d0" />
        </linearGradient>
        <radialGradient id="hero-halo" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(108 72) rotate(90) scale(76)">
          <stop offset="0" stopColor="#f3b993" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f3b993" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-figure" x1="205" y1="108" x2="205" y2="238" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e2754f" />
          <stop offset="1" stopColor="#b84b2a" />
        </linearGradient>
        <linearGradient id="hero-leaf" x1="300" y1="200" x2="368" y2="258" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d9603a" />
          <stop offset="1" stopColor="#7a3320" />
        </linearGradient>
      </defs>

      <path
        d="M22 176c-6-62 38-124 118-144 84-21 168 8 206 70 32 52 20 118-26 156-50 42-134 50-206 24C44 258 27 224 22 176Z"
        fill="url(#hero-bg)"
      />

      {/* halo / soft morning light */}
      <circle cx="108" cy="72" r="76" fill="url(#hero-halo)" />
      <circle cx="108" cy="72" r="30" fill="#fdd9bb" opacity="0.9" />
      <circle cx="108" cy="72" r="100" stroke="#f3b993" strokeOpacity="0.5" strokeWidth="1" />

      {/* ground shadow */}
      <ellipse cx="210" cy="252" rx="92" ry="12" fill="#b84b2a" opacity="0.14" />

      {/* seated figure, rendered with a soft gradient fill and a crisp line edge */}
      <path
        d="M205 108a25 25 0 0 1 25 25 25 25 0 0 1-21.5 24.8c20.6 3.9 36.5 19 40.5 42.2l6 38c-16 14-34 21-50 21s-34-7-50-21l6-38c4-23.2 19.9-38.3 40.5-42.2A25 25 0 0 1 180 133a25 25 0 0 1 25-25Z"
        fill="url(#hero-figure)"
      />
      <path
        d="M205 108a25 25 0 0 1 25 25 25 25 0 0 1-21.5 24.8c20.6 3.9 36.5 19 40.5 42.2l6 38c-16 14-34 21-50 21s-34-7-50-21l6-38c4-23.2 19.9-38.3 40.5-42.2A25 25 0 0 1 180 133a25 25 0 0 1 25-25Z"
        stroke="#7a3320"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      <circle cx="178" cy="214" r="7" fill="#b84b2a" />
      <circle cx="232" cy="214" r="7" fill="#b84b2a" />

      {/* delicate botanical accent */}
      <path
        d="M304 252c6-30 28-50 60-54"
        stroke="#7a3320"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M312 240c4-10 13-16 23-17-2 11-11 19-23 17Z" fill="url(#hero-leaf)" />
      <path d="M326 222c3-8 10-13 18-14-1 9-9 15-18 14Z" fill="url(#hero-leaf)" opacity="0.85" />
      <path d="M338 207c2-6 7-10 13-11-1 7-6 12-13 11Z" fill="url(#hero-leaf)" opacity="0.7" />

      {/* minimal sparkle accents */}
      <path
        d="M292 96 298 100 292 104 290 112 288 104 282 100 288 96 290 88Z"
        fill="#f3b993"
      />
      <circle cx="72" cy="208" r="3" fill="#f3b993" />
      <circle cx="252" cy="68" r="2.5" fill="#f3b993" />
    </svg>
  );
}
