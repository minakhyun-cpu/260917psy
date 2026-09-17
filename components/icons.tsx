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
      strokeWidth="1.8"
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
      strokeWidth="1.7"
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
      strokeWidth="1.7"
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
      strokeWidth="1.7"
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

export const TEST_TYPE_ICONS = {
  personality: FlowerIcon,
  career: CompassIcon,
  stress: HeartPulseIcon,
  other: SparkleIcon,
} satisfies Record<string, (props: IconProps) => ReturnType<typeof FlowerIcon>>;
