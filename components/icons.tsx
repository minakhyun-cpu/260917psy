type IconProps = {
  className?: string;
};

// Small, hand-drawn line icons used for the brand mark and test-type cards.
// Kept dependency-free (no icon package) and purely decorative — always
// rendered with aria-hidden alongside real text labels.

export function LeafIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3c5 3.6 8 7.2 8 11a8 8 0 0 1-16 0c0-3.8 3-7.4 8-11Z" />
      <path d="M12 7.5V19" />
    </svg>
  );
}

export function FlowerIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="7.3" r="2.3" />
      <circle cx="16.7" cy="12" r="2.3" />
      <circle cx="12" cy="16.7" r="2.3" />
      <circle cx="7.3" cy="12" r="2.3" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CompassIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7 15 12 12 17 9 12Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HeartPulseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20c-4-2.6-8-6.2-8-10.3A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.7c0 4.1-4 7.7-8 10.3Z" />
      <path d="M8.5 12h2l1.2-2.2L13 14l1.2-2H16" />
    </svg>
  );
}

export function SmileyIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9" cy="10.3" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10.3" r="1.1" fill="currentColor" stroke="none" />
      <path d="M8.3 14.2c1 1.3 2.3 2 3.7 2s2.7-.7 3.7-2" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11 3.5 12.8 9 18 10.8l-5.2 1.8L11 18l-1.8-5.4L4 10.8 9.2 9 11 3.5Z" />
      <path d="M17.5 14.5 18.4 17l2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.5Z" />
    </svg>
  );
}

export function GoogleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export const TEST_TYPE_ICONS = {
  personality: FlowerIcon,
  child: SmileyIcon,
  stress: HeartPulseIcon,
  other: SparkleIcon,
} satisfies Record<string, (props: IconProps) => ReturnType<typeof FlowerIcon>>;
