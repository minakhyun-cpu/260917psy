// Brand mark: a small node-network cluster (mind / connection) with a leaf
// sprouting from it (growth), in a sage-to-terracotta duotone gradient.
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="logo-network" x1="10" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9CAE94" />
          <stop offset="1" stopColor="#5C7355" />
        </linearGradient>
        <linearGradient id="logo-leaf" x1="22" y1="36" x2="42" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e2754f" />
          <stop offset="1" stopColor="#b84b2a" />
        </linearGradient>
      </defs>

      {/* connecting mesh */}
      <g stroke="url(#logo-network)" strokeWidth="1.2" strokeLinecap="round">
        <line x1="24" y1="24" x2="24" y2="10" />
        <line x1="24" y1="24" x2="36" y2="17" />
        <line x1="24" y1="24" x2="36" y2="31" />
        <line x1="24" y1="24" x2="24" y2="38" />
        <line x1="24" y1="24" x2="12" y2="31" />
        <line x1="24" y1="24" x2="12" y2="17" />
        <line x1="24" y1="10" x2="36" y2="17" />
        <line x1="36" y1="17" x2="36" y2="31" />
        <line x1="36" y1="31" x2="24" y2="38" />
        <line x1="24" y1="38" x2="12" y2="31" />
        <line x1="12" y1="31" x2="12" y2="17" />
        <line x1="12" y1="17" x2="24" y2="10" />
      </g>

      {/* nodes */}
      <circle cx="24" cy="24" r="3.2" fill="url(#logo-network)" />
      <circle cx="24" cy="10" r="2.6" fill="url(#logo-network)" />
      <circle cx="36" cy="17" r="2.2" fill="white" stroke="url(#logo-network)" strokeWidth="1.3" />
      <circle cx="36" cy="31" r="2.4" fill="url(#logo-network)" />
      <circle cx="24" cy="38" r="2.6" fill="url(#logo-network)" />
      <circle cx="12" cy="31" r="2.2" fill="white" stroke="url(#logo-network)" strokeWidth="1.3" />
      <circle cx="12" cy="17" r="2.4" fill="url(#logo-network)" />

      {/* leaf sprout */}
      <path d="M24 38c3 5 10 8 17 7" stroke="url(#logo-leaf)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M29 40c3-3 8-3 11 0-3 4-8 4-11 0Z" fill="url(#logo-leaf)" />
    </svg>
  );
}
